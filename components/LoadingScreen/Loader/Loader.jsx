import classes from "./Loader.module.css";
import LoadingIcon from "../../assets/icon-loading.svg";

const Loader = () => {
  return (
    <>
      {title && description && (
        <div className={classes.container}>
          <div className={classes.wrapper}>
            <LoadingIcon className={classes.loadingIcon} />
          </div>
        </div>
      )}
    </>
  );
};

export default Loader;
