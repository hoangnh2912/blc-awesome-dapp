import { ChainId, DeployEvent, ThirdwebSDK } from "@thirdweb-dev/sdk";
import { ContractInterface } from "ethers";

const deployContract = async (
  sdk: ThirdwebSDK,
  abi: ContractInterface,
  bytecode: string,
  contractParams: any[] = []
): Promise<
  DeployEvent & {
    deployed: () => Promise<DeployEvent>;
  }
> => {
  return new Promise(async (resolve, reject) => {
    try {
      const callBackDeploy = (event: DeployEvent) => {
        resolve({
          ...event,
          deployed: () =>
            new Promise((resolveDeployed, _rejectDeployed) => {
              const callBackDeployed = (eventDeployed: DeployEvent) => {
                if (eventDeployed.status == "completed") {
                  sdk.deployer.removeAllDeployListeners();
                  resolveDeployed(eventDeployed);
                }
              };
              sdk.deployer.addDeployListener(callBackDeployed);
            }),
        });
      };
      sdk.deployer.addDeployListener(callBackDeploy);
      await sdk.deployer.deployContractWithAbi(abi, bytecode, contractParams);
    } catch (error) {
      reject(error);
    }
  });
};

const addNetwork = async () => {
  try {
    let ethereum = window.ethereum;
    if (ethereum) {
      const tx = await ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: `0x${ChainId.Mumbai.toString(16)}`,
            chainName: "Mumbai Testnet",
            nativeCurrency: {
              name: "Matic",
              symbol: "MATIC",
              decimals: 18,
            },
            rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
            blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
          },
        ],
      });
      if (tx) {
        console.log(tx);
      }
    }
  } catch (error: any) {
    console.log("addNetwork error", error.message);
  }
};

export { deployContract, addNetwork };
