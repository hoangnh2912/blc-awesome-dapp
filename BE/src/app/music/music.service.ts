import { Market, User } from '@schemas';

export class MusicService {
  public async mintEvent(to_address: string, id: string) {
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
  }
  public async mintBatchEvent(to_address: string, ids: string[]) {
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
  }
  public async transferEvent(from_address: string, to_address: string, id: string) {
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
  }
  public async transferBatchEvent(from_address: string, to_address: string, ids: string[]) {
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
  }

  public async getListSong(wallet_address: string) {
    const user = await User.findOne({ wallet_address });
    if (!user) return [];
    const ids = user.ids;
    const listMarket = await Market.find({ id: { $in: ids } });
    if (!listMarket) return [];
    return listMarket;
  }
}