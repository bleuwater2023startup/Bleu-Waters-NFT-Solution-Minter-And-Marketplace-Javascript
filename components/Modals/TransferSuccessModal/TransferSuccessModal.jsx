import Button from "../../Button/Button";
import classes from "./TransferSuccessModal.module.css";
import SuccessIcon from "../../../assets/icon-success.svg";
import CloseIcon from "../../../assets/icon-close.svg";
import Link from "next/link";
import { useRouter } from "next/router";

const TransferSuccessModal = ({ asset, tx }) => {
  const router = useRouter();

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div onClick={() => router.back()} className={classes.closeIcon}>
          <CloseIcon />
        </div>
        <div className={classes.successIcon}>
          <SuccessIcon />
        </div>
        <div className={classes.heading}>Transfer Success!</div>
        <div className={classes.description}>
          You've successfully transfered {asset.name} to {"0xt4423w803tf"}
        </div>
        <a
          className={classes.linkBtn}
          href={`https://mumbai.polygonscan.com/tx/${tx.transactionHash}`}
          target="_blank"
          rel="noreferrer"
        >
          View transaction
        </a>
        <Link className={classes.button} href={"/account"}>
          <Button accent color="accent">
            Go to My NFTs
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default TransferSuccessModal;
