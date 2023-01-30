import PolygonIcon from "../assets/icon-polygon.svg";
import PolygonIcon2 from "../assets/icon-polygon-2.svg";

const chainParams = {
  137: {
    chainId: "0x89",
    chainName: "Polygon Matic",
    nativeCurrency: { name: "Matic", symbol: "MATIC", decimals: 18 },
    rpcUrls: ["https://polygon-rpc.com/"],
    blockExplorerUrls: ["https://www.polygonscan.com/"],
    iconUrls: [""],
  },

  80001: {
    chainId: "0x13881",
    chainName: "Mumbai",
    nativeCurrency: { name: "Matic", symbol: "MATIC", decimals: 18 },
    rpcUrls: ["https://matic-mumbai.chainstacklabs.com"],
    blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
    iconUrls: [""],
  },
};

const chainDecimalsToHex = {
  137: "0x89",
  80001: "0x13881",
};

export async function switchChain(chainId) {
  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [
        {
          chainId: chainDecimalsToHex[chainId],
        },
      ],
    });
  } catch (error) {
    if (error.message.includes("Unrecognized chain ID")) {
      await addChain(chainId);
    }
  }
}

export async function addChain(chainId) {
  try {
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [chainParams[chainId]],
    });
    return null;
  } catch (error) {
    console.log("add error: ", error);
  }
}

export const networkLabelToChainId = {
  mumbai: 80001,
};

export const chainIdToName = {
  "0x13881": "mumbai",
};

export const chainIdToIcon = {
  80001: {
    icon: <PolygonIcon2 />,
  },
};

const supportedChains = {
  80001: {
    id: "matic-network",
    label: "mumbai",
    name: "Polygon (Testnet)",
    icon: <PolygonIcon />,
    symbol: "Matic",
    explorer: "https://mumbai.polygonscan.com/address",
    networkId: 80001,
    livePrice: "https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=usd",
    add: () => addChain(80001),
    isMainnet: false,
    switch: () => switchChain(80001),
    coinGeckoLabel: "matic-network",
  },
};

// 137: {
//   id: "matic-network",
//   label: "Polygon",
//   name: "Polygon",
//   explorer: "https://polygonscan.com/address",
//   icon: polygonIcon,
//   symbol: "MATIC",
//   networkId: 137,
//   livePrice:
//     "https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=usd",
//   add: () => addChain(137),
//   isMainnet: true,
//   switch: () => switchChain(137),
//   coinGeckoLabel: "matic-network",
// },

export default supportedChains;
