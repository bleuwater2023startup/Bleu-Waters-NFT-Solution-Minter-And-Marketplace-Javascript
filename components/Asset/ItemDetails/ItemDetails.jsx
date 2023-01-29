import classes from "./ItemDetails.module.css";
import LinkIcon from "../../../assets/icon-link.svg";
import { formatAccount, getDate } from "../../../utils";
import { formatIpfsUrl } from "../../../utils/ipfs";
import { chainIdToName } from "../../../utils/supportedChains";

const ItemDetails = ({ collection: { nfts } }) => {
  const { nftAddress, txHistory, royaltyInfo, tokenId, tokenURI, collection } =
    nfts[0];
  const { txDate, txId } = txHistory.find((tx) => tx.txType === "Minting");

  return (
    <div className={classes.container}>
      <div className={classes.document}>
        <div className={classes.property}>Mint Address</div>
        <a
          href={`https://mumbai.polygonscan.com/address/${nftAddress}`}
          target="_blank"
          rel="noreferrer noopener"
          className={`${classes.value} ${classes.link}`}
        >
          {formatAccount(nftAddress)}
        </a>
      </div>
      <div className={classes.document}>
        <div className={classes.property}>TokenId</div>
        <div className={`${classes.value} ${classes.link}`}>
          <a
            href={formatIpfsUrl(tokenURI)}
            target="_blank"
            rel="noreferrer noopener"
            className={`${classes.value} ${classes.link}`}
          >
            {tokenId}
          </a>
        </div>
      </div>
      <div className={classes.document}>
        <div className={classes.property}>Chain</div>
        <div className={classes.value}>{chainIdToName[collection.chainId]}</div>
      </div>
      <div className={classes.document}>
        <div className={classes.property}>Minted</div>
        <div className={classes.value}>{getDate(txDate)}</div>
      </div>
      <div className={classes.document}>
        <div className={classes.property}>Creator Royalties</div>
        <div className={classes.value}>{royaltyInfo / 100}%</div>
      </div>
      <div className={classes.document}>
        <div className={classes.property}>View on Polyscan</div>
        <a
          href={`https://mumbai.polygonscan.com/tx/${txId}`}
          target="_blank"
          rel="noreferrer noopener"
          className={`${classes.linkIcon} ${classes.clickable}`}
        >
          <LinkIcon />
        </a>
      </div>
    </div>
  );
};

export default ItemDetails;
