import { Constant, logger, onError, onSuccess, OptionResponse } from '@constants';
import { SignatureMiddleware } from '@middlewares';
import { Singleton } from '@providers';
import { IMarket } from '@schemas';
import { Controller, Get, Middlewares, Request, Route, Security, Tags } from 'tsoa';

const { NETWORK_STATUS_CODE, NETWORK_STATUS_MESSAGE } = Constant;
@Tags('music')
@Route('music')
@Security('authorize')
@Middlewares([SignatureMiddleware])
export class MusicController extends Controller {
  @Get('list-song')
  public async getListSong(@Request() request: any): Promise<OptionResponse<IMarket[]>> {
    try {
      const address = request.headers['address'];
      return onSuccess(await Singleton.getMusicInstance().getListSong(`${address}`));
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
    }
  }
}
