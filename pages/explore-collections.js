import Head from "next/head";
import ExploreCard from "../components/Explore/ExploreCard/ExploreCard";
import classes from "../styles/Explore.module.css";
import collectionBanner from "../assets/collection-banner.png";
import Search from "../components/Search/Search";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_COLLECTIONS } from "../utils/subgraphQuery";
import { useRouter } from "next/router";
import { getCollectionsBySearch } from "../components/Explore/ExploreScript";
import Loader from "../components/LoadingScreen/Loader/Loader";

const ExploreCollection = () => {
  const [searchValue, setSearchValue] = useState("");
  const [collections, setCollections] = useState(null);
  const [filteredCollections, setFilteredCollections] = useState(null);

  const handleChange = (e) => {
    const res = getCollectionsBySearch({
      collections,
      searchTerm: e.target.value,
      params: ["id", "name"],
    });
    setFilteredCollections(res);
    setSearchValue(e.target.value);
  };

  const router = useRouter();

  const { loading, error, data, refetch } = useQuery(GET_COLLECTIONS, {
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    refetch();
  }, [router.asPath]);

  useEffect(() => {
    if (data) {
      setCollections(data.collections);
      setFilteredCollections(data.collections);
    }
  }, [data]);

  return (
    <div className={classes.container}>
      <Head>
        <title>BleuWater Ecosystem</title>
        <meta name="description" content="NFT Minter | Marketplace | Ownership | Community" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {error ? (
        <>Failed to fetch results, please check your network and try again.</>
      ) : loading ? (
        <Loader />
      ) : (
        <>
          <div className={classes.banner}>
            <div className={classes.mainText}>Discover</div>
            <div className={classes.subText}>All Collection</div>
            <div className={classes.searchContainer}>
              <Search
                value={searchValue}
                onChange={handleChange}
                placeholder="Search collection"
                faint
              />
            </div>
          </div>
          <div className={classes.innerContainer}>
            <div className={classes.cardContainer}>
              {filteredCollections &&
                (filteredCollections.length ? (
                  filteredCollections
                    .filter((collection) => collection.nfts.length)
                    .map((collection, idx) => <ExploreCard key={idx} collection={collection} />)
                ) : (
                  <div>Nothing to display</div>
                ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ExploreCollection;
