import { stateActionTypes } from "./state.types";

export const INITIAL_STATE = {
  modal: "",
  account: "",
  chainId: "",
  walletProvider: null,
  isDev: process.env.NODE_ENV === "development",
  isMainnet: false,
  accountNfts: [],
  activeToken: {},
  ipfsData: {},
  previewCollection: false,
  mintData: {
    "Contract Name": "",
    Symbol: "",
    Name: "",
    File: null,
    Description: "",
    Attributes: [],
    Royalty: [],
  },
  notification: {
    type: "success", //enum error, success, warning, info,
    message: "",
  },
  loadingScreen: {
    title: "",
    description: "",
  },
  createSuccessModal: {
    name: "",
    hash: "",
    mintType: "",
  },
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case stateActionTypes.SET_MODAL:
      return {
        ...state,
        modal: action.payload,
      };
    case stateActionTypes.SET_ACCOUNT:
      return {
        ...state,
        account: action.payload,
      };
    case stateActionTypes.SET_CHAINID:
      return {
        ...state,
        chainId: action.payload,
      };
    case stateActionTypes.SET_WALLET_PROVIDER:
      return {
        ...state,
        walletProvider: action.payload,
      };
    case stateActionTypes.SET_ACCOUNT_NFTS:
      return {
        ...state,
        accountNfts: action.payload,
      };
    case stateActionTypes.SET_ACTIVE_TOKEN:
      return {
        ...state,
        activeToken: action.payload,
      };
    case stateActionTypes.SET_PREVIEW_COLLECTION:
      return {
        ...state,
        previewCollection: action.payload,
      };
    case stateActionTypes.SET_IPFS_DATA:
      return {
        ...state,
        ipfsData: action.payload,
      };
    case stateActionTypes.SET_MINTDATA:
      return {
        ...state,
        mintData: action.payload,
      };
    case stateActionTypes.SET_NOTIFICATION:
      return {
        ...state,
        notification: action.payload,
      };
    case stateActionTypes.SET_LOADING_SCREEN:
      return {
        ...state,
        loadingScreen: action.payload,
      };
    case stateActionTypes.SET_CREATE_SUCCESS_MODAL:
      return {
        ...state,
        createSuccessModal: action.payload,
      };
    default:
      return state;
  }
};
