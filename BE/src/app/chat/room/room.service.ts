import { FilterQuery, Types } from 'mongoose';
import { Constant, logger, Some } from '@constants';
import {
  emitCreateRoom,
  emitJoinRoom,
  emitLeaveRoom,
  emitMessageStatus,
  emitNewNotification,
  emitSetRole,
  emitTotalUnread,
  emitUpdateRoom,
  Singleton,
  uploadJson,
} from '@providers';
import { Notification, IRoom, Room, Session, IUser, Message, IUserMessageRead } from '@schemas';

class RoomService {
  userService = Singleton.getUserInstance();
  messageService = Singleton.getMessageInstance();

  public async setNotificationRoom(room_id: string, address: string) {
    try {
      const filter = { _id: room_id, deleted_at: { $exists: false } };

      const findRoom = await this.getRoom(room_id);

      const addressIsDisable = findRoom?.is_disable.includes(address);

      let updatedRoom = null;

      if (!addressIsDisable) {
        updatedRoom = await Room.findOneAndUpdate(
          filter,
          {
            $addToSet: { is_disable: address.toLowerCase() },
            updated_at: new Date(),
          },
          {
            new: true,
          },
        );
      } else {
        updatedRoom = await Room.findOneAndUpdate(
          filter,
          {
            $pull: { is_disable: address.toLowerCase() },
            updated_at: new Date(),
          },
          {
            new: true,
          },
        );
      }

      if (!updatedRoom) {
        return { status: false, message: 'Wrong Room ID' };
      }
      return { data: updatedRoom, status: true };
    } catch (error) {
      throw error;
    }
  }

  public async getRoom(room_id: string) {
    try {
      const room = await Room.findOne({
        _id: room_id,
        deleted_at: { $exists: false },
      });
      return room;
    } catch (error) {
      throw error;
    }
  }

  public async getRoomInfo(
    room_id: string,
    address: string,
  ): Promise<Some<IRoom & { _id: Types.ObjectId }>> {
    try {
      let filter: any = {
        $match: {
          deleted_at: { $exists: false },
          _id: new Types.ObjectId(room_id),
        },
      };
      const lookup = {
        $lookup: {
          from: 'users',
          localField: 'users',
          foreignField: 'wallet_address',
          as: 'users',
          pipeline: [
            {
              $project: {
                name: 1,
                avatar: 1,
                wallet_address: 1,
                dmtp_pub_key: 1,
                friends: 1,
              },
            },
          ],
        },
      };

      const listRoom = await Room.aggregate([filter, lookup]);

      if (listRoom.length === 0) {
        return {
          message: 'Rooms not found',
          status: false,
        };
      }
      const room = listRoom[0];
      if (!room) {
        return {
          message: 'Room not found',
          status: false,
        };
      }
      if (
        room.room_type != Constant.ROOM_TYPE.UNLIMITED &&
        !room.users.find((user: IUser) => user.wallet_address == address)
      ) {
        return {
          status: false,
          message: 'Room: User not in room',
        };
      }
      return {
        status: true,
        data: {
          ...room,
          users: room.users.map((user: IUser) => {
            let role = Constant.MEMBER_OF_ROOM_TYPE.MEMBER;
            if (room.admins && room.admins.includes(user.wallet_address))
              role = Constant.MEMBER_OF_ROOM_TYPE.ADMIN;
            if (room.sub_admins && room.sub_admins.includes(user.wallet_address))
              role = Constant.MEMBER_OF_ROOM_TYPE.SUB_ADMIN;
            if (!user?.dmtp_pub_key) {
              return {
                ...user,
                dmtp_pub_key: Constant.DMTP_KEY_PAIR.dmtp_pub_key,
                role,
              };
            }
            return {
              ...user,
              role,
            };
          }),
          is_official: room.users
            .map((e: any) => e.wallet_address)
            .includes(Constant.DMTP_OFFICIAL_WALLET_ADDRESS),
        },
      };
    } catch (error: any) {
      logger.error(`room.service.ts:113:getRoomInfo: ${error.message}`);
      return {
        status: false,
        message: 'Room: Error when getRoomInfo',
      };
    }
  }

