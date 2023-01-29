import { ethers } from "ethers";
import { formatAccount, getDate } from "../../../utils";
import Button from "../../Button/Button";
import classes from "./History.module.css";

const History = ({ collection: { nfts }, usd }) => {
  const { txHistory } = nfts[0];
  return (
    <div className={classes.container}>
      {txHistory.map((tx, idx) => (
        <div key={idx} className={classes.innerContainer}>
          <div className={classes.detail}>
            <div className={classes.icon}></div>
            <div>
              <div className={classes.activity}>
                <span className={classes.account}>
                  {formatAccount(tx.from, 4, 3)}
                </span>
                {tx.txType === "Minting" && <div>Minted this NFT</div>}
                {tx.txType === "Listing" && <div>Set price at</div>}
                {tx.txType === "Transfer" && (
                  <>
                    <span>transfered</span>
                    <span className={classes.account}>
                      {formatAccount(tx.to, 4, 3)}
                    </span>
                  </>
                )}
                {tx.txType === "Sale" && (
                  <>
                    <span>sold to</span>
                    <span className={classes.account}>
                      {formatAccount(tx.to, 4, 3)}
                    </span>
                  </>
                )}
              </div>
              <div className={classes.data_time}>{getDate(tx.txDate)}</div>
            </div>
          </div>
          <div className={classes.price}>
            <div className={classes.nativePrice}>
              {ethers.utils.formatEther(tx.price)} matic
            </div>
            <div className={classes.usdPrice}>
              {(usd * Number(ethers.utils.formatEther(tx.price))).toFixed(3)}{" "}
              USD
            </div>
          </div>
        </div>
      ))}

      {/* <div className={classes.loadBtn}>
        <Button accent outline>
          Load more
        </Button>
      </div> */}
    </div>
  );
};

export default History;
