import { NextFunction, Request, Response } from 'express';
// import { web3 } from '@providers';
import { onError, Constant, logger } from '@constants';
import { ethers } from 'ethers';

const { NETWORK_STATUS_CODE, NETWORK_STATUS_MESSAGE } = Constant;

const SignatureMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let { authorize } = req.headers;
    if (!authorize) {
      // return res
      //   .status(NETWORK_STATUS_CODE.UNAUTHORIZED)
      //   .json(onError(NETWORK_STATUS_MESSAGE.UNAUTHORIZED));
    }
    authorize = authorize as string;

    const [message, signature] = authorize.split(':');
    console.log(`message: ${message}`);
    console.log(`signature: ${signature}`);

    const address = ethers.utils.verifyMessage(message, signature);
    // const ethersInstance = new ethers.providers.JsonRpcProvider(`${process.env.NETWORK_RPC}`)
    // const addressCustom = ethers.utils.verifyMessage(
    //   '0x3c90d8be4573f0582a2613e5cefe8727431db2f2',
    //   '0x168307a637aac047952365f0fea0936829cef24f839793967e2e307fafaf547b4ec4653f5d6eee072c5a03732193717f3c4490cf4e6e257a9acb687c85feca851b',
    // );

    // console.log(addressCustom);

    console.log(`address: ${address}`);

    req.headers.address = address.toLowerCase();
    req.headers.signature = signature;
    return next();
  } catch (error) {
    logger.error(error);
    return res
      .status(NETWORK_STATUS_CODE.UNAUTHORIZED)
      .json(onError(NETWORK_STATUS_MESSAGE.UNAUTHORIZED));
  }
};

export { SignatureMiddleware };
