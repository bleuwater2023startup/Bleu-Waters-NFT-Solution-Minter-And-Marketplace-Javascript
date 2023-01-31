import { useContext, useEffect, useState } from "react";
import AssetDropdownWrapper from "../../../../../components/Asset/AssetDropdownWrapper/AssetDropdownWrapper";
import Attributes from "../../../../../components/Asset/Attributes/Attributes";
import Description from "../../../../../components/Asset/Description/Description";
import History from "../../../../../components/Asset/History/History";
import ItemDetails from "../../../../../components/Asset/ItemDetails/ItemDetails";
import NFTInfo from "../../../../../components/Asset/NFTInfo/NFTInfo";
import Royalty from "../../../../../components/Asset/Royalty/Royalty";
import Utility from "../../../../../components/Asset/Utility/Utility";
import TabButton from "../../../../../components/Button/Tab/Tab";
import SimilarNFT from "../../../../../components/SimilarNFT/SimilarNFT";
import classes from "../../../../../styles/Asset.module.css";
import Arrow from "../../../../../assets/icon-arrow.svg";
import { useRouter } from "next/router";
import { GET_NFT_DETAIL } from "../../../../../utils/subgraphQuery";
import { useQuery } from "@apollo/client";
import { StateContext } from "../../../../../context/state.context";
import { setIpfsData } from "../../../../../context/state.actions";
import { getNftDetails } from "../../../../../utils/ipfs";
import { getMaticUsdPrice } from "../../../../../utils";

const Asset = () => {
  const [activeTab, setActiveTab] = useState(null);
  const [nftDetails, setNftDetails] = useState(null);
  const [usd, setUsd] = useState(0);
  const { dispatch } = useContext(StateContext);

  const router = useRouter();
  const {
    query: { contract, tokenId },
  } = router;

  const { loading, error, data, refetch } = useQuery(GET_NFT_DETAIL, {
    variables: { _contractAddress: contract, _tokenId: tokenId },
    notifyOnNetworkStatusChange: true,
  });

  const _getNftDetails = async (storedIpfsData, nfts) => {
    const { ipfsData, details } = await getNftDetails({ storedIpfsData, nfts });
    dispatch(setIpfsData({ ...ipfsData, ...storedIpfsData }));
    setNftDetails(details[0]);
  };

  useEffect(() => {
    if (!data) return;
    let storedIpfsData = window.localStorage.getItem("ipfs_data");
    storedIpfsData = JSON.parse(storedIpfsData);
    _getNftDetails(storedIpfsData, data.collection.nfts);
  }, [data]);

  useEffect(() => {
    refetch();
  }, [router.asPath]);

  useEffect(() => {
    if (!nftDetails) return;
    const getUsd = async () => {
      const res = await getMaticUsdPrice(nftDetails.collection.chainId);
      setUsd(res);
    };
    getUsd();
  }, [nftDetails]);

  const tabArray = ["Detail", "History"];
  const tabs = (collection, ipfsData, usd) => ({
    Detail: (
      <div className={classes.details}>
        <AssetDropdownWrapper name="Item details" open>
          <ItemDetails collection={collection} />
        </AssetDropdownWrapper>
        <AssetDropdownWrapper name="Utility">
          <Utility collection={collection} />
        </AssetDropdownWrapper>
        <AssetDropdownWrapper name="Royalty">
          <Royalty />
        </AssetDropdownWrapper>
        <AssetDropdownWrapper name="Attributes">
          <Attributes ipfsData={ipfsData} />
        </AssetDropdownWrapper>
        <AssetDropdownWrapper name="Description">
          <Description collection={collection} />
        </AssetDropdownWrapper>
      </div>
    ),
    History: (
      <AssetDropdownWrapper name="History" open>
        <History collection={collection} usd={usd} />
      </AssetDropdownWrapper>
    ),
  });

  return (
    <div className={classes.container}>
      <div onClick={() => router.back()} className={classes.arrow}>
        <Arrow />
      </div>
      {error ? (
        <>something went wrong</>
      ) : loading ? (
        <>loading...</>
      ) : (
        <>
          <NFTInfo collection={data.collection} ipfsData={nftDetails} refetch={refetch} usd={usd} />
          <TabButton tabs={tabArray} onClick={(e) => setActiveTab(tabArray[e])} />
          {tabs(data.collection, nftDetails, usd)[activeTab]}
          <SimilarNFT />
        </>
      )}
    </div>
  );
};

export default Asset;
