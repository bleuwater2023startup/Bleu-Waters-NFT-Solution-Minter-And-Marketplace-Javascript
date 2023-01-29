import { useContext, useState } from "react";
import { setModal } from "../../../context/state.actions";
import { StateContext } from "../../../context/state.context";
import MetamaskConnect from "../../MetamaskConnect/MetamaskConnect";
import WalletConnectConnect from "../../WalletConnect/WalletConnect";
import classes from "./ConnectModal.module.css";
import CloseIcon from "../../../assets/icon-close.svg";
import MetamaskIcon from "../../../assets/icon-metamask.svg";
import WalletConnectIcon from "../../../assets/icon-walletConnect.svg";

const ConnectModal = () => {
  const { dispatch } = useContext(StateContext);

  const [ignoreClick, setIgnore] = useState(false);

  const handleCloseModal = () => {
    if (ignoreClick) return;
    dispatch(setModal(""));
  };

  const handleCloseModalStrict = () => {
    dispatch(setModal(""));
  };

  return (
    <div onClick={handleCloseModal} className={classes.container}>
      <div
        onMouseEnter={() => setIgnore(true)}
        onMouseLeave={() => setIgnore(false)}
        className={classes.wrapper}
      >
        <div onClick={handleCloseModalStrict} className={classes.closeIcon}>
          <CloseIcon />
        </div>
        <div className={classes.title}>Connect wallet</div>
        <div className={classes.description}>
          Please, connect your wallet to sign messages and send transactions.{" "}
        </div>
        <MetamaskConnect>
          <div className={classes.connect}>
            <div className={classes.icon}>
              <MetamaskIcon />
            </div>
            <div className={classes.name}>Metamask</div>
            <div className={classes.type}>Connect with metamask</div>
          </div>
        </MetamaskConnect>
        <WalletConnectConnect>
          <div className={classes.connect}>
            <div className={classes.icon}>
              <WalletConnectIcon />
            </div>
            <div className={classes.name}>WalletConnect</div>
            <div className={classes.type}>Connect with WalletConnect</div>
          </div>
        </WalletConnectConnect>
        <div className={classes.supportedChain}>
          Supported Blockchain Polygon
        </div>
      </div>
    </div>
  );
};

export default ConnectModal;
