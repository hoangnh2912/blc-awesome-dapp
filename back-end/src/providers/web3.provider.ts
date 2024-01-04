import { ABI_MUSIC, ABI_CHAT } from '@constants';
import Web3 from 'web3';
// import { Contract } from 'web3-eth/node_modules/web3-eth-contract/types/index';
import { logger } from '@constants';
import { ethers, Contract as EthersContract } from 'ethers';
import { Contract } from 'web3-eth/node_modules/web3-eth-contract';

const web3 = new Web3(`${process.env.NETWORK_RPC}`);

const newContract = (abi: any, address: string): Contract => {
  return new web3.eth.Contract(abi, address);
};

const newEthersContract = (abi: any, address: string): EthersContract => {
  const provider = new ethers.providers.JsonRpcProvider(`${process.env.NETWORK_RPC}`);
  return new ethers.Contract(address, abi, provider);
}

const getBlockByNumber = async (blockNumber: number) => {
  return await web3.eth.getBlock(blockNumber);
};

const MusicContract = newContract(ABI_MUSIC.Music.abi, ABI_MUSIC.Music.address);
const MarketContract = newContract(ABI_MUSIC.MusicMarket.abi, ABI_MUSIC.MusicMarket.address);
const ChatMarketContract = newContract(ABI_CHAT.ChatMarket.abi, ABI_CHAT.ChatMarket.address);
const stickerContract = newContract(ABI_CHAT.Sticker.abi, ABI_CHAT.Sticker.address);
const CidContract = newContract(ABI_CHAT.CID.abi, ABI_CHAT.CID.address);
const ChatMindRewardContract = newContract(ABI_CHAT.CMD.abi, ABI_CHAT.CMD.address);
const ChatMindRewardEthersContract = newEthersContract(ABI_CHAT.CMD.abi, ABI_CHAT.CMD.address);

const sendTransaction = async (
  contract: any,
  method: string,
  params: any[],
  from: string,
  to: string,
) => {
  logger.info(`Sending transaction to ${to} with method ${method} and params ${params}`);
  const encodeABI = contract.methods[method](...params).encodeABI();
  const signedTx = await web3.eth.accounts.signTransaction(
    {
      data: encodeABI,
      from,
      to,
      gas: 3000000,
    },
    `${process.env.PRIVATE_KEY}`,
  );
  if (signedTx.rawTransaction) await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
};

export {
  web3,
  newContract,
  MusicContract,
  MarketContract,
  ChatMarketContract,
  ChatMindRewardContract,
  ChatMindRewardEthersContract,
  stickerContract,
  CidContract,
  sendTransaction,
  getBlockByNumber
};
