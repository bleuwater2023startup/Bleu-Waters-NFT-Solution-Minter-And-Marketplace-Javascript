import classes from "./CollectionInfo.module.css";
import DotsIcon from "../../../assets/icon-dots.svg";
import ShareIcon from "../../../assets/icon-share.svg";
import EditIcon from "../../../assets/icon-edit.svg";
import Logo from "../../../assets/logo-disabled.svg";
import Badge from "../../../assets/icon-badge.svg";
import { formatAccount, getDate } from "../../../utils";
import supportedChains, { chainIdToName } from "../../../utils/supportedChains";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import { getCollectionImage, getCollectionProfile } from "../../../firebase/firebase";
import Link from "next/link";
import CopyText from "../../CopyText/CopyTest";
import { useContext } from "react";
import { StateContext } from "../../../context/state.context";

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
  const { account } = useContext(StateContext);
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
        {imageInput.collectionBanner ? (
          <img src={URL.createObjectURL(imageInput.collectionBanner)} alt="" />
        ) : (
          <Logo />
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
              <div className={classes.collectionLogo}>
                <Logo />
              </div>
            )}
            <div className={classes.collectionDetail}>
              <div className={classes.collectionName}>
                <div>{name}</div>
                <Badge />
              </div>
              <div className={classes.creator}>
                <div className={classes.property}>Created by</div>
                <Link href={`/${creator.id}`} className={classes.value}>
                  {formatAccount(creator.id)}
                </Link>
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
          <div className={classes.socialLinksContainer}>
            <div className={classes.dropdownWrapper}>
              <div className={classes.dotsIcon}>
                <ShareIcon />
              </div>
              <div className={classes.dropdownContainer}>
                <div className={classes.dropdown}>
                  <div className={classes.item}>
                    <div className={classes.content}>
                      <CopyText message={window.location.href} icon>
                        Copy link
                      </CopyText>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {creator.id.toLowerCase() === account.toLowerCase() ? (
              <div className={classes.dropdownWrapper}>
                <div className={classes.dotsIcon}>
                  <DotsIcon />
                </div>
                <div className={classes.dropdownContainer}>
                  <div className={classes.dropdown}>
                    <div className={classes.item}>
                      <Link
                        href={`${targetPathname}/edit?id=${targetId}`}
                        className={classes.content}>
                        <EditIcon />
                        <div>Edit collection</div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
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
