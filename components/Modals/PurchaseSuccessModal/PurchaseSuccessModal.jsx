import classes from "./PurchaseSuccessModal.module.css";
import CloseIcon from "../../../assets/icon-close.svg";
import nft from "../../../assets/nft.png";
import Button from "../../Button/Button";

const PurchaseSuccessModal = () => {
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div onClick={onClose} className={classes.closeIcon}>
          <CloseIcon />
        </div>
        <img src={nft} alt="" />
        <div className={classes.heading}>Success!</div>
        <div className={classes.description}>
          You have successfully purchased Tongue NFT from Bleuwater collection
        </div>
        <div className={classes.viewTxButton}>View Transaction on Polyscan</div>
        <div className={classes.shareButtonContainer}></div>
        <div className={classes.buttonContainer}>
          <div>
            <Button dark>List for sale</Button>
          </div>
          <div>
            <Button accent>View NFT</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseSuccessModal;
