import { Request as exRequest } from 'express';
// import stream from 'stream';
import { Controller, Get, Query, Request, Route, Tags } from 'tsoa';
import { Constant, logger, onError, onSuccess } from '@constants';
// import { getFile } from '@providers';

const { NETWORK_STATUS_CODE } = Constant;

@Tags('File')
@Route('file')
export class FileController extends Controller {
  @Get('download-file')
  public async DownloadFile(@Request() req: exRequest, @Query() cid: string) {
    try {
      // const [tokens, extension] = await getFile(cid);
      // const readStream = new stream.PassThrough();
      // readStream.end(tokens);
      const response = req.res;
      if (response) {
        return response.redirect(`https://ipfs.dmtp.tech/ipfs/${cid}`);

        // response.set('Content-disposition', 'attachment; filename=' + `${Date.now()}.${extension}`);
        // response.set('Content-Type', 'text/plain');
        // readStream.pipe(response);
        // return new Promise((resolve: any, reject: any) => {
        //   readStream.on('error', reject);
        //   readStream.on('end', resolve);
        // });
      }
      return onSuccess();
    } catch (error: any) {
      logger.error(error.message);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(error);
    }
  }
}
