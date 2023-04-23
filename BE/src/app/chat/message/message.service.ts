import { ChatConstant, logger } from '@constants';
import {
  // botSendMessageToWallets,
  emitAddReaction,
  emitCreateRoom,
  emitDeleteMessage,
  emitMessageV2,
  emitRemoveReaction,
  emitTotalUnread,
  emitUpdateMessageV2,
  Singleton,
  uploadJson,
} from '@providers';
import { Cid, IMessage, Message, Room, ChatUser } from '@schemas';
import { createECDH } from 'crypto';
import { AES, enc } from 'crypto-js';
import keccak256 from 'keccak256';
import { dmtp_priv_key, dmtp_pub_key } from '../key_pair.json';
class MessageService {
  public async getMessageOfRoom(
    address: string,
    room_id: string,
    page: number,
    limit: number,
    isDescending?: boolean,
    is_promotion: boolean = false,
  ) {
    const room = await Room.findOne({
      _id: room_id,
      deleted_at: { $exists: false },
    });

    const user = await ChatUser.findOne({
      wallet_address: address,
    });

    if (!user) {
      return {
        messages: [],
        is_friend: false,
      };
    }

    if (!room) {
      return {
        messages: [],
        is_friend: false,
      };
    }
    if (!room.users.includes(address)) {
      return {
        messages: [],
        is_friend: false,
      };
    }
    const order = isDescending ? -1 : 1;
    const messages = await Message.find({
      room_id,
      deleted_at: { $exists: false },
      is_promotion,
    })
      .skip(page * limit)
      .limit(limit)
      .sort({
        created_at: order,
      });

    const is_friend = !!user?.friends?.includes(room?.users?.find(user => user != address) || '');
    let userInfoMessage: any = {};
    for (let i = 0; i < messages.length; i++) {
      const message = messages[i];
      if (!userInfoMessage[message.sender_user.wallet_address]) {
        userInfoMessage[message.sender_user.wallet_address] = await ChatUser.findOne({
          wallet_address: message.sender_user.wallet_address,
        });
      }
      messages[i].sender_user = {
        ...messages[i].sender_user,
        avatar: userInfoMessage[message.sender_user.wallet_address].avatar || null,
        name: userInfoMessage[message.sender_user.wallet_address].name || null,
      } as any;
      // messages[i].reaction = messages[i].reaction.map(reaction => ({
      //   ...reaction,
      //   users: reaction.users.map(user => ({
      //     ...user,
      //     avatar: userInfoMessage[user.wallet_address].avatar || null,
      //     name: userInfoMessage[user.wallet_address].name || null,
      //   })),
      // }))
    }
    return {
      messages,
      is_friend,
    };
  }

