import classes from "./FAQCard.module.css";
import ChevronIcon from "../../../assets/icon-chevron.svg";

const FAQCard = ({ faq: { name, description }, dropdown, setDropdown }) => {
  return (
    <div className={classes.container}>
      <div className={classes.name_btn}>
        <div className={classes.name}>{name}</div>
        <div
          onClick={() => setDropdown(name)}
          className={`${classes.chevronIcon} ${
            dropdown === name && classes.active
          }`}
        >
          <ChevronIcon />
        </div>
      </div>
      <div
        className={`${classes.description} ${
          dropdown === name && classes.active
        }`}
      >
        {description}
      </div>
    </div>
  );
};

export default FAQCard;
