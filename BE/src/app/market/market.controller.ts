import { Constant, logger, onError, onSuccess, OptionResponse } from '@constants';
import { Singleton } from '@providers';
import { IMarket } from '@schemas';
import { Controller, Get, Query, Request, Route, Security, Tags } from 'tsoa';

const { NETWORK_STATUS_CODE, NETWORK_STATUS_MESSAGE } = Constant;
@Tags('market')
@Route('market')
@Security('authorize')
export class MarketController extends Controller {
  @Get('list-market')
  public async getListMarket(
    @Query() search: string = '',
    @Query() page: number = 1,
    @Query() limit: number = 24,
    @Query() genre: string = '',
  ): Promise<OptionResponse<IMarket[]>> {
    try {
      return onSuccess(
        await Singleton.getMarketInstance().getListMarket(search, page, limit, genre),
      );
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('home-market')
  public async getHomeMarket(): Promise<OptionResponse<IMarket[]>> {
    try {
      return onSuccess(await Singleton.getMarketInstance().getHomeMarket());
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('music')
  public async getMusic(@Query() id: string): Promise<OptionResponse<IMarket>> {
    try {
      return onSuccess(await Singleton.getMarketInstance().getMusic(id));
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
    }
  }
  @Get('list-my-market')
  public async getMyMarket(@Request() request: any): Promise<OptionResponse<IMarket[]>> {
    try {
      const address = request.headers['address'];
      return onSuccess(await Singleton.getMarketInstance().getMyMarket(`${address}`));
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
    }
  }
}
