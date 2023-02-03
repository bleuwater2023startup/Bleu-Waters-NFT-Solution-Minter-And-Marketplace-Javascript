import classes from "./CardLoader.module.css";
import Skeleton from "@mui/material/Skeleton";

const CardLoader = () => {
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <Skeleton animation="wave" variant="rounded" width="100%" height={240} />
        <Skeleton animation="wave" variant="rounded" width="40%" height={30} />
        <Skeleton animation="wave" variant="rounded" width="70%" height={30} />
      </div>
    </div>
  );
};

export default CardLoader;
