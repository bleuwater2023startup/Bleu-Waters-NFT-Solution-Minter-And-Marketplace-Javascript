import { useLazyQuery } from "@apollo/client";
import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import AccountInfo from "../../components/Account/AccountInfo/AccountInfo";
import ActiveListing from "../../components/Account/ActiveListing/ActiveListing";
import CollectedNFTs from "../../components/Account/CollectedNFTs/CollectedNFTs";
import CreatedNFTs from "../../components/Account/CreatedNFTs/CreatedNFTs";
import NoNFTs from "../../components/Account/NoNFTs/NoNFTs";
import Loader from "../../components/LoadingScreen/Loader/Loader";
import CreateSuccessModal from "../../components/Modals/CreateSuccessModal/CreateSuccessModal";
import { StateContext } from "../../context/state.context";
import classes from "../../styles/Account.module.css";
import {
  GET_ACTIVE_LISTING,
  GET_USER_COLLECTED_NFTS,
  GET_USER_CREATED_NFTS,
} from "../../utils/subgraphQuery";

const Account = () => {
  const [activeTab, setActiveTab] = useState(-1);
  const { createSuccessModal, account } = useContext(StateContext);
  const { name, hash, mintType } = createSuccessModal;

  const [
    getCollectedNFTs,
    { error: error_collected, loading: loading_collected, data: data_collected },
  ] = useLazyQuery(GET_USER_COLLECTED_NFTS);

  const [getCreatedNFTs, { error: error_created, loading: loading_created, data: data_created }] =
    useLazyQuery(GET_USER_CREATED_NFTS);

  const [
    getActiveListing,
    { error: error_activeListing, loading: loading_activeListing, data: data_activeListing },
  ] = useLazyQuery(GET_ACTIVE_LISTING);

  const getActiveQuery = async (id) => {
    switch (id) {
      case 0:
        getCollectedNFTs({
          variables: { _account: account },
        });
        break;
      case 1:
        getCreatedNFTs({
          variables: { _account: account },
        });
        break;
      case 2:
        getActiveListing({
          variables: { _account: account },
        });
        break;
      default:
        break;
    }
  };

  const getCollectedNFTsCount = () => {
    if (account && data_collected?.user) {
      return data_collected.user.nfts.length;
    }
  };

  const getCreatedNFTsCount = () => {
    if (account && data_created?.user) {
      if (data_created.user.collections) {
        let nfts = data_created.user.collections.map((collection) => collection.nfts);
        nfts = [...nfts].flat();
        return nfts.length;
      }
    }
  };

  const getActiveListingNFTsCount = () => {
    if (account && data_activeListing?.user) {
      const _nfts = data_activeListing.user.nfts;
      const activeListedNfts = _nfts.filter(
        ({ txHistory }) => txHistory.length && txHistory[0].txType === "Listing"
      );
      return activeListedNfts.length;
    }
  };

  const runAll = async () => {
    getCollectedNFTs({
      variables: { _account: account },
      notifyOnNetworkStatusChange: true,
    });
    getCreatedNFTs({
      variables: { _account: account },
      notifyOnNetworkStatusChange: true,
    });
    getActiveListing({
      variables: { _account: account },
      notifyOnNetworkStatusChange: true,
    });
    await new Promise((resolve) =>
      setTimeout(() => {
        setActiveTab(0);
        resolve();
      }, 500)
    );
  };

  useEffect(() => {
    getActiveQuery(activeTab);
  }, [activeTab]);

  useEffect(() => {
    runAll();
  }, [account]);

  return (
    <div className={classes.container}>
      <Head>
        <title>BleuWater Ecosystem</title>
        <meta name="description" content="NFT Minter | Marketplace | Ownership | Community" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {name && hash && <CreateSuccessModal name={name} hash={hash} mintType={mintType} />}
      <AccountInfo />
      <div className={classes.innerContainer}>
        <div className={classes.tabContainer}>
          <div className={classes.tabs}>
            <div
              id="0"
              onClick={() => setActiveTab(0)}
              className={`${classes.tab} ${activeTab === 0 && classes.active}`}>
              <span>Collected</span>{" "}
              <span className={classes.count}>{getCollectedNFTsCount()}</span>
            </div>
            <div
              id="1"
              onClick={() => setActiveTab(1)}
              className={`${classes.tab} ${activeTab === 1 && classes.active}`}>
              <span>Created</span> <span className={classes.count}>{getCreatedNFTsCount()}</span>
            </div>
            <div
              id="2"
              onClick={() => setActiveTab(2)}
              className={`${classes.tab} ${activeTab === 2 && classes.active}`}>
              <span>Active Listing</span>
              <span className={classes.count}>{getActiveListingNFTsCount()}</span>
            </div>
          </div>
        </div>
        <div onClick={runAll} className={classes.refreshBtn}>
          Refresh
        </div>
        {activeTab === 0 && account ? (
          error_collected ? (
            <>Failed to fetch results, please check your network and try again.</>
          ) : loading_collected ? (
            <Loader />
          ) : data_collected.user ? (
            <CollectedNFTs nfts={data_collected.user.nfts} />
          ) : (
            <NoNFTs />
          )
        ) : null}

        {activeTab === 1 && account ? (
          error_created ? (
            <>Failed to fetch results, please check your network and try again.</>
          ) : loading_created ? (
            <Loader />
          ) : data_created.user ? (
            <CreatedNFTs collections={data_created.user.collections} />
          ) : (
            <NoNFTs />
          )
        ) : null}

        {activeTab === 2 && account ? (
          error_activeListing ? (
            <>Failed to fetch results, please check your network and try again.</>
          ) : loading_activeListing ? (
            <Loader />
          ) : data_activeListing.user ? (
            <ActiveListing nfts={data_activeListing.user.nfts} />
          ) : (
            <NoNFTs />
          )
        ) : null}
      </div>
    </div>
  );
};

export default Account;
