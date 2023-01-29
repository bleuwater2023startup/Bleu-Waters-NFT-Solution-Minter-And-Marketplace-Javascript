import Button from "../../Button/Button";
// import Select from "../../Select/Select";
import classes from "./SaleDetails.module.css";
import FixedIcon from "../../../assets/icon-fixed.svg";
import VariableIcon from "../../../assets/icon-variable.svg";
import { chainIdToName } from "../../../utils/supportedChains";
import { useEffect, useState } from "react";
import { getMaticUsdPrice } from "../../../utils";

const SaleDetails = ({ onListButtonClick, collection }) => {
  // const expirationList = ["1 month", "3 months", "6 months", "1 year"];
  const { chainId, nfts } = collection;
  const { royaltyInfo } = nfts[0];
  const [inputValue, setInputValue] = useState("");
  const [usdPrice, setUsdPrice] = useState(0);

  const handleChange = (e) => {
    if (Number(e.target.value) < 0 || isNaN(Number(e.target.value)))
      return setInputValue("");
    setInputValue(e.target.value);
  };

  useEffect(() => {
    (async function getUsd() {
      const res = await getMaticUsdPrice(chainId);
      setUsdPrice(res * Number(inputValue));
    })();
  }, [inputValue]);

  return (
    <div className={classes.container}>
      <div className={classes.section}>
        <div className={classes.heading}>Select a type of sale</div>
        <div className={classes.saleType}>
          <div className={classes.type}>
            <FixedIcon />
            <div>Fixed</div>
          </div>
          <div className={classes.type}>
            <VariableIcon />
            <div>Time Auction</div>
          </div>
        </div>
      </div>

      <div className={classes.section}>
        <div className={classes.heading}>Set a price</div>
        <div className={classes.priceInput}>
          <input
            type="text"
            placeholder="Enter price for one item"
            onChange={handleChange}
            value={inputValue}
          />
          <label htmlFor="">Matic</label>
        </div>
        <div className={classes.usdPrice}>{`$${usdPrice.toFixed(3)}`}</div>
        <div className={classes.fees}>
          <div className={classes.fee}>
            <div className={classes.name}>Service fee</div>
            <div className={classes.value}>0%</div>
          </div>
          <div className={classes.fee}>
            <div className={classes.name}>Royalty fee</div>
            <div className={classes.value}>{royaltyInfo / 100} %</div>
          </div>
        </div>
      </div>

      {/* <div className={classes.section}>
        <div className={classes.heading}>Expiration</div>
        <Select
          list={expirationList}
          _default="3 months"
          onChange={(e) => console.log(e)}
        />
      </div> */}

      <div className={classes.section}>
        <div className={classes.heading}>Chain</div>
        <div className={classes.chain}>
          <div className={classes.name}>{chainIdToName[chainId]}</div>
          <div className={classes.icon}></div>
        </div>
      </div>

      <div
        onClick={() => onListButtonClick(inputValue)}
        className={classes.button}
      >
        <Button accent>List item</Button>
      </div>
    </div>
  );
};

export default SaleDetails;
