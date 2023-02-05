import { useQuery } from "@apollo/client";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import collectionBanner from "../../assets/collection-banner.png";
import TabButton from "../../components/Button/Tab/Tab";
import Activities from "../../components/Collection/Activities/Activities";
import CollectionInfo from "../../components/Collection/CollectionInfo/CollectionInfo";
import NFTs from "../../components/Collection/NFTs/NFTs";
import Loader from "../../components/LoadingScreen/Loader/Loader";
// import ProfileLoader from "../../components/LoadingScreen/ProfileLoader/ProfileLoader";
import classes from "../../styles/Collection.module.css";
import { GET_COLLECTION_NFTS } from "../../utils/subgraphQuery";

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

  const { loading, error, data } = useQuery(GET_COLLECTION_NFTS, {
    variables: { _id: id },
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
          // <ProfileLoader />
          <Loader />
        ) : (
          <>
            <div style={{ background: `url(${collectionBanner.src})` }} className={classes.banner}>
              <div className={classes.mainText}>Caught the Wave yet?</div>
              <div className={classes.subText}>Now is your chance</div>
            </div>
            <div className={classes.innerContainer}>
              <CollectionInfo collection={data.collection} />
              <TabButton tabs={tabArray} onClick={(e) => setActiveTab(tabArray[e])} />
              {tabs(data.collection)[activeTab]}
            </div>
          </>
        )}
      </>
    </div>
  );
};

export default Collection;
