import { Request as exRequest } from 'express';
import { IChatMarket } from '@schemas';
import { Controller, Get, Middlewares, Request, Route, Security, Tags } from 'tsoa';
import { Constant, logger, onError, onSuccess, OptionResponse } from '@constants';
import { SignatureMiddleware } from '@middlewares';
import { MarketService } from './market.service';

const { NETWORK_STATUS_CODE, NETWORK_STATUS_MESSAGE } = Constant;

@Tags('Market')
@Middlewares([SignatureMiddleware])
@Route('market')
@Security({
  authorize: [],
  address: [],
})
export class ChatMarketController extends Controller {
  private marketService = new MarketService();

  @Get('get-sticker-market')
  public async getSticker(@Request() req: exRequest): Promise<OptionResponse<IChatMarket[]>> {
    try {
      const address = req.headers.address as string;
      const marketList = await this.marketService.getMarkets(address);
      return onSuccess(marketList);
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
    }
  }
}
