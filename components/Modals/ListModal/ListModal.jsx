import Button from "../../Button/Button";
import classes from "./ListModal.module.css";
import CloseIcon from "../../../assets/icon-close.svg";
import imgPlaceholder from "../../../assets/img-placeholder.png";
import { formatIpfsUrl } from "../../../utils/ipfs";
import { useState } from "react";

const ListModal = ({ onClose, onList, listPrice, nftDetails }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const {
    image,
    name,
    collection: { name: collectionName },
  } = nftDetails;

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div onClick={onClose} className={classes.closeIcon}>
          <CloseIcon />
        </div>
        <div className={classes.heading}>Confirm listing</div>
        <div className={classes.info}>
          {`You'll be asked to review and sign this list action from your wallet.`}
        </div>
        <div className={classes.assetContainer}>
          <img
            className={classes.asset}
            style={{ display: imageLoaded ? "block" : "none" }}
            onLoad={() => setImageLoaded(true)}
            src={formatIpfsUrl(image)}
            alt=""
          />
          {!imageLoaded && (
            <div className={classes.imgPlaceholder}>
              <img src={imgPlaceholder.src} alt="" />
            </div>
          )}
          <div className={classes.detail}>
            <div className={classes.name}>
              <div className={classes.tokenName}>{name}</div>
              <div className={classes.collectionName}>{collectionName}</div>
            </div>
            <div className={classes.price}>
              <div className={classes.label}>Price</div>
              <div className={classes.value}>{listPrice} MATIC</div>
            </div>
          </div>
        </div>
        <div className={classes.button}>
          <div onClick={onClose} className={classes.cancelBtn}>
            <Button dark outline>
              Cancel
            </Button>
          </div>
          <div onClick={onList} className={classes.confirmBtn}>
            <Button accent>Confirm listing</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListModal;
