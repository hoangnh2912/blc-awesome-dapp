import { Constant, logger, onError, onSuccess, Option } from '@constants';
import { AuthMiddleware } from '@middlewares';
import { discordManager, emitSNS, Singleton, web3 } from '@providers';
import { IUser, UserBalance } from '@schemas';
import { Request as exRequest } from 'express';
import { parse } from 'json2csv';
import stream from 'stream';
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

@Tags('User')
@Route('users')
@Security({
  authorize: [],
  address: [],
})
export class UsersController extends Controller {
  private userService = Singleton.getUserInstance();

  @Get('user-info')
  @Middlewares([AuthMiddleware])
  public async getUser(@Request() req: exRequest): Promise<Option<IUser & UserBalance>> {
    try {
      const address = req.headers.address as string;
      const user = await this.userService.get(address);
      if (!user) {
        this.setStatus(NETWORK_STATUS_CODE.NOT_FOUND);
        return onError(NETWORK_STATUS_MESSAGE.NOT_FOUND);
      }
      // const balance = await DMTPContract.methods.balanceOf(address.toLowerCase()).call();
      // const stBalance = await stDMTPContract.methods.balanceOf(address.toLowerCase()).call();
      // const maticBalance = await web3.eth.getBalance(address.toLowerCase());
      // const MINTER_ROLE = await DMTPMarketContract.methods.MINTER_ROLE().call();
      // const isHaveMintRole = await DMTPMarketContract.methods
      //   .hasRole(MINTER_ROLE, address.toLowerCase())
      //   .call();
      const balance = '0';
      const stBalance = '0';
      const maticBalance = '0';
      const isHaveMintRole = false;
      return onSuccess({
        ...user,
        dmtp: web3.utils.fromWei(balance, 'ether'),
        stdmtp: web3.utils.fromWei(stBalance, 'ether'),
        matic: web3.utils.fromWei(maticBalance, 'ether'),
        is_minter: isHaveMintRole,
      });
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(error);
    }
  }

  @Get('get-user-by-address')
  @Middlewares([AuthMiddleware])
  public async getUserByAddress(@Request() req: exRequest, @Query('address') addressCheck: string) {
    try {
      const address = req.headers.address as string;

      const user = await this.userService.getWithFriend(address, addressCheck);
      return onSuccess(user);
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(error);
    }
  }

  @Get('unstoppable-domain-to-address')
  @Middlewares([AuthMiddleware])
  public async unstoppableDomainToAddress(@Query() domain: string) {
    try {
      const address = await this.userService.unstoppableDomainToAddress(domain);
      return onSuccess(address);
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(error);
    }
  }

  @Get('get-users-by-name')
  public async getUsersByName(@Query() name: string) {
    try {
      const users = await this.userService.getUsersByName(name);
      return onSuccess(users);
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(error);
    }
  }

