import Web3 from 'web3';

const web3 = new Web3(`${process.env.WEB3_PROVIDER_URI}`);

const newContract = (abi: any, address: string) => {
  return new web3.eth.Contract(abi, address);
};

export { web3, newContract };
