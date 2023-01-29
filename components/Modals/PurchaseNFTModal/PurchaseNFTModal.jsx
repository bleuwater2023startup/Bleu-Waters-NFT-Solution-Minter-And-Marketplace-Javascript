import classes from "./PurchaseNFTModal.module.css";
import CloseIcon from "../../../assets/icon-close.svg";
import InfoIcon from "../../../assets/icon-info.svg";
import Button from "../../Button/Button";
import { ethers } from "ethers";
import { getMaticUsdPrice } from "../../../utils";
import { useState } from "react";
import { useEffect } from "react";

const PurchaseNFTModal = ({ onClose, onPurchaseClick, nft }) => {
  const [usd, setUsd] = useState(0);
  const {
    name,
    txHistory,
    collection: { chainId },
  } = nft;
  const { price: etherPrice } = txHistory[0];
  const price = ethers.utils.formatEther(etherPrice);

  const getUsd = async () => {
    const res = await getMaticUsdPrice(chainId);
    setUsd(res);
  };

  useEffect(() => {
    getUsd();
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div onClick={onClose} className={classes.closeIcon}>
          <CloseIcon />
        </div>
        <div className={classes.heading}>Checkout</div>
        <div className={classes.description}>
          <span>You are about to buy</span> <span>{name}</span>
        </div>
        <div className={classes.info}>
          <InfoIcon />
          <div>You get a Waitlist spot plus other perks</div>
        </div>
        <div className={classes.priceDetail}>
          <span>{price} matic</span>
          <span className={classes.usdPrice}>
            (${(usd * Number(price)).toFixed(3)})
          </span>
        </div>
        <div className={classes.paymentInfo}>
          <div>You will pay</div>
          <div>{price} matic</div>
        </div>
        <div onClick={onPurchaseClick} className={classes.button}>
          <Button accent>Proceed Payment</Button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseNFTModal;
