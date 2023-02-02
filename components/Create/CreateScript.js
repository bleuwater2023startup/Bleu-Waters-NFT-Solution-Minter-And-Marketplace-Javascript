import pinataSDK from "@pinata/sdk";
import { NFTStorage } from "nft.storage";
require("dotenv").config();
const NFT_STORAGE_KEY = process.env.NEXT_PUBLIC_NFT_STORAGE_API_KEY;
const PINATA_API_KEY = process.env.NEXT_PUBLIC_PINATA_API_KEY;
const PINATA_API_SECRET = process.env.NEXT_PUBLIC_PINATA_API_SECRET;
const PINATA_API_JWT = process.env.NEXT_PUBLIC_JWT;
const pinata = new pinataSDK(PINATA_API_KEY, PINATA_API_SECRET);

import { getWeb3Provider, readContract, writeContract } from "../../utils";
import {
  ERC1155_EXTENSION_ABI,
  MINTER_ABI,
  NFT_MARKETPLACE,
  NFT_MARKETPLACE_ABI,
  NFT_MINTER_FACTORY,
  NFT_MINTER_FACTORY_ABI,
  PAYMENT_SPLITTER_ABI,
  PAYMENT_SPLITTER_FACTORY,
  PAYMENT_SPLITTER_FACTORY_ABI,
} from "../../CONSTACTS";
import { setLoadingScreen, setNotification } from "../../context/state.actions";
import {
  ipfsErrorUploadMessage,
  ipfsSuccessUploadMessage,
  ipfsUploadMessage,
} from "./Inputs/InputScript";
import { ethers } from "ethers";

export const handleCreateCollection = async ({
  walletProvider,
  contractName,
  symbol,
  type,
  account,
  chainId,
  dispatch,
}) => {
  const options = {
    abi: NFT_MINTER_FACTORY_ABI,
    contractAddress: NFT_MINTER_FACTORY,
    functionName: "createCollection",
    params: {
      _name: contractName,
      _symbol: symbol,
      _type: type,
      _chainId: chainId,
    },
  };
  const txResponse = await writeContract({
    params: options,
    walletProvider,
    onError: (error) => {
      dispatch(
        setNotification({
          type: "error",
          message: error.message,
        })
      );
    },
    onSuccess: (tx) => console.log("Waiting for transaction..."),
  });
  if (txResponse) {
    await txResponse.wait();
    const res = await getUserCollections({ walletProvider, account });
    return res;
  }
  return null;
};

export const getUserCollections = async ({ walletProvider, account }) => {
  const options = {
    abi: NFT_MINTER_FACTORY_ABI,
    contractAddress: NFT_MINTER_FACTORY,
    functionName: "collectionsOf",
    params: {
      user: account,
    },
  };

  const res = await readContract({
    params: options,
    walletProvider,
    onError: (error) => {
      console.log("=====================================>", error.message);
      return null;
    },
    onSuccess: (tx) => {
      console.log({ tx });
    },
  });

  return await res;
};

export const handleMint = async ({
  walletProvider,
  collectionAddress,
  account,
  tokenId,
  ipfsUrl,
  mintType,
  dispatch,
}) => {
  const options = {
    abi: ERC1155_EXTENSION_ABI,
    contractAddress: collectionAddress,
  };

  if (mintType === "Single") {
    (options.functionName = "mint"),
      (options.params = {
        _to: account,
        _id: tokenId,
        _uri: ipfsUrl,
      });
  } else if (mintType === "Collection") {
    let ids = Array(ipfsUrl.length)
      .fill(null)
      .map((_, idx) => idx + Date.now());
    (options.functionName = "mintBatch"),
      (options.params = {
        _to: account,
        _ids: ids,
        _amounts: Array(ipfsUrl.length).fill(1),
        _uri: ipfsUrl,
      });
  } else {
    return console.log("unrecognised contract type");
  }

  const txResponse = await writeContract({
    params: options,
    walletProvider,
    onError: (error) => {
      dispatch(
        setNotification({
          type: "error",
          message: error.message,
        })
      );
    },
    onSuccess: (tx) => console.log("Waiting for transaction"),
  });

  if (txResponse) {
    let res = await txResponse.wait();
    return res;
  }
  return null;
};

