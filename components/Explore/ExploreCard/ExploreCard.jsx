import Link from "next/link";
import classes from "./ExploreCard.module.css";
import { formatIpfsUrl, getNft } from "../../../utils/ipfs";
import { useEffect, useState } from "react";
import CardLoader from "../../LoadingScreen/CardLoader/CardLoader";
import imgPlaceholder from "../../../assets/img-placeholder.png";

const ExploreCard = ({ collection, flex }) => {
  const { id, name, nfts } = collection;
  const [imageUrl, setImageUrl] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [notLoaded, setNotLoaded] = useState(false);

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

  useEffect(() => {
    setTimeout(() => {
      setNotLoaded(true);
    }, 10000);
  }, []);
  return (
    <>
      {!imageLoaded && !notLoaded && <CardLoader explore />}
      <Link
        href={`/collection/${name.toLowerCase().replace(/\s/g, "-")}?id=${id}`}
        style={{
          width: flex ? "24em" : "auto",
          display: imageLoaded || notLoaded ? "flex" : "none",
        }}
        className={classes.container}>
        <div className={classes.innerContainer}>
          <div className={classes.wrapper}>
            <div className={classes.innerWrapper}>
              {imageUrl && (
                <img
                  src={imageUrl}
                  onLoad={() => {
                    setImageLoaded(true);
                    setNotLoaded(false);
                  }}
                  alt=""
                />
              )}
              {notLoaded && !imageLoaded && (
                <div className={classes.imgPlaceholder}>
                  <img src={imgPlaceholder.src} alt="" />
                </div>
              )}
            </div>
            <div className={classes.innerImageContainer}>
              {imageUrl && imageLoaded && <img src={imageUrl} alt="" />}
              {notLoaded && !imageLoaded && <img src={imgPlaceholder.src} alt="" />}
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
