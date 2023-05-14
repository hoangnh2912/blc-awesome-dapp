import "dotenv/config";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-etherscan";

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const API_KEY = process.env.API_KEY;
module.exports = {
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 999999,
      },
    },
  },
  networks: {
    mumbai: {
      url: process.env.NETWORK_RPC,
      accounts: [`${PRIVATE_KEY}`],
    },
    local: {
      url: "http://127.0.0.1:8545",
      accounts: [
        `0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e`,
      ],
    },
  },
  etherscan: {
    apiKey: API_KEY,
  },
};
