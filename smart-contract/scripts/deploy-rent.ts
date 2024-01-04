import "dotenv/config";
import fs from "fs";
import { ethers } from "hardhat";
async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Contracts = [
    {
      name: "RentToken",
      args: ["Scimta Rent", "SRE"],
      path: "rent",
    },
    {
      name: "RentMarket",
      args: [
        "10",
        process.env.ADMIN_WALLET,
        "RentToken:address",
        "0x4b137a387D2b4734013D6F78B4bC01aa25BD48bf",
      ],
      path: "rent",
    },
  ];
  let contractDeployed: any = {};
  for (let i = 0; i < Contracts.length; i++) {
    const contract = Contracts[i];
    const contractFactory = await ethers.getContractFactory(contract.name);
    const inputContract = contract.args.map((arg) => {
      if (arg?.includes(":")) {
        const [name, type] = arg.split(":");
        return contractDeployed[name][type];
      } else {
        return arg;
      }
    });
    const deployContract = await contractFactory.deploy(...inputContract);
    await deployContract.deployed();
    const contractCompileFilePath = `../artifacts/contracts/rent/${contract.name}.sol/${contract.name}.json`;
    contractDeployed[contract.name] = {
      address: deployContract.address,
      abi: require(contractCompileFilePath).abi,
      contractName: require(contractCompileFilePath).contractName,
      input: inputContract,
      path: contract.path,
    };
    console.log(
      `The contract ${
        contractDeployed[contract.name].contractName
      } has been deployed to: ${
        deployContract.address
      } with constructor param ${inputContract}`
    );
  }
  fs.writeFileSync("./abi-rent.json", JSON.stringify(contractDeployed));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