  public async sendMessage(
    address: string,
    room_id: string,
    message_data: string,
    is_forwarded?: boolean,
    message_id_reply?: string,
    is_promotion?: boolean,
    is_notification?: boolean,
  ) {
    try {
      const sender_user = await ChatUser.findOne({
        wallet_address: address,
        deleted_at: { $exists: false },
      });

      if (!sender_user) return null;

      const findRoom = await Room.findOne({
        _id: room_id,
        deleted_at: { $exists: false },
        users: address,
      });

      // if (!sender_user.friends?.includes(findRoom?.users?.find(user => user != address) || ''))
      //   return null;

      if (!findRoom || findRoom.room_type !== ChatConstant.ROOM_TYPE.PRIVATE) {
        return null;
      }

      const to_address = findRoom.users.find(
        user => user != address && !findRoom.is_disable.includes(user),
      );

      if (!to_address) return null;

      const now = new Date();
      const createPayload: any = {
        room_id,
        sender_user: {
          avatar: sender_user.avatar,
          wallet_address: sender_user.wallet_address,
          name: sender_user.name,
        },
        message_data,
        is_forwarded,
        is_promotion,
        is_notification,
        message_status: ChatConstant.MESSAGE_STATUS.SENT,
        created_at: now.toISOString(),
      };

      if (message_id_reply) {
        const message_reply = await Message.findOne({
          _id: message_id_reply,
        });
        if (!message_reply) return null;
        else createPayload['message_reply'] = message_id_reply;
      }

      const messages = await Message.create(createPayload);
      messages.cid = await this.getCid({
        messages: message_data,
        sender: sender_user.wallet_address,
        receiver: to_address,
        timestamp: now.toISOString(),
      });
      await Cid.findOneAndUpdate(
        {
          cid: messages.cid,
        },
        {
          cid: messages.cid,
          room_id,
        },
        {
          upsert: true,
          new: true,
          setDefaultsOnInsert: true,
        },
      );
      await messages.save();

      if (findRoom) {
        if (findRoom.hidden && findRoom.hidden.length > 0) findRoom.hidden = [];
        findRoom.last_message = { message_data, at: now };
        findRoom.updated_at = new Date();
        findRoom.user_read = findRoom?.user_read?.map(userRead => {
          if (userRead.user.wallet_address != address) {
            return {
              ...userRead,
              unread_count: userRead.unread_count + 1,
            };
          }
          return userRead;
        });
        await findRoom.save();
      }

      // await Room.findOneAndUpdate(
      //   {
      //     room_id,
      //     deleted_at: { $exists: false },
      //   },
      //   {
      //     message_status: Constant.MESSAGE_STATUS.SENT,
      //   },
      // );

      let messageEmit = {
        ...messages.toObject(),
      };
      const userInfoMessage = await ChatUser.findOne({
        wallet_address: messageEmit.sender_user.wallet_address,
      });
      if (!userInfoMessage) return null;
      messageEmit.sender_user = {
        ...messageEmit.sender_user,
        avatar: userInfoMessage.avatar || null,
        name: userInfoMessage.name || null,
      } as any;

      await emitMessageV2(messageEmit);

      // if (!findRoom.is_disable.includes(to_address))
      //   botSendMessageToWallets([to_address], {
      //     embeds: [
      //       {
      //         title: `New message on DMTP`,
      //         color: 0x9900ff,
      //         url: `https://dmtp.tech/messages/${room_id}`,
      //       },
      //     ],
      //     content: `Message from ${
      //       !!sender_user.name ? sender_user.name : sender_user.wallet_address
      //     } to ${to_address}`,
      //     data: {
      //       user: {
      //         name: sender_user.name,
      //         avatar: sender_user.avatar,
      //         wallet_address: sender_user.wallet_address,
      //       },
      //       room_id,
      //     },
      //     type: Constant.NOTIFICATION_TYPE.NEW_MESSAGE,
      //   });

      const sessionOfRoom = await Singleton.getRoomInstance().getSessionOfRoom(
        findRoom._id.toString(),
      );
      const roomUsers = findRoom.users;
      if (roomUsers) {
        await Promise.all(
          roomUsers.map(user => {
            return Promise.all([emitTotalUnread(user), emitCreateRoom(sessionOfRoom, findRoom)]);
          }),
        );
      }
      return messages;
    } catch (error) {
      throw error;
    }
  }

