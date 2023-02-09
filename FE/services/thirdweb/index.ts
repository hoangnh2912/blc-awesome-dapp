import { DeployEvent, ThirdwebSDK } from "@thirdweb-dev/sdk";
import { ContractInterface } from "ethers";

const deployContract = async (
  sdk: ThirdwebSDK,
  abi: ContractInterface,
  bytecode: string,
  contractParams: string[] = []
): Promise<
  DeployEvent & {
    deployed: () => Promise<DeployEvent>;
  }
> => {
  return new Promise(async (resolve, _reject) => {
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
  });
};

export { deployContract };
