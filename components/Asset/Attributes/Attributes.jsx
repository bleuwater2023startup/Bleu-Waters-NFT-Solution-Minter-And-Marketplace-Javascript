import classes from "./Attributes.module.css";

const Attributes = ({ ipfsData }) => {
  return (
    <div className={classes.container}>
      {ipfsData?.attributes.map(({ trait_type, value }, idx) => (
        <div key={idx} className={classes.attribute}>
          <div className={classes.traitType}>
            <div className={classes.key}>{trait_type}</div>
            <div>{value}</div>
          </div>
          {/* <div className={classes.rarity}>
            <div className={classes.key}>Rarity</div>
            <div>40%</div>
          </div> */}
        </div>
      ))}
    </div>
  );
};

export default Attributes;
