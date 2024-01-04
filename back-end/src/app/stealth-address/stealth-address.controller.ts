import { Constant, logger, onError, onSuccess, OptionResponse } from '@constants';
import { Singleton } from '@providers';
import { Body, Controller, Get, Post, Query, Route, Security, Tags } from 'tsoa';
import {
  GetPrivateKeyOutput,
  SubmitPrivateKeyInput,
  SubmitPrivateKeyOutput,
} from './stealth-address';

const { NETWORK_STATUS_CODE, NETWORK_STATUS_MESSAGE } = Constant;
@Tags('stealth-address')
@Route('stealth-address')
@Security('authorize')
export class StealthAddressController extends Controller {
  @Post('submit-private-key')
  public async submitPrivateKey(
    @Body()
    payload: SubmitPrivateKeyInput,
  ): Promise<OptionResponse<SubmitPrivateKeyOutput>> {
    try {
      return onSuccess(
        await Singleton.getStealthAddressInstance().submitPrivateKey(
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

  @Post('submit-stealth-address')
  public async submitStealthAddress(
    @Body()
    payload: {
      wallet_address: string;
      address: string;
      from: string;
    },
  ): Promise<OptionResponse<SubmitPrivateKeyOutput>> {
    try {
      return onSuccess(
        await Singleton.getStealthAddressInstance().submitStealthAddress(
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
        await Singleton.getStealthAddressInstance().getPrivateKey(address.toLowerCase()),
      );
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('get-list-stealth-address')
  public async getListStealthAddress(
    @Query()
    address: string,
  ): Promise<OptionResponse<GetPrivateKeyOutput>> {
    try {
      return onSuccess(
        await Singleton.getStealthAddressInstance().getListStealthAddress(address.toLowerCase()),
      );
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
    }
  }
}
