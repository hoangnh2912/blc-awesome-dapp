import { createServer } from 'http';
// import { NextFunction } from "express";
import { Singleton, web3 } from '@providers';
import { Server } from 'socket.io';
import { logger, ChatConstant } from '@constants';
import { IMessage, IReaction, INotification, ChatSession, IRoom, Authorized } from '@schemas';
import { Types } from 'mongoose';
import { createECDH } from 'crypto';
import { ethers } from 'ethers';

// let messageQueue = [];
// let syncQueue: string[] = [];
// let messageCount = 0;
const socketServer = createServer();

const io = new Server(socketServer, {
  cors: {
    origin: '*',
  },
  pingTimeout: 43200000,
  pingInterval: 1000,
  upgradeTimeout: 30000,
  maxHttpBufferSize: 1e8,
  transports: ['websocket'],
});

io.use(async (socket, next) => {
  const roomService = Singleton.getRoomInstance();
  const usersService = Singleton.getChatUserInstance();

  const authorize = socket.handshake.auth.authorize;
  const apiKey = socket.handshake.auth['api_key'];

  if (apiKey) {
    const message = socket.handshake.auth['message'];
    const signature = socket.handshake.auth['signature'];
    if (!message || !signature) {
      return next(new Error('no message or signature'));
    }
    const address = await ethers.utils.verifyMessage(`${message}`, `${signature}`);
    const authorized = await Authorized.findOne({
      api_key: `${apiKey}`.trim(),
    });
    if (!authorized) {
      return next(new Error('invalid authorized user'));
    }
    await usersService.setSessionId(address.toLowerCase(), socket.id);
    return next();
  }

  if (authorize) {
    if (Array.isArray(authorize)) {
      authorize.join('');
    }
    if (typeof authorize === 'string') {
      const [address, addressFromMessage] = authorizeExtractor(authorize);

      if (addressFromMessage != address) {
        return next(new Error('invalid address not match'));
      }
      if (!web3.utils.isAddress(address)) {
        return next(new Error('invalid address'));
      }

      // if (Date.now() > parseInt(expire)) {
      //   return next(new Error('out of date authorize'));
      // }

      await usersService.setSessionId(address.toLowerCase(), socket.id);
      const listRooms = await roomService.getRoomOfUser(address);
      const user = await usersService.get(address);

      await Promise.all(
        listRooms.map((room: any) =>
          Promise.all([
            socket.join(room._id.toString()),
            socket.to(room._id.toString()).emit(ChatConstant.SOCKET_EVENT_NAME.userConnected, user),
            roomService.receiveMessageWhenOnline(address, room._id.toString()),
          ]),
        ),
      );
      console.log(`new connection: ${socket.id}`);

      return next();
    }
  } else {
    return next(new Error('no authorize'));
  }
});

io.on('connection', async socket => {
  const usersService = Singleton.getChatUserInstance();

  socket.on('disconnect', async () => {
    const matchingSocket = await io.in(socket.id).fetchSockets();
    // const matchingSocket = io.in(socket.id).allSockets()
    const isDisconnected = matchingSocket.length === 0;

    if (isDisconnected) {
      socket.broadcast.emit(ChatConstant.SOCKET_EVENT_NAME.userDisconnected, socket.id);
      await usersService.removeSessionId(socket.id);
    }
  });
});

const balanceUpdate = (addresses: ChatSession[], data: string) => {
  addresses.forEach(address => {
    io.to(address.session_id).emit(ChatConstant.SOCKET_EVENT_NAME.balanceUpdate, data);
  });
};

const emitNewNotification = (
  addresses: (ChatSession | undefined)[],
  data?: (INotification & { _id: Types.ObjectId }) | undefined,
) => {
  addresses.forEach(address => {
    if (address) io.to(address.session_id).emit(ChatConstant.SOCKET_EVENT_NAME.notification, data);
  });
};

