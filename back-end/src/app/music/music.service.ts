import { Market, User } from '@schemas';

export class MusicService {
  public async viewMusic(id: string) {
    const music = await Market.findOne({ id });
    if (!music) return false;
    await Market.updateOne(
      { id },
      {
        view_count: (music.view_count || 0) + 1,
      },
    );
    return true;
  }

  public async playMusic(id: string) {
    const music = await Market.findOne({ id });
    if (!music) return false;
    await Market.updateOne(
      { id },
      {
        play_count: (music.play_count || 0) + 1,
      },
    );
    return true;
  }

  public async transferEvent(
    from_address: string,
    to_address: string,
    id: string,
    transactionHash: string,
    timestamp: number | string,
  ) {
    await User.findOneAndUpdate(
      {
        wallet_address: from_address.toLowerCase(),
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
        wallet_address: to_address.toLowerCase(),
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
        'history.transaction_hash': { $ne: transactionHash },
      },
      {
        $addToSet: {
          history: {
            transaction_hash: transactionHash,
            event: 'transfer',
            created_at: new Date(`${timestamp}000`),
            from: from_address,
            to: to_address,
          },
        },
      },
    );
  }
  public async transferBatchEvent(
    from_address: string,
    to_address: string,
    ids: string[],
    transactionHash: string,
    timestamp: number | string,
  ) {
    await User.findOneAndUpdate(
      {
        wallet_address: from_address.toLowerCase(),
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
        wallet_address: to_address.toLowerCase(),
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
        'history.transaction_hash': { $ne: transactionHash },
      },
      {
        $addToSet: {
          history: {
            transaction_hash: transactionHash,
            event: 'transferBatch',
            created_at: new Date(`${timestamp}000`),
            from: from_address,
            to: to_address,
          },
        },
      },
    );
  }

  public async getListSong(
    wallet_address: string,
    page: number = 1,
    limit: number = 24,
    search: string = '',
  ) {
    const user = await User.findOne({ wallet_address });
    if (!user)
      return {
        total: 0,
        music: [],
      };
    const ids = user.ids;
    const query = {
      id: { $in: ids },
      name: { $regex: search, $options: 'i' },
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
