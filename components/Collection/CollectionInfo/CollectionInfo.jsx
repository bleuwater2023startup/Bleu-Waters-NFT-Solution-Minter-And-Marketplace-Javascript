import classes from "./CollectionInfo.module.css";
import Telegram from "../../../assets/telegram.svg";
import Instagram from "../../../assets/instagram.svg";
import Twitter from "../../../assets/twitter.svg";
import collectionLogo from "../../../assets/collection-logo.png";
import { formatAccount, getDate } from "../../../utils";
import supportedChains, { chainIdToName } from "../../../utils/supportedChains";
import CopyText from "../../CopyText/CopyTest";
import { ethers } from "ethers";

const CollectionInfo = ({ collection }) => {
  const { name, createdAt, creator, nfts, chainId, priceHistory, owners: _owners } = collection;

  const floor = priceHistory.length ? ethers.utils.formatEther(priceHistory[0].price) : 0;
  const Volume = priceHistory.reduce(
    (acc, curr) => acc + Number(ethers.utils.formatEther(curr.price)),
    0
  );
  const owners = [...new Set(_owners.map((o) => o.owner))];

  return (
    <div className={classes.container}>
      <div className={classes.DetailContainer}>
        <div className={classes.innerDetailContainer}>
          <img className={classes.collectionLogo} src={collectionLogo.src} alt="" />
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
          <Twitter />
          <Instagram />
          <Telegram />
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
  );
};

export default CollectionInfo;
