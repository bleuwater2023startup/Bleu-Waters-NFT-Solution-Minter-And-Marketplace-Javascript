import classes from "./WalletBalanceModal.module.css";
import CloseIcon from "../../../assets/icon-close.svg";
import Button from "../../Button/Button";
import {
  getProceeds,
  getReleasable,
  getReleased,
  getShares,
  handleRelease,
  handleWithdraw,
} from "../../Create/CreateScript";
import { useContext, useState } from "react";
import { StateContext } from "../../../context/state.context";
import { useEffect } from "react";
import { formatEther } from "ethers/lib/utils";
import { setLoadingScreen, setNotification } from "../../../context/state.actions";
import { withdrawMessage } from "../../Create/Inputs/InputScript";
import { getMaticUsdPrice } from "../../../utils";

const WalletBalanceModal = ({ onClose, error, loading, data }) => {
  const { chainId, account, dispatch, walletProvider } = useContext(StateContext);
  const [salesBalance, setSalesBalance] = useState("0");
  const [paymentSplitter, setPaymentSplitter] = useState([]);
  const [isRoyaltyLoading, setIsRoyaltyLoading] = useState(false);
  const [isSalesLoading, setIsSalesLoading] = useState(false);
  const [usd, setUsd] = useState(0);

  const _handleWithdraw = async () => {
    onClose();
    dispatch(setLoadingScreen(withdrawMessage));
    const res = await handleWithdraw({
      dispatch,
      walletProvider,
    });

    if (res) {
      dispatch(
        setNotification({
          type: "success",
          message: "Sent successfully.",
        })
      );
    }
    dispatch(setLoadingScreen({}));
  };

  const _getBalance = async () => {
    setIsSalesLoading(true);
    const res = await getProceeds({
      account,
      dispatch,
      walletProvider,
    });
    setSalesBalance(await res.toString());
    const _usd = await getMaticUsdPrice(chainId);
    setUsd(_usd);
    setIsSalesLoading(false);
  };

  const _handleRelease = async (splitterAddress) => {
    onClose();
    dispatch(setLoadingScreen(withdrawMessage));
    const res = await handleRelease({
      splitterAddress,
      account,
      walletProvider,
      dispatch,
    });

    if (res) {
      dispatch(
        setNotification({
          type: "success",
          message: "Sent successfully.",
        })
      );
    }
    dispatch(setLoadingScreen({}));
  };

  const _getShares = async (ps) => {
    if (!ps.length) return setPaymentSplitter([]);
    setIsRoyaltyLoading(true);
    const res = await Promise.all(
      ps.map(async ({ address, collection }) => {
        const _shares = await getShares({
          splitterAddress: address,
          account,
          walletProvider,
          dispatch,
        });
        const _releasable = await getReleasable({
          splitterAddress: address,
          account,
          walletProvider,
          dispatch,
        });
        const _released = await getReleased({
          splitterAddress: address,
          account,
          walletProvider,
          dispatch,
        });
        return {
          address,
          collection,
          shares: _shares.toString(),
          releasable: _releasable.toString(),
          released: _released.toString(),
        };
      })
    );
    setIsRoyaltyLoading(false);
    setPaymentSplitter(res.filter((ps) => parseInt(ps.releasable)));
  };

  useEffect(() => {
    if (!data) return;
    const ps = data.royalties.map((r) => ({
      address: r.paymentSplitter,
      collection: r.collection,
    }));
    _getShares(ps);
  }, [data]);

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
        <div className={classes.subText}>Withdraw earnings to your wallet address</div>

        <div className={classes.balanceContainer}>
          <div className={classes.innerContainer}>
            <div className={classes.property}>Sales Balance</div>
            {isSalesLoading ? (
              <div>Loading...</div>
            ) : parseInt(salesBalance) ? (
              <div className={classes.valueContainer}>
                <div className={classes.value}>
                  <div className={classes.native}>{formatEther(salesBalance)} Matic</div>
                  <div className={classes.usd}>
                    {`($${(usd * Number(formatEther(salesBalance))).toFixed(3)})`}
                  </div>
                </div>
                <div onClick={_handleWithdraw} className={classes.button}>
                  <Button outline outline_dark dark height={1}>
                    Withdraw
                  </Button>
                </div>
              </div>
            ) : (
              <div>---</div>
            )}
          </div>
          <div className={classes.innerContainer}>
            <div className={classes.property}>Royalties</div>
            {error ? (
              <div>something went wrong</div>
            ) : loading || isRoyaltyLoading ? (
              <div>Loading...</div>
            ) : (
              <div className={classes.royaltyContainer}>
                {paymentSplitter.length ? (
                  paymentSplitter.map((ps, idx) => (
                    <div key={idx} className={classes.royalty}>
                      <div className={classes.collectionName}>{ps.name}</div>
                      <div key={idx} className={classes.valueContainer}>
                        <div className={classes.valueInnerContainer}>
                          <div className={classes.valueDescription}>
                            <span>{`${ps.shares / 100}%`}</span>
                            <span>of </span>
                            <span className={classes.colName}>{ps.collection.name}</span>
                            <span>sales</span>
                          </div>
                          <div className={classes.value}>
                            <div className={classes.native}>{formatEther(ps.releasable)} Matic</div>
                            <div className={classes.usd}>
                              {`($${(usd * Number(formatEther(ps.releasable))).toFixed(3)})`}
                            </div>
                          </div>
                        </div>
                        <div onClick={() => _handleRelease(ps.address)} className={classes.button}>
                          <Button outline outline_dark dark height={1}>
                            Withdraw
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div>---</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletBalanceModal;
