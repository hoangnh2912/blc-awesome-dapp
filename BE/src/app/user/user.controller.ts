import { Constant, logger, onError, onSuccess, OptionResponse } from '@constants';
import { SignatureMiddleware } from '@middlewares';
import { Singleton } from '@providers';
import { IUser } from '@schemas';
import { Body, Controller, Middlewares, Post, Route, Security, Tags } from 'tsoa';
import { CreateUserInput } from './user';

const { NETWORK_STATUS_CODE, NETWORK_STATUS_MESSAGE } = Constant;
@Tags('user')
@Route('user')
@Security('authorize')
@Middlewares([SignatureMiddleware])
export class UserController extends Controller {
  @Post('create-user')
  public async createUser(@Body() payload: CreateUserInput): Promise<OptionResponse<IUser>> {
    try {
      return onSuccess(await Singleton.getUserInstance().createUser(payload));
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
    }
  }
}
