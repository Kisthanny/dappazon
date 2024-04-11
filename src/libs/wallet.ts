import { ethers } from "ethers";

export const requestAccounts = async () => {
    try {
        const ethereum = window.ethereum;
        if (ethereum === undefined) {
            throw new Error("Please install Metamask");
        }
        const accounts = await ethereum.request({
            method: "eth_requestAccounts",
        })
        return accounts;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const getAccounts = async () => {
    try {
        const ethereum = window.ethereum;
        if (ethereum === undefined) {
            throw new Error("Please install Metamask");
        }
        const accounts = await ethereum.request({
            method: "eth_accounts",
        })
        return accounts;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const formatAddress = (address: string) => {
    if (address.length < 8) {
        return address;
    }
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export const onAccountsChanged = (fn: Function) => {
    try {
        const ethereum = window.ethereum;
        if (ethereum === undefined) {
            throw new Error("Please install Metamask");
        }
        ethereum.on("accountsChanged", fn)
    } catch (error) {
        console.error(error);
    }
}