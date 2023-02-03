import classes from "./ProfileLoader.module.css";
import Skeleton from "@mui/material/Skeleton";

const ProfileLoader = () => {
  return (
    <div className={classes.container}>
      <div className={classes.bgImage}>
        <Skeleton animation="wave" variant="rounded" width="100%" height="16em" />
      </div>
      <div className={classes.innerContainer}>
        <div className={classes.DetailContainer}>
          <div className={classes.innerDetailContainer}>
            <div className={classes.imageContainer}>
              <Skeleton animation="wave" variant="rounded" width="12em" height="12em" />
            </div>
            <div className={classes.collectionDetail}>
              <Skeleton animation="wave" variant="rounded" width="8em" height="1em" />
              <Skeleton animation="wave" variant="rounded" width="12em" height="1em" />
              <Skeleton animation="wave" variant="rounded" width="14em" height="1em" />
            </div>
          </div>
        </div>
        <div className={classes.description}>
          <Skeleton animation="wave" variant="rounded" width="100%" height="2em" />
        </div>
      </div>
    </div>
  );
};

export default ProfileLoader;
