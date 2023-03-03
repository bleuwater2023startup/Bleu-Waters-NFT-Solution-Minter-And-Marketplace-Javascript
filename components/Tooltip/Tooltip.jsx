import classes from "./Tooltip.module.css";
import InfoIcon from "../../assets/icon-info-2.svg";

const Tooltip = ({ data }) => {
  return (
    <div className={classes.container}>
      <InfoIcon />
      <div className={classes.tooltip}>{data}</div>
    </div>
  );
};

export default Tooltip;
