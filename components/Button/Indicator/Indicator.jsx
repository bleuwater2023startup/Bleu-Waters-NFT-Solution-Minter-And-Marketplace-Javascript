import classes from "./Indicator.module.css";
import CheckIcon from "../../../assets/icon-check.svg";

const Indicator = ({ active, complete, withLine }) => {
  return (
    <div
      className={`${classes.wrapper}  ${active && classes.active} ${
        complete && classes.complete
      }`}
    >
      <div className={classes.container}>
        <div className={classes.innerContainer}></div>
      </div>
      <CheckIcon className={classes.checkIcon} />
      {withLine && (
        <div className={classes.line}>
          <div className={classes.innerLine}></div>
        </div>
      )}
    </div>
  );
};

export default Indicator;
