import BrokenIcon from "../../assets/icon-broken.svg";
import Button from "../Button/Button";
import classes from "./Error.module.css";

const Error = ({ onClick }) => {
  return (
    <div className={classes.container}>
      <div className={classes.heading}>Something went wrong</div>
      <BrokenIcon className={classes.icon} />
      <div className={classes.description}>
        We are working to fix it, click the refresh button to reload page.
      </div>
      <div className={classes.btnContainer}>
        <Button onClick={onClick} accent>
          Refresh
        </Button>
      </div>
    </div>
  );
};

export default Error;
