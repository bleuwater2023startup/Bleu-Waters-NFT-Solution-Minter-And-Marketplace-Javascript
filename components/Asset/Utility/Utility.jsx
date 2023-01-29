import { data } from "./UtilityData";
import classes from "./Utility.module.css";

const Utility = () => {
  const utility = [
    // This data will come with the nft on-chain
    {
      name: "Waitlist Spot",
      duration: "One Time",
    },
    {
      name: "E-Learning Class",
      duration: "6 Months",
    },
    {
      name: "One-on-one call",
      duration: "4 Calls",
    },
    {
      name: "Protected NFTs",
      duration: "Infinity",
    },
  ];

  return (
    <div className={classes.container}>
      {utility.map(({ name, duration }, idx) => (
        <div key={idx} className={classes.utility}>
          {data[name.toLowerCase()]}
          <div className={classes.property}>{name}</div>
          <div className={classes.value}>{duration}</div>
        </div>
      ))}
    </div>
  );
};

export default Utility;
