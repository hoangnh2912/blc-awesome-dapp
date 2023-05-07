import { Constant, logger, onError, onSuccess, OptionResponse } from '@constants';
import { Singleton } from '@providers';
import { IMarket } from '@schemas';
import { Controller, Get, Query, Route, Security, Tags } from 'tsoa';

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

  @Get('top-market')
  public async getTopSeller(): Promise<OptionResponse<IMarket[]>> {
    try {
      return onSuccess(await Singleton.getMarketInstance().getTopSeller());
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
  public async getMyMarket(
    @Query() address: string,
    @Query() page: number = 1,
    @Query() limit: number = 24,
  ): Promise<OptionResponse<IMarket[]>> {
    try {
      const { market, total } = await Singleton.getMarketInstance().getMyMarket(
        `${address.toLowerCase()}`,
        page,
        limit,
      );
      return onSuccess(market, total);
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('next-id')
  public async getNextId(): Promise<OptionResponse<number>> {
    try {
      const lastId = await Singleton.getMarketInstance().getNextId();
      return onSuccess(lastId);
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
    }
  }
}
