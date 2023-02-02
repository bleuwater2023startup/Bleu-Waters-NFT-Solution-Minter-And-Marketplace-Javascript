import Button from "../../Button/Button";
import CheckboxV2 from "../../Button/CheckboxV2/CheckboxV2";
import ToggleButton from "../../Button/Toggle/Toggle";
import FilterDropdownWrapper from "../FilterDropdownWrapper/FilterDropdownWrapper";
import classes from "./Filter.module.css";
import { parseData } from "./FilterScript";
import CloseIcon from "../../../assets/icon-close.svg";
import { useState } from "react";

const Filter = ({
  nftDetails,
  setActiveFilter,
  activeFilter,
  onClose,
  handleToggleChange,
  handlePriceRange,
}) => {
  const attributes = parseData(nftDetails);
  const [inputValue, setInputValue] = useState({
    min: "0",
    max: "0",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (Number(e.target.value) < 0 || isNaN(Number(e.target.value))) {
      return setInputValue({ ...inputValue, [name]: "" });
    }
    setInputValue({ ...inputValue, [name]: value });
  };

  const handleCancel = () => {
    handlePriceRange({
      min: "0",
      max: "0",
    });
    setInputValue({
      min: "0",
      max: "0",
    });
  };

  const handleApply = () => {
    handlePriceRange(inputValue);
  };

  const handleAttributeClick = (attribute, type) => {
    setActiveFilter((a) => {
      if (a.includes(`${attribute}:${type}`)) {
        return a.filter((i) => i != `${attribute}:${type}`);
      } else {
        return [...a, `${attribute}:${type}`];
      }
    });
  };

  const isActive = (attribute, type) => {
    if (activeFilter.includes(`${attribute}:${type}`)) {
      return true;
    }
  };

  return (
    <div className={classes.container}>
      <div onClick={onClose} className={classes.closeIcon}>
        <CloseIcon />
      </div>
      <FilterDropdownWrapper name="Status">
        <div className={classes.statusContainer}>
          <div className={classes.status}>
            <div>Listed item only</div>
            <ToggleButton onClick={(e) => handleToggleChange({ type: "item", state: e })} />
          </div>
          <div className={classes.status}>
            <div>Only community Listings</div>
            <ToggleButton onClick={(e) => handleToggleChange({ type: "community", state: e })} />
          </div>
        </div>
      </FilterDropdownWrapper>
      <FilterDropdownWrapper name="Price">
        <div className={classes.priceContainer}>
          <div className={classes.priceInnerContainer}>
            <div className={classes.price}>
              <div className={classes.range}>Lowest</div>
              <div className={classes.priceInput}>
                <input
                  type="text"
                  name="min"
                  value={inputValue.min}
                  onChange={handleInputChange}
                  className={classes.input}
                />
                <div className={classes.tag}>Matic</div>
              </div>
            </div>
            <div className={classes.price}>
              <div className={classes.range}>Highest</div>
              <div className={classes.priceInput}>
                <input
                  type="text"
                  name="max"
                  value={inputValue.max}
                  onChange={handleInputChange}
                  className={classes.input}
                />
                <div className={classes.tag}>Matic</div>
              </div>
            </div>
          </div>
          <div className={classes.button}>
            <Button onClick={handleApply} height={2} dark outline>
              Apply
            </Button>
            <Button onClick={handleCancel} height={2} dark outline>
              Cancel
            </Button>
          </div>
        </div>
      </FilterDropdownWrapper>
      {Object.keys(attributes).map((attribute, idx) => (
        <FilterDropdownWrapper key={idx} name={attribute}>
          <div className={classes.attributeWrapper}>
            {attributes[attribute].map(({ type, count }, idx) => (
              <div
                key={idx}
                className={classes.attributeContainer}
                onClick={() => handleAttributeClick(attribute, type)}>
                <CheckboxV2 active={isActive(attribute, type)} />
                <div className={classes.attribute}>
                  <div>{type}</div>
                  <div>{count}</div>
                </div>
              </div>
            ))}
          </div>
        </FilterDropdownWrapper>
      ))}
    </div>
  );
};

export default Filter;
