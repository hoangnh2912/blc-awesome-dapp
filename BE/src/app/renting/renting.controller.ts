import { Constant, logger, onError, onSuccess, OptionResponse } from '@constants';
import { Singleton } from '@providers';
import { Body, Controller, Post, Route, Security, Tags } from 'tsoa';
import { ERC4907Input, TokenCreatorOutput } from './renting';

const { NETWORK_STATUS_CODE, NETWORK_STATUS_MESSAGE } = Constant;
@Tags('renting')
@Route('renting')
@Security('authorize')
export class RentingController extends Controller {
    @Post('erc4907')
    public async erc4907(
        @Body()
        payload: ERC4907Input,
    ): Promise<OptionResponse<TokenCreatorOutput>> {
        try {
            return onSuccess(await Singleton.getRentingInstance().Erc4907(payload));
        } catch (error) {
            logger.error(error);
            this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
            return onError(NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
        }
    }
}
