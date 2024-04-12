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
const INSUFFICIENT_FUND = tokens(0.5);

describe("Dappazon", () => {
  let dappazon: Dappazon & {
    deploymentTransaction(): ContractTransactionResponse;
  };
  let dappazonAddress: string;
  let deployer: HardhatEthersSigner;
  let buyer: HardhatEthersSigner;
  let randomDude: HardhatEthersSigner;

  beforeEach(async () => {
    // Setup accounts
    [deployer, buyer, randomDude] = await hre.ethers.getSigners();

    // Deploy contract
    const Dappazon = await hre.ethers.getContractFactory("Dappazon");
    dappazon = await Dappazon.connect(deployer).deploy();
    dappazonAddress = await dappazon.getAddress();
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
      expect(beer.category).is.equal(CATEGORY);
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
        expect((error as Error).message).to.include("Only Owner");
        return;
      }
      expect.fail("randomDude should not be able to list");
    });
  });

  describe("Buying", () => {
    let transaction: ContractTransactionResponse;
    beforeEach(async () => {
      // List an item
      transaction = await dappazon
        .connect(deployer)
        .list(ID, NAME, CATEGORY, IMAGE, COST, RATING, STOCK);
      await transaction.wait();
    });
    it("Check Item Exist", async () => {
      try {
        transaction = await dappazon
          .connect(buyer)
          .buy(ID + 1, { value: COST });
        await transaction.wait();
      } catch (error) {
        expect((error as Error).message).to.include("Item not exist");
        return;
      }
      expect.fail("insufficient funds should failed");
    });
    it("Check value", async () => {
      try {
        transaction = await dappazon
          .connect(buyer)
          .buy(ID, { value: INSUFFICIENT_FUND });
        await transaction.wait();
      } catch (error) {
        expect((error as Error).message).to.include("Insufficient Funds");
        return;
      }
      expect.fail("insufficient funds should failed");
    });

    describe("Paid", () => {
      let _transaction: ContractTransactionResponse;
      beforeEach(async () => {
        _transaction = await dappazon.connect(buyer).buy(ID, { value: COST });
        await _transaction.wait();
      });
      it("Updates the contract balance", async () => {
        const balance = await hre.ethers.provider.getBalance(dappazonAddress);
        expect(balance).is.equal(COST);
      });
      it("Create an Order", async () => {
        const orderCount = await dappazon.orderCount(buyer.address);
        expect(orderCount).is.equal(1);

        const order = await dappazon.orders(buyer.address, orderCount);
        expect(order.time).to.be.greaterThan(0);
        expect(order.item.name).to.be.equal(NAME);
      });
      it("Substrack stock", async () => {
        const stock = (await dappazon.itemList(ID)).stock;
        expect(stock).is.equal(STOCK - 1);
      });
      it("Emits Buy event", async () => {
        const orderCount = await dappazon.orderCount(buyer.address);
        expect(_transaction)
          .to.emit(dappazon, "Buy")
          .withArgs(buyer.address, orderCount, ID);
      });
    });
  });

  describe("Withdrawing", () => {
    let transaction: ContractTransactionResponse;
    let balanceBefore: BigInt;
    beforeEach(async () => {
      // List
      transaction = await dappazon
        .connect(deployer)
        .list(ID, NAME, CATEGORY, IMAGE, COST, RATING, STOCK);
      await transaction.wait();
      // Buy
      transaction = await dappazon.connect(buyer).buy(ID, { value: COST });
      await transaction.wait();
      // Record status
      balanceBefore = await hre.ethers.provider.getBalance(deployer.address);
    });
    it("Only Seller", async () => {
      try {
        transaction = await dappazon.connect(randomDude).withdraw();
        await transaction.wait();
      } catch (error) {
        expect((error as Error).message).to.include("Only Owner");
        return;
      }
      expect.fail("Only seller could withdraw");
    });
    it("Updates the owner balance", async () => {
      transaction = await dappazon.connect(deployer).withdraw();
      await transaction.wait();
      const balanceAfter = await hre.ethers.provider.getBalance(
        deployer.address
      );
      expect(balanceAfter).to.be.greaterThan(Number(balanceBefore));
    });
    it("Updates the contract balance", async () => {
      transaction = await dappazon.connect(deployer).withdraw();
      await transaction.wait();
      const balance = await hre.ethers.provider.getBalance(dappazonAddress);
      expect(balance).to.be.equal(0);
    });
  });
});
