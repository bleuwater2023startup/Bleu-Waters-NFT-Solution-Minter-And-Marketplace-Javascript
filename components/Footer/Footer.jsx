import classes from "./Footer.module.css";
import Logo from "../../assets/footer-logo.svg";
import RightIcon from "../../assets/icon-right.svg";

const Footer = () => {
  return (
    <div className={classes.container}>
      <div className={classes.rights}>
        <RightIcon />
        <div>All Rights reserved 2023</div>
      </div>
      <div className={classes.protect}>
        <div>Protectd by</div>
        <Logo className={classes.logo} />
      </div>
    </div>
  );
};

export default Footer;
