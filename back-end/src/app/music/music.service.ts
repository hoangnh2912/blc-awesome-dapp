import { Constant } from '@constants';
import { Market, User } from '@schemas';

export class MusicService {
  public async mintEvent(to_address: string, id: string, transactionHash: string) {
    await User.findOneAndUpdate(
      {
        wallet_address: to_address,
      },
      {
        $addToSet: {
          ids: id,
        },
      },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      },
    );

    await Market.findOneAndUpdate(
      {
        id,
      },
      {
        $addToSet: {
          history: {
            transaction_hash: transactionHash,
            event: 'mint',
            created_at: new Date(),
            from: Constant.ZERO_ADDRESS,
            to: to_address,
          },
        },
      },
    );
  }
  public async mintBatchEvent(to_address: string, ids: string[], transactionHash: string) {
    await User.findOneAndUpdate(
      {
        wallet_address: to_address,
      },
      {
        $addToSet: {
          ids: ids,
        },
      },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      },
    );
    await Market.updateMany(
      {
        id: {
          $in: ids,
        },
      },
      {
        $addToSet: {
          history: {
            transaction_hash: transactionHash,
            event: 'mintBatch',
            created_at: new Date(),
            from: Constant.ZERO_ADDRESS,
            to: to_address,
          },
        },
      },
    );
  }
  public async transferEvent(
    from_address: string,
    to_address: string,
    id: string,
    transactionHash: string,
  ) {
    await User.findOneAndUpdate(
      {
        wallet_address: from_address,
      },
      {
        $pull: {
          ids: id,
        },
      },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      },
    );
    await User.findOneAndUpdate(
      {
        wallet_address: to_address,
      },
      {
        $addToSet: {
          ids: id,
        },
      },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      },
    );
    await Market.findOneAndUpdate(
      {
        id,
      },
      {
        $addToSet: {
          history: {
            transaction_hash: transactionHash,
            event: 'transfer',
            created_at: new Date(),
            from: from_address,
            to: to_address,
          },
        },
      },
    );
  }
  public async transferBatchEvent(from_address: string, to_address: string, ids: string[], transactionHash: string) {
    await User.findOneAndUpdate(
      {
        wallet_address: from_address,
      },
      {
        $pullAll: {
          ids: ids,
        },
      },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      },
    );
    await User.findOneAndUpdate(
      {
        wallet_address: to_address,
      },
      {
        $addToSet: {
          ids: {
            $each: ids,
          },
        },
      },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      },
    );
    await Market.updateMany(
      {
        id: {
          $in: ids,
        },
      },
      {
        $addToSet: {
          history: {
            transaction_hash: transactionHash,
            event: 'transferBatch',
            created_at: new Date(),
            from: from_address,
            to: to_address,
          },
        },
      },
    );
  }

  public async getListSong(wallet_address: string, page: number = 1, limit: number = 24) {
    const user = await User.findOne({ wallet_address });
    if (!user)
      return {
        total: 0,
        music: [],
      };
    const ids = user.ids;
    const query = {
      id: { $in: ids },
    };
    const listMarket = await Market.find(
      query,
      {},
      {
        skip: (page - 1) * limit,
        limit: limit,
      },
    );
    if (!listMarket)
      return {
        total: 0,
        music: [],
      };
    return {
      total: await Market.countDocuments(query),
      music: listMarket,
    };
  }
}
