import { ABI_MUSIC, ABI_CHAT } from '@constants';
import Web3 from 'web3';
import { Contract } from 'web3-eth/node_modules/web3-eth-contract/types/index';

const web3 = new Web3(`${process.env.NETWORK_RPC}`);

const newContract = (abi: any, address: string): Contract => {
  return new web3.eth.Contract(abi, address);
};

const MusicContract = newContract(ABI_MUSIC.Music.abi, ABI_MUSIC.Music.address);
const MarketContract = newContract(ABI_MUSIC.MusicMarket.abi, ABI_MUSIC.MusicMarket.address);
const ChatMarketContract = newContract(ABI_CHAT.ChatMarket.abi, ABI_CHAT.ChatMarket.address);
export { web3, newContract, MusicContract, MarketContract, ChatMarketContract };
