require("dotenv").config();
const { ethers } = require("hardhat");
const fs = require("fs");
async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Contracts = [
    {
      name: "Secp256k1",
      args: [],
      path:'library'
    },
    {
      name: "StealAddress",
      args: [],
      link: "Secp256k1",
      path:'steal-address'
    },
  ];
  let contractDeployed = {};
  for (let i = 0; i < Contracts.length; i++) {
    const contract = Contracts[i];
    const contractFactory = await ethers.getContractFactory(contract.name, {
      ...(!!contract.link && {
        libraries: {
          [contract.link]: contractDeployed[contract.link].address,
        },
      }),
    });
    const deployContract = await contractFactory.deploy();
    await deployContract.deployed();

    const contractCompileFilePath = `../build/contracts/${contract.name}.json`;
    contractDeployed[contract.name] = {
      address: deployContract.address,
      abi: require(contractCompileFilePath).abi,
      contractName: require(contractCompileFilePath).contractName,
      path: contract.path,
    };
    console.log(
      `The contract ${
        contractDeployed[contract.name].contractName
      } has been deployed to: ${deployContract.address}`
    );
  }

  // deploy contracts

  fs.writeFileSync("./config.json", JSON.stringify(contractDeployed));
  // log deploy contracts
  Object.values(contractDeployed).forEach((contract) => {});
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
  // The contract Secp256k1 has been deployed to: 0x45B4561C5451161050b1cA29B78785F00Faad872
  // The contract StealAddress has been deployed to: 0x650Bf48a001F77D15b192184D820b9cca9836B8a