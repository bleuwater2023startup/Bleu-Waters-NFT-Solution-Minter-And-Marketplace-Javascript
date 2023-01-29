import { useContext } from "react";
import { StateContext } from "../../context/state.context";
import { handleConnectToWalletConnect } from "./WalletConnect.script";
import classes from "./WalletConnect.module.css";

const WalletConnectConnect = ({ children }) => {
  const { dispatch } = useContext(StateContext);

  return (
    <div
      className={classes.container}
      onClick={() => handleConnectToWalletConnect({ dispatch })}
    >
      {children}
    </div>
  );
};

export default WalletConnectConnect;
