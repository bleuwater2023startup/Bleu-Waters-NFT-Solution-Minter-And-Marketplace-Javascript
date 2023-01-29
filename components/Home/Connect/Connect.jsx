import classes from "./Connect.module.css";
import BleuLogo from "../../../assets/bleu-logo.svg";
import Button from "../../Button/Button";

const Connect = () => {
  return (
    <div className={classes.container}>
      <div className={classes.innerContainer}>
        <BleuLogo className={classes.bleuLogo} />
        <div className={classes.detail}>
          <div className={classes.mainText}>BleuWaters ecosystem</div>
          <div className={classes.subText}>Your own smart conract</div>
          <div className={classes.subText2}>
            Your own ecosystem with your NFTs protected from being sold on other
            marketplace, plus automated royalty payout in secondary sales!
          </div>
          <div className={classes.button}>
            <Button accent outline outline_dark height={5}>
              Get in touch
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Connect;
