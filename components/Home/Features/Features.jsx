import FeaturesCard from "./FeaturesCard";
import classes from "./Features.module.css";
import { data } from "./FeaturesData";
import Button from "../../Button/Button";
import { useEffect, useRef } from "react";
import { useState } from "react";

const Features = () => {
  const fRef = useRef(null);

  useEffect(() => {
    let box = fRef.current;
    box.style.scrollBehavior = "smooth";
    let lastCard = box.children[box.children.length - 1];
    let firstCard = box.children[0];
    let lock = true;
    let pos = true;

    let timerId = setInterval(() => {
      let right = lastCard.getBoundingClientRect().right;
      let left = firstCard.getBoundingClientRect().left;
      let win = window.innerWidth;

      if (left >= 16 && pos) {
        lock = true;
        pos = false;
      }

      if (right <= win && !pos) {
        lock = false;
        pos = true;
      }

      if (!lock) {
        box.scrollBy(-330, 0);
      } else {
        box.scrollBy(330, 0);
      }
    }, 5000);

    return () => {
      document.documentElement.style.scrollBehavior = "none";
      clearInterval(timerId);
    };
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.mainText}>All your NFT project needs in one place</div>
      <div className={classes.subText}>
        Features that helps you sell, protect and get royalties paid
      </div>
      <div ref={fRef} className={classes.features}>
        {data.map((feature, idx) => (
          <FeaturesCard key={idx} feature={feature} />
        ))}
      </div>
      <div className={classes.button}>
        <Button accent outline outline_dark height={5}>
          Get in touch
        </Button>
      </div>
    </div>
  );
};

export default Features;
