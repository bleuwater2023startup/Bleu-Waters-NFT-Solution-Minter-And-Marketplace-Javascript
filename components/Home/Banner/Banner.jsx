import Button from "../../Button/Button";
import classes from "./Banner.module.css";
import ChevronIcon from "../../../assets/icon-chevron.svg";
import BannerImg from "../../../assets/banner.png";
import Link from "next/link";
import { useState } from "react";
// import WavyBg from "../WavyBg/WavyBg";
// import vidBg from "../../../assets/videos/wavy-bg.mp4";

const Banner = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSlideDown = () => {
    document.documentElement.style.scrollBehavior = "smooth";
    window.scrollBy(0, window.innerHeight);
    document.documentElement.style.scrollBehavior = "none";
  };

  const handlePlaying = () => {
    setIsPlaying(true);
  };

  return (
    <div className={classes.container}>
      {/* <video muted={true} autoPlay onPlaying={handlePlaying} loop className={classes.bannerVideo}>
        <source src="/wavy-bg-2.mp4" type="video/mp4" />
        Your browser does not support HTML5 video.
      </video> */}
      {/* {!isPlaying && <WavyBg />} */}
      <div className={classes.overlay}></div>
      <img className={classes.overlay2} src={BannerImg.src} alt="" />
      <div className={classes.textContainer}>
        <div className={classes.mainText}>The wave is coming, be in control!</div>
        <div className={classes.subText}>
          We will help you build and launch your NFT ecosystem with the guarantee of getting
          royalties in secondary sales, and full ownership of your smart contract and NFTs.
        </div>
        <div className={classes.subText_2}>Buy NFT to join Waitlist!</div>
        <Link href="/explore-collections" className={classes.button}>
          <Button accent height={5}>
            Buy NFT
          </Button>
        </Link>
        <div onClick={handleSlideDown} className={classes.chevronIcon}>
          <ChevronIcon />
        </div>
      </div>
    </div>
  );
};

export default Banner;