const emitCreateRoom = async (
  addresses: (ChatSession | undefined)[],
  data: (IRoom & { _id: Types.ObjectId }) | undefined,
) => {
  switch (data?.room_type) {
    case ChatConstant.ROOM_TYPE.LIMITED:
      if (data.shared_key) {
        const messageService = Singleton.getMessageInstance();
        const dmtp = createECDH('secp256k1');
        for (const address of addresses) {
          if (address) {
            dmtp.setPrivateKey(Buffer.from(ChatConstant.KEY_PAIR.dmtp_priv_key, 'hex'));
            const userPubkey = await Singleton.getChatUserInstance().getPublicKey(address.address);
            const secretKey = dmtp.computeSecret(Buffer.from(userPubkey, 'hex'));
            data.shared_key = messageService.encryptMessage(
              data.shared_key,
              secretKey.toString('hex'),
            );
          }
        }
      }
      io.emit(ChatConstant.SOCKET_EVENT_NAME.groupCreated, data);
      break;
    case ChatConstant.ROOM_TYPE.UNLIMITED:
      io.emit(ChatConstant.SOCKET_EVENT_NAME.groupCreated, data);
      break;
    default:
      addresses.forEach(address => {
        if (address)
          io.to(address.session_id).emit(ChatConstant.SOCKET_EVENT_NAME.roomCreate, data);
        if (address)
          io.to(address.session_id).emit(ChatConstant.SOCKET_EVENT_NAME.groupCreated, data);
      });
      break;
  }
};

const emitAcceptFriend = (addresses: (ChatSession | undefined)[], data: any | undefined) => {
  addresses.forEach(address => {
    if (address) io.to(address.session_id).emit(ChatConstant.SOCKET_EVENT_NAME.friendAccept, data);
  });
};

const startSocket = () => {
  const PORT = process.env.SOCKET_PORT;
  socketServer.listen(PORT, () => logger.info(`Socket server listening at http://0.0.0.0:${PORT}`));
};

const authorizeExtractor = (authorize: string) => {
  const [message, signature] = authorize.split(':');

  // const address = web3.eth.accounts.recover(message, signature);
  const address = ethers.utils.verifyMessage(message, signature);

  return [address.toLowerCase(), message];
};

const messageSyncHandle = async () => {};

const emitMessageV2 = async (message: IMessage & { _id: Types.ObjectId }) => {
  try {
    const roomService = Singleton.getRoomInstance();
    const sessions = await roomService.getSessionOfRoom(message.room_id);

    sessions.map(session => {
      io.to(session.session_id)
        .timeout(ChatConstant.SOCKET_RESPONSE_TIMEOUT)
        .emit(ChatConstant.SOCKET_EVENT_NAME.messageSent, message);
    });
  } catch (error) {
    throw error;
  }
};

const emitMessageStatus = async (
  room_id: string,
  message: (IMessage & { _id: Types.ObjectId })[],
) => {
  try {
    if (message.length == 0) return;
    const roomService = Singleton.getRoomInstance();
    const sessions = await roomService.getSessionOfRoom(room_id);
    sessions.map(session => {
      io.to(session.session_id)
        .timeout(ChatConstant.SOCKET_RESPONSE_TIMEOUT)
        .emit(ChatConstant.SOCKET_EVENT_NAME.messageStatus, message);
    });
  } catch (error) {
    throw error;
  }
};

const emitTotalUnread = async (address: string) => {
  const userService = Singleton.getChatUserInstance();
  const userSessionQuery = await userService.get(address);
  const userSession = userSessionQuery?.session;
  if (userSession) {
    const totalUnread = await userService.getTotalUnread(address);
    if (totalUnread) {
      userSession.map((session: any) => {
        io.to(session.session_id).emit(
          ChatConstant.SOCKET_EVENT_NAME.totalUnreadCount,
          totalUnread,
        );
        io.to(session.session_id).emit(ChatConstant.SOCKET_EVENT_NAME.notification, undefined);
      });
    }
  }
};

const emitUpdateMessageV2 = async (message: IMessage & { _id: Types.ObjectId }) => {
  try {
    const roomService = Singleton.getRoomInstance();
    const sessions = await roomService.getSessionOfRoom(message.room_id);
    sessions.forEach(session => {
      io.to(session.session_id).emit(ChatConstant.SOCKET_EVENT_NAME.messageUpdated, message);
    });
  } catch (error) {
    throw error;
  }
};

const emitDeleteMessage = (message: IMessage & { _id: Types.ObjectId }, lastMessage: string) => {
  try {
    io.to(message.room_id).emit(ChatConstant.SOCKET_EVENT_NAME.messageDeleted, {
      message_id: message._id,
      lastMessage,
    });
  } catch (error) {
    throw error;
  }
};

const emitJoinRoom = (room_id: string, address: string) => {
  try {
    io.to(room_id).emit(ChatConstant.SOCKET_EVENT_NAME.userJoined, { address });
  } catch (error: any) {
    logger.error(error.message);
  }
};

