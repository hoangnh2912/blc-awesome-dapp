import { Constant } from '@constants';
import { DMTPMarketContract } from '@providers';
import { Buy, IMarket, IStickerPriceType, Market, Token } from '@schemas';
class MarketService {
  public async getMarkets(address: string): Promise<IMarket[]> {
    const marketList = await Market.find({
      $or: [
        {
          whitelist: {
            $all: [address],
          },
        },
        {
          whitelist: [''],
        },
      ],
    });
    return marketList;
  }

  public getToken(tokenAddress: string): Token {
    const { DMTP, WETH, NONE } = Constant.TOKEN_ERC20;
    switch (tokenAddress.toLowerCase()) {
      case DMTP.contract_address.toLowerCase():
        return DMTP;
      case WETH.contract_address.toLowerCase():
        return WETH;
      default:
        return NONE;
    }
  }

  public async setPriceSticker(
    stickerId: string,
    price: string,
    price_type: IStickerPriceType,
    token: Token,
    stickerMetadata: {
      name: string;
      description: string;
      images: string[];
      image: string;
    },
    amount: string,
  ): Promise<IMarket | null> {
    try {
      const stickerCID = await DMTPMarketContract.methods.stickerURI(stickerId).call();

      const amount_left = await DMTPMarketContract.methods.stickerLeft(stickerId).call();

      const updated = await Market.findOneAndUpdate(
        {
          id_token: stickerId,
        },
        {
          token,
          price_type,
          amount,
          amount_left,
          price: parseFloat(price),
          updated_at: new Date(),
          name: stickerMetadata.name,
          description: stickerMetadata.description,
          images: stickerMetadata.images,
          cid: stickerCID,
        },
        {
          upsert: true,
          new: true,
          setDefaultsOnInsert: true,
        },
      );
      return updated;
    } catch (error) {
      throw error;
    }
  }
  public async setWhitelistSticker(
    stickerId: string,
    whitelist: string[],
  ): Promise<IMarket | null> {
    try {
      const updated = await Market.findOneAndUpdate(
        {
          id_token: stickerId,
        },
        {
          whitelist,
          updated_at: new Date(),
        },
        {
          upsert: true,
          new: true,
          setDefaultsOnInsert: true,
        },
      );
      return updated;
    } catch (error) {
      throw error;
    }
  }
  public async createBuyHistory(
    stickerId: string,
    buyer: string,
    txHash: string,
  ): Promise<IMarket | null> {
    try {
      await Buy.create({
        id_token: stickerId,
        buyer,
        txHash,
      });

      const amount_left = await DMTPMarketContract.methods.stickerLeft(stickerId).call();

      const updated = await Market.findOneAndUpdate(
        {
          id_token: stickerId,
        },
        {
          amount_left,
          updated_at: new Date(),
        },
        {
          upsert: true,
          new: true,
          setDefaultsOnInsert: true,
        },
      );
      return updated;
    } catch (error) {
      throw error;
    }
  }
}
export { MarketService };
