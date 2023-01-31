import axios from "axios";
import { ethers } from "ethers";
import { logError } from "./ipfs";
import supportedChains from "./supportedChains";

export const writeContract = async ({
  params: fetchParams,
  walletProvider,
  onError,
  onSuccess,
}) => {
  const { contractAddress, abi, functionName, params } = fetchParams;
  const provider = getWeb3Provider(walletProvider);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, abi, signer);
  try {
    const transactionResponse = await contract[functionName](...Object.values(params));
    onSuccess(transactionResponse);
    return transactionResponse;
  } catch (error) {
    onError(error);
  }
};

export const readContract = async ({ params: fetchParams, walletProvider, onError, onSuccess }) => {
  const { contractAddress, abi, functionName, params } = fetchParams;
  const provider = getWeb3Provider(walletProvider);
  const contract = new ethers.Contract(contractAddress, abi, provider);
  try {
    const transactionResponse = await contract[functionName](...Object.values(params));
    onSuccess(transactionResponse);
    return transactionResponse;
  } catch (error) {
    onError(error);
  }
};

export const getContractTransferEvents = async ({
  contractAddress,
  abi,
  startBlock,
  walletProvider,
}) => {
  const provider = getWeb3Provider(walletProvider);
  const contract = new ethers.Contract(contractAddress, abi, provider);
  const filter = contract.filters.Transfer(null, null, null);
  const res = await contract.queryFilter(filter, startBlock); //28927208
  return res.map((el) => el.args);
};

export const listenForTransferEvent = async ({ contractAddress, abi, onError, onSuccess }) => {
  try {
    const provider = new ethers.providers.WebSocketProvider(
      process.env.NEXT_PUBLIC_POLYGON_ALCHEMY_WSS_URL
    );
    const contract = new ethers.Contract(contractAddress, abi, provider);
    contract.on("Transfer", (from, to, tokenId) => {
      onSuccess(from, to, tokenId);
    });
  } catch (error) {
    onError(error);
  }
};

export const listenForTransactionMine = ({ transactionResponse, provider }) => {
  console.log(`Mining ${transactionResponse.hash}...`);
  return new Promise((resolve, reject) => {
    provider.once(transactionResponse.hash, (txReceipt) => {
      resolve(`Completed with ${txReceipt.confirmations} confirmations`);
    });
  });
};

export const formatAccount = (account, from = 6, to = 4) => {
  if (!account) return "---";
  let first = account.substring(0, from);
  let last = account.substring(account.length - to);
  return `${first}....${last}`;
};

export const getWeb3Provider = (walletProvider) => {
  let provider;
  if (window.localStorage.getItem("walletpreference") === "metamask") {
    provider = new ethers.providers.Web3Provider(window.ethereum);
  } else if (window.localStorage.getItem("walletpreference") === "walletconnect") {
    provider = new ethers.providers.Web3Provider(walletProvider);
  } else {
    provider = new ethers.providers.Web3Provider(window.ethereum);
  }
  return provider;
};

export const getContractOwner = async ({ contractAddress, abi, walletProvider }) => {
  const provider = getWeb3Provider(walletProvider);
  const contract = new ethers.Contract(contractAddress, abi, provider);
  return await contract.name();
};

export const getDuration = (seconds) => {
  let now = new Date();
  let date = new Date(seconds * 1000);
  let diff = (now.getTime() - date.getTime()) / (1000 * 3600 * 24);
  if (diff < 0.04) return parseInt(diff * 24 * 60) + " mins ago";
  else if (diff < 1) return parseInt(diff * 24) + " hours ago";
  else if (diff < 31) return parseInt(diff) + " days ago";
  else if (diff < 356) return parseInt(diff / 30) + " months ago";
  else return diff / 30 / 12 + " years ago";
};

export const getDate = (seconds) => {
  let date = new Date(seconds * 1000);
  date = date.toString().split(" ");
  date = date.slice(1, 4);
  date = date.join(" ");
  return date;
};

export const getDateTime = (seconds) => {
  let date = new Date(seconds * 1000);
  date = date.toString().split(" ");
  date = date.slice(1, 4);
  date = date.join(" ");
  return date;
};

export const getMaticUsdPrice = async (chainId) => {
  try {
    const res = await fetch(supportedChains[parseInt(chainId)].livePrice);
    const data = await res.json();
    const { usd } = data["matic-network"];
    return usd;
  } catch (error) {
    logError(error);
    return 0;
  }
};