const emitLeaveRoom = async (
  senderAddress: string,
  room_id: string,
  address: string,
  sessions: ChatSession[],
  shared_key: string | null,
) => {
  try {
    if (shared_key) {
      const dmtp = createECDH('secp256k1');
      await Promise.all(
        sessions.map(async session => {
          let obj: any = {
            senderAddress,
            room_id,
            address,
          };
          if (session.address != address) {
            dmtp.setPrivateKey(Buffer.from(ChatConstant.KEY_PAIR.dmtp_priv_key, 'hex'));
            const userPubkey = await Singleton.getChatUserInstance().getPublicKey(session.address);
            const secretKey = dmtp.computeSecret(Buffer.from(userPubkey, 'hex'));
            obj['shared_key'] = Singleton.getMessageInstance().encryptMessage(
              shared_key,
              secretKey.toString('hex'),
            );
          }
          io.to(session.session_id).emit(ChatConstant.SOCKET_EVENT_NAME.userLeave, obj);
        }),
      );
    } else {
      sessions.map(session => {
        io.to(session.session_id).emit(ChatConstant.SOCKET_EVENT_NAME.userLeave, {
          senderAddress,
          room_id,
          address,
        });
      });
    }
  } catch (error) {
    throw error;
  }
};

const emitSetRole = (room_id: string, address: string, role: string) => {
  try {
    io.to(room_id).emit(ChatConstant.SOCKET_EVENT_NAME.userRole, {
      address,
      role,
    });
  } catch (error: any) {
    logger.error(error.message);
  }
};

const emitUpdateRoom = (room_id: string, name: string, avatar: string, description: string) => {
  try {
    io.to(room_id).emit(ChatConstant.SOCKET_EVENT_NAME.roomUpdated, {
      name,
      avatar,
      description,
    });
  } catch (error) {
    throw error;
  }
};

const emitFriendRequest = (sessions: ChatSession[], from: string) => {
  try {
    sessions.forEach(session => {
      io.to(session.session_id).emit(ChatConstant.SOCKET_EVENT_NAME.friendRequest, from);
    });
  } catch (error) {
    throw error;
  }
};

const emitSNS = (
  sessions: ChatSession[],
  payload: {
    telegram: string | undefined;
    discord: string | undefined;
  },
) => {
  try {
    sessions.forEach(session => {
      io.to(session.session_id).emit(ChatConstant.SOCKET_EVENT_NAME.sns, payload);
    });
  } catch (error) {
    throw error;
  }
};

const emitDeleteFriendRequest = (sessions: ChatSession[], from: string) => {
  try {
    sessions.forEach(session => {
      io.to(session.session_id).emit(ChatConstant.SOCKET_EVENT_NAME.friendRequestDeleted, from);
    });
  } catch (error) {
    throw error;
  }
};

const emitUnFriend = (sessions: ChatSession[], addresses: string[]) => {
  try {
    sessions.forEach(session => {
      io.to(session.session_id).emit(ChatConstant.SOCKET_EVENT_NAME.unfriend, addresses);
    });
  } catch (error) {
    throw error;
  }
};

const emitAddReaction = (message: IMessage & { _id: Types.ObjectId }, reaction: IReaction) => {
  try {
    io.to(message.room_id).emit(ChatConstant.SOCKET_EVENT_NAME.reactionAdded, {
      message_id: message._id,
      reaction,
    });
  } catch (error) {
    throw error;
  }
};

const emitRemoveReaction = (message: IMessage & { _id: Types.ObjectId }, reaction: IReaction) => {
  try {
    io.to(message.room_id).emit(ChatConstant.SOCKET_EVENT_NAME.reactionRemoved, {
      message_id: message._id,
      reaction,
    });
  } catch (error) {
    throw error;
  }
};

const checkActiveSession = async (session_id: string) => {
  try {
    const userService = Singleton.getChatUserInstance();

    const status = io
      .to(session_id)
      .timeout(ChatConstant.SOCKET_RESPONSE_TIMEOUT)
      .emit('session check', async (err: any, res: any) => {
        if (!err && res.length != 0) {
          return true;
        } else {
          await userService.removeSessionId(session_id);
          return false;
        }
      });
    return status;
  } catch (error) {
    throw error;
  }
};

export {
  startSocket,
  balanceUpdate,
  emitMessageV2,
  emitTotalUnread,
  messageSyncHandle,
  emitFriendRequest,
  emitDeleteFriendRequest,
  emitAddReaction,
  emitUpdateMessageV2,
  emitDeleteMessage,
  emitRemoveReaction,
  emitNewNotification,
  emitJoinRoom,
  emitLeaveRoom,
  emitSetRole,
  checkActiveSession,
  emitMessageStatus,
  emitCreateRoom,
  emitUpdateRoom,
  emitUnFriend,
  emitAcceptFriend,
  emitSNS,
};
