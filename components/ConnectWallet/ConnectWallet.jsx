import Image from "next/image";
import { useContext, useEffect } from "react";
import { setModal } from "../../context/state.actions";
import { StateContext } from "../../context/state.context";
import { modalTypes } from "../../context/state.types";
import { formatAccount } from "../../utils";
import supportedChains from "../../utils/supportedChains";
import {
  checkMetamaskConnection,
  disconnectMetamask,
} from "../MetamaskConnect/MetamaskConnect.script";
import { checkWalletConnectConnection } from "../WalletConnect/WalletConnect.script";
import classes from "./ConnectWallet.module.css";
// import connectIcon from "../../assets/icon-connect.svg";
import ChevronIcon from "../../assets/icon-chevron.svg";
import Link from "next/link";
import CopyText from "../CopyText/CopyTest";

const ConnectWallet = () => {
  const { dispatch, account, chainId, walletProvider } = useContext(StateContext);

  const handleConnectModal = () => {
    dispatch(setModal(modalTypes.CONNECT_MODAL));
  };

  const handleDisconnect = () => {
    if (walletProvider?.isWalletConnect) {
      walletProvider.disconnect();
    } else {
      disconnectMetamask({ dispatch });
    }
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
            <div className={classes.chainIcon}>{supportedChains[parseInt(chainId)]?.icon}</div>
          ) : null}
          <div className={classes.account}>{formatAccount(account, 4, 5)}</div>
          <div className={classes.chevron}>
            <ChevronIcon />
          </div>
          <div className={classes.dropdownContainer}>
            <div className={classes.dropdownInnerContainer}>
              <div className={classes.dropdown}>
                <div className={classes.listItem}>
                  <div className={classes.chain}>{supportedChains[parseInt(chainId)]?.name}</div>
                  <div className={classes.address}>
                    <CopyText message={account}>{formatAccount(account, 5, 4)}</CopyText>
                  </div>
                </div>
                <Link href="/account" className={classes.listItem}>
                  My NFTs
                </Link>
                <Link href="/account/settings" className={classes.listItem}>
                  Settings
                </Link>
                <div className={classes.listItem} onClick={handleDisconnect}>
                  Disconnect wallet
                </div>
              </div>
            </div>
          </div>
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
