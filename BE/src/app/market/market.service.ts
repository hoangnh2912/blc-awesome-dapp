import { Constant, removeAccent } from '@constants';
import { MarketContract, readCID } from '@providers';
import { Market, User } from '@schemas';

export class MarketService {
  public async listSong(id: string, seller: string, price: string, amount: string, uri: string) {
    const data: any = await readCID(uri);
    await Market.findOneAndUpdate(
      {
        id,
      },
      {
        name: data.name,
        singer: data.singer,
        image: data.image,
        audio: data.animation_url,
        amount,
        left: amount,
        price,
        seller,
        attributes: data.attributes,
        duration: data.duration,
        bitrate: data.bitrate,
        description: data.description,
        search_key: `${removeAccent(data.name)} ${removeAccent(data.singer)} ${removeAccent(
          data.description,
        )}`,
      },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      },
    );
  }

  public async createBuyHistory(id: string, buyer: string) {
    await Market.findOneAndUpdate(
      {
        id,
      },
      {
        left: (await MarketContract.methods.song(id).call())['amount'],
      },
    );

    await User.findOneAndUpdate(
      {
        wallet_address: buyer,
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

  public async getListMarket(
    search: string = '',
    page: number = 1,
    limit: number = 24,
    genre: string = '',
  ) {
    return await Market.aggregate([
      {
        $match: {
          $and: [
            {
              search_key: {
                $regex: search,
                $options: 'i',
              },
            },
            ...(genre
              ? [{ attributes: { $elemMatch: { trait_type: 'Genre', value: genre } } }]
              : []),
          ],
        },
      },
      {
        $skip: (page - 1) * limit,
      },
      {
        $limit: limit,
      },
      {
        $lookup: {
          from: 'users',
          localField: 'id',
          foreignField: 'ids',
          as: 'owners',
          pipeline: [{ $project: { _id: 0, wallet_address: 1 } }],
        },
      },
    ]);
  }

  public async getMyMarket(seller: string) {
    return await Market.aggregate([
      {
        $match: {
          seller,
        },
      },
    ]);
  }

  public async getHomeMarket() {
    return await Promise.all(
      Constant.ATTRIBUTES.GENRE.map(genre => {
        return new Promise((resolve, reject) => {
          Market.aggregate([
            {
              $match: {
                'attributes.trait_type': 'Genre',
                'attributes.value': genre,
              },
            },
            {
              $limit: 4,
            },
            {
              $lookup: {
                from: 'users',
                localField: 'id',
                foreignField: 'ids',
                as: 'owners',
                pipeline: [{ $project: { _id: 0, wallet_address: 1 } }],
              },
            },
          ])
            .then(data => {
              resolve({
                genre,
                data,
              });
            })
            .catch(reject);
        });
      }),
    );
  }
  public async getMusic(id: string) {
    const music = await Market.aggregate([
      {
        $match: {
          id,
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'id',
          foreignField: 'ids',
          as: 'owners',
          pipeline: [{ $project: { _id: 0, wallet_address: 1 } }],
        },
      },
    ]);
    if (music.length > 0) {
      return music[0];
    }
    return null;
  }
}
