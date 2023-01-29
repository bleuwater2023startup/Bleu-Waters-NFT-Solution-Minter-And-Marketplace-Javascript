import { useContext } from "react";
import { StateContext } from "../../context/state.context";
import { handleConnectToMetamask } from "./MetamaskConnect.script";
import classes from "./MetamaskConnect.module.css";

const MetamaskConnect = ({ children }) => {
  const { dispatch } = useContext(StateContext);

  return (
    <div
      className={classes.container}
      onClick={() => handleConnectToMetamask({ dispatch })}
    >
      {children}
    </div>
  );
};

export default MetamaskConnect;
