import Paginate from "../../Paginate/Paginate";
import NFTs from "../NFTs/NFTs";

const ActiveListing = ({ nfts: _nfts }) => {
  const activeListedNfts = _nfts.filter(
    ({ txHistory }) => txHistory.length && txHistory[0].txType === "Listing"
  );

  return (
    <Paginate
      offsetHeight={600}
      countPerPage={20}
      items={activeListedNfts}
      renderItem={(nfts) => <NFTs nfts={nfts} activeListing />}
    />
  );
};

export default ActiveListing;
