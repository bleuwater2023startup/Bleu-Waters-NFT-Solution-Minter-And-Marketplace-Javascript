import classes from "./AccountInfo.module.css";
import { useContext, useEffect, useState } from "react";
import { StateContext } from "../../../context/state.context";
import { formatAccount } from "../../../utils";
import CopyText from "../../CopyText/CopyTest";
import Button from "../../Button/Button";
import WalletBalanceModal from "../../Modals/WalletBalanceModal/WalletBalanceModal";
import { useLazyQuery } from "@apollo/client";
import { GET_ROYALTIES } from "../../../utils/subgraphQuery";

const AccountInfo = () => {
  const { account } = useContext(StateContext);
  const [toggleWalletBalanceModal, setToggleWalletBalanceModal] = useState(false);

  const [getRoyaltyInfo, { error, loading, data }] = useLazyQuery(GET_ROYALTIES);

  const handleClick = async () => {
    setToggleWalletBalanceModal(true);
    getRoyaltyInfo({
      variables: { _account: account },
    });
  };

  useEffect(() => {
    setToggleWalletBalanceModal(false);
  }, [account]);

  return (
    <div className={classes.container}>
      {toggleWalletBalanceModal && (
        <WalletBalanceModal
          onClose={() => setToggleWalletBalanceModal(false)}
          error={error}
          loading={loading}
          data={data}
        />
      )}
      <div className={classes.logo}></div>
      <div className={classes.accountDetail}>
        <div className={classes.name}>{formatAccount(account)}</div>
        <div className={classes.address}>
          <CopyText message={account}>{formatAccount(account)}</CopyText>
        </div>
      </div>
      <div onClick={handleClick} className={classes.walletIcon}>
        <Button accent outline>
          Check wallet balance
        </Button>
      </div>
    </div>
  );
};

export default AccountInfo;
