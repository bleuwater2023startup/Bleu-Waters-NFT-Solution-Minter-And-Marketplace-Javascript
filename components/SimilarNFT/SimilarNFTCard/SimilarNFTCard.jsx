import Link from "next/link";
import classes from "./SimilarNFTCard.module.css";
import { formatIpfsUrl } from "../../../utils/ipfs";
import _nft from "../../../assets/nft.png";
import { chainIdToName } from "../../../utils/supportedChains";

const SimilarNFTCard = ({ nft, chainId }) => {
  const { nftAddress, tokenId, image, name } = nft;
  return (
    <Link
      href={`/assets/${chainIdToName[chainId]}/${nftAddress}/${tokenId}`}
      className={classes.container}
    >
      <img src={formatIpfsUrl(image)} alt="" />
      <div className={classes.name}>{name}</div>
    </Link>
  );
};

export default SimilarNFTCard;
