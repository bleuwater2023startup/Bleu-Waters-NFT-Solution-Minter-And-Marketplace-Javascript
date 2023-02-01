import Button from "../../Button/Button";
import classes from "./TransferErrorModal.module.css";
import ErrorIcon from "../../../assets/icon-error.svg";
import CloseIcon from "../../../assets/icon-close.svg";

const TransferErrorModal = ({ asset, handleTransfer, onClose, receiver }) => {
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div onClick={onClose} className={classes.closeIcon}>
          <CloseIcon />
        </div>
        <ErrorIcon className={classes.errorIcon} />
        <div className={classes.heading}>Transfer failed!</div>
        <div className={classes.description}>
          <span>Your attempt to transfer {asset.name} to </span>
          <span className={classes.address}>{receiver}</span> <span>failed!</span>
        </div>
        <div
          onClick={() => {
            handleTransfer();
            onClose(false);
          }}
          className={classes.button}>
          <Button accent color="accent">
            Retry transfer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TransferErrorModal;
