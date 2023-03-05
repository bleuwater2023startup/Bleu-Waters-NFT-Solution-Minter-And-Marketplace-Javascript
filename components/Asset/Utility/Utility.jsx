import { data } from "./UtilityData";
import classes from "./Utility.module.css";

const Utility = ({ ipfsData }) => {
  return (
    <div className={classes.container}>
      {ipfsData?.utilities?.map(({ utility, duration }, idx) => (
        <div key={idx} className={classes.utility}>
          {data[utility.toLowerCase()]}
          <div className={classes.property}>{utility}</div>
          <div className={classes.value}>{duration}</div>
        </div>
      ))}
    </div>
  );
};

export default Utility;
