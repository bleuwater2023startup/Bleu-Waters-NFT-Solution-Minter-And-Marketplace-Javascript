import classes from "../../../../../styles/Transfer.module.css";
import imgPlaceholder from "../../../../../assets/img-placeholder.png";
import Button from "../../../../../components/Button/Button";
import TransferSuccessModal from "../../../../../components/Modals/TransferSuccessModal/TransferSuccessModal";
import TransferErrorModal from "../../../../../components/Modals/TransferErrorModal/TransferErrorModal";
import { useContext, useEffect, useState } from "react";
import Arrow from "../../../../../assets/icon-arrow.svg";
import { useRouter } from "next/router";
import { handleTransfer } from "../../../../../components/Create/CreateScript";
import { StateContext } from "../../../../../context/state.context";
import { GET_NFT_DETAIL } from "../../../../../utils/subgraphQuery";
import {
  setIpfsData,
  setLoadingScreen,
  setNotification,
} from "../../../../../context/state.actions";
import { useQuery } from "@apollo/client";
import { formatIpfsUrl, getNftDetails } from "../../../../../utils/ipfs";
import Loader from "../../../../../components/LoadingScreen/Loader/Loader";

const Transfer = () => {
  const { account, dispatch, walletProvider } = useContext(StateContext);
  const [inputValue, setInputValue] = useState();
  const [nftDetails, setNftDetails] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [transfer, setTransfer] = useState({
    success: false,
    error: false,
    res: null,
  });

  const router = useRouter();
  const {
    query: { contract, tokenId },
  } = router;

  const { loading, error, data, refetch } = useQuery(GET_NFT_DETAIL, {
    variables: { _contractAddress: contract, _tokenId: tokenId },
  });

  const _getNftDetails = async (storedIpfsData, nfts) => {
    const { ipfsData, details } = await getNftDetails({ storedIpfsData, nfts });
    dispatch(setIpfsData({ ...ipfsData, ...storedIpfsData }));
    setNftDetails(details[0]);
  };

  const _handleTransfer = async () => {
    if (!inputValue) return;

    if (account.toLowerCase() !== nftDetails.owner.id) {
      return dispatch(
        setNotification({
          type: "error",
          message: "You don't have the permission to tranfer this asset.",
        })
      );
    }
    if (account.toLowerCase() === inputValue.toLowerCase()) {
      return dispatch(
        setNotification({
          type: "error",
          message: "You cannot transfer to the owner account.",
        })
      );
    }
    dispatch(
      setLoadingScreen({
        title: "Transfer in progress",
        description:
          "Check your wallet. You'll be asked to confirm this transaction from your wallet.",
      })
    );
    const res = await handleTransfer({
      contractAddress: nftDetails.nftAddress,
      receiver: inputValue,
      tokenId: Number(tokenId),
      account,
      dispatch,
      walletProvider,
    });

    let _res;
    if (res) {
      _res = "success";
    } else {
      _res = "error";
    }

    let state = {};
    for (let key in transfer) {
      if (key === "res") {
        state[key] = res;
      } else {
        if (key === _res) {
          state[key] = true;
        } else {
          state[key] = false;
        }
      }
    }

    setTransfer(state);
    dispatch(setLoadingScreen({}));
  };

  const handleClose = () => {
    setTransfer({
      success: false,
      error: false,
      res: null,
    });
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
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
          {transfer.success && (
            <TransferSuccessModal
              asset={{ name: "test token" }}
              tx={transfer.res}
              receiver={inputValue}
            />
          )}
          {transfer.error && (
            <TransferErrorModal
              asset={{ name: "test token" }}
              receiver={inputValue}
              onClose={handleClose}
              handleTransfer={_handleTransfer}
            />
          )}
          <div onClick={() => router.back()} className={classes.arrow}>
            <Arrow />
          </div>
          <div className={classes.heading}>Transfer item</div>
          <div className={classes.description}></div>

          <div className={classes.innerContainer}>
            <div className={classes.assetContainer}>
              <img
                className={classes.asset}
                style={{ display: imageLoaded ? "block" : "none" }}
                onLoad={() => setImageLoaded(true)}
                src={formatIpfsUrl(nftDetails.image)}
                alt=""
              />
              {!imageLoaded && (
                <div className={classes.imgPlaceholder}>
                  <img src={imgPlaceholder.src} alt="" />
                </div>
              )}
            </div>
            <div className={classes.details}>
              <div className={classes.label}>Reciever address</div>
              <input
                type="text"
                placeholder="e.g. 0x534..."
                value={inputValue}
                onChange={handleInputChange}
              />
              <div onClick={_handleTransfer} className={classes.button}>
                <Button accent>Transfer item</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Transfer;
