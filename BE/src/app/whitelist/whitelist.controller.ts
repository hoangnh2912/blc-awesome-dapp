import { Constant, logger, onError, onSuccess, OptionResponse } from '@constants';
import { SignatureMiddleware } from '@middlewares';
import { Controller, Get, Middlewares, Query, Route, Security, Tags } from 'tsoa';

const { NETWORK_STATUS_CODE, NETWORK_STATUS_MESSAGE } = Constant;
@Tags('Whitelist')
@Route('whitelist')
@Security('jwt')
@Middlewares([SignatureMiddleware])
export class WhitelistController extends Controller {
  @Get('check-whitelist')
  public async checkWhiteList(@Query() address: string): Promise<OptionResponse<boolean>> {
    try {
      return onSuccess(address);
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
    }
  }
}
