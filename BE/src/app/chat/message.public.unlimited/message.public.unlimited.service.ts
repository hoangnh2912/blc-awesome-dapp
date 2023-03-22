import { ChatConstant, logger } from '@constants';
import { Cid, IMessage, Message, Room, ChatUser } from '@schemas';
import { emitMessageV2, emitTotalUnread, emitUpdateMessageV2, Singleton } from '@providers';
class PublicUnlimitedMessageService {
  public async getMessageOfRoom(
    address: string,
    room_id: string,
    page: number,
    limit: number,
    isDescending?: boolean,
  ) {
    const room = await Room.findOne({
      _id: room_id,
      room_type: ChatConstant.ROOM_TYPE.UNLIMITED,
      users: address,
      deleted_at: { $exists: false },
    });

    if (!room) {
      return [];
    }

    const order = isDescending ? -1 : 1;
    const messages = await Message.find({
      room_id,
      deleted_at: { $exists: false },
    })
      .skip(page * limit)
      .limit(limit)
      .sort({
        created_at: order,
      });
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
    }
    return messages || [];
  }

  public async sendMessage(
    address: string,
    room_id: string,
    message_data: string,
    is_forwarded: boolean = false,
    message_id_reply?: string,
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

      if (!findRoom) {
        return null;
      }
      if (!!findRoom.only_view && !findRoom.admins.includes(address)) return null;

      // const to_address = findRoom?.users.filter(user => user != address);

      // if (!to_address) return null;
      if (
        !findRoom.sub_admins?.includes(address) &&
        !findRoom.admins?.includes(address) &&
        !this.memberMessageVerify(message_data)
      ) {
        return null;
      }
      const now = new Date();
      const createPayload: any = {
        room_id,
        sender_user: {
          avatar: sender_user.avatar,
          wallet_address: sender_user.wallet_address,
          name: sender_user.name,
        },
        created_at: now.toISOString(),
        message_data,
        is_forwarded,
        is_notification,
      };

      if (message_id_reply) {
        const message_reply = await Message.findOne({
          _id: message_id_reply,
        });
        if (!message_reply) return null;
        else createPayload['message_reply'] = message_id_reply;
      }

      const messages = await Message.create(createPayload);
      messages.cid = await Singleton.getMessageInstance().getCid({
        messages: message_data,
        sender: sender_user.wallet_address,
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

      if (findRoom) {
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

      // const to_address = findRoom.users.filter(user => {
      //   return user != sender_user.wallet_address && !findRoom.is_disable.includes(user);
      // });

      const roomUsers = findRoom.users;
      if (roomUsers) {
        await Promise.all(
          roomUsers.map(user => {
            return emitTotalUnread(user);
          }),
        );
      }
      return messages;
    } catch (error) {
      throw error;
    }
  }

  public async updateMessage(
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

    messages.updated_at = new Date();
    messages.message_data = message_data;
    messages.cid = await Singleton.getMessageInstance().getCid({
      messages: message_data,
      sender: address,
      timestamp: new Date().toISOString(),
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
    const latestMessage = await Singleton.getMessageInstance().lastMessageOfRoom(messages.room_id);
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

  private async memberMessageVerify(message_data: string) {
    try {
      const regex = new RegExp(
        '([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?(/.*)?',
      );
      if (regex.test(message_data.replace(/\s/g, ''))) {
        return true;
      }
      return false;
    } catch (error: any) {
      logger.error(error.message);
      return false;
    }
  }
}
export { PublicUnlimitedMessageService };
