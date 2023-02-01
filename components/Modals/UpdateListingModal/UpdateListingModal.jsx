import classes from "./UpdateListingModal.module.css";
import CloseIcon from "../../../assets/icon-close.svg";
import { useState } from "react";
import Button from "../../Button/Button";

const UpdateListingModal = ({ onClose, onPriceChange, nft }) => {
  const [listPrice, setListPrice] = useState("");

  const handleChangePrice = () => {
    onPriceChange(listPrice);
  };

  const handlePriceChange = (e) => {
    if (Number(e.target.value) < 0 || isNaN(Number(e.target.value))) return setListPrice("");
    setListPrice(e.target.value);
  };

  const getEarnings = () => {
    let p = (nft.royaltyInfo / 10000) * listPrice;
    return listPrice - p.toFixed(2);
  };

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div onClick={onClose} className={classes.closeIcon}>
          <CloseIcon />
        </div>
        <div className={classes.heading}>Change price</div>
        <div className={classes.description}>
          New price must be less than previous. If you want increase price, you should cancel it
          first and then put it on sale again
        </div>
        <div className={classes.priceInput}>
          <div className={classes.label}>Set a price</div>
          <div className={classes.inputContainer}>
            <input
              type="text"
              placeholder="Enter price for one item"
              onChange={handlePriceChange}
              value={listPrice}
            />
            <div className={classes.uint}>Matic</div>
          </div>
        </div>
        <div className={classes.priceDetailContainer}>
          <div className={classes.priceDetail}>
            <div>Service fee</div>
            <div>0%</div>
          </div>
          <div className={classes.priceDetail}>
            <div>Royalty</div>
            <div>{nft.royaltyInfo / 100}%</div>
          </div>
          <div className={classes.priceDetail}>
            <div>You will recieve</div>
            <div>{getEarnings()} matic</div>
          </div>
        </div>
        <div className={classes.buttonContainer}>
          <div className={classes.button}>
            <Button dark outline>
              Cancel
            </Button>
          </div>
          <div onClick={handleChangePrice} className={classes.button}>
            <Button accent>Change price</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateListingModal;
