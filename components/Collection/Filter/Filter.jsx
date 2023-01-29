import Button from "../../Button/Button";
import CheckboxV2 from "../../Button/CheckboxV2/CheckboxV2";
import ToggleButton from "../../Button/Toggle/Toggle";
import FilterDropdownWrapper from "../FilterDropdownWrapper/FilterDropdownWrapper";
import classes from "./Filter.module.css";
import { parseData } from "./FilterScript";
import CloseIcon from "../../../assets/icon-close.svg";

const Filter = ({ nftDetails, setActiveFilter, activeFilter, onClose }) => {
  const attributes = parseData(nftDetails);

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
            <ToggleButton onClick={(e) => console.log(e)} />
          </div>
          <div className={classes.status}>
            <div>Only community Listings</div>
            <ToggleButton onClick={(e) => console.log(e)} />
          </div>
        </div>
      </FilterDropdownWrapper>
      <FilterDropdownWrapper name="Price">
        <div className={classes.priceContainer}>
          <div className={classes.priceInnerContainer}>
            <div className={classes.price}>
              <div className={classes.range}>Lowest</div>
              <div className={classes.priceInput}>
                <input type="text" className={classes.input} placeholder="0" />
                <div className={classes.tag}>MATIC</div>
              </div>
            </div>
            <div className={classes.price}>
              <div className={classes.range}>Highest</div>
              <div className={classes.priceInput}>
                <input type="text" className={classes.input} placeholder="0" />
                <div className={classes.tag}>MATIC</div>
              </div>
            </div>
          </div>
          <div className={classes.button}>
            <Button dark outline>
              Apply
            </Button>
            <Button dark outline>
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
                onClick={() => handleAttributeClick(attribute, type)}
              >
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
