import { ChatConstant, Some } from '@constants';
import {
  // CidContract,
  emitAcceptFriend,
  emitDeleteFriendRequest,
  emitFriendRequest,
  emitNewNotification,
  emitUnFriend,
  // sendTransaction,
  Singleton,
  stickerContract,
  uploadJson,
} from '@providers';
import {
  Avatar,
  IRoom,
  IChatUser,
  IUserMessageRead,
  Notification,
  Room,
  ChatUser,
  Authorized,
} from '@schemas';
import keccak256 from 'keccak256';
import { Types } from 'mongoose';
// import { dmtp_pub_key } from '../../../dmtp_key_pair.json';

type InputUserParams = Pick<
  IChatUser,
  'discord' | 'wallet_address' | 'avatar' | 'name' | 'description'
>;

class ChatUserService {
  public async getAllUser() {
    return await ChatUser.find({});
  }
  public async get(address: string): Promise<
    IChatUser & {
      link_addresses: string[];
    }
  > {
    const lowerAddress = address.toLowerCase();
    const user = await ChatUser.findOne({
      wallet_address: lowerAddress,
    });

    const authorized = await Authorized.findOne({
      wallet_addresses: lowerAddress,
    });

    return Object.assign(user?.toObject() as any, {
      link_addresses: authorized?.wallet_addresses || [lowerAddress],
      invitation_url: authorized?.invitation_url || '',
      api_key: authorized?.api_key || '',
    });
  }

