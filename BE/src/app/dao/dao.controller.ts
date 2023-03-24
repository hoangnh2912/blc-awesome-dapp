import { Constant, logger, onError, onSuccess, OptionResponse } from '@constants';
// import { SignatureMiddleware } from '@middlewares';
import { Singleton } from '@providers';
import { Body, Controller, Post, Route, Security, Tags } from 'tsoa';
// import {
//   GetAbiOutput,
//   ERC1155Input,
//   ERC20Input,
//   ERC721Input,
//   TokenCreatorOutput,
//   VerifyInput,
// } from './token-creator';
import { TokenCreatorOutput } from '@app/token-creator/token-creator';
import { TimelockControllerInput } from './dao';

const { NETWORK_STATUS_CODE, NETWORK_STATUS_MESSAGE } = Constant;

@Tags('dao')
@Route('dao')
@Security('authorize')
// @Middlewares([SignatureMiddleware])
export class DaoController extends Controller {
  @Post('createTimelock')
  public async createTimelock(
    @Body()
    payload: TimelockControllerInput,
  ): Promise<OptionResponse<TokenCreatorOutput>> {
    try {
      return onSuccess(await Singleton.getDaoInstance().createTimelock(payload));
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
    }
  }
}
