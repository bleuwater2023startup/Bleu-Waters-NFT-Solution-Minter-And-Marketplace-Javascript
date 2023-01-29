import classes from "./SocialMediaLinkCard.module.css";

const SocialMediaLinkCard = ({ sml: { name, link, icon } }) => {
  return (
    <div className={classes.container}>
      <div className={classes.icon}>{icon}</div>
      <div className={classes.innerContainer}>
        <div className={classes.name}>{name}</div>
        <div>@Bleuwater</div>
      </div>
    </div>
  );
};

export default SocialMediaLinkCard;
