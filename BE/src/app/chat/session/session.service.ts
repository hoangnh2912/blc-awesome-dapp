import { Constant } from '@constants';

export interface SessionData {
  message: string;
  data: {
    address: string;
    expire: number;
  };
}

export class SessionService {
  public getMessageSign(address: string): SessionData {
    const expire = Date.now() + Constant.EXPIRE_TIME;
    const payload = {
      address,
      expire,
    };
    return {
      message: `${address}-${expire}`,
      data: payload,
    };
  }
}
