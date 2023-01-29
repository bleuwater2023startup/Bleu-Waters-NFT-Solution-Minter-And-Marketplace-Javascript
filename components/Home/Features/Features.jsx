import FeaturesCard from "./FeaturesCard";
import classes from "./Features.module.css";
import { data } from "./FeaturesData";
import Button from "../../Button/Button";

const Features = () => {
  return (
    <div className={classes.container}>
      <div className={classes.mainText}>
        All your NFT project needs in one place
      </div>
      <div className={classes.subText}>
        Features that helps you sell, protect and get royalties paid
      </div>
      <div className={classes.features}>
        {data.map((feature, idx) => (
          <FeaturesCard key={idx} feature={feature} />
        ))}
      </div>
      <div className={classes.button}>
        <Button accent outline outline_dark height={5}>
          Get in touch
        </Button>
      </div>
    </div>
  );
};

export default Features;
