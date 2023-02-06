import Web3 from 'web3';

const web3 = new Web3(`${process.env.NETWORK_RPC}`);

const newContract = (abi: any, address: string): any => {
  return new web3.eth.Contract(abi, address);
};

export { web3, newContract };
