import Link from "next/link";
import classes from "./NFTCard.module.css";
import { formatIpfsUrl } from "../../../utils/ipfs";
import DotsIcon from "../../../assets/icon-dots.svg";
import { useContext, useState } from "react";
import { chainIdToName } from "../../../utils/supportedChains";
import { StateContext } from "../../../context/state.context";
import { ethers } from "ethers";

const NFTCard = ({ nft, usd }) => {
  const { account } = useContext(StateContext);
  const [dropdown, setDropdown] = useState(false);
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

  return (
    <div className={classes.container}>
      <div className={classes.imageContainer}>
        <div className={classes.innerImageContainer}>
          <Link href={baseLink}>
            <img src={formatIpfsUrl(image)} alt="" />
          </Link>
        </div>
      </div>
      <div className={classes.details}>
        <div className={classes.withDots}>
          <div>
            <div className={classes.name}>{name}</div>
            <div className={classes.collectionName}>{collectionName}</div>
          </div>
          <DotsIcon
            onClick={() => setDropdown(!dropdown)}
            className={classes.dotsIcon}
          />
          <div
            className={`${classes.dropdownContainer} ${
              dropdown && classes.active
            }`}
          >
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
              <div className={classes.item}>Copy link</div>
            </div>
          </div>
        </div>
        {txType === "Listing" ? (
          <div className={classes.price}>
            <div className={classes.value}>{price} matic</div>
            <div className={classes.usdValue}>
              ${(usd * Number(price)).toFixed(3)}
            </div>
          </div>
        ) : (
          <div className={classes.tag}>Not listed</div>
        )}
      </div>
    </div>
  );
};

export default NFTCard;