  public async updateMessageV2(
    messageId: string,
    address: string,
    message_data: string,
  ): Promise<IMessage | null> {
    const messages = await Message.findOne({
      _id: messageId,
      'sender_user.wallet_address': address,
      deleted_at: { $exists: false },
    });
    if (!messages) return null;

    const findRoom = await Room.findOne({
      _id: messages.room_id,
      deleted_at: { $exists: false },
      users: address,
    });

    if (!findRoom || findRoom.room_type !== ChatConstant.ROOM_TYPE.PRIVATE) {
      return null;
    }

    const to_address = findRoom?.users.find(user => user != address);

    const now = new Date();
    messages.updated_at = now;
    messages.message_data = message_data;
    messages.cid = await this.getCid({
      messages: message_data,
      sender: address,
      receiver: to_address,
      timestamp: now.toISOString(),
    });

    await Cid.findOneAndUpdate(
      {
        cid: messages.cid,
      },
      {
        cid: messages.cid,
        room_id: messages.room_id,
      },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      },
    );
    await messages.save();
    const latestMessage = await this.lastMessageOfRoom(messages.room_id);
    emitUpdateMessageV2(messages.toObject());
    await Room.findOneAndUpdate(
      {
        _id: messages.room_id,
        deleted_at: { $exists: false },
      },
      {
        last_message: { message_data: latestMessage.message_data, at: latestMessage.created_at },
      },
    );
    return messages;
  }

  public async deleteMessage(messageId: string, address: string): Promise<IMessage | null> {
    const messages = await Message.findOneAndUpdate(
      {
        _id: messageId,
        'sender_user.wallet_address': address,
      },
      {
        deleted_at: new Date(),
      },
      {
        new: true,
      },
    );
    if (!messages) return null;
    const findRoom = await Room.findOne({
      _id: messages.room_id,
      deleted_at: { $exists: false },
    });

    if (!findRoom) {
      // if (!findRoom || findRoom.room_type !== Constant.ROOM_TYPE.PRIVATE) {
      return null;
    }

    const to_address = findRoom?.users.find(user => user != address);
    const now = new Date();
    messages.cid = await this.getCid({
      messages: 'This message was deleted',
      sender: address,
      receiver: to_address,
      timestamp: now.toISOString(),
    });

    await Cid.findOneAndUpdate(
      {
        cid: messages.cid,
      },
      {
        cid: messages.cid,
        room_id: messages.room_id,
      },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      },
    );
    await messages.save();
    const latestMessage = await this.lastMessageOfRoom(messages.room_id);

    if (findRoom) {
      if (findRoom.room_type == ChatConstant.ROOM_TYPE.LIMITED) {
        findRoom.last_message.shared_key = latestMessage.shared_key;
      }
      findRoom.last_message.message_data = latestMessage?.message_data;
      findRoom.user_read = findRoom.user_read?.map(userRead => {
        if (
          userRead.user.wallet_address != address &&
          messages.message_status != ChatConstant.MESSAGE_STATUS.READ
        ) {
          return {
            ...userRead,
            unread_count: Math.max(userRead.unread_count - 1, 0),
          };
        }
        return userRead;
      });
      findRoom.markModified('user_read');
      findRoom.markModified('last_message');
      await findRoom.save();
    }

    emitDeleteMessage(messages, latestMessage?.message_data || '');
    emitTotalUnread(address);

    return messages;
  }

  public async reactMessage(messageId: string, address: string, emoji: string) {
    try {
      const userService = Singleton.getChatUserInstance();
      const user = await userService.get(address);
      if (!user) {
        return {
          status: false,
          message: 'User not found!',
        };
      }
      const filter = {
        _id: messageId,
        deleted_at: { $exists: false },
      };

      let findMessage = await Message.findOne(filter);

      if (!findMessage) {
        return {
          status: false,
          message: 'Message not found!',
        };
      }

      findMessage.reaction = findMessage.reaction.map(reaction => ({
        ...reaction,
        ...((reaction as any)?.user && { users: [(reaction as any).user] }),
      }));

      const reactionCount = findMessage.reaction.filter(
        reaction => reaction.users.filter(user => user.wallet_address == address).length > 0,
      );
      if (reactionCount.length > 9) {
        return {
          status: false,
          message: "You've reach limit reaction for a message",
        };
      }

      let findReactionIdx = findMessage.reaction.findIndex(reaction => reaction.emoji == emoji);

      if (findReactionIdx == -1) {
        findMessage.reaction.push({
          emoji,
          users: [{ wallet_address: address }],
          at: new Date(),
        });
      } else {
        const findUserIdx = findMessage.reaction[findReactionIdx].users.findIndex(
          user => user.wallet_address == address,
        );

        if (findUserIdx == -1)
          findMessage.reaction[findReactionIdx].users.push({
            wallet_address: address,
          });
      }

      findMessage.markModified('reaction');
      await findMessage.save();
      await emitAddReaction(findMessage, findMessage.reaction[findReactionIdx]);
      return {
        data: findMessage,
        status: true,
      };
    } catch (error) {
      throw error;
    }
  }

  public async removeReaction(messageId: string, address: string, emoji: string) {
    try {
      const userService = Singleton.getChatUserInstance();
      const user = await userService.get(address);
      if (!user) {
        return {
          status: false,
          message: 'User not found!',
        };
      }
      const filter = {
        _id: messageId,
        deleted_at: { $exists: false },
      };

      let findMessage = await Message.findOne(filter);

      if (!findMessage) {
        return {
          status: false,
          message: 'Message not found!',
        };
      }

      findMessage.reaction = findMessage.reaction.map(reaction => ({
        ...reaction,
        ...((reaction as any)?.user && { users: [(reaction as any).user] }),
      }));

      const findReactionIdx = findMessage.reaction.findIndex(reaction => reaction.emoji == emoji);

      // let cloneReaction;

      if (findReactionIdx == -1) {
        return {
          status: false,
          message: 'Reaction not found!',
        };
      } else {
        // cloneReaction = JSON.parse(JSON.stringify(findMessage.reaction[findReactionIdx]));
        const findUserIdx = findMessage.reaction[findReactionIdx].users.findIndex(
          user => user.wallet_address == address,
        );

        if (findUserIdx == -1) {
          return {
            status: false,
            message: 'User not reaction this message!',
          };
        } else {
          findMessage.reaction[findReactionIdx].users = findMessage.reaction[
            findReactionIdx
          ].users.filter(user => user.wallet_address != address);

          if (findMessage.reaction[findReactionIdx].users.length == 0)
            findMessage.reaction = findMessage.reaction.filter(reaction => reaction.emoji != emoji);
        }
      }
      findMessage.markModified('reaction');
      await findMessage.save();
      await emitRemoveReaction(findMessage, findMessage.reaction[findReactionIdx]);
      return {
        data: findMessage,
        status: true,
      };
    } catch (error) {
      throw error;
    }
  }

  public async findMessageByID(message_id: string, room_id: string) {
    try {
      const message = await Message.findOne({
        _id: message_id,
        room_id,
        deleted_at: { $exists: false },
      });
      return message;
    } catch (error) {
      throw error;
    }
  }

  public async getCid(data: Object): Promise<string> {
    const jsonIPFS = await uploadJson(data);
    return jsonIPFS.path;
  }

  public async lastMessageSynced() {
    try {
      const filter = {
        synced_at: { $exists: true },
        deleted_at: { $exists: false },
      };

      const lastMessageSync = await Message.findOne(filter, null, {
        sort: { created_at: -1 },
      });

      return lastMessageSync;
    } catch (error) {
      throw error;
    }
  }

  public async getMessageList(from: string, to: string) {
    try {
      let filter: any = { $lte: to };

      if (from) {
        filter['$gte'] = from;
      }

      const messageList = await Message.find(filter, { cid: 1 });
      return messageList;
    } catch (error) {
      throw error;
    }
  }

  public async lastMessageOfRoom(room_id: string) {
    try {
      const lastMessage = await Message.findOne(
        {
          room_id,
          deleted_at: { $exists: false },
        },
        null,
        {
          sort: {
            created_at: -1,
          },
        },
      );

      if (!lastMessage) {
        return {
          message_data: '',
          created_at: new Date(0),
          shared_key: '',
        };
      }

      return lastMessage;
    } catch (error) {
      throw error;
    }
  }

  public async decryptMessageOfRoom(room_id: string, bobAddress: string) {
    try {
      const roomService = Singleton.getRoomInstance();
      const userService = Singleton.getChatUserInstance();
      const messageList = await Message.find({
        room_id,
        deleted_at: { $exists: false },
      });

      const room = await roomService.getRoom(room_id);
      let aliceAddress = '';
      let alicePubKey = '';
      if (room) {
        aliceAddress = room.users.find(user => user != bobAddress) || '';
      }
      if (aliceAddress) {
        alicePubKey = await userService.getPublicKey(aliceAddress);
        const bobPubKey = await userService.getPublicKey(bobAddress);
        // const server = getDiffieHellman("modp1");
        // const prime = server.getPrime();
        // const dmtp = createDiffieHellman(prime);
        const dmtp = createECDH('secp256k1');
        dmtp.setPrivateKey(Buffer.from(dmtp_priv_key, 'hex'));
        // dmtp.setPublicKey(Buffer.from(dmtp_pub_key, "hex"));

        const dmtpAndAliceSecret = dmtp.computeSecret(Buffer.from(alicePubKey, 'hex'));
        const dmtpAndBobSecret = dmtp.computeSecret(Buffer.from(bobPubKey, 'hex'));
        await Promise.all(
          messageList.map(async message => {
            const rawMessage = await this.decryptMessage(
              message.message_data,
              dmtpAndAliceSecret.toString('hex'),
            );
            const messageToBob = await this.encryptMessage(
              rawMessage,
              dmtpAndBobSecret.toString('hex'),
            );
            message.message_data = messageToBob;
          }),
        );
      }
      const result = {
        pub_key: alicePubKey,
        dmtp_pub_key,
        message: messageList.map(message => {
          return {
            message_id: message._id,
            message_data: message.message_data,
          };
        }),
      };

      // return messageList;
      return result;
    } catch (error) {
      throw error;
    }
  }

  public decryptMessage(message_data: string, key: string) {
    try {
      const hash = keccak256(key).toString('hex');
      const decryptedMessage = AES.decrypt(message_data, hash).toString(enc.Utf8);

      return decryptedMessage ? decryptedMessage : message_data;
    } catch (error: any) {
      logger.error(error.message);
      return message_data;
    }
  }

  public encryptMessage(message_data: string, key: string) {
    try {
      const hash = keccak256(key).toString('hex');
      return AES.encrypt(message_data, hash).toString();
    } catch (error: any) {
      logger.error(error.message);
      return '';
    }
  }

  public async renewMessage(
    address: string,
    rooms: {
      room_id: string;
      messages: { message_id: string; message_data: string }[];
    }[],
  ) {
    try {
      let bulkArray: any = [];
      const roomService = Singleton.getRoomInstance();
      rooms.map(async room => {
        const findRoom = await roomService.getRoom(room.room_id);
        if (findRoom?.users.includes(address) && !findRoom?.both_init) {
          for (const message of room.messages) {
            bulkArray.push({
              updateMany: {
                filter: { _id: message.message_id, room_id: room.room_id },
                update: {
                  message_data: message.message_data,
                  updated_at: new Date().toISOString(),
                },
              },
            });
          }
          await roomService.initBoth(room.room_id);
        }
      });
      if (bulkArray.length) {
        const updatedMessage = await Message.bulkWrite(bulkArray);
        return updatedMessage;
      }

      return null;
    } catch (error) {
      throw error;
    }
  }
}
export { MessageService };
