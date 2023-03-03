import classes from "./NFTCard.module.css";
import { formatIpfsUrl } from "../../../utils/ipfs";
import DotsIcon from "../../../assets/icon-dots.svg";
import { useContext, useEffect, useState } from "react";
import { chainIdToName } from "../../../utils/supportedChains";
import { StateContext } from "../../../context/state.context";
import { ethers } from "ethers";
import CardLoader from "../../LoadingScreen/CardLoader/CardLoader";
import imgPlaceholder from "../../../assets/img-placeholder.png";
import Link from "next/link";
import CopyText from "../../CopyText/CopyTest";

const NFTCard = ({ nft, usd }) => {
  const { account } = useContext(StateContext);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [notLoaded, setNotLoaded] = useState(false);
  const {
    nftAddress,
    tokenId,
    name,
    image,
    owner: { id: ownerId },
    collection: { chainId, name: collectionName },
    txHistory,
  } = nft;
  const { txType, price: etherPrice } = txHistory[0];
  const price = ethers.utils.formatEther(etherPrice);

  const baseLink = `/assets/${chainIdToName[chainId]}/${nftAddress}/${tokenId}`;

  useEffect(() => {
    setTimeout(() => {
      setNotLoaded(true);
    }, 10000);
  }, []);

  return (
    <>
      {!imageLoaded && !notLoaded && <CardLoader />}
      <div
        className={classes.container}
        style={{ display: imageLoaded || notLoaded ? "flex" : "none" }}>
        <Link href={baseLink} className={classes.imageContainer}>
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
        </Link>
        <div className={classes.details}>
          <div className={classes.withDots}>
            <div>
              <div className={classes.name}>{name}</div>
              <div className={classes.collectionName}>{collectionName}</div>
            </div>
            <div className={classes.dropdownWrapper}>
              <DotsIcon className={classes.dotsIcon} />
              <div className={classes.dropdownContainer}>
                <div className={classes.dropdown}>
                  {account === ownerId ? (
                    <>
                      {txType === "Listing" ? (
                        <Link href={`${baseLink}`} className={classes.item}>
                          Cancel Listing
                        </Link>
                      ) : (
                        <Link href={`${baseLink}/sell`} className={classes.item}>
                          List NFT
                        </Link>
                      )}
                      <Link href={`${baseLink}/transfer`} className={classes.item}>
                        Transfer NFT
                      </Link>
                    </>
                  ) : null}
                  <div className={classes.item}>
                    <CopyText message={`${window.location.origin}/${baseLink}`} icon>
                      Copy link
                    </CopyText>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {txType === "Listing" ? (
            <div className={classes.price}>
              <div className={classes.value}>{price} matic</div>
              <div className={classes.usdValue}>${(usd * Number(price)).toFixed(3)}</div>
            </div>
          ) : account === ownerId ? (
            <Link href={`${baseLink}/sell`} className={classes.tag_link}>
              List NFT
            </Link>
          ) : (
            <div className={classes.tag}>Not listed</div>
          )}
        </div>
      </div>
    </>
  );
};

export default NFTCard;
