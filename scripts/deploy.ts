import hre from "hardhat";
import listItems from "./listItems";

const tokens = (n: number | string) => {
  return hre.ethers.parseUnits(n.toString(), "ether");
};

async function main() {
  // Setup accounts
  const [deployer] = await hre.ethers.getSigners();

  // Deploy Dappazon
  const Dappazon = await hre.ethers.getContractFactory("Dappazon");
  const dappazon = await Dappazon.connect(deployer).deploy();
  const address = await dappazon.getAddress();

  console.log(`Deployed Dappazon Contract at ${address}\n`)

  await listItems(deployer, dappazon);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
