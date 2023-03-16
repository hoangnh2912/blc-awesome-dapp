import { Constant, logger, onError, onSuccess, OptionResponse } from '@constants';
import { SignatureMiddleware } from '@middlewares';
import { IMarket } from '@schemas';
import { Controller, Get, Middlewares, Route, Security, Tags } from 'tsoa';

const { NETWORK_STATUS_CODE, NETWORK_STATUS_MESSAGE } = Constant;
@Tags('music')
@Route('music')
@Security('authorize')
@Middlewares([SignatureMiddleware])
export class MusicController extends Controller {
  @Get('list-song')
  public async getListSong(): Promise<OptionResponse<IMarket[]>> {
    try {
      return onSuccess();
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
    }
  }
}