  public async getAvatarOfWallet(wallet_address: string): Promise<string> {
    const avatar = (await Avatar.findOne({ wallet_address }))?.cid || '';
    return avatar;
  }
  public async unstoppableDomainToAddress(domain: string): Promise<string> {
    try {
      const resp = await fetch(`https://resolve.unstoppabledomains.com/domains/${domain}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.UNSTOPPABLE_DOMAINS_API_KEY}`,
        },
      });
      const data = await resp.json();
      if (data.meta.owner) return data.meta.owner;
      return domain;
    } catch (_error: any) {
      return domain;
    }
  }

  public async getPrivateKey(wallet_address: string) {
    try {
      const privateKey = (await ChatUser.findOne({ wallet_address }))?.priv_key || '';
      return privateKey;
    } catch (error) {
      throw error;
    }
  }

  public async getPublicKey(wallet_address: string) {
    try {
      const publicKey =
        (await ChatUser.findOne({ wallet_address }))?.pub_key || ChatConstant.KEY_PAIR.dmtp_pub_key;
      return publicKey;
    } catch (error) {
      throw error;
    }
  }

  public async getWithFriend(sender_address: string, receiver_address: string): Promise<any> {
    const lowerAddressReceiver = receiver_address.toLowerCase();
    const userReceiver = await ChatUser.findOne(
      {
        wallet_address: lowerAddressReceiver,
      },
      {
        session: 0,
        dmtp: 0,
        stickers: 0,
        premium: 0,
        active_points: 0,
        updated_at: 0,
        created_at: 0,
      },
    );

    const room = await Room.findOne({
      users: {
        $all: [sender_address, lowerAddressReceiver],
      },
      room_type: ChatConstant.ROOM_TYPE.PRIVATE,
    });

    const payloadReceiver = {
      ...userReceiver?.toObject(),
      ...(room && {
        room_id: room._id,
      }),
      friend_status: ChatConstant.FRIEND_STATUS.NONE,
    };
    const userSender = await ChatUser.findOne(
      {
        wallet_address: sender_address,
      },
      {
        session: 0,
        dmtp: 0,
        stickers: 0,
        premium: 0,
        active_points: 0,
        updated_at: 0,
        created_at: 0,
      },
    );

    if (payloadReceiver && userSender) {
      if (payloadReceiver?.friends && userSender?.friends) {
        if (
          payloadReceiver?.friends.includes(sender_address.toLocaleLowerCase()) ||
          userSender?.friends.includes(receiver_address.toLocaleLowerCase())
        )
          payloadReceiver.friend_status = ChatConstant.FRIEND_STATUS.ACCEPTED;
      }

      if (payloadReceiver?.friend_requests && userSender?.friend_requests) {
        if (payloadReceiver?.friend_requests.includes(sender_address.toLocaleLowerCase()))
          payloadReceiver.friend_status = ChatConstant.FRIEND_STATUS.SENDER_WAIT;
        if (userSender?.friend_requests.includes(receiver_address.toLocaleLowerCase()))
          payloadReceiver.friend_status = ChatConstant.FRIEND_STATUS.RECEIVER_WAIT;
      }
    }

    return payloadReceiver;
  }

  public async getUsersByName(name: string) {
    try {
      const filter = {
        name: { $regex: new RegExp(name, 'i') },
        deleted_at: { $exists: false },
      };

      const users = await ChatUser.find(filter);
      return users;
    } catch (error) {
      throw error;
    }
  }

  public async create(inputUser: InputUserParams, referrer: string = ''): Promise<IChatUser> {
    const isExist = await this.checkExist(inputUser.wallet_address);

    if (!isExist && referrer) {
      await Authorized.findOneAndUpdate(
        {
          telegram_id: Buffer.from(referrer, 'base64').toString(),
        },
        {
          $addToSet: {
            invited_wallets: inputUser.wallet_address,
          },
        },
      );
    }

    if (inputUser.avatar) {
      await Avatar.findOneAndUpdate(
        {
          wallet_address: inputUser.wallet_address,
        },
        {
          wallet_address: inputUser.wallet_address,
          cid: inputUser.avatar,
        },
        {
          upsert: true,
          new: true,
          setDefaultsOnInsert: true,
        },
      );
    }

    const payload = {
      ...inputUser,
      stickers: [],
      updated_at: new Date().toISOString(),
    };
    const user = await ChatUser.findOneAndUpdate(
      {
        wallet_address: inputUser.wallet_address,
      },
      {
        ...payload,
        ...(inputUser.avatar && {
          avatar: `chat-user/avatar?wallet_address=${inputUser.wallet_address}`,
        }),
      },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      },
    );
    return user;
  }

  public async update(inputUser: InputUserParams): Promise<IChatUser> {
    const payloadUpdate = {} as any;
    if (inputUser.name) payloadUpdate.name = inputUser.name;
    if (inputUser.avatar) {
      await Avatar.findOneAndUpdate(
        {
          wallet_address: inputUser.wallet_address,
        },
        {
          wallet_address: inputUser.wallet_address,
          cid: inputUser.avatar,
        },
        {
          upsert: true,
          new: true,
          setDefaultsOnInsert: true,
        },
      );
    }
    if (inputUser.discord) payloadUpdate.discord = inputUser.discord;
    if (inputUser.description) payloadUpdate.description = inputUser.description;
    const user = await ChatUser.findOneAndUpdate(
      {
        wallet_address: inputUser.wallet_address,
      },
      {
        ...payloadUpdate,
        ...(inputUser.avatar && {
          avatar: `chat-user/avatar?wallet_address=${inputUser.wallet_address}`,
        }),
        updatedAt: new Date(),
      },
      {
        new: true,
      },
    );
    return user?.toObject() as IChatUser;
  }

  public async checkExist(address: string): Promise<boolean> {
    try {
      const isExist = await ChatUser.exists({
        wallet_address: address,
      });
      return !!isExist;
    } catch (error) {
      return false;
    }
  }

  public async addTokenForUser(tokenId: string, wallet_address: string) {
    try {
      const nftAmount = await stickerContract.methods
        .balanceOf(wallet_address.toLowerCase(), tokenId)
        .call();
      if (nftAmount) {
        const filter = { wallet_address };
        const update = {
          $addToSet: { stickers: tokenId },
          updated_at: new Date().toISOString(),
        };
        await ChatUser.updateOne(filter, update);
      }
    } catch (error) {
      throw error;
    }
  }

  public async removeTokenForUser(tokenId: string, wallet_address: string) {
    try {
      const nftAmount = await stickerContract.methods
        .balanceOf(wallet_address.toLowerCase(), tokenId)
        .call();
      if (!nftAmount) {
        const filter = { wallet_address };
        const update = { $pull: { stickers: tokenId } };
        await ChatUser.updateOne(filter, update);
      }
    } catch (error) {
      throw error;
    }
  }

  public async sendFriendRequest(
    sender_address: string,
    object_address: string,
  ): Promise<Some<IChatUser>> {
    try {
      const filter = {
        wallet_address: object_address,
        deleted_at: {
          $exists: false,
        },
      };

      const user = await ChatUser.findOne(filter);
      if (user && user?.friend_requests?.includes(sender_address)) {
        return {
          status: false,
          message: 'Already sent',
        };
      }

      if (user && user?.friends?.includes(sender_address)) {
        return {
          status: false,
          message: 'Already friend',
        };
      }

      const update = {
        $addToSet: {
          friend_requests: sender_address,
        },
        updated_at: new Date().toISOString(),
      };

      const updated = await ChatUser.findOneAndUpdate(filter, update, {
        new: true,
      });

      if (!updated) {
        return {
          status: false,
          message: 'Address invalid',
        };
      }
      const sessionQuery = await ChatUser.findOne(
        {
          wallet_address: object_address,
          deleted_at: {
            $exists: false,
          },
        },
        {
          session: 1,
        },
      );
      const sessions = sessionQuery ? sessionQuery.session || [] : [];
      await emitFriendRequest(sessions, sender_address);

      const senderUser = await ChatUser.findOne({
        wallet_address: sender_address,
        deleted_at: {
          $exists: false,
        },
      });

      await this.removeOldFriendNotification(sender_address, object_address);

      if (sessions && senderUser?.session) {
        await emitNewNotification([...sessions, ...senderUser?.session], undefined);
      }
      return {
        status: true,
        data: updated,
      };
    } catch (error) {
      throw error;
    }
  }

  public async getFriendRequests(address: string): Promise<IChatUser[] | null> {
    try {
      const match = {
        $match: {
          wallet_address: address,
          deleted_at: {
            $exists: false,
          },
        },
      };

      const lookup = {
        $lookup: {
          from: 'users',
          localField: 'friend_requests',
          foreignField: 'wallet_address',
          as: 'friend_requests',
          pipeline: [
            {
              $project: {
                _id: 1,
                name: 1,
                wallet_address: 1,
                avatar: 1,
              },
            },
          ],
        },
      };

      const project = {
        $project: {
          _id: 0,
          friend_requests: 1,
        },
      };
      const friendRequests = await ChatUser.aggregate([match, lookup, project]);

      return friendRequests;
    } catch (error) {
      throw error;
    }
  }

  public async acceptFriendRequest(sender_address: string, object_address: string) {
    try {
      const filter = {
        wallet_address: object_address,
        deleted_at: {
          $exists: false,
        },
      };

      const acceptRequest = {
        $pull: {
          friend_requests: sender_address,
        },
        updated_at: new Date().toISOString(),
      };

      const friendRequest = await ChatUser.findOneAndUpdate(filter, acceptRequest, {
        new: true,
      });

      // Check if exists friend request
      const userFriendRequests = friendRequest?.friend_requests || [];
      if (userFriendRequests.indexOf(sender_address.toLowerCase()) != -1) {
        return null;
      }

      // Check if already friend
      const userFriend = friendRequest?.friends || [];
      if (userFriend.indexOf(sender_address.toLowerCase()) != -1) {
        return null;
      }

      if (!friendRequest) {
        return null;
      }

      const addFriend = {
        $addToSet: {
          friends: sender_address,
        },
        updated_at: new Date().toISOString(),
      };

      // add to request accept account's friend list
      const updatedUser = await ChatUser.findOneAndUpdate(filter, addFriend, {
        new: true,
      });

      // add to request sender account's friend list
      const senderUser = await ChatUser.findOneAndUpdate(
        {
          wallet_address: sender_address,
          deleted_at: { $exists: false },
        },
        {
          $addToSet: { friends: object_address },
          updated_at: new Date().toISOString(),
        },
      );
      await this.removeOldFriendNotification(sender_address, object_address);

      const roomService = Singleton.getRoomInstance();
      const roomCreated =
        (
          await roomService.createRoom(
            [sender_address, object_address],
            sender_address,
            '',
            ChatConstant.ROOM_TYPE.PRIVATE,
          )
        ).data || new Types.ObjectId();

      if (updatedUser?.session && senderUser?.session) {
        await emitNewNotification([...updatedUser?.session, ...senderUser?.session], undefined);
        await emitAcceptFriend([...updatedUser?.session, ...senderUser?.session], {
          receiver: updatedUser?.toObject(),
          sender: senderUser?.toObject(),
        });
      }

      return roomCreated;
    } catch (error) {
      throw error;
    }
  }

  public async removeOldFriendNotification(sender_address: string, object_address: string) {
    await Notification.deleteMany({
      to_address: object_address,
      'data.type': ChatConstant.NOTIFICATION_TYPE.FRIEND_REQUEST,
      'data.data.user.wallet_address': sender_address,
    });

    await Notification.deleteMany({
      to_address: sender_address,
      'data.type': ChatConstant.NOTIFICATION_TYPE.FRIEND_ACCEPT,
      'data.data.user.wallet_address': object_address,
    });

    await Notification.deleteMany({
      to_address: sender_address,
      'data.type': ChatConstant.NOTIFICATION_TYPE.FRIEND_DENY,
      'data.data.user.wallet_address': object_address,
    });
  }

  public async getFriendList(address: string, filter: string = ''): Promise<any> {
    try {
      const matchLookup = {
        $match: {
          $or: [
            {
              name: { $regex: new RegExp(filter, 'i') },
            },
            {
              wallet_address: { $regex: new RegExp(filter, 'i') },
            },
          ],
        },
      };

      let friends = await ChatUser.aggregate([
        {
          $match: {
            wallet_address: address,
            deleted_at: { $exists: false },
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'friends',
            foreignField: 'wallet_address',
            as: 'friends',
            pipeline: [
              {
                $project: {
                  _id: 1,
                  wallet_address: 1,
                  avatar: 1,
                  name: 1,
                },
              },
              matchLookup,
            ],
          },
        },
        {
          $project: {
            _id: 0,
            friends: 1,
          },
        },
      ]);

      const roomOfUser = await Room.find({
        users: {
          $in: [address],
        },
        room_type: ChatConstant.ROOM_TYPE.PRIVATE,
      });
      // const friends = User.findOne(
      //   {
      //     wallet_address: address,
      //     deleted_at: { $exists: false },
      //   },
      //   { friends: 1 }
      // );
      if (!friends[0]) return [];
      friends = friends[0].friends.map((friend: IChatUser) => ({
        ...friend,
        room_id:
          roomOfUser.find((room: IRoom) => room.users.includes(friend.wallet_address))?._id || null,
        public_key: null,
      }));
      for (const fr of friends) {
        fr.public_key = await this.getPublicKey(fr.wallet_address);
      }
      return [
        {
          friends,
        },
      ];
    } catch (error) {
      throw error;
    }
  }

  public async deleteFriendRequest(sender_address: string, object_address: string) {
    try {
      const filter = {
        wallet_address: object_address,
        deleted_at: {
          $exists: false,
        },
      };
      const update = {
        $pull: {
          friend_requests: sender_address,
        },
        updated_at: new Date().toISOString(),
      };
      const updatedUser = await ChatUser.findOneAndUpdate(filter, update, {
        new: true,
      });

      const sessionQuerySender = await ChatUser.findOne(
        {
          wallet_address: sender_address,
          deleted_at: {
            $exists: false,
          },
        },
        {
          session: 1,
        },
      );
      await this.removeOldFriendNotification(sender_address, object_address);

      await Notification.deleteMany({
        to_address: object_address,
        'data.type': ChatConstant.NOTIFICATION_TYPE.NEW_MESSAGE,
        'data.data.user.wallet_address': sender_address,
      });
      await Notification.deleteMany({
        to_address: sender_address,
        'data.type': ChatConstant.NOTIFICATION_TYPE.NEW_MESSAGE,
        'data.data.user.wallet_address': object_address,
      });
      if (updatedUser?.session && sessionQuerySender?.session) {
        await emitNewNotification(
          [...updatedUser?.session, ...sessionQuerySender?.session],
          undefined,
        );
        emitDeleteFriendRequest(sessionQuerySender?.session, object_address);
      }

      return updatedUser;
    } catch (error) {
      throw error;
    }
  }
  public async cancelFriendRequest(sender_address: string, object_address: string) {
    try {
      const filter = {
        wallet_address: object_address,
        deleted_at: {
          $exists: false,
        },
      };
      const update = {
        $pull: {
          friend_requests: sender_address,
        },
        updated_at: new Date().toISOString(),
      };
      const updatedUser = await ChatUser.findOneAndUpdate(filter, update, {
        new: true,
      });

      const sessionQuerySender = await ChatUser.findOne(
        {
          wallet_address: sender_address,
          deleted_at: {
            $exists: false,
          },
        },
        {
          session: 1,
        },
      );
      await this.removeOldFriendNotification(sender_address, object_address);
      if (updatedUser?.session && sessionQuerySender?.session)
        await emitNewNotification(
          [...updatedUser?.session, ...sessionQuerySender?.session],
          undefined,
        );
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }

  public async unfriend(address: string, friend: string) {
    try {
      const filter = {
        wallet_address: address,
        deleted_at: {
          $exists: false,
        },
      };

      const update = {
        $pull: {
          friends: friend,
        },
        updated_at: new Date().toISOString(),
      };

      // remove from sender's friend list
      const updatedUserRemove = await ChatUser.findOneAndUpdate(filter, update, {
        new: true,
      });

      // remove from object's friend list
      const updatedUserBeRemove = await ChatUser.findOneAndUpdate(
        {
          wallet_address: friend,
          deleted_at: { $exists: false },
        },
        {
          $pull: { friends: address },
          updated_at: new Date().toISOString(),
        },
      );
      await this.removeOldFriendNotification(address, friend);
      await this.removeOldFriendNotification(friend, address);
      await Notification.deleteMany({
        to_address: address,
        'data.type': ChatConstant.NOTIFICATION_TYPE.NEW_MESSAGE,
        'data.data.user.wallet_address': friend,
      });
      await Notification.deleteMany({
        to_address: friend,
        'data.type': ChatConstant.NOTIFICATION_TYPE.NEW_MESSAGE,
        'data.data.user.wallet_address': address,
      });
      if (updatedUserBeRemove?.session && updatedUserRemove?.session) {
        emitNewNotification(
          [...updatedUserBeRemove?.session, ...updatedUserRemove?.session],
          undefined,
        );
        emitUnFriend(
          [...updatedUserBeRemove?.session, ...updatedUserRemove?.session],
          [friend, address],
        );
      }

      return updatedUserRemove;
    } catch (error) {
      throw error;
    }
  }

  public async getSessionId(address: string) {
    try {
      const sessionId = await ChatUser.findOne(
        {
          wallet_address: address,
          deleted_at: { $exists: false },
        },
        {
          session: 1,
        },
      );

      return sessionId;
    } catch (error) {
      throw error;
    }
  }

  public async setSessionId(address: string, session_id: string) {
    try {
      const filter = {
        wallet_address: address,
        deleted_at: { $exists: false },
      };
      const update = {
        $push: { session: { $each: [{ session_id, address }], $slice: -25 } },
        updated_at: new Date().toISOString(),
      };
      const updatedUser = await ChatUser.findOneAndUpdate(filter, update, {
        new: true,
      });

      return updatedUser ? true : false;
    } catch (error) {
      throw error;
    }
  }

  public async removeSessionId(session_id: string) {
    const filter = {
      session: {
        $elemMatch: {
          session_id,
        },
      },
      deleted_at: { $exists: false },
    };
    const update = {
      $pull: {
        session: {
          session_id,
        },
      },
    };
    const updatedUser = await ChatUser.findOneAndUpdate(filter, update, {
      new: true,
    });
    return updatedUser ? true : false;
  }

  // public async addSignature
  public async getTotalUnreadOfListAddress(addressList: string[]) {
    try {
      const response = await Promise.all(
        addressList.map(async address => ({
          address,
          totalUnread: await this.getTotalUnread(address),
        })),
      );

      return response;
    } catch (error) {
      throw error;
    }
  }
  public async getTotalUnread(address: string) {
    try {
      const match = {
        $match: {
          wallet_address: address,
          deleted_at: { $exists: false },
        },
      };
      const lookup = {
        $lookup: {
          from: 'rooms',
          localField: 'wallet_address',
          foreignField: 'users',
          as: 'unread_count',
          pipeline: [
            {
              $project: {
                _id: 0,
                user_read: 1,
              },
            },
          ],
        },
      };

      const totalUnreadQuery: any = await ChatUser.aggregate([match, lookup]);

      let totalUnread = 0;
      if (totalUnreadQuery) {
        for (const room of totalUnreadQuery[0].unread_count) {
          room.user_read.map((user: IUserMessageRead) => {
            if (user.user.wallet_address === address && user.unread_count) {
              totalUnread += user.unread_count;
            }
          });
        }
      }

      return { totalUnread };
    } catch (error) {
      throw error;
    }
  }

  public async submitKeyPair(wallet_address: string, pub_key: string, priv_key: string) {
    try {
      const findUser = await ChatUser.findOne({
        wallet_address,
        deleted_at: { $exists: false },
      });

      if (findUser) {
        if (findUser?.pub_key || findUser?.priv_key) {
          return findUser;
        }

        findUser.priv_key = priv_key;
        findUser.pub_key = pub_key;
        const cid_key_pair = await uploadJson({
          DMTPpubKey: pub_key,
          DMTPpriKey: priv_key,
        });

        // await sendTransaction(
        //   CidContract,
        //   'addKey',
        //   [wallet_address, `${cid_key_pair.path}`],
        //   `${process.env.DMTP_OWNER_WALLET}`,
        //   ChatConstant.CONFIG_CONTRACT.CID.address,
        // );

        findUser.cid_key_pair = cid_key_pair.path;
        findUser.updated_at = new Date();
        await findUser.save();
      }

      return findUser;
    } catch (error) {
      throw error;
    }
  }

  public async generateApiKey(wallet_address: string) {
    const apiKey = `dmtp${keccak256(
      `${wallet_address}_${Math.random() * Math.random() * 10000}_${Date.now()}`,
    )
      .toString('hex')
      .slice(-40)}`;

    await Authorized.findOneAndUpdate(
      {
        wallet_addresses: wallet_address,
      },
      {
        api_key: apiKey,
      },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      },
    );
    return apiKey;
  }
}

export { ChatUserService };