  /**
   * From discord code return or refresh token to retrieve user info in discord and update user info in database
   * @param code
   * @param refresh_token
   * @param is_dev - true: use dev FE app
   *               - false: use prod FE app
   *               - default: false
   */
  @Post('user-from-code-or-refresh-token-discord')
  @Middlewares([AuthMiddleware])
  public async userInfoFromDiscord(
    @Request() req: exRequest,
    @Query() redirect_uri: string,
    @Query() code?: string,
    @Query() refresh_token?: string,
  ): Promise<Option<IUser>> {
    try {
      if (!code && !refresh_token) {
        this.setStatus(NETWORK_STATUS_CODE.BAD_REQUEST);
        return onError(NETWORK_STATUS_MESSAGE.BAD_REQUEST);
      }
      const address = req.headers.address as string;
      let userInfo = {};
      if (code) {
        userInfo = await discordManager.codeToUserInfo(code, redirect_uri);
      } else if (refresh_token) {
        userInfo = await discordManager.refreshTokenToUserInfo(refresh_token, redirect_uri);
      }
      const isExist = await this.userService.checkExist(address);
      let user = null;
      const payload = {
        wallet_address: address,
        ...userInfo,
      };
      if (isExist) {
        user = await this.userService.update(payload);
      } else {
        user = await this.userService.create(payload);
      }
      await emitSNS(user.session, {
        discord: user.discord?.id,
        telegram: user.telegram,
      });
      return onSuccess(user);
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('create-or-update-user-info')
  @Middlewares([AuthMiddleware])
  public async createOrUpdateUserInfo(
    @Request() req: exRequest,
    @Body()
    inputUpdate: {
      name?: string;
      avatar?: string;
      description?: string;
    },
  ): Promise<Option<IUser>> {
    try {
      const address = req.headers.address as string;
      const isExist = await this.userService.checkExist(address);
      let user = null;
      const payload = {
        wallet_address: address,
        ...inputUpdate,
      };
      if (isExist) {
        user = await this.userService.update(payload);
      } else {
        user = await this.userService.create(payload);
      }
      return onSuccess(user);
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('create-user-address')
  @Middlewares([AuthMiddleware])
  public async createUserAddress(
    @Request() req: exRequest,
    @Body()
    input?: {
      campaign?: string;
      referrer?: string;
    },
  ): Promise<Option<IUser>> {
    try {
      const address = req.headers.address as string;
      let user = null;
      const payload = {
        wallet_address: address,
        campaign: (() => {
          if (input?.campaign) {
            return input.campaign;
          }
          return '';
        })(),
      };
      user = await this.userService.create(payload, input?.referrer);

      return onSuccess(user);
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('export-users')
  public async exportUser(@Request() req: exRequest, @Query() p: string): Promise<any> {
    try {
      if (p == `${process.env.PASSWORD}`) {
        const users = await this.userService.getAllUser();
        const csvContent = parse(
          users.map(user => ({
            name: user.name || 'N/A',
            address: user.wallet_address,
            avatar: user.avatar || 'N/A',
            discord: user.discord?.username
              ? `${user.discord?.username}#${user.discord?.discriminator}`
              : 'N/A',
            campaign: user.campaign || 'N/A',
            created_at: user.created_at || 'N/A',
          })),
        );
        const readStream = new stream.PassThrough();
        readStream.end(Buffer.from(csvContent.split(`"`).join('')));
        const response = req.res;
        if (response) {
          response.set(
            'Content-disposition',
            'attachment; filename=' + `${new Date().toISOString()}.csv`,
          );
          response.set('Content-Type', 'text/plain');
          readStream.pipe(response);
          return new Promise((resolve: any, reject: any) => {
            readStream.on('error', reject);
            readStream.on('end', resolve);
          });
        }
      }
      this.setStatus(NETWORK_STATUS_CODE.UNAUTHORIZED);
      return onError(NETWORK_STATUS_MESSAGE.UNAUTHORIZED);
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('send-friend-request')
  @Middlewares([AuthMiddleware])
  public async sendFriendRequest(
    @Request() req: exRequest,
    @Body() data: { object_address: string },
  ) {
    try {
      const address = req.headers.address as string;
      const updated = await this.userService.sendFriendRequest(
        address,
        data.object_address.toLowerCase(),
      );
      if (!updated.status) {
        return onError(updated.message);
      }
      return onSuccess(updated);
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('get-friend-requests')
  @Middlewares([AuthMiddleware])
  public async getFriendRequests(@Request() req: exRequest): Promise<Option<IUser>> {
    try {
      const address = req.headers.address as string;
      const friendRequests = await this.userService.getFriendRequests(address);
      return onSuccess(friendRequests);
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('accept-friend-request')
  @Middlewares([AuthMiddleware])
  public async acceptFriendRequest(
    @Request() req: exRequest,
    @Body() data: { sender_address: string },
  ): Promise<Option<IUser>> {
    try {
      const address = req.headers.address as string;
      const findRoom = await Singleton.getRoomInstance().findRoomWithListAddress([
        address,
        data.sender_address,
      ]);
      const updated = await this.userService.acceptFriendRequest(
        data.sender_address.toLowerCase(),
        address.toLowerCase(),
      );

      if (!findRoom && updated?._id) {
        // await Singleton.getMessageInstance().sendMessageV2(
        //   address,
        //   updated?._id.toString(),
        //   '!',
        //   false,
        //   undefined,
        //   false,
        //   true,
        // );
        await Singleton.getRoomInstance().updateLastMessageTimeOfRoom(updated._id.toString());
      }
      return onSuccess(updated);
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
    }
  }
  @Get('get-friend-list')
  @Middlewares([AuthMiddleware])
  public async getFriendList(
    @Request() req: exRequest,
    @Query() filter?: string,
  ): Promise<Option<IUser>> {
    try {
      const address = req.headers.address as string;
      const addressFromDomain = await this.userService.unstoppableDomainToAddress(address);
      const friendList = await this.userService.getFriendList(addressFromDomain, filter);
      return onSuccess(friendList);
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('delete-friend-request')
  @Middlewares([AuthMiddleware])
  public async deleteFriendRequest(
    @Request() req: exRequest,
    @Body() data: { sender_address: string },
  ): Promise<Option<IUser>> {
    try {
      const address = req.headers.address as string;

      const updatedUser = await this.userService.deleteFriendRequest(data.sender_address, address);
      return onSuccess(updatedUser);
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('cancel-friend-request')
  @Middlewares([AuthMiddleware])
  public async cancelFriendRequest(
    @Request() req: exRequest,
    @Body() data: { sender_address: string },
  ): Promise<Option<IUser>> {
    try {
      const address = req.headers.address as string;

      const updatedUser = await this.userService.cancelFriendRequest(address, data.sender_address);
      return onSuccess(updatedUser);
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('unfriend')
  @Middlewares([AuthMiddleware])
  public async unfriend(
    @Request() req: exRequest,
    @Body() data: { object_address: string },
  ): Promise<Option<IUser>> {
    try {
      const address = req.headers.address as string;
      const updatedUser = await this.userService.unfriend(address, data.object_address);

      return onSuccess(updatedUser);
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('get-total-unread')
  @Middlewares([AuthMiddleware])
  public async getTotalUnread(@Query() addressList: string[]) {
    try {
      // const address = req.headers.address as string;
      const totalUnread = await this.userService.getTotalUnreadOfListAddress(addressList);

      return onSuccess(totalUnread);
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('avatar')
  public async getAvatarOfWallet(@Request() req: exRequest, @Query() wallet_address: string) {
    try {
      const avatar = await this.userService.getAvatarOfWallet(wallet_address.toLowerCase());
      // const [avatarFromIPFS] = await getFile(avatar);
      // const readStream = new stream.PassThrough();
      // readStream.end(avatarFromIPFS);
      // const response = req.res;
      // if (response) {
      //   response.setHeader('Content-Type', 'image/jpg');
      //   response.setHeader('Access-Control-Allow-Origin', '*');
      //   readStream.pipe(response);
      //   return new Promise((resolve: any, reject: any) => {
      //     readStream.on('error', reject);
      //     readStream.on('end', resolve);
      //   });
      // }
      // this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      // return onError(NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
      const response = req.res;
      if (response) {
        return response.redirect(`https://ipfs.dmtp.tech/ipfs/${avatar}`);
        // response.set('Content-disposition', 'attachment; filename=' + `${Date.now()}.${extension}`);
        // response.set('Content-Type', 'text/plain');
        // readStream.pipe(response);
        // return new Promise((resolve: any, reject: any) => {
        //   readStream.on('error', reject);
        //   readStream.on('end', resolve);
        // });
      }
      return onSuccess();
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('submit-key-pair')
  @Middlewares([AuthMiddleware])
  public async submitKeyPair(
    @Request() req: exRequest,
    @Body()
    inputParam: {
      dmtp_pub_key: string;
      dmtp_priv_key: string;
    },
  ) {
    try {
      const address = req.headers.address as string;
      const { dmtp_pub_key, dmtp_priv_key } = inputParam;
      const updatedUser = await this.userService.submitKeyPair(
        address,
        dmtp_pub_key,
        dmtp_priv_key,
      );

      return onSuccess(updatedUser);
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('generate-api-key')
  @Middlewares([AuthMiddleware])
  public async generateApiKey(@Request() req: exRequest) {
    try {
      const address = req.headers.address as string;
      const updatedUser = await this.userService.generateApiKey(address);
      return onSuccess(updatedUser);
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
    }
  }
}
