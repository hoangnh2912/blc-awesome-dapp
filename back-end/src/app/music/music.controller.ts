import { Constant, logger, onError, onSuccess, OptionResponse } from '@constants';
import { SignatureMiddleware } from '@middlewares';
import { Singleton } from '@providers';
import { IMarket } from '@schemas';
import {
  Body,
  Controller,
  Get,
  Middlewares,
  Post,
  Query,
  Request,
  Route,
  Security,
  Tags,
} from 'tsoa';

const { NETWORK_STATUS_CODE, NETWORK_STATUS_MESSAGE } = Constant;
@Tags('music')
@Route('music')
@Security('authorize')
@Middlewares([SignatureMiddleware])
export class MusicController extends Controller {
  @Get('list-song')
  public async getListSong(
    @Request() request: any,
    @Query() page: number = 1,
    @Query() limit: number = 24,
    @Query() search: string = '',
  ): Promise<OptionResponse<IMarket[]>> {
    try {
      const address = request.headers['address'];
      const { music, total } = await Singleton.getMusicInstance().getListSong(
        `${address}`,
        page,
        limit,
        search,
      );
      return onSuccess(music, total);
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('view-song')
  public async viewMusic(@Body() { id }: { id: string }): Promise<OptionResponse<boolean>> {
    try {
      const music = await Singleton.getMusicInstance().viewMusic(id);
      return onSuccess(music);
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('play-song')
  public async playMusic(@Body() { id }: { id: string }): Promise<OptionResponse<boolean>> {
    try {
      const music = await Singleton.getMusicInstance().playMusic(id);
      return onSuccess(music);
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
    }
  }
}