export const handleCreatePaymentSplitter = async ({
  payees,
  shares,
  royaltyFee,
  collectionAddress,
  walletProvider,
  dispatch,
}) => {
  if (!payees.length || !shares.length) {
    return dispatch(
      setNotification({
        type: "error",
        message: "Please add royalty address or skip this process.",
      })
    );
  }
  const mulSharesBy100 = shares.map((s) => s * 100);
  const options = {
    abi: PAYMENT_SPLITTER_FACTORY_ABI,
    contractAddress: PAYMENT_SPLITTER_FACTORY,
    functionName: "createPaymentSplitter",
    params: {
      _payees: payees,
      _shares: mulSharesBy100,
    },
  };

  const txResponse = await writeContract({
    params: options,
    walletProvider,
    onError: (error) => {
      dispatch(
        setNotification({
          type: "error",
          message: error.message,
        })
      );
    },
    onSuccess: (tx) => console.log("Waiting for transaction..."),
  });
  // update the contract to include all payment splitter addresses
  if (txResponse) {
    await txResponse.wait();
    console.log("payment splitter contract created successfully");
    const paymentSplitterAddress = await getPaymentSplitterAddress({
      walletProvider,
    });
    console.log({ paymentSplitterAddress });
    const res = await handleSetRoyaltyInfo({
      collectionAddress,
      paymentSplitterAddress,
      royaltyFee,
      walletProvider,
      payees,
    });
    return paymentSplitterAddress;
    // return res;
  }
};

export const getPaymentSplitterAddress = async ({ walletProvider }) => {
  const options = {
    abi: PAYMENT_SPLITTER_FACTORY_ABI,
    contractAddress: PAYMENT_SPLITTER_FACTORY,
    functionName: "splitter",
    params: {},
  };

  const res = await readContract({
    params: options,
    walletProvider,
    onError: (error) => {
      dispatch(
        setNotification({
          type: "error",
          message: error.message,
        })
      );
    },
    onSuccess: (tx) => {
      console.log({ tx });
    },
  });

  return await res;
};

export const handleSetRoyaltyInfo = async ({
  collectionAddress,
  paymentSplitterAddress,
  royaltyFee,
  walletProvider,
  payees,
}) => {
  const options = {
    abi: ERC1155_EXTENSION_ABI,
    contractAddress: collectionAddress,
    functionName: "setRoyaltyInfo",
    params: {
      _paymentSplitter: paymentSplitterAddress,
      _payees: payees,
      _royaltyFeesInBips: royaltyFee * 100,
    },
  };

  const txResponse = await writeContract({
    params: options,
    walletProvider,
    onError: (error) => {
      dispatch(
        setNotification({
          type: "error",
          message: error.message,
        })
      );
    },
    onSuccess: (tx) => console.log("Waiting for transaction"),
  });

  if (txResponse) {
    let res = await txResponse.wait();
    return res;
  }
};

export const handleApproveAll = async ({ collectionAddress, walletProvider, dispatch }) => {
  const options = {
    abi: MINTER_ABI,
    contractAddress: collectionAddress,
    functionName: "setApprovalForAll",
    params: {
      operator: NFT_MARKETPLACE,
      approved: "true",
    },
  };

  const txResponse = await writeContract({
    params: options,
    walletProvider,
    onError: (error) => {
      dispatch(
        setNotification({
          type: "error",
          message: error.message,
        })
      );
    },
    onSuccess: (tx) => console.log("Waiting for transaction"),
  });

  if (txResponse) {
    let res = await txResponse.wait();
    return res;
  }
};

export const handleList = async ({
  account,
  nftAddress,
  tokenId,
  price,
  dispatch,
  walletProvider,
}) => {
  const isApprovedForAll = await getApprovedForAll({
    nftAddress,
    walletProvider,
    dispatch,
    account,
  });

  if (!isApprovedForAll) {
    const approvalRes = await handleApproveAll({
      collectionAddress: nftAddress,
      walletProvider,
      dispatch,
    });
  }

  const options = {
    abi: NFT_MARKETPLACE_ABI,
    contractAddress: NFT_MARKETPLACE,
    functionName: "listItem",
    params: {
      nftAddress,
      tokenId,
      price: ethers.utils.parseEther(price),
    },
  };

  const txResponse = await writeContract({
    params: options,
    walletProvider,
    onError: (error) => {
      console.log(error);
      dispatch(
        setNotification({
          type: "error",
          message: error.message,
        })
      );
    },
    onSuccess: (tx) => console.log("Waiting for transaction"),
  });

  if (txResponse) {
    let res = await txResponse.wait();
    return res;
  }
};

export const getApprovedForAll = async ({ walletProvider, nftAddress, account, dispatch }) => {
  const options = {
    abi: MINTER_ABI,
    contractAddress: nftAddress,
    functionName: "isApprovedForAll",
    params: {
      account,
      operator: NFT_MARKETPLACE,
    },
  };

  const res = await readContract({
    params: options,
    walletProvider,
    onError: (error) => {
      dispatch(
        setNotification({
          type: "error",
          message: error.message,
        })
      );
    },
    onSuccess: (tx) => {
      console.log({ tx });
    },
  });

  return await res;
};

