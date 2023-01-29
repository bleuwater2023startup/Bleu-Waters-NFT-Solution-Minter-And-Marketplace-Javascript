import classes from "./FeaturesCard.module.css";

const FeaturesCard = ({ feature: { name, description, icon, background } }) => {
  return (
    <div style={{ background: background }} className={classes.container}>
      <div className={classes.icon}>{icon}</div>
      <div className={classes.name}>{name}</div>
      <div className={classes.description}>{description}</div>
    </div>
  );
};

export default FeaturesCard;
