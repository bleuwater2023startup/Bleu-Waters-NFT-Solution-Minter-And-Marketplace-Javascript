import { setAccount, setChainId, setModal } from "../../context/state.actions";
import supportedChains, { switchChain } from "../../utils/supportedChains";

export const subscribeToMetamaskEvents = ({ dispatch }) => {
  if (typeof window.ethereum !== "undefined") {
    // Subscribe to accounts change
    window.ethereum.on("accountsChanged", function (accounts) {
      if (accounts[0]) {
        dispatch(setAccount(accounts[0]));
      } else {
        disconnectMetamask({ dispatch });
      }
    });

    // Subscribe to chainId change
    window.ethereum.on("chainChanged", async (chainId) => {
      if (supportedChains[parseInt(chainId)]) {
        dispatch(setChainId(chainId));
        const [account] = await window.ethereum.request({
          method: "eth_accounts",
        });
        dispatch(setAccount(account));
      } else {
        disconnectMetamask({ dispatch });
      }
    });
  }
};

export const disconnectMetamask = ({ dispatch }) => {
  dispatch(setAccount(""));
  dispatch(setChainId(""));
  window.localStorage.removeItem("walletpreference");
};

export const checkMetamaskConnection = ({ dispatch }) => {
  if (typeof window !== "undefined") {
    if (window.localStorage.getItem("walletpreference") === "metamask") {
      (async () => {
        const chainId = await window.ethereum.request({
          method: "eth_chainId",
        });
        const [account] = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (supportedChains[parseInt(chainId)]) {
          dispatch(setAccount(account));
          dispatch(setChainId(chainId));
        } else {
          disconnectMetamask({ dispatch });
        }
      })();
    }
    subscribeToMetamaskEvents({ dispatch });
  } else {
    console.log("Metamask not installed");
  }
};

export const handleConnectToMetamask = async ({ dispatch }) => {
  if (typeof window.ethereum !== "undefined") {
    try {
      await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      await switchChain(80001);
      let [account] = await window.ethereum.request({
        method: "eth_accounts", // eth_accounts should not allow metamask to popup on page load //eth_requestAccounts
      });
      const chainId = await window.ethereum.request({
        method: "eth_chainId",
      });
      if (supportedChains[parseInt(chainId)]) {
        window.localStorage.setItem("walletpreference", "metamask");
        dispatch(setAccount(account));
        dispatch(setChainId(chainId));
      } else {
        disconnectMetamask({ dispatch });
      }
      dispatch(setModal(""));
    } catch (error) {
      if (error.message.includes("User rejected the request.")) {
        console.log("User rejected the request.");
      } else {
        console.log(error);
        console.log("Something went wrong please try again.");
      }
    }
    subscribeToMetamaskEvents({ dispatch });
  } else {
    console.log("Metamask not installed");
  }
};
