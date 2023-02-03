import Link from "next/link";
import classes from "./NFTCard.module.css";
// import Button from "../../Button/Button";
// import Lightening from "../../../assets/icon-lightning.svg";
import { formatIpfsUrl } from "../../../utils/ipfs";
import { chainIdToName } from "../../../utils/supportedChains";
import { ethers } from "ethers";
import { useState } from "react";
import CardLoader from "../../LoadingScreen/CardLoader/CardLoader";

const NFTCard = ({ similarNFT, nft, chainId, usd }) => {
  const { nftAddress, tokenId, name, image, txHistory } = nft;
  const [imageLoaded, setImageLoaded] = useState(false);
  const currentTx = txHistory[0];
  const { txType, price: etherPrice } = currentTx;
  const price = ethers.utils.formatEther(etherPrice);

  return (
    <>
      {!imageLoaded && <CardLoader />}
      <Link
        href={`/assets/${chainIdToName[chainId]}/${nftAddress}/${tokenId}`}
        style={{ width: similarNFT ? "220px" : "auto", display: imageLoaded ? "flex" : "none" }}
        className={classes.container}>
        <div className={classes.imageContainer}>
          <div className={classes.innerImageContainer}>
            <img src={formatIpfsUrl(image)} onLoad={() => setImageLoaded(true)} alt="" />
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
