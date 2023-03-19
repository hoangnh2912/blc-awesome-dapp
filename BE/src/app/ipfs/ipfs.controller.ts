import { Constant, logger, onError, onSuccess, OptionResponse } from '@constants';
import { SignatureMiddleware } from '@middlewares';
import { uploadFile } from '@providers';
import { Controller, Middlewares, Post, Route, Security, Tags, UploadedFile } from 'tsoa';

const { NETWORK_STATUS_CODE, NETWORK_STATUS_MESSAGE } = Constant;
@Tags('ipfs')
@Route('ipfs')
@Security('authorize')
@Middlewares([SignatureMiddleware])
export class IpfsController extends Controller {
  @Post('upload-image')
  public async uploadImage(
    @UploadedFile()
    imageFile: Express.Multer.File,
  ): Promise<OptionResponse<String>> {
    try {
      const imageIPFS = await uploadFile(imageFile.buffer);
      return onSuccess(`ipfs://${imageIPFS.path}`);
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
    }
  }
}