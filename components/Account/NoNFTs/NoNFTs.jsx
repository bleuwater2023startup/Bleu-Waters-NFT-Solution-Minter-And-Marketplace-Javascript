import Link from "next/link";
import Button from "../../Button/Button";
import classes from "./NoNFTs.module.css";

const NoNFTs = () => {
  return (
    <div className={classes.container}>
      <div className={classes.mainText}>No NFTs</div>
      <div className={classes.subText}>
        You don’t have NFTs yet, NFTS you collected will appear here
      </div>
      <Link href={"/explore-collections"} className={classes.button}>
        <Button accent>Explore Collection</Button>
      </Link>
    </div>
  );
};

export default NoNFTs;
