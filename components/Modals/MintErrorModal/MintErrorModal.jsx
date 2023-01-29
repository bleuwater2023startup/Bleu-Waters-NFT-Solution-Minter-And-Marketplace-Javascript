import Button from "../../Button/Button";
import classes from "./MintErrorModal.module.css";
import ErrorIcon from "../../../assets/icon-error.svg";

const MintErrorModal = ({ handleMint, onClose }) => {
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.icon}>
          <ErrorIcon />
        </div>
        <div className={classes.title}>Error!</div>
        <div className={classes.description}>Mint failed</div>
        <div
          onClick={() => {
            handleMint();
            onClose(false);
          }}
          className={classes.button}
        >
          <Button accent color="accent">
            Try again
          </Button>
        </div>
        <div onClick={() => onClose(false)} className={classes.linkBtn}>
          Close
        </div>
      </div>
    </div>
  );
};

export default MintErrorModal;
