import hre from 'hardhat'
import { ContractTransactionResponse } from "ethers";
import { Dappazon } from "../typechain-types";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { items } from "../src/items.json";
const tokens = (n: number | string) => {
    return hre.ethers.parseUnits(n.toString(), "ether");
};
const listItems = async (signer: HardhatEthersSigner, dappazon: Dappazon & {
    deploymentTransaction(): ContractTransactionResponse;
}) => {
    for (let i = 0; i < items.length; i++) {
        const { id, name, category, image, price, rating, stock } = items[i]
        const transaction = await dappazon.connect(signer).list(id, name, category, image, tokens(price), rating, stock);
        await transaction.wait();
        console.log(`Listed Item ${id}: ${name}`)
    }
}

export default listItems