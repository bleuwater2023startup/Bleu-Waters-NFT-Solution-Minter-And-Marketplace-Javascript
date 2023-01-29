import WalletConnectProvider from "@walletconnect/web3-provider";
import {
  setAccount,
  setChainId,
  setModal,
  setWalletProvider,
} from "../../context/state.actions";

export const qrcodeModalOptions = {
  desktopLinks: [
    "ledger",
    "tokenary",
    "wallet",
    "wallet 3",
    "secuX",
    "ambire",
    "wallet3",
    "apolloX",
    "zerion",
    "sequence",
    "punkWallet",
    "kryptoGO",
    "nft",
    "riceWallet",
    "vision",
    "keyring",
  ],
  mobileLinks: ["rainbow", "metamask", "argent", "trust", "imtoken", "pillar"],
};

export const subscribeToWalletEvents = ({ dispatch, provider }) => {
  // Subscribe to accounts change
  provider.on("accountsChanged", (accounts) => {
    setAccount(accounts[0]);
  });

  // Subscribe to chainId change
  provider.on("chainChanged", (chainId) => {
    setChainId(chainId);
  });

  // Subscribe to session connection
  provider.on("connect", () => {
    console.log("connect");
  });

  // Subscribe to session disconnection
  provider.on("disconnect", (code, reason) => {
    dispatch(setAccount(""));
    dispatch(setChainId(""));
    window.localStorage.removeItem("walletpreference");
  });
};

export const handleConnectToWalletConnect = async ({ dispatch }) => {
  const provider = new WalletConnectProvider({
    infuraId: "27e484dcd9e3efcfd25a83a78777cdf1",
    rpc: {
      80001: "https://matic-mumbai.chainstacklabs.com",
    },
    qrcodeModalOptions: qrcodeModalOptions,
  });
  try {
    // Check if connection is already established
    if (!provider.connected) {
      await provider.enable();
      if ("80001" !== String(provider.chainId)) {
        provider.disconnect();
        setTimeout(() => {
          alert(
            `Invalid connection! Please ensure that polygon mumbai test network is selected on your scanning wallet`
          );
          window.location.reload();
        }, 100);
      }
      dispatch(setModal(""));
      const { accounts, chainId } = provider;
      dispatch(setAccount(accounts[0]));
      dispatch(setChainId(chainId));
      dispatch(setWalletProvider(provider));
      window.localStorage.setItem("walletpreference", "walletconnect");
      subscribeToWalletEvents({ setAccount, setChainId, dispatch, provider });
    } else {
      console.log("no connection established");
    }
  } catch (error) {
    console.log(error);
  }
};

export const checkWalletConnectConnection = ({ dispatch }) => {
  if (window.localStorage.getItem("walletpreference") === "walletconnect") {
    const provider = new WalletConnectProvider({
      infuraId: "27e484dcd9e3efcfd25a83a78777cdf1",
      rpc: {
        80001: "https://matic-mumbai.chainstacklabs.com",
      },
      qrcodeModalOptions: qrcodeModalOptions,
    });
    provider.disconnect(); // remove this line if you uncomment the code below
    disconnectWalletConnect({ dispatch }); // remove this line if you uncomment the code below
    // // this section of code below is still valid.

    // const { accounts, chainId } = JSON.parse(
    //   window.localStorage.getItem("walletconnect")
    // );
    // dispatch(setAccount(accounts[0]));
    // dispatch(setChainId(chainId));
    // dispatch(setWalletProvider(provider));
    // subscribeToWalletEvents({ dispatch, provider });
  }
};

export const disconnectWalletConnect = ({ dispatch }) => {
  dispatch(setAccount(""));
  dispatch(setChainId(""));
  window.localStorage.removeItem("walletpreference");
};
