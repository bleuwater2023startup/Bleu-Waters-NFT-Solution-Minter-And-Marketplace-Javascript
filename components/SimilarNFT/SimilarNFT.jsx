import { useQuery } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { setIpfsData } from "../../context/state.actions";
import { StateContext } from "../../context/state.context";
import { getNftDetails } from "../../utils/ipfs";
import { GET_SIMILAR_NFTS } from "../../utils/subgraphQuery";
import Button from "../Button/Button";
import classes from "./SimilarNFT.module.css";
import SimilarNFTCard from "./SimilarNFTCard/SimilarNFTCard";

const SimilarNFT = () => {
  const { dispatch } = useContext(StateContext);
  const [nftDetails, setNftDetails] = useState(null);

  const router = useRouter();
  const {
    query: { contract, tokenId },
  } = router;

  const { loading, error, data } = useQuery(GET_SIMILAR_NFTS, {
    variables: { _contractAddress: contract },
  });

  const _getNftDetails = async (storedIpfsData) => {
    const { ipfsData, details } = await getNftDetails({
      storedIpfsData,
      nfts: data.collection.nfts,
    });
    dispatch(setIpfsData({ ...ipfsData, ...storedIpfsData }));
    const _details = details.filter(
      (d, idx) => idx < 10 && tokenId !== d.tokenId
    );
    setNftDetails(_details);
  };

  useEffect(() => {
    let storedIpfsData = window.localStorage.getItem("ipfs_data");
    storedIpfsData = JSON.parse(storedIpfsData);
    if (!data) return;
    _getNftDetails(storedIpfsData);
  }, [data]);

  return (
    <div className={classes.container}>
      <div className={classes.heading}>You might also like this</div>
      <div className={classes.nfts}>
        {error ? (
          <>something went wrong</>
        ) : loading ? (
          <>loading</>
        ) : nftDetails ? (
          nftDetails.map((nft, idx) => (
            <SimilarNFTCard
              key={idx}
              nft={nft}
              chainId={data.collection.chainId}
            />
          ))
        ) : (
          <div>loading...</div>
        )}
      </div>
      <div className={classes.viewCollection}>
        <Link
          href={`/collection/${data?.collection.name.replace(/\s/g, "-")}?id=${
            data?.collection.id
          }`}
          className={classes.button}
        >
          <Button accent>View collection</Button>
        </Link>
      </div>
    </div>
  );
};

export default SimilarNFT;
