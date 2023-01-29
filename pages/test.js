import { ethers } from "ethers";
import { useContext, useEffect, useState } from "react";
import { StateContext } from "../context/state.context";
import { getWeb3Provider, readContract, writeContract } from "../utils";
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
} from "../CONSTACTS";
import { bot } from "../utils/test";

const mintSingle = [
  "function mint(address _to, uint256 _id, string memory _uri) public {}",
];

const Test = () => {
  const { account, walletProvider } = useContext(StateContext);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);

  useEffect(() => {
    const provider = getWeb3Provider(walletProvider);
    setProvider(provider);
    const signer = provider.getSigner();
    setSigner(signer);
  }, []);

  const handleCreateCollection = async () => {
    const collectionContract = new ethers.Contract(
      NFT_MINTER_FACTORY,
      NFT_MINTER_FACTORY_ABI,
      signer
    );
    const tx = await collectionContract.createCollection(
      "My Minter",
      "MM",
      "single"
    );
    console.log("creating...");
    await tx.wait();
    console.log("done");
    const getCollectionAddresses = await collectionContract.collectionsOf(
      account
    );
    console.log({ getCollectionAddresses });
    const collectionAddresses = [...getCollectionAddresses];
    console.log({ collectionAddresses });
    const contract = new ethers.Contract(
      collectionAddresses.pop(),
      MINTER_ABI,
      signer
    );
    console.log({ contract });

    return;
    const options = {
      abi: NFT_MINTER_FACTORY_ABI,
      contractAddress: NFT_MINTER_FACTORY,
      functionName: "createNft",
      params: {
        _name: "My First",
        _symbol: "MF",
      },
    };

    const txResponse = await writeContract({
      params: options,
      walletProvider,
      onError: (error) => {
        console.log(error);
      },
      onSuccess: (tx) => console.log("Waiting for transaction"),
    });

    if (txResponse) {
      let res = await txResponse.wait();
      console.log({ res });
    }

    /**
           * 
      "0x49f77cb35FdBe8447E603399896D8A3805eaC5E5"
      1
      : 
      "0xD720908BA346eb68dd09bD74e0F32d6c3a17Cff5"
      2
      : 
      "0x8Ba2008e14e43744f36340190477118CdE5803E8"
      3
      : 
      "0x05Dd35589a6C99b715BdDC220706cB64512e885E"
      */
  };

  const handleCreatePaymentSplitter = async () => {
    const paymentSplitterContract = new ethers.Contract(
      PAYMENT_SPLITTER_FACTORY,
      PAYMENT_SPLITTER_FACTORY_ABI,
      signer
    );
    const tx = await paymentSplitterContract.createPaymentSplitter(
      ["0xbE8f9B349D12C768474e2A5C96Dd31C48Ef6dDF3"],
      [1]
    );
    console.log("creating...");
    await tx.wait();
    console.log("done");
    const splitterAddress = await paymentSplitterContract.splitter();
    console.log({ splitterAddress });

    // 0x8a1D09Ff0205553d6fe0B93B1059eDAD6D6EC422
  };

  const handleRoyalty = async () => {
    // console.log({ owner: await contract.owner() });

    // return;
    const options = {
      abi: MINTER_ABI,
      contractAddress: "0x05Dd35589a6C99b715BdDC220706cB64512e885E",
      functionName: "setRoyaltyInfo",
      params: {
        paymentSplitter: "0x8a1D09Ff0205553d6fe0B93B1059eDAD6D6EC422",
        _royaltyFeesInBips: 1000,
      },
    };

    const txResponse = await writeContract({
      params: options,
      walletProvider,
      onError: (error) => {
        console.log(error);
      },
      onSuccess: (tx) => console.log("Waiting for transaction"),
    });

    if (txResponse) {
      let res = await txResponse.wait();
      console.log({ res });
    }
  };

  const handleMint = async () => {
    const contract = new ethers.Contract(
      "0x05Dd35589a6C99b715BdDC220706cB64512e885E",
      mintSingle,
      signer
    );

    // console.log({ owner: await contract.owner() });

    console.log({ contract });

    // return;
    const options = {
      abi: mintSingle,
      contractAddress: contract.address,
      functionName: "mint",
      params: {
        _to: "0x98eceeD2b45F17C185137740a4A9EcE2F27F12ea",
        _id: 2,
        _uri: "ipfs://QmeM4RSATCa55ince7heUXh79rFDzg2MmdrBogKYbFJtSc",
      },
    };

    const txResponse = await writeContract({
      params: options,
      walletProvider,
      onError: (error) => {
        console.log(error);
      },
      onSuccess: (tx) => console.log("Waiting for transaction"),
    });

    if (txResponse) {
      let res = await txResponse.wait();
      console.log({ res });
    }
  };

  // TO BE CALLED WHEN LISTED
  const handleApprove = async () => {
    const contract = new ethers.Contract(
      "0x05Dd35589a6C99b715BdDC220706cB64512e885E",
      MINTER_ABI,
      signer
    );

    // console.log({ owner: await contract.owner() });

    // return;
    const options = {
      abi: MINTER_ABI,
      contractAddress: contract.address,
      functionName: "approve",
      params: {
        to: NFT_MARKETPLACE,
        tokenId: 1,
      },
    };

    const txResponse = await writeContract({
      params: options,
      walletProvider,
      onError: (error) => {
        console.log(error);
      },
      onSuccess: (tx) => console.log("Waiting for transaction"),
    });

    if (txResponse) {
      let res = await txResponse.wait();
      console.log({ res });
    }
  };

  const handleApproveAll = async () => {
    const contract = new ethers.Contract(
      "0x05Dd35589a6C99b715BdDC220706cB64512e885E",
      MINTER_ABI,
      signer
    );

    // console.log({ owner: await contract.owner() });

    // return;
    const options = {
      abi: MINTER_ABI,
      contractAddress: contract.address,
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
        console.log(error);
      },
      onSuccess: (tx) => console.log("Waiting for transaction"),
    });

    if (txResponse) {
      let res = await txResponse.wait();
      console.log({ res });
    }
  };

  const handleList = async () => {
    const options = {
      abi: NFT_MARKETPLACE_ABI,
      contractAddress: NFT_MARKETPLACE,
      functionName: "listItem",
      params: {
        nftAddress: "0x05Dd35589a6C99b715BdDC220706cB64512e885E",
        tokenId: 1,
        price: 1,
      },
    };

    const txResponse = await writeContract({
      params: options,
      walletProvider,
      onError: (error) => {
        console.log(error);
      },
      onSuccess: (tx) => console.log("Waiting for transaction"),
    });

    if (txResponse) {
      let res = await txResponse.wait();
      console.log({ res });
    }
  };

  const handleCancel = async () => {
    const options = {
      abi: NFT_MARKETPLACE_ABI,
      contractAddress: NFT_MARKETPLACE,
      functionName: "cancelListing",
      params: {
        nftAddress: "0x05Dd35589a6C99b715BdDC220706cB64512e885E",
        tokenId: 1,
      },
    };

    const txResponse = await writeContract({
      params: options,
      walletProvider,
      onError: (error) => {
        console.log(error);
      },
      onSuccess: (tx) => console.log("Waiting for transaction"),
    });

    if (txResponse) {
      let res = await txResponse.wait();
      console.log({ res });
    }
  };

  const handleBuy = async () => {
    const options = {
      abi: NFT_MARKETPLACE_ABI,
      contractAddress: NFT_MARKETPLACE,
      functionName: "buyItem",
      params: {
        nftAddress: "0x05Dd35589a6C99b715BdDC220706cB64512e885E",
        tokenId: 1,
        value: { value: ethers.utils.parseEther("1") },
      },
    };

    const txResponse = await writeContract({
      params: options,
      walletProvider,
      onError: (error) => {
        console.log(error);
      },
      onSuccess: (tx) => console.log("Waiting for transaction"),
    });

    if (txResponse) {
      let res = await txResponse.wait();
      console.log({ res });
    }
  };

  const handleWithdraw = async () => {
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
        console.log(error);
      },
      onSuccess: (tx) => console.log("Waiting for transaction"),
    });

    if (txResponse) {
      let res = await txResponse.wait();
      console.log({ res });
    }
  };

  const handleRelease = async () => {
    const contract = new ethers.Contract(
      "0x97436Ad890195A7254B183FFFbDE76316aa692AD",
      PAYMENT_SPLITTER_ABI,
      signer
    );

    const tx = await contract.release(account);
    console.log("creating...");
    await tx.wait();
    console.log("done");

    // return;
    // const options = {
    //   abi: PAYMENT_SPLITTER_ABI,
    //   contractAddress: "0x8a1D09Ff0205553d6fe0B93B1059eDAD6D6EC422",
    //   functionName: "release",
    //   params: { account: account },
    // };

    // const txResponse = await writeContract({
    //   params: options,
    //   walletProvider,
    //   onError: (error) => {
    //     console.log(error);
    //   },
    //   onSuccess: (tx) => console.log("Waiting for transaction"),
    // });

    // if (txResponse) {
    //   let res = await txResponse.wait();
    //   console.log({ res });
    // }
  };

  const handleGetListing = async () => {
    const options = {
      abi: NFT_MARKETPLACE_ABI,
      contractAddress: NFT_MARKETPLACE,
      functionName: "getListing",
      params: {
        nftAddress: "0x05Dd35589a6C99b715BdDC220706cB64512e885E",
        tokenId: 1,
      },
    };

    const uri = await readContract({
      params: options,
      walletProvider,
      onError: (error) => {
        console.log({ error: error.message });
      },
      onSuccess: (tx) => {
        console.log({ tx });
      },
    });

    console.log({ price: await uri.price.toString() });
  };

  const handleGetRoyaltyInfo = async () => {
    const options = {
      abi: ERC1155_EXTENSION_ABI,
      contractAddress: "0x6E8F61Cf2635196D6a3f4120e7DF1E04B7bd7823",
      functionName: "royaltyInfo",
      params: {
        "": "0",
        _salePrice: 10,
      },
    };

    const res = await readContract({
      params: options,
      walletProvider,
      onError: (error) => {
        console.log({ error: error.message });
      },
      onSuccess: (tx) => {
        console.log({ tx });
      },
    });

    console.log({ address: res[0], amount: await res[1].toString() });
  };

  const handleBotRun = () => {
    bot();
  };

  return (
    <div>
      <button onClick={handleCreateCollection}>Create collection</button>
      <br />
      <button onClick={handleCreatePaymentSplitter}>
        Create payment splitter
      </button>
      <br />
      <button onClick={handleRoyalty}>set royalty</button>
      <br />
      <button onClick={handleGetRoyaltyInfo}>get royaltyInfo</button>
      <br />
      <button onClick={handleApprove}>approve</button>
      <br />
      <button onClick={handleApproveAll}>approve All</button>
      <br />
      <button onClick={handleMint}>mint</button>
      <br />
      <button onClick={handleList}>list</button>
      <br />
      <button onClick={handleGetListing}>get listing</button>
      <br />
      <button onClick={handleCancel}>cancel listing</button>
      <br />
      <button onClick={handleBuy}>buy</button>
      <br />
      <button onClick={handleWithdraw}>withdrawProceeds</button>
      <br />
      <button onClick={handleRelease}>release</button>
      <br />
      <button onClick={handleBotRun}>run bot</button>
    </div>
  );
};

export default Test;
