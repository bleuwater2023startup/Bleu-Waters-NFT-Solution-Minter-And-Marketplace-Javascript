import ExploreCard from "../../Explore/ExploreCard/ExploreCard";
import Paginate from "../../Paginate/Paginate";
import NFTs from "../NFTs/NFTs";
import classes from "./CreatedNFTs.module.css";

const CreatedNFTs = ({ collections }) => {
  let nfts = collections.map((collection) => collection.nfts);
  nfts = [...nfts].flat();

  return (
    <div className={classes.container}>
      <div className={classes.collectionContainer}>
        {collections
          .filter((collection, idx) => collection.nfts.length && idx < 13)
          .map((collection, idx) => (
            <ExploreCard key={idx} collection={collection} flex />
          ))}
      </div>
      <Paginate
        offsetHeight={1160}
        countPerPage={20}
        items={nfts}
        renderItem={(nfts) => <NFTs nfts={nfts} />}
      />
    </div>
  );
};

export default CreatedNFTs;
