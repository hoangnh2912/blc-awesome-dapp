import { NextFunction, Request, Response } from 'express';
// import {  web3 } from '@providers';
import { onError, Constant, logger } from '@constants';
import { Room } from '@schemas';
import { ChatMarketContract } from '@providers';

const { NETWORK_STATUS_CODE, NETWORK_STATUS_MESSAGE } = Constant;

// const AuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     let { authorize, address: addressHeader } = req.headers;
//     if (!authorize) {
//       return res
//         .status(NETWORK_STATUS_CODE.UNAUTHORIZED)
//         .json(onError(NETWORK_STATUS_MESSAGE.UNAUTHORIZED));
//     }
//     authorize = authorize as string;
//     addressHeader = addressHeader as string;
//     const [message, signature] = authorize.split(':');

//     const address = web3.eth.accounts.recover(message, signature);
//     const [addressFromMessage, expire] = message.split('-');

//     if (addressFromMessage.toLowerCase() != address.toLowerCase()) {
//       return res
//         .status(NETWORK_STATUS_CODE.BAD_REQUEST)
//         .json(onError(NETWORK_STATUS_MESSAGE.BAD_REQUEST));
//     }
//     if (!web3.utils.isAddress(address) || !web3.utils.isAddress(addressHeader)) {
//       return res
//         .status(NETWORK_STATUS_CODE.BAD_REQUEST)
//         .json(onError(NETWORK_STATUS_MESSAGE.BAD_REQUEST));
//     }

//     if (Date.now() > parseInt(expire)) {
//       return res.status(NETWORK_STATUS_CODE.EXPIRE).json(onError(NETWORK_STATUS_MESSAGE.EXPIRE));
//     }

//     req.headers.address = addressHeader.toLowerCase();
//     req.headers.signature = signature;
//     return next();
//   } catch (error) {
//     logger.error(error);
//     return res
//       .status(NETWORK_STATUS_CODE.UNAUTHORIZED)
//       .json(onError(NETWORK_STATUS_MESSAGE.UNAUTHORIZED));
//   }
// };

const AdminRoleMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const roomId = req.body.roomId;
    const address: any = req.headers.address;
    const roomInfo = await Room.findOne({
      _id: roomId,
      deleted_at: { $exists: false },
    });

    if (!roomInfo?.admins?.includes(address) && roomInfo?.creator != address) {
      return res
        .status(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR)
        .json(onError(NETWORK_STATUS_MESSAGE.NOT_ENOUGH_RIGHT));
    }

    return next();
  } catch (error) {
    logger.error(error);
    return res
      .status(NETWORK_STATUS_CODE.UNAUTHORIZED)
      .json(onError(NETWORK_STATUS_MESSAGE.NOT_ENOUGH_RIGHT));
  }
};

const CreatorRoleMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const roomId = req.body.roomId;
    const address: any = req.headers.address;
    const roomInfo = await Room.findOne({
      _id: roomId,
      deleted_at: { $exists: false },
    });

    if (roomInfo?.creator != address) {
      return res
        .status(NETWORK_STATUS_CODE.UNAUTHORIZED)
        .json(onError(NETWORK_STATUS_MESSAGE.NOT_ENOUGH_RIGHT));
    }

    return next();
  } catch (error) {
    logger.error(error);
    return res
      .status(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json(onError(NETWORK_STATUS_MESSAGE.NOT_ENOUGH_RIGHT));
  }
};

const CheckRolePowerMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const room_id = req.body.room_id;
    const senderAddress: any = req.headers.address;
    const roomInfo = await Room.findOne({ _id: room_id });
    const objectAddress = req.body.address;

    const isAdmin = (_address: string) => {
      return roomInfo?.admins?.includes(_address);
    };
    const isSubAdmin = (_address: string) => {
      return roomInfo?.sub_admins?.includes(_address);
    };
    // const isCreator = (_address: string) => {
    //   return _address == roomInfo?.creator;
    // };
    let senderPower = 0;
    let objectPower = 0;
    if (isAdmin(senderAddress)) {
      senderPower = 2;
    } else if (isSubAdmin(senderAddress)) {
      senderPower = 1;
    }
    if (isAdmin(objectAddress)) {
      objectPower = 2;
    } else if (isSubAdmin(objectAddress)) {
      objectPower = 1;
    }

    if (senderPower < objectPower) {
      return res
        .status(NETWORK_STATUS_CODE.BAD_REQUEST)
        .json(onError(NETWORK_STATUS_MESSAGE.NOT_ENOUGH_RIGHT));
    }

    // if (isAdmin(senderAddress) && isCreator(objectAddress)) {
    //   return res
    //     .status(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR)
    //     .json(NETWORK_STATUS_MESSAGE.NOT_ENOUGH_RIGHT);
    // } else if (!isAdmin(senderAddress) && !isCreator(senderAddress)) {
    //   if (isAdmin(objectAddress) || isCreator(objectAddress)) {
    //     return res
    //       .status(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR)
    //       .json(NETWORK_STATUS_MESSAGE.NOT_ENOUGH_RIGHT);
    //   }
    // }

    return next();
  } catch (error) {
    logger.error(error);
    return res
      .status(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json(onError(NETWORK_STATUS_MESSAGE.NOT_ENOUGH_RIGHT));
  }
};

const MinterMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { address } = req.headers;
    const MINTER_ROLE = await ChatMarketContract.methods.MINTER_ROLE().call();
    const isHaveMintRole = await ChatMarketContract.methods
      .hasRole(MINTER_ROLE, `${address}`.toLowerCase())
      .call();
    if (!isHaveMintRole) {
      return res
        .status(NETWORK_STATUS_CODE.UNAUTHORIZED)
        .json(onError(NETWORK_STATUS_MESSAGE.UNAUTHORIZED));
    }
    return next();
  } catch (error) {
    logger.error(error);
    return res
      .status(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json(onError(NETWORK_STATUS_MESSAGE.UNAUTHORIZED));
  }
};

export { AdminRoleMiddleware, CreatorRoleMiddleware, CheckRolePowerMiddleware, MinterMiddleware };
