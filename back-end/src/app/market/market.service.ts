import { Constant, removeAccent } from '@constants';
import { MarketContract, readCID } from '@providers';
import { Market, User } from '@schemas';

export class MarketService {
  public async getTopSeller() {
    const mostSold = await Market.aggregate([
      {
        $match: {
          'history.event': 'buy',
        },
      },
      {
        $unwind: '$history',
      },
      {
        $match: {
          'history.event': 'buy',
        },
      },
      {
        $project: {
          history: 0,
        },
      },
      {
        $group: {
          _id: '$id',
          count: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
      {
        $lookup: { from: 'markets', localField: '_id', foreignField: 'id', as: 'data' },
      },
      {
        $project: {
          data: {
            $arrayElemAt: ['$data', 0],
          },
          count: 1,
        },
      },
    ]);

    const mostPlayed = await Market.aggregate([
      {
        $sort: {
          play_count: -1,
        },
      },
      {
        $limit: 10,
      },
    ]);
    const mostViewed = await Market.aggregate([
      {
        $sort: {
          view_count: -1,
        },
      },
      {
        $limit: 10,
      },
    ]);

    return {
      most_sold: mostSold,
      most_played: mostPlayed,
      most_viewed: mostViewed,
    };
  }

  public async listSong(
    id: string,
    seller: string,
    price: string,
    amount: string,
    uri: string,
    transaction_hash: string,
  ) {
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
        $addToSet: {
          history: {
            transaction_hash,
            event: 'list',
            created_at: new Date(),
            from: Constant.ZERO_ADDRESS,
            to: seller,
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

  public async createBuyHistory(id: string, buyer: string, transaction_hash: string) {
    await Market.findOneAndUpdate(
      {
        id,
        'history.transaction_hash': { $ne: transaction_hash },
      },
      {
        left: (await MarketContract.methods.song(id).call())['amount'],
        $addToSet: {
          history: {
            transaction_hash,
            event: 'buy',
            created_at: new Date(),
            from: Constant.ZERO_ADDRESS,
            to: buyer,
          },
        },
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

  public async getMyMarket(seller: string, page: number = 1, limit: number = 24) {
    const market = await Market.aggregate([
      {
        $match: {
          seller,
        },
      },
      {
        $skip: (page - 1) * limit,
      },
      {
        $limit: limit,
      },
    ]);

    return {
      market,
      total: await Market.countDocuments({
        seller,
      }),
    };
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
  public async getNextId() {
    const lastId = await Market.aggregate([
      {
        $addFields: {
          idNumber: {
            $toInt: '$id',
          },
        },
      },
      {
        $sort: {
          idNumber: -1,
        },
      },
      {
        $limit: 1,
      },
    ]);
    if (lastId.length > 0) {
      return lastId[0].idNumber + 1;
    }
    return 1;
  }
}
