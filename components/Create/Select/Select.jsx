import Button from "../../Button/Button";
import classes from "./Select.module.css";
import ChevronIcon from "../../../assets/icon-chevron.svg";
import { useState } from "react";

const Select = ({ setSelectContract }) => {
  const [dropdown, setDropdown] = useState(false);

  return (
    <div className={classes.container}>
      <div className={classes.innerContainer}>
        <div className={classes.selectContainer}>
          <div
            onClick={() => setDropdown(!dropdown)}
            className={classes.activeSelect}
          >
            <div>Active contract</div>
            <ChevronIcon />
          </div>
          <div className={`${classes.dropdown} ${dropdown && classes.active}`}>
            {[...Array(10)].map((el, idx) => (
              <div
                key={idx}
                onClick={() => setSelectContract(el)}
                className={classes.contract}
              >
                0x5340794F0AE62485F753AbceC1ca5F1a307b3c65
              </div>
            ))}
          </div>
        </div>
        <div
          onClick={() => setSelectContract("create new")}
          className={classes.button}
        >
          <Button accent>Create new</Button>
        </div>
      </div>
    </div>
  );
};

export default Select;
