import csvtojson from 'csvtojson';
import { Request as exRequest } from 'express';
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
  UploadedFile,
  UploadedFiles,
} from 'tsoa';
import { Constant, IToken, logger, onError, onSuccess, onSuccessArray, Option } from '@constants';
import { AuthMiddleware, MinterMiddleware } from '@middlewares';
import { Singleton, uploadFile, uploadFolder, uploadJson } from '@providers';
import { ISticker, IUser } from '@schemas';

const { NETWORK_STATUS_CODE, NETWORK_STATUS_MESSAGE } = Constant;

@Tags('Sticker')
@Middlewares([AuthMiddleware])
@Route('sticker')
@Security({
  authorize: [],
  address: [],
})
export class StickerController extends Controller {
  private stickerService = Singleton.getStickerInstance();

  @Get('get-sticker-list')
  public async getSticker(
    @Request() req: exRequest,
    // @Query() minPrice?: number,
    // @Query() maxPrice?: number,
    // @Query() whitelist?: string[]
  ): Promise<Option<ISticker[]>> {
    try {
      const address = req.headers.address as string;
      const stickerList = await this.stickerService.getStickerOfOwner(
        address,
        // minPrice,
        // maxPrice,
        // whitelist
      );
      return onSuccess(stickerList);
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('upload-nft-metadata')
  @Middlewares([MinterMiddleware])
  public async uploadNFTMetadata(
    @Body()
    metadata: Pick<ISticker, 'name' | 'images'> & {
      description?: string;
    },
  ): Promise<Option<String>> {
    try {
      const { images, description = '', name } = metadata;
      const metadataIPFS = await uploadJson({
        name,
        image: images[0],
        images,
        description,
        external_url: 'https://dmtp.tech',
        created_at: new Date().toISOString(),
      });
      return onSuccess(`${metadataIPFS.path}`);
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('upload-json')
  public async uploadJsonMetadata(
    @Body()
    metadata: any,
  ): Promise<Option<String>> {
    try {
      const metadataIPFS = await uploadJson(metadata);
      return onSuccess(`${metadataIPFS.path}`);
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('upload-folder')
  public async uploadFolder(
    @UploadedFiles()
    imageFiles: Express.Multer.File[],
  ) {
    try {
      for (const image of imageFiles) {
        if (image.size > 2097152) {
          this.setStatus(NETWORK_STATUS_CODE.CONTENT_TOO_LARGE);
          return onError(NETWORK_STATUS_MESSAGE.CONTENT_TOO_LARGE);
        }
      }
      const imageBuffers = imageFiles.map(image => image.buffer);
      const images = await uploadFolder(imageBuffers);
      const imagesPath = images.map(
        (image: any) => `http://35.77.41.240/file/download-file?cid=${image.cid.toString()}`,
      );

      return onSuccessArray(imagesPath);
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('upload-image')
  @Middlewares([MinterMiddleware])
  public async uploadImage(
    @UploadedFile()
    imageFile: Express.Multer.File,
  ): Promise<Option<String>> {
    try {
      const imageIPFS = await uploadFile(imageFile.buffer);
      return onSuccess(`http://35.77.41.240/file/download-file?cid=${imageIPFS.path}`);
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('csv-to-addresses')
  public async csvToAddresses(
    @UploadedFile()
    csvFile: Express.Multer.File,
  ): Promise<Option<String>> {
    try {
      const csv = await csvFile.buffer.toString();
      const jsonArray = await csvtojson({
        noheader: true,
      }).fromString(csv);
      return onSuccess(jsonArray.map(item => Object.values(item)[0]));
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('get-sticker-by-nft-id')
  public async getStickerById(@Query() id_token: string): Promise<Option<IUser>> {
    try {
      const user = await this.stickerService.getStickerById(id_token);
      return onSuccess(user);
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(error);
    }
  }

  @Get('get-tokens')
  public async getTokens(): Promise<Option<IToken[]>> {
    try {
      const tokens = this.stickerService.getTokens();
      return onSuccess(tokens);
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(error);
    }
  }

  @Get('get-nft-information')
  public async getNftInformation(
    @Query() chain_id: string,
    @Query() contract_address: string,
    @Query() tokenId: string,
  ) {
    try {
      const nftInformation = await this.stickerService.getNftInformation(
        chain_id,
        contract_address,
        tokenId,
      );
      if (!nftInformation.status) {
        this.setStatus(NETWORK_STATUS_CODE.BAD_REQUEST);
        return onError(nftInformation.message);
      }
      return onSuccess(nftInformation.data);
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(error);
    }
  }

  @Get('get-contract-nft')
  public async getContractNft(@Query() chain_id: string, @Query() contract_address: string) {
    try {
      const contractNFTs = await this.stickerService.getContractNFTs(chain_id, contract_address);
      if (!contractNFTs.status) {
        this.setStatus(NETWORK_STATUS_CODE.BAD_REQUEST);
        return onError(contractNFTs.message);
      }
      return onSuccess(contractNFTs.data);
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(error);
    }
  }
  @Get('get-nft-contract-information')
  public async getNftContractInformation(
    @Query() chain_id: string,
    @Query() contract_address: string,
  ) {
    try {
      const contractNFTs = await this.stickerService.getNftContractInformation(
        chain_id,
        contract_address,
      );
      if (!contractNFTs.status) {
        this.setStatus(NETWORK_STATUS_CODE.BAD_REQUEST);
        return onError(contractNFTs.message);
      }
      return onSuccess(contractNFTs.data);
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(error);
    }
  }

  @Get('get-supported-chain')
  public async getSupportedChain() {
    try {
      const chains = await this.stickerService.getSupportedChain();
      return onSuccess(chains);
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(error);
    }
  }
}
