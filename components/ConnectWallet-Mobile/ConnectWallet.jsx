import { useContext, useEffect } from "react";
import { setModal } from "../../context/state.actions";
import { StateContext } from "../../context/state.context";
import { modalTypes } from "../../context/state.types";
import { formatAccount } from "../../utils";
import supportedChains, { chainIdToIcon } from "../../utils/supportedChains";
import { checkMetamaskConnection } from "../MetamaskConnect/MetamaskConnect.script";
import { checkWalletConnectConnection } from "../WalletConnect/WalletConnect.script";
import classes from "./ConnectWallet.module.css";

const ConnectWallet = () => {
  const { dispatch, account, chainId, walletProvider } =
    useContext(StateContext);

  const handleConnectModal = () => {
    dispatch(setModal(modalTypes.CONNECT_MODAL));
  };

  useEffect(() => {
    checkMetamaskConnection({ dispatch });
    checkWalletConnectConnection({ dispatch });
  }, [dispatch]);

  return (
    <>
      {account ? (
        <div className={classes.connected}>
          {chainId ? (
            <div className={classes.chainIcon}>
              {chainIdToIcon[parseInt(chainId)].icon}
            </div>
          ) : null}
          <div className={classes.account}>{formatAccount(account, 6, 6)}</div>
        </div>
      ) : (
        <div className={classes.connect} onClick={handleConnectModal}>
          <div>Connect wallet</div>
        </div>
      )}
    </>
  );
};

export default ConnectWallet;
