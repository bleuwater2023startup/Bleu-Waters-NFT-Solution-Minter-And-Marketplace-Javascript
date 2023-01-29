import classes from "./Benefits.module.css";
import Benefit from "../../../assets/benefits.svg";
import { data } from "./BenefitsData";
import BenefitCheck from "../../../assets/benefit-check.svg";

const Benefits = () => {
  return (
    <div className={classes.container}>
      <div className={classes.innerContainer}>
        <div className={classes.mainText}>
          What you get when you <br /> buy Bleuwaters NFTs
        </div>
        {data.map((benefit, idx) => (
          <div key={idx} className={classes.benefit}>
            <BenefitCheck className={classes.checkIcon} />
            <div className={classes.text}>{benefit}</div>
          </div>
        ))}
      </div>
      <Benefit className={classes.benefitIcon} />
    </div>
  );
};

export default Benefits;
