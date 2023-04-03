import { IMessage } from '@schemas';
// import { IMessage } from '../../../schemas/chat/index';

import { Request as exRequest } from 'express';
import {
  Body,
  Controller,
  Get,
  Middlewares,
  Post,
  Query,
  Route,
  Security,
  Tags,
  Request,
} from 'tsoa';
import { Constant, logger, onError, onSuccess, onSuccessArray, OptionResponse } from '@constants';
import { SignatureMiddleware } from '@middlewares';
import { Singleton } from '@providers';

const { NETWORK_STATUS_CODE, NETWORK_STATUS_MESSAGE } = Constant;

@Tags('Message')
@Middlewares([SignatureMiddleware])
@Route('message')
@Security({
  authorize: [],
  address: [],
})
export class MessageController extends Controller {
  private messageService = Singleton.getMessageInstance();

  @Get('get-message-in-room')
  public async getMessage(
    @Request() req: exRequest,
    @Query() room_id: string,
    @Query() page: number,
    @Query() limit: number = Constant.LIMIT_MESSAGE,
    @Query() isDescending: boolean = true,
    @Query() is_promotion?: boolean,
  ): Promise<
    OptionResponse<{
      messages: IMessage[];
      is_friend: boolean;
    }>
  > {
    try {
      const address = req.headers.address as string;

      const messages: any = await this.messageService.getMessageOfRoom(
        address,
        room_id,
        page,
        limit,
        isDescending,
        is_promotion,
      );
      return onSuccessArray(messages);
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('update-message')
  public async updateMessage(
    @Request() req: exRequest,
    @Body()
    data: {
      message_id: string;
      message_data: string;
    },
  ): Promise<OptionResponse<IMessage>> {
    try {
      const address = req.headers.address as string;
      const { message_data, message_id } = data;
      const messages = await this.messageService.updateMessageV2(message_id, address, message_data);
      return onSuccess(messages);
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('react-message')
  public async reactMessage(
    @Request() req: exRequest,
    @Body() inputParam: { message_id: string; emoji: string },
  ): Promise<OptionResponse<IMessage>> {
    try {
      const { message_id, emoji } = inputParam;
      const address = req.headers.address as string;
      const reactMessage = await this.messageService.reactMessage(message_id, address, emoji);
      if (!reactMessage.status) {
        this.setStatus(NETWORK_STATUS_CODE.BAD_REQUEST);
        return onError(reactMessage.message);
      }
      return onSuccess(reactMessage.data);
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('remove-reaction')
  public async removeReact(
    @Request() req: exRequest,
    @Body()
    inputParam: {
      message_id: string;
      emoji: string;
    },
  ) {
    try {
      const { message_id, emoji } = inputParam;
      const address = req.headers.address as string;
      const updatedMessage = await this.messageService.removeReaction(message_id, address, emoji);
      if (!updatedMessage.status) {
        this.setStatus(NETWORK_STATUS_CODE.BAD_REQUEST);
        return onError(NETWORK_STATUS_MESSAGE.BAD_REQUEST);
      }
      return onSuccess(updatedMessage.data);
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('delete-message')
  public async deleteMessage(
    @Request() req: exRequest,
    @Body()
    data: {
      message_id: string;
    },
  ): Promise<OptionResponse<IMessage>> {
    try {
      const address = req.headers.address as string;
      const { message_id } = data;
      const messages = await this.messageService.deleteMessage(message_id, address);
      return onSuccess(messages);
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('send-message')
  public async sendMessage(
    @Request() req: exRequest,
    @Body()
    inputParam: {
      message_data: string;
      room_id: string;
      is_forwarded?: boolean;
      message_id_reply?: string;
      is_promotion?: boolean;
      is_notification?: boolean;
    },
  ) {
    try {
      const address = req.headers.address as string;
      const {
        message_data,
        room_id,
        is_forwarded,
        message_id_reply,
        is_promotion,
        is_notification,
      } = inputParam;
      const updatedMessage = await this.messageService.sendMessage(
        address,
        room_id,
        message_data,
        is_forwarded,
        message_id_reply,
        is_promotion,
        is_notification,
      );
      return onSuccess(updatedMessage);
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('renew-message')
  public async renewMessage(
    @Request() req: exRequest,
    @Body()
    rooms: {
      room_id: string;
      messages: { message_id: string; message_data: string }[];
    }[],
  ) {
    try {
      const address = req.headers.address as string;
      const updatedMessage = await this.messageService.renewMessage(address, rooms);
      return onSuccess(updatedMessage);
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
    }
  }
}
