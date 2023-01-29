import classes from "./AssetDropdownWrapper.module.css";
import ChevronIcon from "../../../assets/icon-chevron.svg";
import { useState } from "react";

const AssetDropdownWrapper = ({ name, children, open }) => {
  const [toggleFilter, setToggleFilter] = useState(open);

  return (
    <div className={`${classes.container} ${toggleFilter && classes.active}`}>
      <div
        onClick={() => setToggleFilter(!toggleFilter)}
        className={classes.heading}
      >
        <div>{name}</div>
        <div className={classes.chevronIcon}>
          <ChevronIcon />
        </div>
      </div>
      <div className={classes.content}>{children}</div>
    </div>
  );
};

export default AssetDropdownWrapper;
