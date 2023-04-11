import { Constant, logger } from '@constants';
import { Synchronize } from '@schemas';
import cron from 'node-cron';
import { EventData } from 'web3-eth-contract';
import { Singleton, web3, MusicContract, MarketContract } from '.';

const globalVariable: any = global;

globalVariable.isSyncingGetDataFromSmartContract = false;
const onJobGetDataFromSmartContract = async () => {
  try {
    if (globalVariable.isSyncingGetDataFromSmartContract) return;
    globalVariable.isSyncingGetDataFromSmartContract = true;
    const lastSynchronize = await Synchronize.findOne().sort({ last_block_number: -1 }).limit(1);
    const last_block_number = (lastSynchronize?.last_block_number || 0) + 1;

    if (!last_block_number) {
      await Synchronize.create({
        last_block_number: 33395644,
      });
      return;
    }
    const listTxHash: string[] = [];
    const last_block_number_onchain = await web3.eth.getBlockNumber();

    await synchronizeMarket(last_block_number, last_block_number_onchain, listTxHash);
    await synchronizeMusic(last_block_number, last_block_number_onchain, listTxHash);
    if (listTxHash.length > 0) {
      await Synchronize.create({
        last_block_number: last_block_number_onchain,
        transactions: listTxHash,
      });
      logger.info(`Synchronized ${listTxHash.length} transactions`);
    } else {
      if (last_block_number_onchain - last_block_number > 500) {
        await Synchronize.create({
          last_block_number: last_block_number_onchain,
          transactions: [],
        });
      }
    }
  } catch (error: any) {
    logger.error(`onJobGetDataFromSmartContract: ${error.message}`);
  }
  globalVariable.isSyncingGetDataFromSmartContract = false;
};

const synchronizeMusic = async (
  last_block_number_sync: number,
  last_block_number_onchain: number,
  listTxHash: string[],
) => {
  const musicService = Singleton.getMusicInstance();
  const transferSingleEvents = await MusicContract.getPastEvents('TransferSingle', {
    fromBlock: last_block_number_sync,
    toBlock: last_block_number_onchain,
  });

  const transferBatchEvents = await MusicContract.getPastEvents('TransferBatch', {
    fromBlock: last_block_number_sync,
    toBlock: last_block_number_onchain,
  });

  for (const value of transferSingleEvents) {
    if (value.returnValues.from == Constant.ZERO_ADDRESS) {
      await musicService.mintEvent(value.returnValues.to.toLowerCase(), value.returnValues.id);
    } else {
      await musicService.transferEvent(
        value.returnValues.from.toLowerCase(),
        value.returnValues.to.toLowerCase(),
        value.returnValues.id,
      );
    }
    listTxHash.push(value.transactionHash);
  }

  for (const value of transferBatchEvents) {
    if (value.returnValues.from == Constant.ZERO_ADDRESS) {
      await musicService.mintBatchEvent(
        value.returnValues.to.toLowerCase(),
        value.returnValues.ids,
      );
    } else {
      await musicService.transferBatchEvent(
        value.returnValues.from.toLowerCase(),
        value.returnValues.to.toLowerCase(),
        value.returnValues.ids,
      );
    }
    listTxHash.push(value.transactionHash);
  }
};

const sortByTransactionIndex = (a: EventData, b: EventData) =>
  a.transactionIndex - b.transactionIndex;

const synchronizeMarket = async (
  last_block_number_sync: number,
  last_block_number_onchain: number,
  listTxHash: string[],
) => {
  const marketService = Singleton.getMarketInstance();
  const getPastEventsConfig = {
    fromBlock: last_block_number_sync,
    toBlock: last_block_number_onchain,
  };
  const [eventListSong, eventBuySong] = await Promise.all([
    MarketContract.getPastEvents(Constant.MUSIC_MARKET_EVENT.ListSong, getPastEventsConfig),
    MarketContract.getPastEvents(Constant.MUSIC_MARKET_EVENT.BuySong, getPastEventsConfig),
  ]);

  const listListSongUpdate = eventListSong.sort(sortByTransactionIndex).map(e => ({
    id: e.returnValues['id'],
    seller: e.returnValues['seller'],
    price: web3.utils.fromWei(e.returnValues['price'], 'ether'),
    amount: e.returnValues['amount'],
    uri: e.returnValues['uri'],
  }));

  const listBuySongUpdate = eventBuySong.sort(sortByTransactionIndex).map(e => ({
    id: e.returnValues['id'],
    buyer: e.returnValues['buyer'],
  }));

  listTxHash.push(...eventListSong.map(e => e.transactionHash));
  listTxHash.push(...eventBuySong.map(e => e.transactionHash));

  for (const priceUpdate of listListSongUpdate) {
    try {
      await marketService.listSong(
        priceUpdate.id,
        priceUpdate.seller.toLowerCase(),
        priceUpdate.price,
        priceUpdate.amount,
        priceUpdate.uri,
      );
    } catch (error: any) {
      logger.error(`Can not update market for music: ${priceUpdate.id}, error: ${error.message}`);
    }
  }

  for (const buyUpdate of listBuySongUpdate) {
    try {
      await marketService.createBuyHistory(buyUpdate.id, buyUpdate.buyer);
    } catch (error: any) {
      logger.error(`Can not update market for music: ${buyUpdate.id}, error: ${error.message}`);
    }
  }
};

const startSynchronizeDataFromSmartContract = () => {
  cron.schedule('*/6 * * * * *', onJobGetDataFromSmartContract);
};

export { startSynchronizeDataFromSmartContract };