export const handleCancelListing = async ({
  walletProvider,
  contractAddress,
  tokenId,
  dispatch,
}) => {
  const options = {
    abi: NFT_MARKETPLACE_ABI,
    contractAddress: NFT_MARKETPLACE,
    functionName: "cancelListing",
    params: {
      nftAddress: contractAddress,
      tokenId: tokenId,
    },
  };

  const txResponse = await writeContract({
    params: options,
    walletProvider,
    onError: (error) => {
      dispatch(
        setNotification({
          type: "error",
          message: error.message,
        })
      );
    },
    onSuccess: (tx) => console.log("Waiting for transaction"),
  });

  if (txResponse) {
    let res = await txResponse.wait();
    return res;
  }
};

export const handleTransfer = async ({
  contractAddress,
  receiver,
  tokenId,
  account,
  dispatch,
  walletProvider,
}) => {
  const options = {
    abi: MINTER_ABI,
    contractAddress,
    functionName: "safeTransferFrom",
    params: {
      from: account,
      to: receiver,
      id: tokenId,
      amount: 1,
      data: "0x",
    },
  };

  const txResponse = await writeContract({
    params: options,
    walletProvider,
    onError: (error) => {
      dispatch(
        setNotification({
          type: "error",
          message: error.message,
        })
      );
    },
    onSuccess: (tx) => console.log("Waiting for transaction"),
  });

  if (txResponse) {
    let res = await txResponse.wait();
    return res;
  }
};

export const handleUpdateListing = async ({
  nftAddress,
  tokenId,
  price,
  dispatch,
  walletProvider,
}) => {
  console.log(typeof price);
  const options = {
    abi: NFT_MARKETPLACE_ABI,
    contractAddress: NFT_MARKETPLACE,
    functionName: "updateListing",
    params: {
      nftAddress,
      tokenId,
      price: ethers.utils.parseEther(price),
    },
  };

  const txResponse = await writeContract({
    params: options,
    walletProvider,
    onError: (error) => {
      dispatch(
        setNotification({
          type: "error",
          message: error.message,
        })
      );
    },
    onSuccess: (tx) => console.log("Waiting for transaction"),
  });

  if (txResponse) {
    let res = await txResponse.wait();
    return res;
  }
};

export const handleBuyNFT = async ({ tokenId, value, nftAddress, dispatch, walletProvider }) => {
  const options = {
    abi: NFT_MARKETPLACE_ABI,
    contractAddress: NFT_MARKETPLACE,
    functionName: "buyItem",
    params: {
      nftAddress,
      tokenId,
      tokenAmount: 1,
      value: {
        value: ethers.utils.parseEther(value),
      },
    },
  };

  const txResponse = await writeContract({
    params: options,
    walletProvider,
    onError: (error) => {
      console.log(error);
      dispatch(
        setNotification({
          type: "error",
          message: error.message,
        })
      );
    },
    onSuccess: (tx) => console.log("Waiting for transaction"),
  });

  if (txResponse) {
    let res = await txResponse.wait();
    return res;
  }
};

export const getProceeds = async ({ walletProvider, account, dispatch }) => {
  const options = {
    abi: NFT_MARKETPLACE_ABI,
    contractAddress: NFT_MARKETPLACE,
    functionName: "getProceeds",
    params: {
      seller: account,
    },
  };

  const res = await readContract({
    params: options,
    walletProvider,
    onError: (error) => {
      dispatch(
        setNotification({
          type: "error",
          message: error.message,
        })
      );
    },
    onSuccess: (tx) => {
      console.log({ tx });
    },
  });

  return await res;
};

export const handleWithdraw = async ({ walletProvider, dispatch }) => {
  const options = {
    abi: NFT_MARKETPLACE_ABI,
    contractAddress: NFT_MARKETPLACE,
    functionName: "withdrawProceeds",
    params: {},
  };

  const txResponse = await writeContract({
    params: options,
    walletProvider,
    onError: (error) => {
      dispatch(
        setNotification({
          type: "error",
          message: error.message,
        })
      );
    },
    onSuccess: (tx) => console.log("Waiting for transaction"),
  });

  if (txResponse) {
    let res = await txResponse.wait();
    return res;
  }
};

export const getShares = async ({ splitterAddress, walletProvider, account, dispatch }) => {
  const options = {
    abi: PAYMENT_SPLITTER_ABI,
    contractAddress: splitterAddress,
    functionName: "shares",
    params: {
      account,
    },
  };

  const res = await readContract({
    params: options,
    walletProvider,
    onError: (error) => {
      dispatch(
        setNotification({
          type: "error",
          message: error.message,
        })
      );
    },
    onSuccess: (tx) => {
      console.log({ tx });
    },
  });

  return await res;
};

