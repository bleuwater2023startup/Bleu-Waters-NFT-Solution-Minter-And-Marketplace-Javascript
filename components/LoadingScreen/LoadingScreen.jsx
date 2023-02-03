import classes from "./LoadingScreen.module.css";
import { useContext } from "react";
import { StateContext } from "../../context/state.context";
import CircularProgress from "@mui/material/CircularProgress";

const LoadingScreen = () => {
  const { loadingScreen } = useContext(StateContext);
  const { title, description } = loadingScreen;

  return (
    <>
      {title && description && (
        <div className={classes.container}>
          <div className={classes.wrapper}>
            <CircularProgress className={classes.loadingIcon} />
            <div className={classes.heading}>{title}</div>
            <div className={classes.description}>{description}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoadingScreen;
