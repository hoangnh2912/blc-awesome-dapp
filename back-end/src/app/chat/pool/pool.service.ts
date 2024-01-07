import { IPool, Pool } from '@schemas';
import { ChatConstant } from '@constants';
class PoolService {
  public async addToPool(
    tokenAddress: string,
    images?: string[],
    description?: string,
    name?: string,
    price?: string,
    whitelist?: string[],
    cid?: string,
    amount?: number,
  ): Promise<IPool | null> {
    try {
      const token =
        Object.values(ChatConstant.TOKEN_ERC20).find(
          e => e.contract_address.toLowerCase() == tokenAddress.toLowerCase(),
        ) || ChatConstant.TOKEN_ERC20.NONE;

      const payload = {
        token,
        images,
        description,
        name,
        price,
        whitelist,
        cid,
        amount,
      };
      const pool = await Pool.findOneAndUpdate(
        {
          cid,
        },
        payload,
        {
          upsert: true,
          new: true,
          setDefaultsOnInsert: true,
        },
      );
      return pool;
    } catch (error) {
      throw error;
    }
  }

  public async updateToPool(
    images?: string[],
    description?: string,
    name?: string,
    price?: string,
    whitelist?: string[],
    cid?: string,
    new_cid?: string,
    amount?: number,
  ): Promise<IPool | null> {
    try {
      const payload = {
        images,
        description,
        name,
        price,
        whitelist,
        new_cid,
        amount,
      };
      const pool = await Pool.findOneAndUpdate(
        {
          cid,
        },
        payload,
        {
          upsert: true,
          new: true,
          setDefaultsOnInsert: true,
        },
      );
      return pool;
    } catch (error) {
      throw error;
    }
  }

  public async getPools(): Promise<IPool[] | null> {
    const pool = await Pool.find();
    return pool;
  }
  public async removeToPool(cids: string[]): Promise<Boolean> {
    await Pool.deleteMany({ cid: { $in: cids } });
    return true;
  }
  public async clearAllPool(): Promise<Boolean> {
    await Pool.deleteMany({});
    return true;
  }
}
export { PoolService };
