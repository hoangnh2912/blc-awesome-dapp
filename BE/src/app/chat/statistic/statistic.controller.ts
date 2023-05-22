import { IChatMarket } from '@schemas';
import { Controller, Get, Middlewares, Route, Security, Tags } from 'tsoa';
import { Constant, logger, onError, onSuccess, OptionResponse } from '@constants';
import { SignatureMiddleware } from '@middlewares';
import { StatisticService } from './statistic.service';

const { NETWORK_STATUS_CODE, NETWORK_STATUS_MESSAGE } = Constant;

@Tags('Market')
@Middlewares([SignatureMiddleware])
@Route('market')
@Security({
  authorize: [],
  address: [],
})
export class ChatMarketController extends Controller {
  private statisticService = new StatisticService();

  @Get('get-sticker-market')
  public async getSticker(): Promise<OptionResponse<IChatMarket[]>> {
    try {
      const marketList = await this.statisticService.getStatistic();
      return onSuccess(marketList);
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
    }
  }
}
