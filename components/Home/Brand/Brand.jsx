import classes from "./Brand.module.css";
import BrandImage from "../../../assets/brand2.png";

const Brand = () => {
  return (
    <div className={classes.container}>
      <div className={classes.mainText}>
        Building and scaling NFT brand on web3 is hard! ! Let’s make it easy
        with our solution
      </div>
      <div className={classes.subText}>
        We build Fully-featured ecosystem for NFT trading and protection
      </div>
      <img className={classes.brandImage} src={BrandImage.src} alt="website" />
    </div>
  );
};

export default Brand;
