import Link from "next/link";
import classes from "./NFTCard.module.css";
// import Button from "../../Button/Button";
// import Lightening from "../../../assets/icon-lightning.svg";
import { formatIpfsUrl } from "../../../utils/ipfs";
import { chainIdToName } from "../../../utils/supportedChains";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import CardLoader from "../../LoadingScreen/CardLoader/CardLoader";
import imgPlaceholder from "../../../assets/img-placeholder.png";

const NFTCard = ({ similarNFT, nft, chainId, usd }) => {
  const { nftAddress, tokenId, name, image, txHistory } = nft;
  const [imageLoaded, setImageLoaded] = useState(false);
  const [notLoaded, setNotLoaded] = useState(false);

  const currentTx = txHistory[0];
  const { txType, price: etherPrice } = currentTx;
  const price = ethers.utils.formatEther(etherPrice);

  useEffect(() => {
    setTimeout(() => {
      setNotLoaded(true);
    }, 10000);
  }, []);

  return (
    <>
      {!imageLoaded && !notLoaded && <CardLoader />}
      <Link
        href={`/assets/${chainIdToName[chainId]}/${nftAddress}/${tokenId}`}
        style={{
          width: similarNFT ? "220px" : "auto",
          display: imageLoaded || notLoaded ? "flex" : "none",
        }}
        className={classes.container}>
        <div className={classes.imageContainer}>
          <div className={classes.innerImageContainer}>
            {notLoaded && !imageLoaded && (
              <div className={classes.imgPlaceholder}>
                <img src={imgPlaceholder.src} alt="" />
              </div>
            )}
            <img
              src={formatIpfsUrl(image)}
              onLoad={() => {
                setImageLoaded(true);
                setNotLoaded(false);
              }}
              alt=""
            />
          </div>
        </div>
        <div className={classes.details}>
          <div className={classes.name}>{name}</div>
          {txType === "Listing" ? (
            <>
              <div className={classes.price}>
                <div className={classes.value}>
                  <span>{price} Matic</span>{" "}
                  <span className={classes.usdValue}>${(usd * Number(price)).toFixed(3)}</span>
                </div>
              </div>
              {/* <div className={classes.buttonContainer}>
              <div className={classes.button}>
                <Button accent>
                  <Lightening />
                  Quick buy
                </Button>
              </div>
            </div> */}
            </>
          ) : (
            <div className={classes.notListed}>Not listed</div>
          )}
        </div>
      </Link>
    </>
  );
};

export default NFTCard;
