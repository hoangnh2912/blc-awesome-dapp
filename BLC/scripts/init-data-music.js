require("dotenv").config();
const { ethers } = require("hardhat");
const musicData = require("../data/music.json");
const abiMusic = require("../abi-music.json");
async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Interact contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());
  const contractFactory = await ethers.getContractFactory("MusicMarket");
  const contractInteractInstance = await contractFactory.attach(
    abiMusic.MusicMarket.address
  );

  for (let i = 0; i < musicData.length; i++) {
    await contractInteractInstance.listSongs(
      [musicData[i].id],
      [musicData[i].price],
      [musicData[i].amount],
      [musicData[i].uri]
    );
    console.log("Listed song", i + 1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
