import classes from "../../../../../styles/Sell.module.css";
import SaleDetails from "../../../../../components/Asset/SaleDetails/SaleDetails";
import { useContext, useEffect, useState } from "react";
import ListModal from "../../../../../components/Modals/ListModal/ListModal";
import Arrow from "../../../../../assets/icon-arrow.svg";
import { useRouter } from "next/router";
import {
  setIpfsData,
  setLoadingScreen,
  setNotification,
} from "../../../../../context/state.actions";
import { GET_NFT_DETAIL } from "../../../../../utils/subgraphQuery";
import { useQuery } from "@apollo/client";
import { StateContext } from "../../../../../context/state.context";
import { formatIpfsUrl, getNftDetails } from "../../../../../utils/ipfs";
import { handleList } from "../../../../../components/Create/CreateScript";
import Loader from "../../../../../components/LoadingScreen/Loader/Loader";

const Sell = () => {
  const [toggleListModal, setToggleListModal] = useState(false);
  const [nftDetails, setNftDetails] = useState(null);
  const [listPrice, setListPrice] = useState(0);
  const { dispatch, walletProvider, account } = useContext(StateContext);
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

  const _handleList = async () => {
    const { nftAddress, tokenId } = data.collection.nfts[0];
    setToggleListModal(false);
    dispatch(
      setLoadingScreen({
        title: "Listing NFT in progress...",
        description:
          "Check your wallet. You'll be asked to confirm this transaction from your wallet.",
      })
    );
    const res = await handleList({
      account,
      nftAddress,
      tokenId: Number(tokenId),
      price: listPrice,
      dispatch,
      walletProvider,
    });
    if (res) {
      router.back();
      dispatch(
        setNotification({
          type: "success",
          message: "NFT listed successfully. Refresh tab to see updated changes.",
        })
      );
    }
    dispatch(setLoadingScreen({}));
  };

  const handleListButtonClick = (price) => {
    if (!price) {
      return dispatch(
        setNotification({
          type: "info",
          message: "Please set list price",
        })
      );
    }
    setListPrice(price);
    setToggleListModal(true);
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

  return (
    <>
      {error ? (
        <div>Failed to fetch results, please check your network and try again.</div>
      ) : loading || !nftDetails ? (
        <Loader />
      ) : (
        <div className={classes.container}>
          {toggleListModal && (
            <ListModal
              listPrice={listPrice}
              onList={_handleList}
              nftDetails={nftDetails}
              onClose={() => setToggleListModal(false)}
            />
          )}
          <div onClick={() => router.back()} className={classes.arrow}>
            <Arrow />
          </div>
          <div className={classes.heading}>List NFT for sale</div>
          <div className={classes.innerContainer}>
            <div className={classes.assetContainer}>
              <img className={classes.asset} src={formatIpfsUrl(nftDetails.image)} alt="asset" />
              <div className={classes.name}>{nftDetails.name}</div>
              <div className={classes.description}>{data.collection.name}</div>
              {/* <div className={classes.price}>500 MATIC</div> */}
            </div>
            <SaleDetails onListButtonClick={handleListButtonClick} collection={data.collection} />
          </div>
        </div>
      )}
    </>
  );
};

export default Sell;
