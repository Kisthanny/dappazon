import { expect } from "chai";
import hre from "hardhat";
const tokens = (n: number | string) => {
  return hre.ethers.parseUnits(n.toString(), "ether");
};

describe("Dappazon", () => {
  it("has a name", async () => {
    const Dappazon = await hre.ethers.getContractFactory("Dappazon")
    const dappazon = await Dappazon.deploy();
    const name = await dappazon.name();
    expect(name).to.be.equal("Dappazon");
  });
});
