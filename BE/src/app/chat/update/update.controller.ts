import { Constant, logger, onError, onSuccess } from '@constants';
import { Body, Controller, Get, Post, Route, Tags } from 'tsoa';
import { UpdateService } from './update.service';

const { NETWORK_STATUS_CODE, NETWORK_STATUS_MESSAGE } = Constant;

@Tags('Update')
@Route('update')
export class UpdateController extends Controller {
  private updateService = new UpdateService();
  @Post('update-flag')
  public async updateFlag(@Body() inputParam: { is_start_update: boolean; p: string }) {
    try {
      if (inputParam.p == `${process.env.PASSWORD}`) {
        await this.updateService.updateFlag(inputParam.is_start_update);
      } else {
        this.setStatus(NETWORK_STATUS_CODE.UNAUTHORIZED);
        return onError(NETWORK_STATUS_MESSAGE.UNAUTHORIZED);
      }
      return onSuccess(inputParam.is_start_update);
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('get-flag')
  public async getFlag() {
    try {
      const flag = await this.updateService.getFlag();
      return onSuccess(!!flag);
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
    }
  }
}
