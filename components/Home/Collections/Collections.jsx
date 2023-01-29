import classes from "./Collections.module.css";
import StarIcon from "../../../assets/icon-star.svg";
import Button from "../../Button/Button";
import nft1 from "../../../assets/nft-1.png";
import nft2 from "../../../assets/nft-2.png";
import nft3 from "../../../assets/nft-3.png";
import Link from "next/link";

const Collections = () => {
  return (
    <div className={classes.container}>
      <div className={classes.collection}>
        <div className={`${classes.card} ${classes.c1}`}>
          <div className={classes.top} />
          <div className={classes.imgContainer}>
            <img src={nft3.src} alt="" />
          </div>
        </div>
        <div className={`${classes.card} ${classes.c2}`}>
          <div className={classes.top} />
          <div className={classes.imgContainer}>
            <img src={nft2.src} alt="" />
          </div>
        </div>
        <div className={`${classes.card} ${classes.c3}`}>
          <div className={classes.top} />
          <div className={classes.imgContainer}>
            <img src={nft1.src} alt="" />
          </div>
        </div>
        <div className={`${classes.card} ${classes.c4}`}>
          <div className={classes.top} />
          <div className={classes.imgContainer}>
            <img src={nft1.src} alt="" />
          </div>
        </div>
      </div>
      <div className={classes.detail}>
        <div className={classes.label}>Creator</div>
        <div className={classes.creator}>
          <div className={classes.name}>Bleuwaters</div>
          <StarIcon className={classes.starIcon} />
          <div className={classes.itemCount}>{"1000 items"}</div>
        </div>
        <div className={classes.collectionName}>I’ve got something to say</div>
        <div className={classes.description}>
          Buy Bleuwater NFT to become part of our community and gain early
          access and perks
        </div>
        <Link href="/explore-collections" className={classes.button}>
          <Button accent height={5}>
            Buy NFT
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Collections;
