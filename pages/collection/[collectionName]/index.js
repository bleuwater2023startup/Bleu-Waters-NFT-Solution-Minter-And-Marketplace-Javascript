import { useQuery } from "@apollo/client";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import TabButton from "../../../components/Button/Tab/Tab";
import Activities from "../../../components/Collection/Activities/Activities";
import CollectionInfo from "../../../components/Collection/CollectionInfo/CollectionInfo";
import NFTs from "../../../components/Collection/NFTs/NFTs";
import Loader from "../../../components/LoadingScreen/Loader/Loader";
import classes from "../../../styles/Collection.module.css";
import { GET_COLLECTION_NFTS } from "../../../utils/subgraphQuery";

const Collection = () => {
  const [activeTab, setActiveTab] = useState(null);

  const tabArray = ["NFTs", "Activites"];
  const tabs = (collection) => ({
    NFTs: <NFTs collection={collection} />,
    Activites: <Activities collection={collection} />,
  });

  const router = useRouter();
  const {
    query: { id },
  } = router;

  const { loading, error, data, refetch } = useQuery(GET_COLLECTION_NFTS, {
    variables: { _id: id },
    notifyOnNetworkStatusChange: true,
  });

  return (
    <div className={classes.container}>
      <Head>
        <title>BleuWater Ecosystem</title>
        <meta name="description" content="NFT Minter | Marketplace | Ownership | Community" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
        {error ? (
          <>Failed to fetch results, please check your network and try again.</>
        ) : loading ? (
          <Loader />
        ) : (
          <>
            <CollectionInfo collection={data.collection} />
            <div className={classes.innerContainer}>
              <TabButton tabs={tabArray} onClick={(e) => setActiveTab(tabArray[e])} />
              <div onClick={() => refetch()} className={classes.refreshBtn}>
                Refresh
              </div>
            </div>
            {tabs(data.collection)[activeTab]}
          </>
        )}
      </>
    </div>
  );
};

export default Collection;
