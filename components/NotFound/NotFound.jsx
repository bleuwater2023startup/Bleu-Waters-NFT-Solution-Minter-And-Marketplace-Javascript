import Link from "next/link";
import NotFoundIcon from "../../assets/icon-404.svg";
import Button from "../Button/Button";
import classes from "./NotFound.module.css";

const NotFound = () => {
  return (
    <div className={classes.container}>
      <NotFoundIcon className={classes.icon} />
      <div className={classes.heading}>Uh Oh! Page not found</div>
      <Link href="/" className={classes.btnContainer}>
        <Button accent>Back Home</Button>
      </Link>
    </div>
  );
};

export default NotFound;
