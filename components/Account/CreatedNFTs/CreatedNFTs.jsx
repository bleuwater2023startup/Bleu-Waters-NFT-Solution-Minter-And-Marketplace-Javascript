import { use, useEffect, useState } from "react";
import ExploreCard from "../../Explore/ExploreCard/ExploreCard";
import Paginate from "../../Paginate/Paginate";
import NFTs from "../NFTs/NFTs";
import classes from "./CreatedNFTs.module.css";

const CreatedNFTs = ({ collections }) => {
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    let _nfts = collections.map((collection) => collection.nfts);
    _nfts = [..._nfts].flat();
    setNfts(_nfts);
  }, [collections]);

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
        renderItem={(_nfts) => <NFTs nfts={_nfts} />}
      />
    </div>
  );
};

export default CreatedNFTs;
