import classes from "./AccountInfo.module.css";
import { useContext, useState } from "react";
import { StateContext } from "../../../context/state.context";
import { formatAccount } from "../../../utils";
import CopyText from "../../CopyText/CopyTest";
import Button from "../../Button/Button";
import WalletBalanceModal from "../../Modals/WalletBalanceModal/WalletBalanceModal";

const AccountInfo = () => {
  const { account } = useContext(StateContext);
  const [toggleWalletBalanceModal, setToggleWalletBalanceModal] =
    useState(false);

  return (
    <div className={classes.container}>
      {toggleWalletBalanceModal && (
        <WalletBalanceModal
          onClose={() => setToggleWalletBalanceModal(false)}
        />
      )}
      <div className={classes.logo}></div>
      <div className={classes.accountDetail}>
        <div className={classes.name}>{formatAccount(account)}</div>
        <div className={classes.address}>
          <CopyText message={account}>{formatAccount(account)}</CopyText>
        </div>
      </div>
      <div
        onClick={() => setToggleWalletBalanceModal(true)}
        className={classes.walletIcon}
      >
        <Button accent outline>
          Check wallet balance
        </Button>
      </div>
    </div>
  );
};

export default AccountInfo;
