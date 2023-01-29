import SocialMediaLinkCard from "./SocialMediaLinkCard";
import { data } from "./SocialMediaLinkData";
import classes from "./SocialMediaLinks.module.css";

const SocialMediaLinks = () => {
  return (
    <div className={classes.container}>
      <div className={classes.mainText}>Follow us on social media</div>
      <div className={classes.smlContainer}>
        {data.map((sml, idx) => (
          <SocialMediaLinkCard key={idx} sml={sml} />
        ))}
      </div>
    </div>
  );
};

export default SocialMediaLinks;
