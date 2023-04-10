import "dotenv/config";
import { ethers } from "hardhat";
import musicData from "../data/music.json"
import abiMusic from "../abi-music.json"
async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Interact contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());
  const contractFactory = await ethers.getContractFactory("MusicMarket");
  const contractInteractInstance = await contractFactory.attach(
    abiMusic.MusicMarket.address
  );

  const chunkSize = 50;
  for (let i = 0; i < musicData.length; i += chunkSize) {
    const chunk = musicData.slice(i, i + chunkSize);
    await contractInteractInstance.listSongs(
      chunk.map((item) => item.id),
      chunk.map((item) => item.price),
      chunk.map((item) => item.amount),
      chunk.map((item) => item.uri)
    );
    console.log("Listed song", chunk.length);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
