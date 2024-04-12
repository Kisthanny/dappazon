import { BigNumberish, Contract, ethers } from "ethers"
import ContractConfig from "../config";
import DappazonAbi from "../abis/Dappazon.json"

import { Dappazon } from "../../typechain-types/Dappazon"

export type DappazonProduct = {
    id: BigNumberish;
    name: string;
    category: string;
    image: string;
    cost: string;
    rating: BigNumberish;
    stock: BigNumberish;
};

export type Order = {
    time: BigNumberish;
    item: DappazonProduct;
};

export const getProvider = () => {
    if (window.ethereum === undefined) {
        return ethers.getDefaultProvider();
    }
    return new ethers.BrowserProvider(window.ethereum)
}

export const getSigner = async () => {
    if (window.ethereum === undefined) {
        throw new Error('Please install Metamask')
    }
    const provider = new ethers.BrowserProvider(window.ethereum);
    return await provider.getSigner();
}

export const formatTimestamp = (timestamp: BigNumberish) => {
    return new Date(
        Number(timestamp.toString() + "000")
    ).toLocaleDateString(undefined, {
        weekday: "long",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
    });
}

export const getDappazon = () => {
    const dappazon = new Contract(
        ContractConfig[31337].dappazon.address,
        DappazonAbi,
        getProvider()
    );
    return dappazon as unknown as Dappazon
}

export const computeBestSellers = (list: DappazonProduct[]) => {
    return [
        {
            name: "Clothing & Jewelry",
            hash: "#clothing",
            productList: list.filter((item) => item.category === "clothing"),
        },
        {
            name: "Electronics & Gadgets",
            hash: "#electronics",
            productList: list.filter((item) => item.category === "electronics"),
        },
        {
            name: "Toys & Gaming",
            hash: "#toys",
            productList: list.filter((item) => item.category === "toys"),
        },
    ];
};
export const dappazonBuy = async (product: DappazonProduct) => {
    const dappazon = getDappazon();
    const signer = await getSigner();
    const transaction = await dappazon.connect(signer).buy(product.id, { value: product.cost })
    await transaction.wait();
}

export const getOrders = async () => {
    const dappazon = getDappazon();
    const signer = await getSigner();
    const orderCount = await dappazon.orderCount(signer.address);
    const orderList = [] as Order[];
    for (let orderIndex = 1; orderIndex <= orderCount; orderIndex++) {
        const order = await dappazon.orders(signer.address, orderIndex)
        orderList.push(order as unknown as Order)
    }
    return orderList;
}