  public async getRoomOfUserV2(address: string, page: number = 0, limit: number = 15) {
    try {
      const roomOfficial =
        (
          await this.createRoom(
            [address, Constant.DMTP_OFFICIAL_WALLET_ADDRESS],
            Constant.DMTP_OFFICIAL_WALLET_ADDRESS,
            'DMTP OFFICIAL',
            Constant.ROOM_TYPE.UNLIMITED,
            Constant.DEFAULT_AVATAR,
            '',
            false,
            undefined,
            true,
          )
        ).data || new Types.ObjectId();
      const listMessageWithDMTP = await Singleton.getPublicUnlimitedRoomInstance().getMessageOfRoom(
        address,
        roomOfficial._id.toString(),
        0,
        5,
      );
      if (listMessageWithDMTP.length == 0) {
        for (const dmtpMessageInitial of Constant.DMTP_OFFICIAL_INITIAL_MESSAGE) {
          await Singleton.getPublicUnlimitedRoomInstance().sendMessage(
            Constant.DMTP_OFFICIAL_WALLET_ADDRESS,
            roomOfficial._id.toString(),
            dmtpMessageInitial,
          );
        }
      }

      let filter: any = {
        $match: {
          users: address.toLowerCase(),
          deleted_at: { $exists: false },
          // room_type,
        },
      };

      const lookup = {
        $lookup: {
          from: 'users',
          localField: 'users',
          foreignField: 'wallet_address',
          as: 'users',
          pipeline: [
            {
              $project: {
                name: 1,
                avatar: 1,
                wallet_address: 1,
                dmtp_pub_key: 1,
                friends: 1,
              },
            },
          ],
        },
      };
      const pageLimit = {
        $limit: (page + 1) * limit,
      };
      const skip = {
        $skip: page * limit,
      };

      const listRoom = await Room.aggregate([
        filter,
        lookup,
        {
          $sort: {
            'last_message.at': -1,
          },
        },
        pageLimit,
        skip,
      ]);

      const listRoomWithRole = await Promise.all(
        listRoom.map(async (room: any) => {
          return {
            ...room,
            users: await Promise.all(
              room.users.map(async (user: IUser) => {
                let role = Constant.MEMBER_OF_ROOM_TYPE.MEMBER;
                if (room.admins && room.admins.includes(user.wallet_address))
                  role = Constant.MEMBER_OF_ROOM_TYPE.ADMIN;
                if (room.sub_admins && room.sub_admins.includes(user.wallet_address))
                  role = Constant.MEMBER_OF_ROOM_TYPE.SUB_ADMIN;
                if (!user?.dmtp_pub_key) {
                  return {
                    ...user,
                    dmtp_pub_key: Constant.DMTP_KEY_PAIR.dmtp_pub_key,
                    role,
                  };
                }
                return {
                  ...user,
                  role,
                };
              }),
            ),
            last_message: {
              ...room.last_message,
              shared_key: (
                await Singleton.getSharedKeyInstance().getSharedKeys(address, room._id.toString(), [
                  room.last_message?.shared_key || new Types.ObjectId(),
                ])
              ).data?.pop()?.key_data,
            },
            is_official: room._id.toString() == roomOfficial._id.toString(),
          };
        }),
      );

      // console.log(listRoomWithRole)

      return listRoomWithRole.filter(room => {
        if (room.hidden && room.hidden.includes(address.toLowerCase())) return false;
        return true;
      });
    } catch (error) {
      throw error;
    }
  }
  public async getOppositeUser(address: string, room_id: string) {
    try {
      const room = await Room.findOne({
        _id: room_id,
      });
      const oppositeAddress = room?.users.find(user => user != address);

      if (oppositeAddress) {
        const user = await this.userService.get(oppositeAddress);
        if (user?.dmtp_pub_key) {
          return user?.dmtp_pub_key;
        }
        return Constant.DMTP_KEY_PAIR.dmtp_pub_key;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  public async getPublicRoom(page: number = 0, limit: number = 100, filterRoom: string = '') {
    try {
      const filter: FilterQuery<IRoom> = {
        $and: [
          {
            $or: [
              { room_type: Constant.ROOM_TYPE.UNLIMITED },
              { room_type: Constant.ROOM_TYPE.LIMITED },
            ],
          },
          {
            $or: [
              { name: { $regex: new RegExp(filterRoom, 'i') } },
              { 'nft_contracts.address': new RegExp(filterRoom, 'i') },
            ],
          },
        ],
        deleted_at: { $exists: false },
        users: { $ne: Constant.DMTP_OFFICIAL_WALLET_ADDRESS },
      };

      const listRoom = await Room.find(filter)
        .sort({
          created_at: 'desc',
        })
        .skip(page * limit)
        .limit(limit);

      listRoom.map(room => {
        if (room.nft_contracts) {
          room.nft_contracts.map((contract: any) => {
            const chainIndex = Object.values(Constant.SUPPORTED_CHAIN).findIndex(
              chain => chain.chainId == contract.chain_id,
            );
            const chainName = Object.keys(Constant.SUPPORTED_CHAIN)[chainIndex];
            const chainIcon = Object.values(Constant.SUPPORTED_CHAIN)[chainIndex].icon;
            contract.chain_name = chainName;
            contract.chain_icon = chainIcon;
            contract.url = `${Object.values(Constant.SUPPORTED_CHAIN)[chainIndex].scan}address/${
              contract.address
            }`;
          });
        }
        return room;
      });
      return listRoom;
    } catch (e) {
      throw e;
    }
  }

  public async createRoom(
    users: string[],
    creator: string,
    name: string,
    room_type: string = Constant.ROOM_TYPE.PRIVATE,
    avatar: string = '',
    description: string = '',
    only_view: boolean = false,
    nft_contract?: {
      contractAddress: string;
      chain_id: string;
    },
    is_create_official: boolean = false,
  ): Promise<Some<(IRoom | null) & { _id: Types.ObjectId }>> {
    try {
      // const messageService = Singleton.getMessageInstance();

      users.push(creator);

      const lowerCaseUsers = [
        ...new Set(
          users.map(e => {
            return e.toLowerCase();
          }),
        ),
      ];

      if (room_type == Constant.ROOM_TYPE.PRIVATE || is_create_official) {
        const findRoom = await Room.findOneAndUpdate(
          {
            users: {
              $size: lowerCaseUsers.length,
              $all: lowerCaseUsers,
            },
            room_type,
          },
          {
            $unset: {
              deleted_at: 1,
            },
            // 'last_message.at': new Date(),
          },
        );

        if (findRoom) {
          if (findRoom.hidden && findRoom.hidden.length > 0) findRoom.hidden = [];
          findRoom.markModified('hidden');
          await findRoom.save();
          return { status: true, data: findRoom };
        }
      }

      // if (room_type == Constant.ROOM_TYPE.PRIVATE) {
      //   const findRoom = await Room.findOne({
      //     users: {
      //       $size: lowerCaseUsers.length,
      //       $all: lowerCaseUsers,
      //     },
      //     deleted_at: { $exists: false },
      //     room_type: Constant.ROOM_TYPE.PRIVATE,
      //   });

      //   if (findRoom) {
      //     return { status: true, data: findRoom };
      //   }
      // }

      const now = new Date();

      const roomCid = await uploadJson({
        name,
        users: lowerCaseUsers,
        creator: creator,
        created_at: now.toISOString(),
      });

      let createField: any = {
        name,
        avatar: !!avatar ? avatar : Constant.DEFAULT_AVATAR,
        description,
        room_type,
        users: lowerCaseUsers,
        cid: roomCid.path,
        creator,
        admins: [creator],
        // both_init,
        create_at: now,
        updated_at: now,
        user_read: lowerCaseUsers.map(user => ({
          user: {
            wallet_address: user,
          },
          unread_count: 0,
          at: Date.now(),
        })),
        only_view,
        last_message: { message_data: '', at: now },
      };

      if (room_type === Constant.ROOM_TYPE.PRIVATE) {
        // room_type == PRIVATE
        let both_init = true;
        users.map(async user => {
          if (user != creator) {
            const findUser = await this.userService.get(user);
            if (!findUser?.dmtp_pub_key) {
              both_init = false;
            }
          }
        });
        createField['both_init'] = both_init;
      } else if (room_type === Constant.ROOM_TYPE.LIMITED) {
        if (nft_contract) {
          if (users.length > 1) {
            return {
              status: false,
              message: 'Room: Limited room creation can only have 1 member',
            };
          }
          if (
            !(await Singleton.getStickerInstance().isTokenOwned(
              nft_contract.chain_id,
              nft_contract.contractAddress,
              creator,
            ))
          ) {
            logger.error('room.service.ts:361 Not owner of contract');
            return { status: false, message: 'Room: User not any NFT owner' };
          }
        } else {
          return {
            status: false,
            message: 'Room: Unable to Create Unlimited without Contract',
          };
        }
      }

      const newRoom = await Room.create(createField);
      let roomWithNftContract = null;
      let shared_key = null;
      if (room_type == Constant.ROOM_TYPE.LIMITED) {
        shared_key =
          (await Singleton.getSharedKeyInstance().createSharedKey(newRoom._id.toString())) || '';
        if (nft_contract) {
          roomWithNftContract = await this.addNewNftContract(
            creator,
            newRoom._id.toString(),
            nft_contract.contractAddress.toLowerCase(),
            nft_contract.chain_id,
            true,
          );
          roomWithNftContract?.nft_contracts?.map((contract: any) => {
            const chainIndex = Object.values(Constant.SUPPORTED_CHAIN).findIndex(
              chain => chain.chainId == contract.chain_id,
            );
            const chainName = Object.keys(Constant.SUPPORTED_CHAIN)[chainIndex];
            const chainIcon = Object.values(Constant.SUPPORTED_CHAIN)[chainIndex].icon;
            contract.chain_name = chainName;
            contract.chain_icon = chainIcon;
          });
          // if (!addContractStatus) {
          //   return { status: false, message: 'Room: User not any NFT owner' };
          // }
        }
      }

      const clonedRoom: IRoom & {
        _id: Types.ObjectId;
      } = Object.assign(
        {},
        roomWithNftContract ? roomWithNftContract.toObject() : newRoom.toObject(),
      );

      // decrypt shared key to raw for emit
      if (shared_key) {
        clonedRoom.shared_key = shared_key;
      }
      if (newRoom.room_type == Constant.ROOM_TYPE.PRIVATE) {
        const sessionOfRoom = await this.getSessionOfRoom(newRoom._id.toString());
        await emitCreateRoom(sessionOfRoom, clonedRoom);
        await emitNewNotification(sessionOfRoom, undefined);
      } else {
        if (!is_create_official)
          // emit to all user that new group created
          await emitCreateRoom([], clonedRoom);
      }

      return { status: true, data: newRoom };
    } catch (error) {
      throw error;
    }
  }

  public async updateLastMessageTimeOfRoom(room_id: string) {
    try {
      await Room.findOneAndUpdate({ _id: room_id }, { 'last_message.at': new Date() });
    } catch (error) {
      throw error;
    }
  }

  public async findRoomWithListAddress(users: string[]) {
    try {
      const lowerCaseUsers = users.map(user => user.toLowerCase());
      const findRoom = await Room.findOne({
        users: {
          $size: lowerCaseUsers.length,
          $all: lowerCaseUsers,
        },
        deleted_at: { $exists: false },
        room_type: Constant.ROOM_TYPE.PRIVATE,
      });

      return findRoom;
    } catch (error) {
      throw error;
    }
  }

  public async getSessionOfRoom(room_id: string) {
    try {
      const match = {
        $match: {
          _id: new Types.ObjectId(room_id),
          deleted_at: { $exists: false },
        },
      };

      const lookup = {
        $lookup: {
          from: 'users',
          localField: 'users',
          foreignField: 'wallet_address',
          as: 'session',
          pipeline: [
            {
              $project: {
                _id: 0,
                session: 1,
              },
            },
          ],
        },
      };
      const project = {
        $project: {
          _id: 0,
          session: 1,
        },
      };

      const session = await Room.aggregate([match, lookup, project]);

      if (!session.length) {
        return [];
      }

      const sessionList: [{ session: Session[] }] = session[0].session;

      let totalSession: Session[] = [];
      // for (const session in sessionList){

      // }
      // totalSession = session.map((s))
      for (const index in sessionList) {
        if (
          Object.keys(sessionList[index]).length != 0 &&
          sessionList[index].constructor === Object
        ) {
          totalSession.push(...sessionList[index].session);
        }
      }
      // }
      // sessionList.forEach((session) => {
      //   totalSession.push(...session.session);
      // });

      return totalSession;
    } catch (error) {
      throw error;
    }
  }

  public async hiddenRoom(roomId: string, address: string): Promise<Some<IRoom>> {
    try {
      const filter = {
        _id: roomId,
        deleted_at: { $exists: false },
        room_type: Constant.ROOM_TYPE.PRIVATE,
      };

      const update = {
        $addToSet: { hidden: address.toLowerCase() },
        updated_at: new Date(),
      };
      const updatedRoom = await Room.findOneAndUpdate(filter, update, {
        new: true,
      });

      if (!updatedRoom) {
        return { status: false, message: 'wrong room id or not p2p room' };
      }

      return { data: updatedRoom, status: true };
    } catch (error) {
      throw error;
    }
  }

  public async addUserOfRoom(roomId: string, address: string): Promise<Some<IRoom>> {
    try {
      const filter = { _id: roomId, deleted_at: { $exists: false } };

      const update = {
        $addToSet: { users: address.toLowerCase() },
        updated_at: new Date(),
      };
      const updatedRoom = await Room.findOneAndUpdate(filter, update, {
        new: true,
      });

      if (!updatedRoom) {
        return { status: false, message: 'Wrong Room ID' };
      }
      const now = new Date();
      const newCid = await uploadJson({
        name: updatedRoom?.name,
        users: updatedRoom?.users,
        user_read: updatedRoom?.user_read,
        user_receive: updatedRoom?.user_receive,
        created_at: updatedRoom?.created_at,
        updated_at: now.toISOString(),
        creator: updatedRoom?.creator,
        admins: updatedRoom?.admins,
        room_type: updatedRoom?.room_type,
      });
      updatedRoom.cid = newCid.path;
      updatedRoom.updated_at = now;

      await updatedRoom.save();

      return { data: updatedRoom, status: true };
    } catch (error) {
      throw error;
    }
  }
  public async joinPublicRoom(roomId: string, address: string): Promise<Some<IRoom>> {
    try {
      const filter = {
        _id: roomId,
        deleted_at: { $exists: false },
        $or: [
          { room_type: Constant.ROOM_TYPE.LIMITED },
          { room_type: Constant.ROOM_TYPE.UNLIMITED },
        ],
      };

      const findRoom = await Room.findOne(filter);

      if (!findRoom) {
        return { status: false, message: 'Room: Invalid Room ID' };
      }

      if (findRoom.room_type == Constant.ROOM_TYPE.LIMITED) {
        if (findRoom.nft_contracts) {
          const stickerService = Singleton.getStickerInstance();

          let userVerify = false;
          for (const contract of findRoom.nft_contracts) {
            if (await stickerService.isTokenOwned(contract.chain_id, contract.address, address)) {
              userVerify = true;
            }
          }
          if (!userVerify) {
            return {
              status: false,
              message: 'Room: User not Qualified',
            };
          }
        }
      }

      if (!findRoom.users.includes(address)) {
        if (!findRoom.user_read.find(user => user.user.wallet_address == address)) {
          const user_read_item: IUserMessageRead = {
            user: { wallet_address: address },
            unread_count: 0,
          };
          findRoom.user_read = [...findRoom.user_read, user_read_item];
        }
        findRoom.users = [...findRoom.users, address.toLowerCase()];
        const newCid = await uploadJson({
          name: findRoom.name,
          users: findRoom.users,
          created_at: findRoom.created_at,
          creator: findRoom.creator,
          admins: findRoom.admins,
          sub_admins: findRoom.sub_admins,
          room_type: findRoom.room_type,
        });
        findRoom.cid = newCid.path;
        findRoom.updated_at = new Date();
        await findRoom.save();
        emitJoinRoom(roomId, address);
        return { status: true, data: findRoom };
      }

      return { status: false, message: 'Room: User already in room' };
    } catch (error) {
      throw error;
    }
  }
  public async removeUserOfRoom(
    senderAddress: string,
    room_id: string,
    address: string,
  ): Promise<Some<IRoom>> {
    try {
      const sessions = await this.getSessionOfRoom(room_id);

      const usersOfRoom = senderAddress == address ? [senderAddress] : [senderAddress, address];
      const filter = {
        _id: room_id,
        deleted_at: { $exists: false },
        users: {
          $all: usersOfRoom,
        },
      };

      const update = {
        $pull: { users: address.toLowerCase() },
        updated_at: new Date().toISOString(),
      };
      const updatedRoom = await Room.findOneAndUpdate(filter, update, {
        new: true,
      });

      if (!updatedRoom) {
        return { status: false, message: 'Invalid Room ID' };
      }

      const now = new Date();

      const cidJson: any = {
        name: updatedRoom?.name,
        users: updatedRoom?.users,
        user_read: updatedRoom?.user_read,
        user_receive: updatedRoom?.user_receive,
        created_at: updatedRoom?.created_at,
        updated_at: now.toISOString(),
        creator: updatedRoom?.creator,
        admins: updatedRoom?.admins,
        room_type: updatedRoom?.room_type,
      };
      const newCid = await uploadJson(cidJson);

      const newSharedKey = await Singleton.getSharedKeyInstance().createSharedKey(room_id);
      updatedRoom.cid = newCid.path;
      updatedRoom.updated_at = now;

      await updatedRoom.save();
      emitLeaveRoom(senderAddress, room_id, address, sessions, newSharedKey);

      if (!updatedRoom?.users?.length) {
        const deletedRoom = await this.removeRoom(updatedRoom?._id.toString());
        return { data: deletedRoom, status: true };
      }

      // if (deletedRoom) {
      //   emitLeaveRoom(senderAddress, room_id, address, sessions);
      //   return { data: deletedRoom, status: true };
      // }
      return { data: updatedRoom, status: true };
    } catch (error) {
      throw error;
    }
  }

  public async removeRoom(roomId: string): Promise<IRoom | null> {
    try {
      const filter = { _id: roomId, deleted_at: { $exists: false } };
      const update = { deleted_at: new Date().toISOString() };
      const deletedRoom = await Room.findOneAndUpdate(filter, update, {
        new: true,
      });
      if (!deletedRoom) {
        return null;
      }
      const now = new Date().toISOString();

      const cidJson: any = {
        name: deletedRoom?.name,
        users: deletedRoom?.users,
        user_read: deletedRoom?.user_read,
        user_receive: deletedRoom?.user_receive,
        created_at: deletedRoom?.created_at,
        updated_at: now,
        creator: deletedRoom?.creator,
        admins: deletedRoom?.admins,
        room_type: deletedRoom?.room_type,
        deleted_at: deletedRoom?.deleted_at,
      };

      const newCid = await uploadJson(cidJson);

      deletedRoom.cid = newCid.path;
      await deletedRoom.save();
      return deletedRoom;
    } catch (error) {
      throw error;
    }
  }

  public async setRoleOfRoom(
    roomId: string,
    address: string,
    role: string,
    requestAddress: string,
  ): Promise<Some<IRoom>> {
    try {
      const filter = {
        _id: roomId,
        deleted_at: { $exists: false },
        users: address,
        $or: [
          { room_type: Constant.ROOM_TYPE.LIMITED },
          { room_type: Constant.ROOM_TYPE.UNLIMITED },
        ],
      };
      const findRoom = await Room.findOne(filter);
      if (!findRoom) {
        return { status: false, message: 'Invalid Room ID' };
      }
      if (!findRoom?.admins.includes(requestAddress.toLowerCase())) {
        return { status: false, message: 'You are not admin' };
      }
      let update = {};
      const { ADMIN, MEMBER, SUB_ADMIN } = Constant.MEMBER_OF_ROOM_TYPE;
      switch (role) {
        case ADMIN:
          update = {
            $pull: { sub_admins: address.toLowerCase() },
            $addToSet: { admins: address.toLowerCase() },
            updated_at: new Date().toISOString(),
          };
          break;
        case SUB_ADMIN:
          if (!!findRoom.only_view) {
            return {
              status: false,
              message: 'Only member and admin can set role in only view group',
            };
          }

          update = {
            $pull: { admins: address.toLowerCase() },
            $addToSet: { sub_admins: address.toLowerCase() },
            updated_at: new Date().toISOString(),
          };
          break;
        case MEMBER:
          update = {
            $pull: { admins: address.toLowerCase(), sub_admins: address.toLowerCase() },
            updated_at: new Date().toISOString(),
          };
          break;
        default:
          return {
            status: false,
            message: 'Role is not valid',
          };
      }
      const updatedRoom = await Room.findOneAndUpdate(filter, update, {
        new: true,
      });
      if (updatedRoom) {
        emitSetRole(roomId, address, role);
        return {
          data: updatedRoom,
          status: true,
        };
      }
      return {
        status: false,
        message: 'Error when set Role',
      };
    } catch (error) {
      throw error;
    }
  }

  public async updateRoom(
    roomId: string,
    name: string,
    avatar: string,
    description: string,
    only_view: boolean = false,
  ): Promise<IRoom | null> {
    try {
      const filter = {
        _id: roomId,
        deleted_at: { $exists: false },
        $or: [
          { room_type: Constant.ROOM_TYPE.UNLIMITED },
          { room_type: Constant.ROOM_TYPE.LIMITED },
        ],
      };
      const findRoom = await Room.findOne(filter);

      let update = {};
      if (name) update = { ...update, name };
      if (avatar) update = { ...update, avatar };
      else update = { ...update, avatar: Constant.DEFAULT_AVATAR };
      if (description) update = { ...update, description };
      if (only_view !== findRoom?.only_view) update = { ...update, only_view, sub_admins: [] };
      update = { ...update, updated_at: new Date().toISOString() };
      const updatedRoom = await Room.findOneAndUpdate(filter, update, {
        new: true,
      });
      emitUpdateRoom(roomId, name, avatar, description, only_view);
      return updatedRoom;
    } catch (error) {
      throw error;
    }
  }

  public async readMessage(roomId: string, address: string): Promise<Some<IRoom>> {
    try {
      const userInfo = await this.userService.get(address);
      if (userInfo) {
      } else {
        return {
          status: false,
          message: 'User not found',
        };
      }

      const filter = {
        deleted_at: { $exists: false },
        _id: roomId,
      };
      const findUserOfRoom = await Room.findOne(filter);

      if (!findUserOfRoom)
        return {
          status: false,
          message: 'Room not found',
        };
      // let updatedRoom = await Room.findOne(filter);
      else {
        findUserOfRoom.user_read = findUserOfRoom?.user_read?.map(userRead => {
          if (userRead.user.wallet_address == address) {
            return {
              ...userRead,
              unread_count: 0,
            };
          }
          return userRead;
        });
        let messages = await Message.find({
          room_id: roomId,
          sender_address: { $ne: address },
          deleted_at: { $exists: false },
          message_status: { $ne: Constant.MESSAGE_STATUS.READ },
        });
        for (let m of messages) {
          m.message_status = Constant.MESSAGE_STATUS.READ;
          await m.save();
        }
        await emitMessageStatus(roomId, messages);
        await findUserOfRoom.save();
      }
      await emitTotalUnread(address);
      await Notification.deleteMany({
        to_address: address,
        'data.type': Constant.NOTIFICATION_TYPE.NEW_MESSAGE,
        'data.data.room_id': roomId,
      });
      await emitNewNotification(await this.getSessionOfRoom(roomId));
      return {
        status: true,
        data: findUserOfRoom,
      };
    } catch (error) {
      throw error;
    }
  }

  // public async receiveMessage(
  //   room_id: string,
  //   message_id: string = "",
  //   address: string
  // ): Promise<Some<IRoom>> {
  //   try {
  //     if (!message_id) {
  //       return {
  //         status: false,
  //         message: "Message id null",
  //       };
  //     }
  //     const userInfo = await this.userService.get(address);
  //     if (userInfo) {
  //     } else {
  //       return {
  //         status: false,
  //         message: "User not found",
  //       };
  //     }

  //     const filter = {
  //       deleted_at: { $exists: false },
  //       _id: room_id,
  //     };
  //     const findUserOfRoom = await Room.findOne(filter);

  //     if (!findUserOfRoom) {
  //       return {
  //         status: false,
  //         message: "Room not found",
  //       };
  //     }

  //     const update = {
  //       $set: {
  //         "user_receive.$.message_id": message_id,
  //         "user_receive.$.at": new Date(),
  //       },
  //     };
  //     const updatedRoom = await Room.findOneAndUpdate(filter, update, {
  //       new: true,
  //     });

  //     return {
  //       status: true,
  //       data: updatedRoom,
  //     };
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  public async receiveMessageWhenOnline(address: string, room_id: string) {
    try {
      // await Message.updateMany(
      //   {
      //     room_id,
      //     sender_address: { $ne: address },
      //     deleted_at: { $exists: false },
      //     message_status: Constant.MESSAGE_STATUS.SENT,
      //   },
      //   {
      //     message_status: Constant.MESSAGE_STATUS.RECEIVED,
      //   }
      // );

      let messages = await Message.find({
        room_id,
        sender_address: { $ne: address },
        deleted_at: { $exists: false },
        message_status: Constant.MESSAGE_STATUS.SENT,
      });
      for (let m of messages) {
        m.message_status = Constant.MESSAGE_STATUS.RECEIVED;
        await m.save();
      }

      await emitMessageStatus(room_id, messages);
    } catch (error) {
      throw error;
    }
  }

  public async getAllEncryptedMessageWithDmtp(address: string) {
    try {
      const findRoom = await Room.find({
        users: address,
        both_init: false,
        deleted_at: { $exists: false },
      });

      let decryptedMessages: any = [];
      if (findRoom) {
        await Promise.all(
          findRoom.map(async room => {
            const roomMessages = await this.messageService.decryptMessageOfRoom(
              room._id.toString(),
              address,
            );
            decryptedMessages.push({
              room_id: room._id.toString(),
              messages: roomMessages,
            });
          }),
        );
      }
      return decryptedMessages;
    } catch (error) {
      throw error;
    }
  }

  public async initBoth(room_id: string) {
    try {
      await Room.findOneAndUpdate(
        {
          _id: room_id,
          deleted_at: { $exists: false },
        },
        {
          both_init: true,
        },
      );
    } catch (error) {
      throw error;
    }
  }

  public async addNewNftContract(
    address: string,
    room_id: string,
    contractAddress: string,
    chain_id: string,
    is_already_check_token_owner: boolean = false,
  ) {
    try {
      if (
        !is_already_check_token_owner &&
        !(await Singleton.getStickerInstance().isTokenOwned(chain_id, contractAddress, address))
      ) {
        logger.error('room.service.ts:995:addNewNftContract Not owner of contract');
        return null;
      }
      const room = await Room.findOne({
        _id: room_id,
        deleted_at: { $exists: false },
        room_type: Constant.ROOM_TYPE.LIMITED,
      });
      if (room && room.admins?.includes(address) && room.nft_contracts) {
        const contractInfo = await Singleton.getStickerInstance().getNftContractInformation(
          chain_id,
          contractAddress,
        );
        let contractName = '';
        if (contractInfo.status) {
          contractName = contractInfo.data.name;
        }
        room.nft_contracts = [
          ...new Set([
            ...room.nft_contracts,
            { address: contractAddress, chain_id, contract_name: contractName },
          ]),
        ];
        await room.save();
      }
      return room;
    } catch (error: any) {
      logger.error(`room.service.ts:1011:addNewNftContract ${error.message}`);
      return null;
    }
  }

  public randomString() {
    return (Math.random() * Constant.RANDOM_COMPLEXITY).toString();
  }
}

export { RoomService };
