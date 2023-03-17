import { Constant, logger, onError, onSuccess, OptionResponse } from '@constants';
import { Singleton } from '@providers';
import { Body, Controller, Get, Post, Query, Route, Security, Tags } from 'tsoa';
import {
  ERC1155Input,
  ERC20Input,
  ERC721Input,
  GetAbiOutput,
  TokenCreatorOutput,
  VerifyInput,
} from './token-creator';

const { NETWORK_STATUS_CODE, NETWORK_STATUS_MESSAGE } = Constant;
@Tags('token-creator')
@Route('token-creator')
@Security('authorize')
export class TokenCreatorController extends Controller {
  @Post('erc20')
  public async erc20(
    @Body()
    payload: ERC20Input,
  ): Promise<OptionResponse<TokenCreatorOutput>> {
    try {
      return onSuccess(await Singleton.getTokenCreatorInstance().erc20(payload));
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('erc721')
  public async erc721(
    @Body()
    payload: ERC721Input,
  ): Promise<OptionResponse<TokenCreatorOutput>> {
    try {
      return onSuccess(await Singleton.getTokenCreatorInstance().erc721(payload));
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('erc1155')
  public async erc1155(
    @Body()
    payload: ERC1155Input,
  ): Promise<OptionResponse<TokenCreatorOutput>> {
    try {
      return onSuccess(await Singleton.getTokenCreatorInstance().erc1155(payload));
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('verify-contract')
  public async verifyContract(
    @Body()
    payload: VerifyInput,
  ): Promise<OptionResponse<boolean>> {
    try {
      return onSuccess(await Singleton.getTokenCreatorInstance().verifyContract(payload));
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('abi')
  public async getAbi(
    @Query()
    address: string,
  ): Promise<OptionResponse<GetAbiOutput>> {
    try {
      return onSuccess(
        await Singleton.getTokenCreatorInstance().getAbi({
          address,
        }),
      );
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
    }
  }
}
