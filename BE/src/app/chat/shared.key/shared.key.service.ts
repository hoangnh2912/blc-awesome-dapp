import { Constant, logger, Some } from '@constants';
import { Singleton } from '@providers';
import { ISharedKey, SharedKey } from '@schemas';
import { Types } from 'mongoose';
import { createECDH } from 'crypto';
class SharedKeyService {
  public async getSharedKeys(
    address: string,
    room_id: string,
    key_ids: string[],
  ): Promise<Some<(ISharedKey & { _id: Types.ObjectId })[]>> {
    try {
      const findRoom = await Singleton.getRoomInstance().getRoom(room_id);
      if (!findRoom?.users.includes(address)) {
        return {
          status: false,
          message: 'Shared Key: User not in room',
        };
      }
      const sharedKeys = await SharedKey.find({ _id: { $in: key_ids } });
      if (!sharedKeys.length) {
        return {
          status: false,
          message: 'Shared Key: key_id not exists',
        };
      }
      const userPubkey = await Singleton.getUserInstance().getPublicKey(address);
      const dmtp = createECDH('secp256k1');
      dmtp.setPrivateKey(Buffer.from(Constant.DMTP_KEY_PAIR.dmtp_priv_key, 'hex'));
      const secretKey = dmtp.computeSecret(Buffer.from(userPubkey, 'hex'));
      sharedKeys.map(sharedKey => {
        const decrypted = Singleton.getMessageInstance().decryptMessage(
          sharedKey.key_data,
          Constant.DMTP_KEY_PAIR.dmtp_priv_key,
        );
        sharedKey.key_data = Singleton.getMessageInstance().encryptMessage(
          decrypted,
          secretKey.toString('hex'),
        );
      });
      return {
        status: true,
        data: sharedKeys,
      };
    } catch (error: any) {
      logger.error(error.message);
      return {
        status: false,
        message: 'Shared Key: Error when getSharedKeys',
      };
    }
  }

  public async createSharedKey(room_id: string) {
    try {
      const findRoom = await Singleton.getRoomInstance().getRoom(room_id);
      if (findRoom?.room_type != Constant.ROOM_TYPE.LIMITED) {
        return null;
      }
      const key_data = this.generateSharedKey();
      const encrypted_key = Singleton.getMessageInstance().encryptMessage(
        key_data,
        Constant.DMTP_KEY_PAIR.dmtp_priv_key,
      );
      const field = {
        room_id,
        key_data: encrypted_key,
        created_at: new Date().toISOString(),
      };
      await SharedKey.create(field);

      return key_data;
    } catch (error: any) {
      logger.error(error.message);
      return null;
    }
  }

  private generateSharedKey() {
    return Singleton.getMessageInstance().encryptMessage(
      (Math.random() * Constant.RANDOM_COMPLEXITY).toString(),
      new Date().toISOString(),
    );
  }

  public async getLatestSharedKey(
    room_id: string,
    address: string,
  ): Promise<Some<ISharedKey & { _id: Types.ObjectId }>> {
    try {
      const getRoom = await Singleton.getRoomInstance().getRoom(room_id);
      if (!getRoom?.users.includes(address)) {
        return {
          status: false,
          message: 'User not in room',
        };
      }
      const getKey = await SharedKey.findOne({ room_id }).sort({ created_at: -1 });

      if (getKey) {
        const userPubkey = await Singleton.getUserInstance().getPublicKey(address);
        const dmtp = createECDH('secp256k1');
        dmtp.setPrivateKey(Buffer.from(Constant.DMTP_KEY_PAIR.dmtp_priv_key, 'hex'));
        const secretKey = dmtp.computeSecret(Buffer.from(userPubkey, 'hex'));
        const decrypted = Singleton.getMessageInstance().decryptMessage(
          getKey.key_data,
          Constant.DMTP_KEY_PAIR.dmtp_priv_key,
        );
        getKey.key_data = Singleton.getMessageInstance().encryptMessage(
          decrypted,
          secretKey.toString('hex'),
        );
      }

      return { status: true, data: getKey };
    } catch (error: any) {
      logger.error(error.message);
      return {
        status: false,
        message: 'Shared Key: Error when getLatestSharedKey',
      };
    }
  }

  public async ifSharedKeyValid(key_id: string, room_id: string) {
    try {
      const sharedKey = await SharedKey.findOne({ _id: key_id, room_id });

      return sharedKey;
    } catch (error: any) {
      logger.error(error.message);
      return null;
    }
  }

  public getDmtpPubkey() {
    try {
      return Constant.DMTP_KEY_PAIR.dmtp_pub_key;
    } catch (error: any) {
      logger.error(error.message);
      return null;
    }
  }
}

export { SharedKeyService };
