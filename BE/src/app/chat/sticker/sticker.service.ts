import { Constant, logger, Some } from '@constants';
import { GetContractNFTsResponseAdapter } from '@moralisweb3/common-evm-utils';
import { DMTPMarketContract, Singleton, stickerContract } from '@providers';
import { Authorized, ISticker, Sticker } from '@schemas';
import axios from 'axios';
class StickerService {
  private userService = Singleton.getUserInstance();

  public async getStickerOfOwner(
    address: string,
    // minPrice?: number,
    // maxPrice?: number,
    // whitelist?: string[]
  ): Promise<ISticker[] | null> {
    try {
      const authorized = await Authorized.findOne({ wallet_addresses: address.toLowerCase() });

      // if (minPrice != undefined || maxPrice != undefined) {
      //   filter["price"] = {};
      //   if (minPrice != undefined) {
      //     filter["price"]["$gte"] = minPrice;
      //   }
      //   if (maxPrice != undefined) {
      //     filter["price"]["$lte"] = maxPrice;
      //   }
      // }

      // if (whitelist && whitelist.length > 0) {
      //   const upperWhitelist = whitelist?.map((e) => {
      //     return e.toLowerCase();
      //   });

      //   filter["whitelist"] = {
      //     $in: upperWhitelist,
      //   };
      // }

      if (!authorized) {
        return await Sticker.find({
          owner: address.toLowerCase(),
        });
      }
      return await Sticker.find({
        id_token: {
          $in: authorized.stickers,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  public async getStickerMetadata(stickerId: string): Promise<{
    name: string;
    description: string;
    images: string[];
    image: string;
  }> {
    const stickerCID = await DMTPMarketContract.methods.stickerURI(stickerId).call();

    const stickerMetadata: any = await new Promise(async (resolve, _) => {
      try {
        const uri = stickerCID.includes('http')
          ? stickerCID
          : `${process.env.IPFS_GATEWAY_URI}/ipfs/${stickerCID}`;

        const res = await axios.get(uri);
        resolve(res.data);
      } catch (error: any) {
        logger.error(error.message);
        resolve({
          name: 'N/A',
          description: 'N/A',
          image: null,
          images: null,
        });
      }
    });

    return stickerMetadata;
  }

  public async mintEvent(address: string, idSticker: string) {
    try {
      const stickerCID = await stickerContract.methods.uri(idSticker).call();
      const stickerMetadata = await this.getStickerMetadata(idSticker);

      const payload = {
        id_token: idSticker,
        name: stickerMetadata.name,
        description: stickerMetadata.description,
        images: stickerMetadata.images,
        owner: address,
        cid: stickerCID,
        created_at: new Date().toISOString(),
      };
      await Sticker.findOneAndUpdate(
        {
          id_token: idSticker,
        },
        payload,
        {
          upsert: true,
          new: true,
          setDefaultsOnInsert: true,
        },
      );

      await this.userService.addTokenForUser(idSticker, address);
      return true;
    } catch (error) {
      throw error;
    }
  }

  public async mintBatchEvent(address: string, idStickers: string[]) {
    try {
      idStickers.forEach(async id => {
        const stickerCID = await stickerContract.methods.uri(id).call();
        const stickerMetadata: any = await this.getStickerMetadata(id);
        const filter = { id_token: id };
        const payload = {
          id_token: id,
          name: stickerMetadata.name,
          description: stickerMetadata.description,
          images: stickerMetadata.images,
          owner: address,
          cid: stickerCID,
          created_at: new Date().toISOString(),
        };

        await Sticker.findOneAndUpdate(filter, payload, {
          upsert: true,
          new: true,
          setDefaultsOnInsert: true,
        });

        await this.userService.addTokenForUser(id, address);
      });
    } catch (error) {
      throw error;
    }
  }

  public async transferEvent(from: string, to: string, idSticker: string) {
    try {
      await Sticker.findOneAndUpdate(
        { id_token: idSticker },
        { owner: to, updated_at: new Date().toISOString() },
        { new: true },
      );
      await this.userService.removeTokenForUser(idSticker, from);
      await this.userService.addTokenForUser(idSticker, to);
    } catch (error) {
      throw error;
    }
  }

  public async transferBatchEvent(from: string, to: string, idStickers: string[]) {
    try {
      idStickers.forEach(async id => {
        const filter = { id_token: id };
        const update = { owner: to, updated_at: new Date().toISOString() };

        await Sticker.findOneAndUpdate(filter, update, { new: true });
        await this.userService.removeTokenForUser(id, from);
        await this.userService.addTokenForUser(id, to);
      });
    } catch (error) {
      throw error;
    }
  }

  public async getStickerOwner(id: number): Promise<string | undefined> {
    try {
      const sticker = await Sticker.findOne({ id_token: id });

      return sticker ? sticker.owner : undefined;
    } catch (error) {
      throw error;
    }
  }

  public async getStickerById(idSticker: string): Promise<ISticker | null> {
    try {
      const sticker = await Sticker.findOne({ id_token: idSticker });
      return sticker;
    } catch (error) {
      throw error;
    }
  }

  public async setOwnerOfSticker(idSticker: string, address: string): Promise<ISticker | null> {
    try {
      const filter = { id_token: idSticker };
      const update = { owner: address, updated_at: new Date().toISOString() };
      const updated = await Sticker.findOneAndUpdate(filter, update, {
        new: true,
      });
      return updated;
    } catch (error) {
      throw error;
    }
  }

  public getTokens() {
    return Object.values(Constant.TOKEN_ERC20).filter(
      e => e.contract_address != Constant.TOKEN_ERC20.NONE.contract_address,
    );
  }

  public async getNftContractInformation(
    chain_id: string,
    contract_address: string,
  ): Promise<Some<any>> {
    try {
      // const contract = newContract(Constant.CONFIG_CONTRACT.Sticker.abi, contract_address);
      // const contractOwner = await contract.methods.owner().call();
      const moralis = await Singleton.getMoralisInstance();
      // const findChain = EvmChain.create(chain_id, moralis.core);
      const metadata = await moralis.EvmApi.nft.getNFTContractMetadata({
        chain: chain_id,
        address: contract_address,
      });

      if (!metadata) {
        return {
          status: false,
          message: 'Contract NFT: metadata not found',
        };
      }
      if (!metadata.result) {
        return {
          status: false,
          message: 'Contract NFT: contract not found',
        };
      }
      return {
        status: true,
        // data: {
        //   contractOwner,
        //   metadata: metadata.result,
        // },
        data: metadata.result,
      };
      return {
        status: false,
        message: 'Contract NFT: chain_id not found',
      };
    } catch (error: any) {
      logger.error('getNftContractInformation ' + error.message);
      return {
        status: false,
        message: 'Contract NFT: false when getNftContractInformation',
      };
    }
  }
  public async getNftInformation(
    chain_id: string,
    contract_address: string,
    tokenId: string,
  ): Promise<Some<any>> {
    try {
      const moralis = await Singleton.getMoralisInstance();
      // const findChain = EvmChain.create(chain_id, moralis.core);
      const metadata = await moralis.EvmApi.nft.getNFTMetadata({
        chain: chain_id,
        address: contract_address,
        tokenId,
      });
      if (!metadata) {
        return {
          status: false,
          message: 'Contract NFT: metadata not found',
        };
      }
      if (!metadata.result) {
        return {
          status: false,
          message: 'Contract NFT: false when getNftInformation',
        };
      }
      return {
        status: true,
        data: metadata.result,
      };
      return {
        status: false,
        message: 'Contract NFT: chain_id not found',
      };
    } catch (error: any) {
      logger.error('getNftInformation ' + error.message);
      return {
        status: false,
        message: 'Contract NFT: false when getNftInformation',
      };
    }
  }
  public async getContractNFTs(
    chain_id: string,
    contract_address: string,
  ): Promise<Some<GetContractNFTsResponseAdapter>> {
    try {
      const moralis = await Singleton.getMoralisInstance();
      // const findChain = EvmChain.create(chain_id, moralis.core);
      const metadata = await moralis.EvmApi.nft.getContractNFTs({
        chain: chain_id,
        address: contract_address,
      });
      if (!metadata.result) {
        return {
          status: false,
          message: 'Contract NFT: contract not found',
        };
      }
      return {
        status: true,
        data: metadata as any,
      };
      return {
        status: false,
        message: 'Contract NFT: chain_id not found',
      };
    } catch (error: any) {
      logger.error('getContractNFTs ' + error.message);
      return {
        status: false,
        message: 'Contract NFT: false when getContractNFTs',
      };
    }
  }

  public async getTokenOwners(chain_id: string, contract_address: string, tokenId: string) {
    try {
      const moralis = await Singleton.getMoralisInstance();
      // const findChain = EvmChain.create(chain_id, moralis.core);
      let nftOwners: any = await moralis.EvmApi.nft.getNFTTokenIdOwners({
        chain: chain_id,
        address: contract_address,
        tokenId,
      });
      if (!nftOwners.result) {
        return [];
      }
      // const filteredResult = nftOwners.result.filter((owner) => {(owner.ownerOf != undefined)})
      return nftOwners.result.map((owner: any) => owner.ownerOf?.lowercase || '');
    } catch (error: any) {
      logger.error('getTokenOwners', error.message);
      return [];
    }
  }

  public async isTokenOwned(chain_id: string, contract_address: string, address: string) {
    try {
      const contractNft = await this.getContractNFTs(chain_id, contract_address);

      if (contractNft.status) {
        const listToken = contractNft.data?.result;
        if (!listToken) {
          return false;
        }
        let listOwner: string[] = [];
        listOwner = await Promise.all(
          listToken.map(token => {
            return this.getTokenOwners(chain_id, contract_address, token.tokenId.toString());
          }),
        );
        listOwner = [...new Set(listOwner.flat())];
        return listOwner.includes(address.toLowerCase());
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  public async getSupportedChain() {
    const chains = Constant.SUPPORTED_CHAIN;

    return chains ? chains : {};
  }
}
export { StickerService };
