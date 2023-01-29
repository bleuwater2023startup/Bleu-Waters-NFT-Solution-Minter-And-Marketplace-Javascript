import Paginate from "../../Paginate/Paginate";
import NFTs from "../NFTs/NFTs";

const ActiveListing = ({ nfts }) => {
  const activeListedNfts = nfts.filter(({ txHistory }) => txHistory.length);

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
