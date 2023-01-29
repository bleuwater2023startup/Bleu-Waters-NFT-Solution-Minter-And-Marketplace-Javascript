import { useState } from "react";
import classes from "./PriceSort.module.css";
import ChevronIcon from "../../../assets/icon-chevron.svg";
import SortIcon from "../../../assets/icon-sort.svg";

const PriceSort = ({ onChange }) => {
  const [activeSelect, setActiveSelect] = useState("asc");

  const handleSort = (orderDir) => {
    setActiveSelect(orderDir);
    onChange(orderDir);
  };

  return (
    <div className={classes.container}>
      <div className={classes.activeItem}>
        <SortIcon />
        <div className={classes.value}>
          Price: {activeSelect === "asc" ? "Low To High" : "High To Low"}
        </div>
        <ChevronIcon className={classes.chevronIcon} />
      </div>
      <div className={classes.dropdownContainer}>
        <div className={classes.dropdown}>
          <div onClick={() => handleSort("asc")} className={classes.item}>
            Low To High
          </div>
          <div onClick={() => handleSort("desc")} className={classes.item}>
            High To Low
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceSort;
