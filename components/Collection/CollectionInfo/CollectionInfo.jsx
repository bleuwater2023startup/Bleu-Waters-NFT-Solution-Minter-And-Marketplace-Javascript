import classes from "./CollectionInfo.module.css";
import Instagram from "../../../assets/instagram.svg";
import Twitter from "../../../assets/twitter.svg";
import EditIcon from "../../../assets/icon-edit.svg";
import collectionLogo from "../../../assets/collection-logo.png";
import collectionBanner from "../../../assets/collection-banner.png";
import { formatAccount, getDate } from "../../../utils";
import supportedChains, { chainIdToName } from "../../../utils/supportedChains";
import CopyText from "../../CopyText/CopyTest";
import { ethers } from "ethers";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
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

const CollectionInfo = ({ collection }) => {
  const [inputValue, setInputValue] = useState(ICollection);
  const [imageInput, setImageInput] = useState(ICollectionImage);
  const router = useRouter();
  const targetPathname = router.asPath.split("?")[0];
  const targetId = router.query.id;
  const { name, createdAt, creator, nfts, chainId, priceHistory, owners: _owners } = collection;
  const floor = priceHistory.length ? ethers.utils.formatEther(priceHistory[0].price) : 0;
  const Volume = priceHistory.reduce(
    (acc, curr) => acc + Number(ethers.utils.formatEther(curr.price)),
    0
  );
  const owners = [...new Set(_owners.map((o) => o.owner))];

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
    if (!targetId) return;
    init(targetId);
  }, [router.asPath]);

  return (
    <div className={classes.container}>
      <div className={classes.banner}>
        <div className={classes.mainText}>Caught the Wave yet?</div>
        <div className={classes.subText}>Now is your chance</div>
        {imageInput.collectionBanner ? (
          <img src={URL.createObjectURL(imageInput.collectionBanner)} alt="" />
        ) : (
          <img src={collectionBanner.src} alt="" />
        )}
      </div>
      <div className={classes.innerContainer}>
        <div className={classes.DetailContainer}>
          <div className={classes.innerDetailContainer}>
            {imageInput.collectionImage ? (
              <img
                className={classes.collectionLogo}
                src={URL.createObjectURL(imageInput.collectionImage)}
                alt=""
              />
            ) : (
              <img className={classes.collectionLogo} src={collectionLogo.src} alt="" />
            )}
            <div className={classes.collectionDetail}>
              <div className={classes.collectionName}>{name}</div>
              <div className={classes.creator}>
                <div className={classes.property}>Created by</div>
                <div className={classes.value}>
                  <CopyText message={creator.id}>{formatAccount(creator.id)}</CopyText>
                </div>
              </div>
              <div className={classes.moreDetailContainer}>
                <div>
                  <div className={classes.property}>Item</div>
                  <div className={classes.value}>{nfts.length}</div>
                </div>
                <div>
                  <div className={classes.property}>Created</div>
                  <div className={classes.value}>{getDate(createdAt)}</div>
                </div>
                <div>
                  <div className={classes.property}>Chain</div>
                  <div className={classes.value}>{chainIdToName[chainId]}</div>
                </div>
              </div>
            </div>
          </div>
          <div className={classes.socialLinks}>
            <a href={inputValue.twitter} target="_blank" rel="noreferrer noopener">
              <Twitter />
            </a>
            <a href={inputValue.instagram} target="_blank" rel="noreferrer noopener">
              <Instagram />
            </a>
            <Link href={`${targetPathname}/edit?id=${targetId}`}>
              <EditIcon />
            </Link>
          </div>
        </div>
        <div className={classes.description}>
          Welcome to the home of {name} on Bleuwater. Discover the best items in this collection.
        </div>
        <div className={classes.data}>
          <div>
            <div className={classes.value}>{nfts.length}</div>
            <div className={classes.property}>Item</div>
          </div>
          <div>
            <div className={classes.value}>{owners.length}</div>
            <div className={classes.property}>Owners</div>
          </div>
          <div>
            <div className={classes.value}>
              {Number(floor).toFixed(1)}
              {supportedChains[parseInt(chainId)]?.symbol}
            </div>
            <div className={classes.property}>Floor</div>
          </div>
          <div>
            <div className={classes.value}>
              {Volume.toFixed(1)}
              {supportedChains[parseInt(chainId)]?.symbol}
            </div>
            <div className={classes.property}>Volume</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionInfo;
