import Link from "next/link";
import classes from "./ExploreCard.module.css";
import { formatIpfsUrl, getNft } from "../../../utils/ipfs";
import { useEffect, useState } from "react";
import CardLoader from "../../LoadingScreen/CardLoader/CardLoader";

const ExploreCard = ({ collection, flex }) => {
  const { id, name, nfts } = collection;
  const [imageUrl, setImageUrl] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const _getNft = async () => {
      const _tokenURI = nfts[0]?.tokenURI;
      if (_tokenURI) {
        const _nft = await getNft(_tokenURI);
        if (_nft) {
          const _nftImage = formatIpfsUrl(_nft.image);
          setImageUrl(_nftImage);
        } else {
          setImageUrl(null);
        }
      }
    };
    _getNft();
  }, [nfts]);

  return (
    <>
      {!imageLoaded && <CardLoader />}
      <Link
        href={`/collection/${name.replace(/\s/g, "-")}?id=${id}`}
        style={{ width: flex ? "24em" : "auto", display: imageLoaded ? "flex" : "none" }}
        className={classes.container}>
        <div className={classes.innerContainer}>
          <div className={classes.wrapper}>
            <div className={classes.innerWrapper}>
              {imageUrl && <img src={imageUrl} onLoad={() => setImageLoaded(true)} alt="" />}
            </div>
            <div className={classes.innerImageContainer}>
              {imageUrl && <img src={imageUrl} alt="" />}
            </div>
          </div>
        </div>
        <div className={classes.details}>
          <div className={classes.name}>{name}</div>
          <div>{nfts.length} items</div>
        </div>
      </Link>
    </>
  );
};

export default ExploreCard;
