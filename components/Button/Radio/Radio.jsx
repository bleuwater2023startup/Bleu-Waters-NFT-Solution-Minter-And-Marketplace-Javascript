import classes from "./Radio.module.css";

const RadioButton = ({ onClick, active, id }) => {
  return (
    <div
      onClick={() => onClick(id)}
      className={`${classes.container} ${active === id && classes.active}`}
    >
      <div className={classes.innerContainer}></div>
    </div>
  );
};

export default RadioButton;
