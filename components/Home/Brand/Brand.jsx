import classes from "./Brand.module.css";
import Lottie from "react-lottie";
import * as animationData from "../../../assets/_brand.json";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";

const Brand = () => {
  const [isStopped, setIsStopped] = useState(false);
  const containerRef = useRef(null);
  const matches = useMediaQuery("(max-width:720px)");

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    if (!containerRef.current) return;
    let container = containerRef.current;
    window.addEventListener("scroll", () => {
      const { top, bottom } = container.getBoundingClientRect();
      if (top > bottom / 2 - top) {
        setIsStopped(true);
      } else {
        setIsStopped(false);
      }
    });
  }, []);

  return (
    <div ref={containerRef} className={classes.container}>
      <div className={classes.mainText}>
        Building and scaling NFT brand on web3 is hard! ! Let’s make it easy with our solution
      </div>
      <div className={classes.subText}>
        We build Fully-featured ecosystem for NFT trading and protection
      </div>
      <Lottie
        className={classes.brandImage}
        options={defaultOptions}
        isStopped={isStopped}
        isPaused={false}
        width={matches ? "100%" : "70%"}
      />
    </div>
  );
};

export default Brand;
