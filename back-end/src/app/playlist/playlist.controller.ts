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
import { PlaylistInput } from './playlist';

const { NETWORK_STATUS_CODE, NETWORK_STATUS_MESSAGE } = Constant;
@Tags('playlist')
@Route('playlist')
@Security('authorize')
@Middlewares([SignatureMiddleware])
export class PlaylistController extends Controller {
  @Get('list-playlist')
  public async getListPlaylist(@Request() request: any): Promise<OptionResponse<IMarket[]>> {
    try {
      const address = request.headers['address'];
      return onSuccess(await Singleton.getPlaylistInstance().getListPlaylist(address));
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('playlist')
  public async getPlaylistDetail(@Query() id: string): Promise<OptionResponse<IMarket[]>> {
    try {
      return onSuccess(await Singleton.getPlaylistInstance().getPlaylistDetail(id));
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('playlist')
  public async updateOrCreatePlaylist(
    @Request() request: any,
    @Body() body: Pick<PlaylistInput, 'id' | 'name' | 'description' | 'audios' | 'image'>,
  ): Promise<OptionResponse<IMarket[]>> {
    try {
      const address = request.headers['address'];
      return onSuccess(
        await Singleton.getPlaylistInstance().updateOrCreatePlaylist({ ...body, owner: address }),
      );
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('delete-playlist')
  public async deletePlaylist(
    @Request() request: any,
    @Body()
    body: {
      id: string;
    },
  ): Promise<OptionResponse<IMarket[]>> {
    try {
      const address = request.headers['address'];
      return onSuccess(await Singleton.getPlaylistInstance().deletePlaylist(body?.id, address));
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
    }
  }
}
