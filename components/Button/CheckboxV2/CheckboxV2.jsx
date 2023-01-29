import classes from "./CheckboxV2.module.css";
import TickIcon from "../../../assets/icon-tick.svg";

const CheckboxV2 = ({ active }) => {
  return (
    <div className={`${classes.container} ${active && classes.active}`}>
      <TickIcon className={classes.tickIcon} />
    </div>
  );
};

export default CheckboxV2;
