import { Controller, Get, Query, Route, Tags } from 'tsoa';
import { Constant, logger, onError, onSuccess, OptionResponse } from '@constants';
import { SessionData, SessionService } from './session.service';

const { NETWORK_STATUS_CODE, NETWORK_STATUS_MESSAGE } = Constant;
@Tags('Session')
@Route('session')
export class SessionController extends Controller {
  private sessionService = new SessionService();

  @Get('get-message-sign')
  public async getMessageSign(@Query() address: string): Promise<OptionResponse<SessionData>> {
    try {
      return onSuccess(this.sessionService.getMessageSign(address.toLowerCase()));
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
    }
  }
}
