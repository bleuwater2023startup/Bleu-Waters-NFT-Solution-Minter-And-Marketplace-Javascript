import classes from "./WalletBalanceModal.module.css";
import CloseIcon from "../../../assets/icon-close.svg";
import Button from "../../Button/Button";
import { getProceeds, handleWithdraw } from "../../Create/CreateScript";
import { useContext, useState } from "react";
import { StateContext } from "../../../context/state.context";
import { useEffect } from "react";
import { formatEther } from "ethers/lib/utils";

const WalletBalanceModal = ({ onClose }) => {
  const { account, dispatch, walletProvider } = useContext(StateContext);
  const [salesBalance, setSalesBalance] = useState();
  const [royaltyBalance, setRoyaltyBalance] = useState();

  const _handleWithdraw = async () => {
    const res = await handleWithdraw({
      dispatch,
      walletProvider,
    });

    console.log({ res });
  };

  const _getBalance = async () => {
    const res = await getProceeds({
      account,
      dispatch,
      walletProvider,
    });
    setSalesBalance(await res.toString());
  };

  useEffect(() => {
    _getBalance();
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div onClick={onClose} className={classes.closeIcon}>
          <CloseIcon />
        </div>
        <div className={classes.heading}>Wallet Balance</div>
        <div className={classes.subText}>
          Withdraw earnings to your wallet address
        </div>

        <div className={classes.balanceContainer}>
          <div className={classes.innerContainer}>
            <div className={classes.property}>Sales Balance</div>
            <div className={classes.valueContainer}>
              <div className={classes.value}>
                <div className={classes.native}>
                  {formatEther(salesBalance)} Matic
                </div>
                <div className={classes.usd}>{`($1,000)`}</div>
              </div>
              <div onClick={_handleWithdraw}>
                <Button outline outline_dark dark height={1}>
                  Withdraw
                </Button>
              </div>
            </div>
          </div>
          <div className={classes.innerContainer}>
            <div className={classes.property}>Royalty Balance</div>
            <div className={classes.valueContainer}>
              <div className={classes.value}>
                <div className={classes.native}>
                  {formatEther(salesBalance)} Matic
                </div>
                <div className={classes.usd}>{`($1,000)`}</div>
              </div>
              <div>
                <Button outline outline_dark dark height={1}>
                  Withdraw
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletBalanceModal;
