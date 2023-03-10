import classes from "./CardLoader.module.css";
import Skeleton from "@mui/material/Skeleton";

const CardLoader = ({ explore }) => {
  return (
    <div className={classes.container}>
      <div
        style={{ minWidth: explore ? "20em" : "100%", width: "100%" }}
        className={classes.wrapper}>
        <Skeleton animation="wave" variant="rounded" width="100%" height="100%" />
        <Skeleton animation="wave" variant="rounded" width="40%" height={30} />
        <Skeleton animation="wave" variant="rounded" width="70%" height={30} />
        <Skeleton animation="wave" variant="rounded" width="100%" height={100} />
      </div>
    </div>
  );
};

export default CardLoader;
