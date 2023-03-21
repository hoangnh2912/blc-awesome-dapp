import { Request as exRequest } from 'express';
import { SignatureMiddleware } from '@middlewares';
import {
  Body,
  Controller,
  Get,
  Middlewares,
  Post,
  Query,
  Request,
  Route,
  Security,
  Tags,
} from 'tsoa';
import { Constant, logger, onError, onSuccess, OptionResponse } from '@constants';
import { Singleton } from '@providers';
import { INotification } from '@chat-schemas';

const { NETWORK_STATUS_CODE, NETWORK_STATUS_MESSAGE } = Constant;
@Tags('Notification')
@Route('notification')
@Security({
  authorize: [],
  address: [],
})
@Middlewares([SignatureMiddleware])
export class NotificationController extends Controller {
  private notificationService = Singleton.getNotificationInstance();

  @Get('get-list')
  public async getListNotification(
    @Request() req: exRequest,
    @Query() page: number = 0,
    @Query() numberPerPage: number = 30,
    @Query() type?: string,
  ): Promise<OptionResponse<INotification[]>> {
    try {
      const address = req.headers.address as string;

      const notifications = await this.notificationService.getList(
        address,
        page,
        numberPerPage,
        type,
      );

      return onSuccess(notifications);
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('read-notification')
  public async readNotification(
    @Request() req: exRequest,
    @Body() { notification_id }: { notification_id: string },
  ): Promise<OptionResponse<any>> {
    try {
      const address = req.headers.address as string;

      const notification = await this.notificationService.readNotification(
        address,
        notification_id,
      );
      return onSuccess(notification);
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('read-all-notification')
  public async readAllNotification(@Request() req: exRequest): Promise<OptionResponse<any>> {
    try {
      const address = req.headers.address as string;
      const notification = await this.notificationService.readAllNotification(address);
      return onSuccess(notification);
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('get-notification-count')
  public async getNotificationCount(@Request() req: exRequest, @Query() type?: string) {
    try {
      const address = req.headers.address as string;
      const notifcationCount = await this.notificationService.getTotalNotificationCount(
        address,
        type,
      );

      return onSuccess(notifcationCount);
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
    }
  }
}
