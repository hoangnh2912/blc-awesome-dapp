import { Constant, logger, onError, onSuccess, OptionResponse } from '@constants';
import { SignatureMiddleware } from '@middlewares';
import { Singleton } from '@providers';
import { Body, Controller, Middlewares, Post, Route, Security, Tags } from 'tsoa';
import { ERC20Input } from './token-creator';

const { NETWORK_STATUS_CODE, NETWORK_STATUS_MESSAGE } = Constant;
@Tags('token-creator')
@Route('token-creator')
@Security('authorize')
@Middlewares([SignatureMiddleware])
export class TokenCreatorController extends Controller {
  @Post('erc20')
  public async erc20(
    @Body()
    payload: ERC20Input,
  ): Promise<OptionResponse<boolean>> {
    try {
      return onSuccess(await Singleton.getTokenCreatorInstance().erc20(payload));
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
    }
  }
}
