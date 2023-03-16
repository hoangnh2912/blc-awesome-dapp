require("dotenv").config();
const { ethers } = require("hardhat");
const fs = require("fs");
async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Contracts = [
    {
      name: "MUC",
      args: [],
      path: "music",
    },
    {
      name: "Music",
      args: [],
      path: "music",
    },
    {
      name: "MusicMarket",
      args: ["MUC:address"],
      path: "music",
      after: [
        {
          contract: "Music",
          name: "grantRole",
          args: [
            "0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6",
            "MusicMarket:address",
          ],
        },
      ],
    },
  ];
  let contractDeployed = {};
  for (let i = 0; i < Contracts.length; i++) {
    const contract = Contracts[i];
    const contractFactory = await ethers.getContractFactory(contract.name);

    const inputContract = contract.args.map((arg) => {
      if (arg.includes(":")) {
        const [name, type] = arg.split(":");
        return contractDeployed[name][type];
      } else {
        return arg;
      }
    });
    const deployContract = await contractFactory.deploy(...inputContract);

    await deployContract.deployed();

    const contractCompileFilePath = `../build/contracts/${contract.name}.json`;
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
    if (contract.after) {
      for (const interact of contract.after) {
        const contractInteract = await ethers.getContractFactory(
          interact.contract
        );
        const contractInteractInstance = await contractInteract.attach(
          contractDeployed[interact.contract].address
        );

        const inputInteract = interact.args.map((arg) => {
          if (arg.includes(":")) {
            const [name, type] = arg.split(":");
            return contractDeployed[name][type];
          } else {
            return arg;
          }
        });
        await contractInteractInstance[interact.name](...inputInteract);
        console.log(
          `Interact ${interact.name} with ${interact.contract}, args: ${inputInteract}`
        );
      }
    }
  }

  // deploy contracts

  fs.writeFileSync("./abi-music.json", JSON.stringify(contractDeployed));
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
