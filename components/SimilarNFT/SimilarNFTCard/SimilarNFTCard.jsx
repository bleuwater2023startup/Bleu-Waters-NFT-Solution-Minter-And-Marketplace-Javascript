import Link from "next/link";
import classes from "./SimilarNFTCard.module.css";
import { formatIpfsUrl } from "../../../utils/ipfs";
import _nft from "../../../assets/nft.png";
import { chainIdToName } from "../../../utils/supportedChains";
import imgPlaceholder from "../../../assets/img-placeholder.png";
import { useState } from "react";

const SimilarNFTCard = ({ nft, chainId }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { nftAddress, tokenId, image, name } = nft;
  return (
    <Link
      href={`/assets/${chainIdToName[chainId]}/${nftAddress}/${tokenId}`}
      className={classes.container}>
      <img
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
      <div className={classes.name}>{name}</div>
    </Link>
  );
};

export default SimilarNFTCard;
