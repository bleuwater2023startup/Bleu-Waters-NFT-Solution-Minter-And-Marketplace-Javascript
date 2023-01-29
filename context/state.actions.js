import { stateActionTypes } from "./state.types";

export const setModal = (modal) => ({
  type: stateActionTypes.SET_MODAL,
  payload: modal,
});

export const setAccount = (account) => ({
  type: stateActionTypes.SET_ACCOUNT,
  payload: account,
});

export const setChainId = (chainId) => ({
  type: stateActionTypes.SET_CHAINID,
  payload: chainId,
});

export const setWalletProvider = (provider) => ({
  type: stateActionTypes.SET_WALLET_PROVIDER,
  payload: provider,
});

export const setAccountNfts = (nfts) => ({
  type: stateActionTypes.SET_ACCOUNT_NFTS,
  payload: nfts,
});

export const setActiveToken = (token) => ({
  type: stateActionTypes.SET_ACTIVE_TOKEN,
  payload: token,
});

export const setPreviewCollection = (state) => ({
  type: stateActionTypes.SET_PREVIEW_COLLECTION,
  payload: state,
});

export const setIpfsData = (data) => ({
  type: stateActionTypes.SET_IPFS_DATA,
  payload: data,
});

export const setMintData = (data) => ({
  type: stateActionTypes.SET_MINTDATA,
  payload: data,
});

export const setNotification = (value) => ({
  type: stateActionTypes.SET_NOTIFICATION,
  payload: value,
});

export const setLoadingScreen = (value) => ({
  type: stateActionTypes.SET_LOADING_SCREEN,
  payload: value,
});

export const setCreateSuccessModal = (value) => ({
  type: stateActionTypes.SET_CREATE_SUCCESS_MODAL,
  payload: value,
});
