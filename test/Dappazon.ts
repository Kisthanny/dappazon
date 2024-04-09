import { expect } from "chai";
import { ContractTransactionResponse } from "ethers";
import hre from "hardhat";
import { Dappazon } from "../typechain-types";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";

const tokens = (n: number | string) => {
  return hre.ethers.parseUnits(n.toString(), "ether");
};

// Global constants for listing an item...
const ID = 1;
const NAME = "Shoes";
const CATEGORY = "Clothing";
const IMAGE =
  "https://ipfs.io/ipfs/QmTYEboq8raiBs7GTUg2yLXB3PMz6HuBNgNfSZBx5Msztg/shoes.jpg";
const COST = tokens(1);
const RATING = 4;
const STOCK = 5;

describe("Dappazon", () => {
  let dappazon: Dappazon & {
    deploymentTransaction(): ContractTransactionResponse;
  };
  let deployer: HardhatEthersSigner;
  let buyer: HardhatEthersSigner;
  let randomDude: HardhatEthersSigner;

  beforeEach(async () => {
    // Setup accounts
    [deployer, buyer, randomDude] = await hre.ethers.getSigners();

    // Deploy contract
    const Dappazon = await hre.ethers.getContractFactory("Dappazon");
    dappazon = await Dappazon.connect(deployer).deploy();
  });

  describe("Deployment", () => {
    it("Updates ownership", async () => {
      const owner = await dappazon.owner();
      expect(owner).to.equal(deployer.address);
    });
  });

  describe("Listing", () => {
    let transaction: ContractTransactionResponse;
    beforeEach(async () => {
      // List an item
      transaction = await dappazon
        .connect(deployer)
        .list(ID, NAME, CATEGORY, IMAGE, COST, RATING, STOCK);
      await transaction.wait();
    });
    it("Stored item", async () => {
      const beer = await dappazon.itemList(1);
      expect(beer.id).is.equal(ID);
      expect(beer.name).is.equal(NAME);
      expect(beer.catagory).is.equal(CATEGORY);
      expect(beer.image).is.equal(IMAGE);
      expect(beer.cost).is.equal(COST);
      expect(beer.rating).is.equal(RATING);
      expect(beer.stock).is.equal(STOCK);
    });
    it("Emits List event", () => {
      expect(transaction).to.emit(dappazon, "List");
    });
    it("Only Owner could List", async () => {
      try {
        transaction = await dappazon
          .connect(randomDude)
          .list(ID + 1, NAME, CATEGORY, IMAGE, COST, RATING, STOCK);
        await transaction.wait();
      } catch (error) {
        expect(error.message).to.include("Only Owner can List product");
        return;
      }
      expect.fail("randomDude should not be able to list");
    });
  });
});
