import classes from "./Collections.module.css";
import StarIcon from "../../../assets/icon-star.svg";
import Button from "../../Button/Button";
import nft1 from "../../../assets/nft-1.png";
import nft2 from "../../../assets/nft-2.png";
import nft3 from "../../../assets/nft-3.png";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

const Collections = () => {
  const cardRef = useRef(null);
  const [image, setImage] = useState([
    { img: nft1.src, bg: "linear-gradient(180deg, #FF51A2 0%, #CB339F 100%)", bc: "#CB339F" },
    { img: nft2.src, bg: "linear-gradient(180deg, #F9B132 0%, #CB339F 100%)", bc: "#F9B132" },
    { img: nft3.src, bg: "linear-gradient(180deg, #34F303 0%, #94F505 100%)", bc: "#94F505" },
  ]);

  useEffect(() => {
    const cards = cardRef.current.children;
    cards[0].onanimationiteration = (e) => {
      console.log("animation ended");
      const newImage = [...image];
      let first = newImage.shift();
      newImage.push(first);
      setImage(newImage);
    };
  }, [image]);

  return (
    <div className={classes.container}>
      <div ref={cardRef} className={classes.collection}>
        <div className={`${classes.card} ${classes.c1}`}>
          <div style={{ background: image[2].bg }} className={classes.top} />
          <div style={{ borderColor: image[2].bc }} className={classes.imgContainer}>
            <img src={image[2].img} alt="" />
          </div>
        </div>
        <div className={`${classes.card} ${classes.c2}`}>
          <div style={{ background: image[1].bg }} className={classes.top} />
          <div style={{ borderColor: image[1].bc }} className={classes.imgContainer}>
            <img src={image[1].img} alt="" />
          </div>
        </div>
        <div className={`${classes.card} ${classes.c3}`}>
          <div style={{ background: image[0].bg }} className={classes.top} />
          <div style={{ borderColor: image[0].bc }} className={classes.imgContainer}>
            <img src={image[0].img} alt="" />
          </div>
        </div>
        <div className={`${classes.card} ${classes.c4}`}>
          <div style={{ background: image[2].bg }} className={classes.top} />
          <div style={{ borderColor: image[2].bc }} className={classes.imgContainer}>
            <img src={image[2].img} alt="" />
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
          Buy Bleuwater NFT to become part of our community and gain early access and perks
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
