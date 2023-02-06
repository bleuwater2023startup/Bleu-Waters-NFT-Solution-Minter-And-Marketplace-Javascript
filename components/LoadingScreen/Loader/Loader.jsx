import classes from "./Loader.module.css";
import CircularProgress from "@mui/material/CircularProgress";

const Loader = ({ overlay }) => {
  return (
    <div className={`${classes.container} ${overlay && classes.overlay}`}>
      <div className={classes.wrapper}>
        <CircularProgress style={{ width: "2em", height: "2em" }} />
      </div>
    </div>
  );
};

export default Loader;
