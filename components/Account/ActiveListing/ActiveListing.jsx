import { useEffect, useState } from "react";
import Paginate from "../../Paginate/Paginate";
import NFTs from "../NFTs/NFTs";

const ActiveListing = ({ nfts }) => {
  const [activeListedNfts, setActiveListedNfts] = useState([]);

  useEffect(() => {
    const _activeListedNfts = nfts.filter(
      ({ txHistory }) => txHistory.length && txHistory[0].txType === "Listing"
    );
    setActiveListedNfts(_activeListedNfts);
  }, [nfts]);

  return (
    <Paginate
      offsetHeight={600}
      countPerPage={20}
      items={activeListedNfts}
      renderItem={(_nfts) => <NFTs nfts={_nfts} activeListing />}
    />
  );
};

export default ActiveListing;
