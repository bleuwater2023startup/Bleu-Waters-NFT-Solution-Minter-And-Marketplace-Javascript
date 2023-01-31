import {
  setCreateSuccessModal,
  setLoadingScreen,
  setMintData,
  setNotification,
} from "../../../context/state.actions";
import {
  handleApproveAll,
  handleCreateCollection,
  handleCreatePaymentSplitter,
  handleMint,
  uploadCollectionToIpfs,
  uploadSingleToIpfs,
} from "../CreateScript";

export const _handleCreateCollection = async (createProps) => {
  const { walletProvider, mintData, mintType, chainId, account, dispatch, handleStep } =
    createProps;

  if (!account) return connectAccountNotification(dispatch);

  if (!validateCreateCollectionInput(mintData)) {
    return handleInvalidCreateCollectionInput(dispatch);
  }
  dispatch(setLoadingScreen(createContractMessage));
  const res = await handleCreateCollection({
    walletProvider,
    contractName: mintData["Contract Name"],
    symbol: mintData["Symbol"],
    type: mintType,
    chainId,
    account,
    dispatch,
  });
  if (res) {
    dispatch(
      setMintData({
        ...mintData,
        ["Collection Address"]: [...res].pop().collectionAddress,
      })
    );
    dispatch(setNotification(createSuccessMessage));
    handleStep();
  }
  dispatch(setLoadingScreen({}));
};

export const _handleUploadToIpfs = async (createProps) => {
  const { mintType, mintData, dispatch, handleStep, account } = createProps;
  let ipfsUrl;

  if (!account) return connectAccountNotification(dispatch);

  if (mintType === "Single") {
    if (!validateSingleFileInput(mintData)) {
      return handleInvalidSingleFileInput(dispatch);
    }
    ipfsUrl = await uploadSingleToIpfs(mintData, dispatch);
  } else {
    if (!validateCollectionFileInput(mintData)) {
      return handleInvalidCollectionFileInput(dispatch);
    }
    ipfsUrl = await uploadCollectionToIpfs(mintData["File"], dispatch);
  }
  if (ipfsUrl) {
    dispatch(setNotification(ipfsSuccessUploadMessage));
    dispatch(
      setMintData({
        ...mintData,
        ["IpfsUrl"]: ipfsUrl,
      })
    );
    handleStep();
  }
  dispatch(setLoadingScreen({}));
};

export const _handleCreateRoyalty = async (createProps) => {
  const { mintData, walletProvider, dispatch, handleStep, account } = createProps;

  if (!account) return connectAccountNotification(dispatch);

  const isComplete = mintData["Royalty"].every(({ address, value }) => address && value);
  if (!isComplete) {
    return dispatch(
      setNotification({
        type: "error",
        message: "Please delete unused royalty input to continue.",
      })
    );
  }
  let shares = [];
  let payees = [];
  mintData["Royalty"]
    .filter(({ address, value }) => address && value)
    .forEach((r) => {
      shares.push(r.value);
      payees.push(r.address);
    });
  let royaltyFee = shares.reduce((acc, curr) => {
    return acc + Number(curr);
  }, 0);
  dispatch(setLoadingScreen(splitMessage));
  const res = await handleCreatePaymentSplitter({
    payees,
    shares,
    royaltyFee,
    walletProvider,
    dispatch,
    collectionAddress: mintData["Collection Address"],
  });
  if (res) {
    dispatch(setNotification(splitSuccessMessage));
    handleStep();
  }
  dispatch(setLoadingScreen({}));
};

export const _handleMint = async (createProps) => {
  const { walletProvider, mintData, account, mintType, dispatch, router } = createProps;

  if (!account) return connectAccountNotification(dispatch);

  dispatch(setLoadingScreen(mintMessage));
  const res = await handleMint({
    walletProvider,
    account,
    tokenId: Date.now(),
    mintType,
    dispatch,
    router,
    ipfsUrl: mintData["IpfsUrl"],
    collectionAddress: mintData["Collection Address"],
  });
  if (res) {
    dispatch(
      setCreateSuccessModal({
        name: mintData[mintType === "Collection" ? "Contract Name" : "Name"],
        hash: res.transactionHash,
        mintType: mintType,
      })
    );
    initMint({ dispatch });
    router.push("/account");
    dispatch(setNotification(mintSuccessMessage));
  }
  dispatch(setLoadingScreen({}));
};

export const validateSingleFileInput = (mintData) => {
  const { Name, Description, File } = mintData;
  return Name && Description && File;
};

export const handleInvalidSingleFileInput = (dispatch) => {
  dispatch(
    setNotification({
      type: "error",
      message: "Invalid input",
    })
  );
};

export const validateCollectionFileInput = (mintData) => {
  // validate the json uploaded to ipfs
  return mintData.File;
};

export const handleInvalidCollectionFileInput = (dispatch) => {
  dispatch(
    setNotification({
      type: "error",
      message: "Invalid input",
    })
  );
};

export const validateCreateCollectionInput = (mintData) => {
  return mintData["Contract Name"] && mintData.Symbol;
};

export const handleInvalidCreateCollectionInput = (dispatch) => {
  dispatch(
    setNotification({
      type: "error",
      message: "Invalid input",
    })
  );
};

export const initMint = ({ dispatch }) => {
  dispatch(
    setMintData({
      "Contract Name": "",
      Symbol: "",
      Name: "",
      File: null,
      Description: "",
      Attributes: [],
      Royalty: [],
    })
  );
};

export const connectAccountNotification = (dispatch) => {
  dispatch(
    setNotification({
      type: "info",
      message: "Please connect your wallet to continue.",
    })
  );
};

export const validationErrorMessage = {
  type: "error",
  message: "Please fill the required fields.",
};

export const ipfsUploadMessage = {
  title: "Uploading to IPFS",
  description: "This will take few minutes. Please, wait while we upload your art to IPFS.",
};

export const ipfsErrorUploadMessage = {
  type: "error",
  message: "Failed to upload. Try again",
};

export const ipfsSuccessUploadMessage = {
  type: "success",
  message: "Files uploaded successfully",
};

export const mintMessage = {
  title: "Creating your NFT",
  description: "Check your wallet. You'll be asked to confirm this transaction from your wallet.",
};

export const mintErrorMessage = {
  type: "error",
  message: "Failed to Create. Try again.",
};

export const mintSuccessMessage = {
  type: "success",
  message: "Created successfully.",
};

export const createSuccessMessage = {
  type: "success",
  message: "Contract created successfully.",
};

export const createContractMessage = {
  title: "Creating your collection",
  description: "Check your wallet. You'll be asked to confirm this transaction from your wallet.",
};

export const splitMessage = {
  title: "Adding royalty split to your collection",
  description: "Check your wallet. You'll be asked to confirm this transaction from your wallet.",
};

export const splitErrorMessage = {
  type: "error",
  message: "Failed to add royalty. Try again.",
};

export const splitSuccessMessage = {
  type: "success",
  message: "Royalty split added successfully.",
};

export const withdrawMessage = {
  title: "Sending fund to your wallet",
  description: "Check your wallet. You'll be asked to confirm this transaction from your wallet.",
};