export const getReleasable = async ({ splitterAddress, walletProvider, account, dispatch }) => {
  const options = {
    abi: PAYMENT_SPLITTER_ABI,
    contractAddress: splitterAddress,
    functionName: "releasable",
    params: {
      account,
    },
  };

  const res = await readContract({
    params: options,
    walletProvider,
    onError: (error) => {
      dispatch(
        setNotification({
          type: "error",
          message: error.message,
        })
      );
    },
    onSuccess: (tx) => {
      console.log({ tx });
    },
  });

  return await res;
};

export const getReleased = async ({ splitterAddress, walletProvider, account, dispatch }) => {
  const options = {
    abi: PAYMENT_SPLITTER_ABI,
    contractAddress: splitterAddress,
    functionName: "released",
    params: {
      account,
    },
  };

  const res = await readContract({
    params: options,
    walletProvider,
    onError: (error) => {
      dispatch(
        setNotification({
          type: "error",
          message: error.message,
        })
      );
    },
    onSuccess: (tx) => {
      console.log({ tx });
    },
  });

  return await res;
};

export const handleRelease = async ({ account, splitterAddress, walletProvider, dispatch }) => {
  const options = {
    abi: PAYMENT_SPLITTER_ABI,
    contractAddress: splitterAddress,
    functionName: "release",
    params: { account },
  };

  const txResponse = await writeContract({
    params: options,
    walletProvider,
    onError: (error) => {
      dispatch(
        setNotification({
          type: "error",
          message: error.message,
        })
      );
    },
    onSuccess: (tx) => console.log("Waiting for transaction"),
  });

  if (txResponse) {
    let res = await txResponse.wait();
    return res;
  }
};

const transformAttribute = (attributes) => {
  return attributes.map((attr) => ({
    trait_type: attr.trait_type,
    value: attr.value,
  }));
};

const uploadImageToIpfs = async (image) => {
  try {
    await pinata.testAuthentication();
    const data = new FormData();
    data.append("file", image);
    data.append("pinataOptions", '{"cidVersion": 0}');
    const response = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
      method: "post",
      headers: {
        Authorization: `Bearer ${PINATA_API_JWT}`,
      },
      body: data,
    });
    return await response.json();
  } catch (error) {
    console.log(error);
    return null;
  }
};

const uploadMetadataToIpfs = async ({ image, name, description, attributes }) => {
  // create metadata
  const tokenUriMetadata = {};
  tokenUriMetadata.name = name;
  tokenUriMetadata.image = `ipfs://${image}`;
  tokenUriMetadata.description = description;
  tokenUriMetadata.attributes = attributes;
  try {
    const response = await pinata.pinJSONToIPFS(tokenUriMetadata, {
      cidVersion: 1,
    });
    return `ipfs://${response.IpfsHash}`;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const uploadToIpfs = async (metadata) => {
  const { File, Name, Description, Attributes } = metadata;
  const imageUrl = await uploadImageToIpfs(File);
  if (imageUrl) {
    const transformedAttribute = transformAttribute(Attributes);
    const res = await uploadMetadataToIpfs({
      name: Name,
      description: Description,
      image: imageUrl.IpfsHash,
      attributes: transformedAttribute,
    });
    return res;
  }
};

const storeNft = async (nftstorage, i) => {
  const data = await nftstorage.store(i);
  return data.url;
};

export const uploadCollectionToIpfs = async (metadata, dispatch) => {
  const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY });
  let res = [];
  for (let i = 0; i < metadata.length; i++) {
    try {
      dispatch(
        setLoadingScreen({
          title: `Uploading ${i + 1} of ${metadata.length} to IPFS`,
          description:
            "This will take few minutes. Please, wait while we upload your arts to IPFS.",
        })
      );
      await new Promise((resolve) =>
        setTimeout(() => {
          res.push(storeNft(nftstorage, metadata[i]));
          resolve();
        }, 1000)
      );
    } catch (error) {
      dispatch(setNotification({ ...ipfsErrorUploadMessage, message: error.message }));
      return null;
    }
  }
  return await Promise.all(res);
};

export const uploadSingleToIpfs = async (metadata, dispatch) => {
  const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY });
  const { File, Name, Description, Attributes } = metadata;
  const transformedAttribute = transformAttribute(Attributes);
  dispatch(setLoadingScreen(ipfsUploadMessage));
  try {
    const data = await nftstorage.store({
      name: Name,
      description: Description,
      image: File,
      attributes: transformedAttribute,
    });
    dispatch(setNotification(ipfsSuccessUploadMessage));
    return data.url;
  } catch (error) {
    dispatch(setNotification({ ...ipfsErrorUploadMessage, message: error.message }));
    return null;
  }
};
