import { Contract, ethers } from "ethers"
import ContractConfig from "../config";
import DappazonAbi from "../abis/Dappazon.json"
import { DappazonProduct } from "../components/Product";

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
    return provider.getSigner();
}

export const getDappazon = () => {
    return new Contract(
        ContractConfig[31337].dappazon.address,
        DappazonAbi,
        getProvider()
    );
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
            name: "Toys & Robots",
            hash: "#toys",
            productList: list.filter((item) => item.category === "toys"),
        },
    ];
};