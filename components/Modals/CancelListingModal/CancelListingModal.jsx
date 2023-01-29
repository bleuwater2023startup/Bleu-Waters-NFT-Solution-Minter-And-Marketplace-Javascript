import classes from "./CancelListingModal.module.css";
import CloseIcon from "../../../assets/icon-close.svg";
import Button from "../../Button/Button";

const CancelListingModal = ({ onCancel, onClose }) => {
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div onClick={onClose} className={classes.closeIcon}>
          <CloseIcon />
        </div>
        <div className={classes.heading}>Cancel listing</div>
        <div className={classes.description}>
          Do you really want to remove your NFT from sale?
        </div>
        <div className={classes.buttonContainer}>
          <div onClick={onClose} className={classes.button}>
            <Button dark outline>
              Back
            </Button>
          </div>
          <div onClick={onCancel} className={classes.button}>
            <Button accent error outline>
              Cancel listing
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancelListingModal;
