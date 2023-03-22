import { Body, Controller, Delete, Get, Middlewares, Post, Route, Security, Tags } from 'tsoa';
import { Constant, logger, onError, onSuccess, OptionResponse } from '@constants';
import { SignatureMiddleware } from '@middlewares';
import { uploadJson } from '@providers';
import { IPool } from '@schemas';
import { PoolService } from './pool.service';

const { NETWORK_STATUS_CODE, NETWORK_STATUS_MESSAGE } = Constant;

@Tags('Pool')
@Middlewares([SignatureMiddleware])
@Route('pool')
@Security({
  authorize: [],
  address: [],
})
export class PoolController extends Controller {
  private poolService = new PoolService();

  @Get('get-pool-list')
  public async getPool(): Promise<OptionResponse<IPool[]>> {
    try {
      const pools = await this.poolService.getPools();
      return onSuccess(pools);
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete('clear-all-pool')
  public async clearAllPool(): Promise<OptionResponse<Boolean>> {
    try {
      const isRemoveSuccess = await this.poolService.clearAllPool();
      return onSuccess(isRemoveSuccess);
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete('remove-to-pool')
  public async removeToPool(
    @Body()
    data: {
      cids: string[];
    },
  ): Promise<OptionResponse<Boolean>> {
    try {
      const { cids } = data;
      const isRemoveSuccess = await this.poolService.removeToPool(cids);
      return onSuccess(isRemoveSuccess);
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
    }
  }

  // @Patch("update-to-pool")
  // public async updateToPool(
  //   @Body()
  //   data: Pick<
  //     IPool,
  //     | "name"
  //     | "description"
  //     | "amount"
  //     | "images"
  //     | "price"
  //     | "whitelist"
  //     | "priceType"
  //     | "cid"
  //   >
  // ): Promise<Option<IPool>> {
  //   try {
  //     const { images, description, name, price, whitelist, cid, amount } = data;
  //     const metadataIPFS = await uploadJson({
  //       name,
  //       image: images[0],
  //       images,
  //       amount,
  //       description,
  //       external_url: "https://dmtp.tech",
  //       created_at: new Date().toISOString(),
  //     });
  //     const new_cid = `${metadataIPFS.path}`;
  //     const pool = await this.poolService.updateToPool(
  //       images,
  //       description,
  //       name,
  //       price,
  //       whitelist,
  //       cid,
  //       new_cid,
  //       amount
  //     );
  //     return onSuccess(pool);
  //   } catch (error) {
  //     logger.error(error);
  //     this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
  //     return onError(NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
  //   }
  // }

  @Post('add-to-pool')
  public async addToPool(
    @Body()
    data: Pick<
      IPool,
      'name' | 'description' | 'amount' | 'images' | 'price' | 'whitelist' | 'price_type'
    > & {
      token_address: string;
    },
  ): Promise<OptionResponse<IPool>> {
    try {
      const { images, description, name, price, whitelist, amount, token_address } = data;

      // const tokenCheck = Object.values(ChatConstant.TOKEN_ERC20).find(
      //   e => e.contract_address.toLowerCase() == token_address.toLowerCase(),
      // );
      // if (!tokenCheck) {
      //   this.setStatus(NETWORK_STATUS_CODE.BAD_REQUEST);
      //   return onError('Token not found!');
      // }

      const metadataIPFS = await uploadJson({
        name,
        image: images[0],
        images,
        amount,
        description,
        token: token_address,
        external_url: 'https://dmtp.tech',
        created_at: new Date().toISOString(),
      });
      const cid = `${metadataIPFS.path}`;
      const pool = await this.poolService.addToPool(
        token_address,
        images,
        description,
        name,
        price,
        whitelist,
        cid,
        amount,
      );
      return onSuccess(pool);
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
    }
  }
}
