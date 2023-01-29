import { useState } from "react";
import classes from "./Select.module.css";
import ChevronIcon from "../../assets/icon-chevron.svg";

const Select = ({ list, onChange, _default }) => {
  const [activeSelect, setActiveSelect] = useState(_default);
  const [dropdown, toggleDropdown] = useState(false);

  const handleItemClick = (item) => {
    setActiveSelect(item);
    onChange(item);
    toggleDropdown(false);
  };

  return (
    <div className={classes.container}>
      <div
        onClick={() => toggleDropdown(!dropdown)}
        className={classes.activeItem}
      >
        <div className={classes.value}>{activeSelect}</div>
        <ChevronIcon
          className={`${classes.chevronIcon} ${dropdown && classes.active}`}
        />
      </div>
      <div className={`${classes.dropdown} ${dropdown && classes.active}`}>
        {list.map((item, idx) => (
          <div
            onClick={() => handleItemClick(item)}
            key={idx}
            className={classes.item}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Select;
