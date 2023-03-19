import { Request as exRequest } from 'express';
import {
  Controller,
  Get,
  Middlewares,
  Query,
  Request,
  Route,
  Security,
  Tags,
  // Body,
  // Post,
} from 'tsoa';
import { Constant, logger, onError, onSuccess } from '@constants';
import { AuthMiddleware } from '@middlewares';
import { Singleton } from '@providers';

const { NETWORK_STATUS_CODE, NETWORK_STATUS_MESSAGE } = Constant;

@Tags('Shared-Key')
@Middlewares(AuthMiddleware)
@Route('shared-key')
@Security({
  authorize: [],
  address: [],
})
export class SharedKeyController extends Controller {
  private sharedKeyService = Singleton.getSharedKeyInstance();
  // @Post('create-shared-key')
  // public async createShareKey(@Body() inputParam: { address: string; room_id: string }) {
  //   try {
  //     const createdSharedKey = await this.sharedKeyService.createSharedKey(inputParam.room_id);
  //     return onSuccess(createdSharedKey);
  //   } catch (error) {
  //     logger.error(error);
  //     this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
  //     return onError(NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
  //   }
  // }

  @Get('get-shared-keys')
  public async getSharedKeys(
    @Request() req: exRequest,
    @Query() room_id: string,
    @Query() key_ids: string[],
  ) {
    try {
      const address = req.headers.address as string;
      const sharedKeys = await this.sharedKeyService.getSharedKeys(address, room_id, key_ids);
      return onSuccess(sharedKeys);
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('get-latest-shared-keys')
  public async getLatestSharedKeys(@Request() req: exRequest, @Query() room_id: string) {
    try {
      const address = req.headers.address as string;
      const sharedKeys = await this.sharedKeyService.getLatestSharedKey(room_id, address);
      return onSuccess(sharedKeys);
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('get-dmtp-pubkey')
  public async getDmtpPubkey() {
    try {
      const dmtpPubkey = this.sharedKeyService.getDmtpPubkey();
      return onSuccess(dmtpPubkey);
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
    }
  }
}
