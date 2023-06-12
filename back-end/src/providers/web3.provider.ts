import Web3 from 'web3';
import { Contract } from 'web3-eth/node_modules/web3-eth-contract';

const web3 = new Web3(`${process.env.NETWORK_RPC}`);

const newContract = (abi: any, address: string): Contract => {
  return new web3.eth.Contract(abi, address);
};

const getBlockByNumber = async (blockNumber: number) => {
  return await web3.eth.getBlock(blockNumber);
};

const MusicContract = newContract([], '');
const MarketContract = newContract([], '');

export { web3, newContract, MusicContract, MarketContract, getBlockByNumber };
