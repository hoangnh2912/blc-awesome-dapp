import { Request as exRequest } from 'express';
import { IRoom } from '@schemas';
import {
  Body,
  Controller,
  Get,
  Middlewares,
  Patch,
  Post,
  Query,
  // Query,
  Request,
  Route,
  Security,
  Tags,
} from 'tsoa';
import { Constant, logger, onError, onSuccess, OptionResponse } from '@constants';
import {
  AdminRoleMiddleware,
  SignatureMiddleware,
  CheckRolePowerMiddleware,
  CreatorRoleMiddleware,
} from '@middlewares';
import { Singleton } from '@providers';
import { Types } from 'mongoose';

const { NETWORK_STATUS_CODE, NETWORK_STATUS_MESSAGE } = Constant;

@Tags('Room')
@Middlewares([SignatureMiddleware])
@Route('room')
@Security({
  authorize: [],
  address: [],
})
export class RoomController extends Controller {
  private roomService = Singleton.getRoomInstance();

  @Get('get-room-list')
  public async getRoomListV2(
    @Request() req: exRequest,
    @Query() page?: number,
    @Query() limit?: number,
  ): Promise<OptionResponse<IRoom[]>> {
    try {
      const address = req.headers.address as string;
      // const address = "0x3408d73f50977cec63e32bc64f7d8705add19638"
      const roomList = await this.roomService.getRoomOfUserV2(address, page, limit);
      return onSuccess(roomList);
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('get-room-info')
  public async getRoomInfo(@Request() req: exRequest, @Query() room_id: string) {
    try {
      const address = req.headers.address as string;
      const roomInfo = await this.roomService.getRoomInfo(room_id, address);

      if (!roomInfo.status) {
        this.setStatus(NETWORK_STATUS_CODE.BAD_REQUEST);
        return onError(roomInfo.message);
      }
      return onSuccess(roomInfo);
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('get-opposite-user')
  public async getOppositeUser(
    @Request() req: exRequest,
    @Query() room_id: string,
  ): Promise<OptionResponse<string>> {
    try {
      const address = req.headers.address as string;
      const pubKey = await this.roomService.getOppositeUser(address, room_id);
      return onSuccess(pubKey);
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('get-public-room-list')
  public async getPublicRoomList(
    @Query() page?: number,
    @Query() limit?: number,
    @Query() filter?: string,
  ): Promise<OptionResponse<IRoom[]>> {
    try {
      const roomList = await this.roomService.getPublicRoom(page, limit, filter);
      return onSuccess(roomList);
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('create-room')
  public async createRoom(
    @Request() req: exRequest,
    @Body()
    inputParam: {
      name: string;
      avatar: string;
      users: string[];
      room_type: string;
      description?: string;
      only_view?: boolean;
      nft_contract?: {
        contractAddress: string;
        chain_id: string;
      };
    },
  ): Promise<OptionResponse<IRoom & { _id: Types.ObjectId }>> {
    try {
      const address = req.headers.address as string;

      const { name, users, room_type, description, avatar, only_view } = inputParam;
      const newRoom = await this.roomService.createRoom(
        users,
        address,
        name,
        room_type,
        avatar,
        description,
        only_view,
        // nft_contract,
      );
      if (!newRoom.status) {
        this.setStatus(NETWORK_STATUS_CODE.BAD_REQUEST);
        return onError(newRoom.message);
      }

      // if (message_data) {

      //   if (room_type == Constant.ROOM_TYPE.PRIVATE)
      //     await this.messageService.sendMessageV2(address, newRoom._id.toString(), message_data);
      //   else if (room_type == Constant.ROOM_TYPE.UNLIMITED)
      //     await Singleton.getPublicUnlimitedRoomInstance().sendMessage(
      //       address,
      //       newRoom._id.toString(),
      //       message_data,
      //     );
      // }
      return onSuccess(newRoom);
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('add-user-of-room')
  public async addUserOfRoom(
    @Body() inputParam: { roomId: string; address: string },
  ): Promise<OptionResponse<IRoom[]>> {
    try {
      const updatedRoom = await this.roomService.addUserOfRoom(
        inputParam.roomId,
        inputParam.address,
      );
      if (!updatedRoom.status) {
        this.setStatus(NETWORK_STATUS_CODE.BAD_REQUEST);
        return onError(updatedRoom.message);
      }
      return onSuccess(updatedRoom.data);
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('hidden-room')
  public async hiddenRoom(
    @Request() req: exRequest,
    @Body() inputParam: { roomId: string },
  ): Promise<OptionResponse<IRoom[]>> {
    try {
      const address = req.headers.address as string;

      const updatedRoom = await this.roomService.hiddenRoom(inputParam.roomId, address);
      if (!updatedRoom.status) {
        this.setStatus(NETWORK_STATUS_CODE.BAD_REQUEST);
        return onError(updatedRoom.message);
      }
      return onSuccess(updatedRoom.data);
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('join-public-room')
  public async joinPublicRoom(
    @Request() req: exRequest,
    @Body() inputParam: { roomId: string },
  ): Promise<OptionResponse<IRoom[]>> {
    try {
      const address = req.headers.address as string;

      const updatedRoom = await this.roomService.joinPublicRoom(inputParam.roomId, address);
      if (updatedRoom) {
        await this.roomService.updateLastMessageTimeOfRoom(inputParam.roomId);
      }
      // if (updatedRoom && updatedRoom.data?.room_type == Constant.ROOM_TYPE.LIMITED) {
      //   await Singleton.getPublicLimitedRoomInstance().sendMessage(
      //     address,
      //     inputParam.roomId,
      //     '!',
      //     '!',
      //     false,
      //     undefined,
      //     true,
      //     true,
      //   );
      // } else if (updatedRoom.data?.room_type == Constant.ROOM_TYPE.UNLIMITED) {
      //   await Singleton.getPublicUnlimitedRoomInstance().sendMessage(
      //     address,
      //     inputParam.roomId,
      //     '',
      //     false,
      //     undefined,
      //     true,
      //   );
      // }

      if (!updatedRoom.status) {
        this.setStatus(NETWORK_STATUS_CODE.BAD_REQUEST);
        return onError(updatedRoom.message);
      }
      return onSuccess(updatedRoom.data);
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
    }
  }

  @Middlewares([CheckRolePowerMiddleware])
  @Post('remove-user-of-room')
  public async removeUserOfRoom(
    @Request() req: exRequest,
    @Body() inputParam: { room_id: string; address: string },
  ): Promise<OptionResponse<IRoom[]>> {
    try {
      const address = req.headers.address as string;
      const updatedRoom = await this.roomService.removeUserOfRoom(
        address.toLowerCase(),
        inputParam.room_id,
        inputParam.address.toLowerCase(),
      );
      if (!updatedRoom.status) {
        this.setStatus(NETWORK_STATUS_CODE.BAD_REQUEST);
        return onError(updatedRoom.message);
      }
      return onSuccess(updatedRoom.data);
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
    }
  }

  @Middlewares([AdminRoleMiddleware])
  @Post('set-role-of-room')
  public async setRoleOfRoom(
    @Request() req: exRequest,
    @Body() inputParam: { roomId: string; address: string; role: string },
  ): Promise<OptionResponse<IRoom[]>> {
    try {
      const address = req.headers.address as string;

      const updatedRoomSome = await this.roomService.setRoleOfRoom(
        inputParam.roomId,
        inputParam.address,
        inputParam.role,
        address,
      );

      if (!updatedRoomSome.status) {
        this.setStatus(NETWORK_STATUS_CODE.BAD_REQUEST);
        return onError(updatedRoomSome.message);
      }
      return onSuccess(updatedRoomSome.data);
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
    }
  }

  @Middlewares([CreatorRoleMiddleware])
  @Post('remove-room')
  public async removeRoom(
    @Body() inputParam: { roomId: string },
  ): Promise<OptionResponse<IRoom[]>> {
    try {
      const removedRoom = await this.roomService.removeRoom(inputParam.roomId);
      return onSuccess(removedRoom);
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
    }
  }

  @Middlewares([AdminRoleMiddleware])
  @Patch('update-room')
  public async updateRoom(
    @Body()
    inputParam: {
      roomId: string;
      name: string;
      avatar: string;
      description: string;
      only_view?: boolean;
    },
  ): Promise<OptionResponse<IRoom[]>> {
    try {
      const updatedRoom = await this.roomService.updateRoom(
        inputParam.roomId,
        inputParam.name,
        inputParam.avatar,
        inputParam.description,
        inputParam.only_view,
      );
      return onSuccess(updatedRoom);
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('read-message')
  public async readMessage(
    // @Body() inputParam: { room_id: string },
    @Body() inputParam: { room_id: string; message_id?: string },
    @Request() req: exRequest,
  ): Promise<OptionResponse<IRoom>> {
    try {
      const address = req.headers.address as string;

      const updatedRoom = await this.roomService.readMessage(
        inputParam.room_id,
        // inputParam.message_id,
        address,
      );
      if (!updatedRoom.status) {
        this.setStatus(NETWORK_STATUS_CODE.BAD_REQUEST);
        return onError(NETWORK_STATUS_MESSAGE.BAD_REQUEST);
      }
      return onSuccess(updatedRoom.data);
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('get-all-encrypted-message-with-dmtp')
  public async getAllEncryptedMessageWithDmtp(@Request() req: exRequest) {
    try {
      const address = req.headers.address as string;
      const listRoom = await this.roomService.getAllEncryptedMessageWithDmtp(address);
      return onSuccess(listRoom);
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
    }
  }

  // @Post('add-new-nft-contract')
  // public async addNewNftContract(
  //   // @Body() inputParam: { room_id: string },
  //   @Body()
  //   inputParam: {
  //     room_id: string;
  //     contractAddress: string;
  //     chain_id: string;
  //   },
  //   @Request() req: exRequest,
  // ): Promise<OptionResponse<IRoom>> {
  //   try {
  //     const address = req.headers.address as string;
  //     const { room_id, contractAddress, chain_id } = inputParam;

  //     const updatedRoom = await this.roomService.addNewNftContract(
  //       address,
  //       room_id,
  //       contractAddress.toLowerCase(),
  //       chain_id,
  //     );
  //     if (!updatedRoom) {
  //       this.setStatus(NETWORK_STATUS_CODE.BAD_REQUEST);
  //       return onError(NETWORK_STATUS_MESSAGE.BAD_REQUEST);
  //     }
  //     return onSuccess(updatedRoom);
  //   } catch (error) {
  //     logger.error(error);
  //     this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
  //     return onError(NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
  //   }
  // }

  @Post('set-notification-room')
  public async setNotificationRoom(
    @Body() inputParam: { room_id: string },
    @Request() req: exRequest,
  ): Promise<OptionResponse<IRoom>> {
    try {
      const address = req.headers.address as string;
      const { room_id } = inputParam;

      const updatedRoom = await this.roomService.setNotificationRoom(room_id, address);
      if (!updatedRoom) {
        this.setStatus(NETWORK_STATUS_CODE.BAD_REQUEST);
        return onError(NETWORK_STATUS_MESSAGE.BAD_REQUEST);
      }
      return onSuccess(updatedRoom);
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
    }
  }
}
