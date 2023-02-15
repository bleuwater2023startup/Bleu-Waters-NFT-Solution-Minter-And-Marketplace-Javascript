import Link from "next/link";
import classes from "./ExploreCard.module.css";
import { formatIpfsUrl, getNft } from "../../../utils/ipfs";
import { useEffect, useState } from "react";
import CardLoader from "../../LoadingScreen/CardLoader/CardLoader";
import imgPlaceholder from "../../../assets/img-placeholder.png";
import { getCollectionImage, getCollectionProfile } from "../../../firebase/firebase";

const ICollection = {
  description: "",
  discord: "",
  twitter: "",
  instagram: "",
  telegram: "",
};

const ICollectionImage = {
  collectionBanner: null,
  collectionImage: null,
};

const ExploreCard = ({ collection, flex }) => {
  const { id, name, nfts } = collection;
  const [inputValue, setInputValue] = useState(ICollection);
  const [imageInput, setImageInput] = useState(ICollectionImage);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [notLoaded, setNotLoaded] = useState(false);

  const init = async (id) => {
    const data = await getCollectionProfile(id);
    if (data) {
      setInputValue(data);
    } else {
      setInputValue({ ...ICollection, id });
    }
    const collectionBanner = await getCollectionImage({ id, name: "collectionBanner" });
    const collectionImage = await getCollectionImage({ id, name: "collectionImage" });
    if (collectionBanner) {
      setImageInput((input) => ({ ...input, collectionBanner }));
    }
    if (collectionImage) {
      setImageInput((input) => ({ ...input, collectionImage }));
    }
  };

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
    init(id);
  }, []);

  return (
    <>
      {!imageLoaded && !notLoaded && <CardLoader explore />}
      <Link
        href={`/collection/${name.toLowerCase().replace(/\s/g, "-")}?id=${id}`}
        style={{
          width: flex ? "22em" : "auto",
          display: imageLoaded || notLoaded ? "flex" : "none",
        }}
        className={classes.container}>
        <div className={classes.innerContainer}>
          <div className={classes.wrapper}>
            <div className={classes.innerWrapper}>
              {(imageUrl || imageInput.collectionBanner) && (
                <img
                  src={
                    imageInput.collectionBanner
                      ? URL.createObjectURL(imageInput.collectionBanner)
                      : imageUrl
                  }
                  onLoad={() => {
                    setImageLoaded(true);
                    setNotLoaded(false);
                  }}
                  alt=""
                />
              )}
              {notLoaded && !imageLoaded && (
                <div className={classes.imgPlaceholder}>
                  <img src={imgPlaceholder.src} alt="asset" />
                </div>
              )}
            </div>
            <div className={classes.innerImageContainer}>
              {imageUrl && imageLoaded && (
                <img
                  src={
                    imageInput.collectionImage
                      ? URL.createObjectURL(imageInput.collectionImage)
                      : imageUrl
                  }
                  alt=""
                />
              )}
              {notLoaded && !imageLoaded && <img src={imgPlaceholder.src} alt="asset" />}
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
