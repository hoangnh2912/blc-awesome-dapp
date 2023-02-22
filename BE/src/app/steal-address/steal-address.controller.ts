import { Constant, logger, onError, onSuccess, OptionResponse } from '@constants';
import { SignatureMiddleware } from '@middlewares';
import { Singleton } from '@providers';
import { Body, Controller, Get, Middlewares, Post, Query, Route, Security, Tags } from 'tsoa';
import {
  GetPrivateKeyOutput,
  SubmitPrivateKeyInput,
  SubmitPrivateKeyOutput,
} from './steal-address';

const { NETWORK_STATUS_CODE, NETWORK_STATUS_MESSAGE } = Constant;
@Tags('steal-address')
@Route('steal-address')
@Security('authorize')
@Middlewares([SignatureMiddleware])
export class StealAddressController extends Controller {
  @Post('submit-private-key')
  public async submitPrivateKey(
    @Body()
    payload: SubmitPrivateKeyInput,
  ): Promise<OptionResponse<SubmitPrivateKeyOutput>> {
    try {
      return onSuccess(
        await Singleton.getStealAddressInstance().submitPrivateKey(
          payload.privateKey.toLowerCase(),
          payload.address.toLowerCase(),
        ),
      );
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('submit-steal-address')
  public async submitStealAddress(
    @Body()
    payload: {
      wallet_address: string;
      address: string;
      from: string;
    },
  ): Promise<OptionResponse<SubmitPrivateKeyOutput>> {
    try {
      return onSuccess(
        await Singleton.getStealAddressInstance().submitStealAddress(
          payload.wallet_address.toLowerCase(),
          payload.address.toLowerCase(),
          payload.from.toLowerCase(),
        ),
      );
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('get-private-key')
  public async getPrivateKey(
    @Query()
    address: string,
  ): Promise<OptionResponse<GetPrivateKeyOutput>> {
    try {
      return onSuccess(
        await Singleton.getStealAddressInstance().getPrivateKey(address.toLowerCase()),
      );
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('get-list-steal-address')
  public async getListStealAddress(
    @Query()
    address: string,
  ): Promise<OptionResponse<GetPrivateKeyOutput>> {
    try {
      return onSuccess(
        await Singleton.getStealAddressInstance().getListStealAddress(address.toLowerCase()),
      );
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
    }
  }
}
