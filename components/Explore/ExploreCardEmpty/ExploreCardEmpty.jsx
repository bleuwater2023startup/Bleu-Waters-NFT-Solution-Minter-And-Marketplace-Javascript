import classes from "./ExploreCardEmpty.module.css";
import Logo from "../../../assets/logo-disabled.svg";
import Button from "../../Button/Button";

const ExploreCardEmpty = () => {
  return (
    <div className={classes.container}>
      <Logo />
      <div className={classes.buttonContainer}>
        <div className={classes.button}>
          <Button accent>create</Button>
        </div>
      </div>
      <div className={classes.innerContainer}>
        <div className={classes.content} />
      </div>
    </div>
  );
};

export default ExploreCardEmpty;
