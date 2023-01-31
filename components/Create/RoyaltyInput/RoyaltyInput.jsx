import classes from "./RoyaltyInput.module.css";
import CloseIcon from "../../../assets/icon-close.svg";
import AddIcon from "../../../assets/icon-add.svg";
import ErrorIcon from "../../../assets/icon-error-2.svg";
import React, { useContext, useEffect, useState } from "react";
import { StateContext } from "../../../context/state.context";
import { setMintData, setNotification } from "../../../context/state.actions";
import Button from "../../Button/Button";
import { digitsAfterDecimal } from "./RoyaltyScript";
import ArrowIcon from "../../../assets/icon-arrow-long.svg";
import { _handleCreateRoyalty } from "../Inputs/InputScript";

const RoyaltyInput = ({ name: name_, preview }) => {
  const { mintData, dispatch } = useContext(StateContext);
  const [totalRoyaltyValue, setTotalRoyaltyValue] = useState(0);

  const handleAddSplit = () => {
    const newSplit = { id: Date.now(), address: "", value: 0 };
    const splits = mintData[name_];
    let res = splits.every((split) => split.address && split.value);
    if (!res) {
      dispatch(
        setNotification({
          type: "warning",
          message: "Finish setting address and split amount to add more",
        })
      );
    } else {
      dispatch(setMintData({ ...mintData, [name_]: [...mintData[name_], newSplit] }));
    }
  };

  const handleSkip = () => {
    dispatch(setMintData({ ...mintData, ["Skip-Royalty"]: true }));
  };

  const handleChangeSplitAddress = (e) => {
    const { name, id, value } = e.target;
    const newSplit = mintData[name_].map((split) =>
      String(split.id) === id ? { ...split, [name]: value } : split
    );
    dispatch(setMintData({ ...mintData, [name_]: newSplit }));
  };

  const handleChangeSplitValue = (e) => {
    const { name, id, valueAsNumber } = e.target;
    if ((valueAsNumber <= 100 && valueAsNumber >= 0) || isNaN(valueAsNumber)) {
      if (digitsAfterDecimal(valueAsNumber) > 1) return;
      const newSplit = mintData[name_].map((split) =>
        String(split.id) === id ? { ...split, [name]: valueAsNumber } : split
      );
      dispatch(setMintData({ ...mintData, [name_]: newSplit }));
    } else {
      console.log("invalid input");
    }
  };

  const handleRemoveSplit = (id) => {
    const newSplit = mintData[name_].filter((split) => split.id !== id);
    dispatch(setMintData({ ...mintData, [name_]: newSplit }));
  };

  useEffect(() => {
    let sum = mintData[name_].reduce((acc, curr) => {
      return acc + curr.value;
    }, 0);

    setTotalRoyaltyValue(sum);
  }, [mintData[name_]]);

  return (
    <div className={classes.container}>
      {!preview && (
        <>
          <div className={classes.nameContainer}>
            <div className={classes.name}>Royalty Split</div>
            <div onClick={handleSkip} className={classes.skip}>
              <span>Skip this step</span>
              <ArrowIcon />
            </div>
          </div>
          <div className={classes.description}>
            Please, define each recipient’s wallet address and split amount.
          </div>
        </>
      )}
      <div className={classes.totalRoyaltyLabel}>Royalty value</div>
      <div className={classes.totalRoyalty}>
        <div>{totalRoyaltyValue}</div>
        <div className={classes.percent}>%</div>
      </div>
      <div className={classes.splitContainer}>
        {mintData[name_].map(({ id, address, value }, idx) => (
          <React.Fragment key={idx}>
            <div className={classes.requireds}>
              <div className={classes.required}>
                <div>Wallet address</div>
                <div className={classes.requiredIcon}>*</div>
              </div>
              <div className={classes.required}>
                <div>Split amount</div>
                <div className={classes.requiredIcon}>*</div>
              </div>
            </div>
            <div key={idx} className={classes.split}>
              <input
                className={classes.address}
                id={id}
                type="text"
                name="address"
                value={address}
                onChange={handleChangeSplitAddress}
                placeholder="address"
                disabled={preview}
              />
              <div className={classes.royalty}>
                <input
                  id={id}
                  type="number"
                  step="0.1"
                  min="0"
                  max="100"
                  name="value"
                  value={value}
                  onChange={handleChangeSplitValue}
                  placeholder="amount"
                  disabled={preview}
                />
                <div className={classes.percent}>%</div>
              </div>
              {!preview && (
                <div className={classes.closeIcon} onClick={() => handleRemoveSplit(id)}>
                  <CloseIcon />
                </div>
              )}
            </div>
          </React.Fragment>
        ))}
        {false && (
          <div className={classes.warningMsg}>
            <ErrorIcon />
            <div>Royalty split must not exceed selected value</div>
          </div>
        )}
      </div>
      {!preview && (
        <div className={classes.addIcon} onClick={handleAddSplit}>
          <Button dark outline height="1">
            <AddIcon />
            <div>Add address</div>
          </Button>
        </div>
      )}
    </div>
  );
};

export default RoyaltyInput;
