import classes from "./FilterDropdownWrapper.module.css";
import ChevronIcon from "../../../assets/icon-chevron.svg";
import { useState } from "react";

const FilterDropdownWrapper = ({ name, children }) => {
  const [toggleFilter, setToggleFilter] = useState(false);
  return (
    <div className={`${classes.container} ${toggleFilter && classes.active}`}>
      <div
        onClick={() => setToggleFilter(!toggleFilter)}
        className={classes.heading}
      >
        <div>{name}</div>
        <ChevronIcon className={classes.chevronIcon} />
      </div>
      <div className={classes.content}>{children}</div>
    </div>
  );
};

export default FilterDropdownWrapper;
