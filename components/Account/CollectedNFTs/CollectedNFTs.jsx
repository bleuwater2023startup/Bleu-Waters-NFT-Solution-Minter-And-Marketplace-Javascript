import Paginate from "../../Paginate/Paginate";
import NFTs from "../NFTs/NFTs";

const CollectedNFTs = ({ nfts }) => {
  return (
    <Paginate
      offsetHeight={600}
      countPerPage={20}
      items={nfts}
      renderItem={(nfts) => <NFTs nfts={nfts} />}
    />
  );
};

export default CollectedNFTs;
