import classes from "./NFTInfo.module.css";
import Button from "../../Button/Button";
import ReloadIcon from "../../../assets/icon-reload.svg";
import TransferIcon from "../../../assets/icon-transfer.svg";
import imgPlaceholder from "../../../assets/img-placeholder.png";
import DotsIcon from "../../../assets/icon-dots.svg";
import ShareIcon from "../../../assets/icon-share.svg";
import Link from "next/link";
import { useRouter } from "next/router";
import { formatAccount } from "../../../utils";
import { formatIpfsUrl } from "../../../utils/ipfs";
import { useContext, useState } from "react";
import { StateContext } from "../../../context/state.context";
import CancelListingModal from "../../Modals/CancelListingModal/CancelListingModal";
import {
  handleBuyNFT,
  handleCancelListing,
  handleSetApprovalForExternalTransfer,
  handleUpdateListing,
} from "../../Create/CreateScript";
import { setLoadingScreen, setNotification } from "../../../context/state.actions";
import UpdateListingModal from "../../Modals/UpdateListingModal/UpdateListingModal";
import PurchaseNFTModal from "../../Modals/PurchaseNFTModal/PurchaseNFTModal";
import { ethers } from "ethers";
import ApproveExternalTransferModal from "../../Modals/ApproveExternalTransferModal/ApproveExternalTransfer";
import CopyText from "../../CopyText/CopyTest";
import Tooltip from "../../Tooltip/Tooltip";

const NFTInfo = ({ collection: _collection, ipfsData, refetch, usd }) => {
  const { account, dispatch, walletProvider } = useContext(StateContext);
  const [toggleCancelModal, setToggleCancelModal] = useState(false);
  const [toggleUpdateListingModal, setToggleUpdateListingModal] = useState(false);
  const [togglePurchaseNFTModal, setTogglePurchaseNFTModal] = useState(false);
  const [toggleApproveTransferModal, setToggleApproveTransferModal] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { name, nfts } = _collection;
  const { tokenId, owner, txHistory, nftAddress, collection } = nfts[0];
  const { price: etherPrice, txType } = txHistory[0];
  const router = useRouter();
  const price = ethers.utils.formatEther(etherPrice);
  const creator = collection.creator.id;

  const isOwner = () => {
    return account === owner.id;
  };

  const isListed = () => {
    return txType === "Listing" && Number(price) !== 0;
  };

  const _handleCancelListing = async () => {
    setToggleCancelModal(false);
    dispatch(
      setLoadingScreen({
        title: "Transaction in progress...",
        description:
          "Check your wallet. You'll be asked to confirm this transaction from your wallet.",
      })
    );
    const res = await handleCancelListing({
      dispatch,
      walletProvider,
      tokenId: Number(tokenId),
      contractAddress: nftAddress,
    });

    if (res) {
      dispatch(
        setNotification({
          type: "success",
          message: "NFT unlisted",
        })
      );
      refetch();
    }
    dispatch(setLoadingScreen({}));
  };

  const _handleUpdateListing = async (value) => {
    const { nftAddress, tokenId } = ipfsData;
    setToggleUpdateListingModal(false);
    dispatch(
      setLoadingScreen({
        title: "Transaction in progress...",
        description:
          "Check your wallet. You'll be asked to confirm this transaction from your wallet.",
      })
    );
    const res = await handleUpdateListing({
      nftAddress,
      tokenId: Number(tokenId),
      price: value,
      dispatch,
      walletProvider,
    });
    if (res) {
      dispatch(
        setNotification({
          type: "success",
          message: "NFT updated successfully",
        })
      );
      refetch();
    }
    dispatch(setLoadingScreen({}));
  };

  const _handleBuyNft = async () => {
    const { nftAddress, tokenId, txHistory } = ipfsData;
    const { price: etherPrice } = txHistory[0];
    const price = ethers.utils.formatEther(etherPrice);
    if (!account)
      return dispatch(
        setNotification({
          type: "error",
          message: "Please connect your wallet to continue.",
        })
      );

    setTogglePurchaseNFTModal(false);
    dispatch(
      setLoadingScreen({
        title: "Processing your purchase",
        description:
          "Check your wallet. You'll be asked to confirm this transaction from your wallet.",
      })
    );
    const res = await handleBuyNFT({
      tokenId: Number(tokenId),
      value: price,
      nftAddress,
      dispatch,
      walletProvider,
    });

    if (res) {
      dispatch(
        setNotification({
          type: "success",
          message: "NFT purchased successfully",
        })
      );
    }
    dispatch(setLoadingScreen({}));
    await new Promise((rs) =>
      setTimeout(() => {
        rs();
      }, 3000)
    );
    refetch();
  };

  const _handleApproveTransfer = async () => {
    const { nftAddress, tokenId } = ipfsData;
    setToggleApproveTransferModal(false);
    dispatch(
      setLoadingScreen({
        title: "Transaction in progress...",
        description:
          "Check your wallet. You'll be asked to confirm this transaction from your wallet.",
      })
    );
    const res = await handleSetApprovalForExternalTransfer({
      contractAddress: nftAddress,
      tokenId: Number(tokenId),
      dispatch,
      walletProvider,
    });
    if (res) {
      dispatch(
        setNotification({
          type: "success",
          message: "NFT approved for trading outside this marketplace",
        })
      );
      refetch();
    }
    dispatch(setLoadingScreen({}));
  };

  return (
    <div className={classes.container}>
      {toggleApproveTransferModal && (
        <ApproveExternalTransferModal
          onClose={() => setToggleApproveTransferModal(false)}
          onApprove={_handleApproveTransfer}
        />
      )}
      {toggleCancelModal && (
        <CancelListingModal
          onClose={() => setToggleCancelModal(false)}
          onCancel={_handleCancelListing}
        />
      )}
      {toggleUpdateListingModal && (
        <UpdateListingModal
          onClose={() => setToggleUpdateListingModal(false)}
          onPriceChange={_handleUpdateListing}
          nft={ipfsData}
          currentPrice={price}
        />
      )}
      {togglePurchaseNFTModal && (
        <PurchaseNFTModal
          onClose={() => setTogglePurchaseNFTModal(false)}
          onPurchaseClick={_handleBuyNft}
          nft={ipfsData}
        />
      )}
      <div className={classes.assetContainer}>
        {ipfsData ? (
          <img
            className={classes.asset}
            style={{ display: imageLoaded ? "block" : "none" }}
            onLoad={() => setImageLoaded(true)}
            src={formatIpfsUrl(ipfsData.image)}
            alt={"asset"}
          />
        ) : null}
        {!imageLoaded && (
          <div className={classes.imgPlaceholder}>
            <img src={imgPlaceholder.src} alt="" />
          </div>
        )}
      </div>
      <div className={classes.infoContainer}>
        <div className={classes.subContainer1}>
          <div className={classes.collectionName}>{name}</div>
          <div className={classes.collectionId}>{ipfsData?.name}</div>
          {isOwner() ? (
            <div className={classes.owner_}>
              <span>Owned by</span> <span>you</span>
            </div>
          ) : (
            <div className={classes.innerContainer}>
              <div className={classes.icon}></div>
              <div className={classes.creator}>
                <div className={classes.owner}>Current owner</div>
                <Link href={`/${owner.id}`} className={classes.address}>
                  {formatAccount(owner.id)}
                </Link>
              </div>
            </div>
          )}
          <div className={`${classes.dropdownInfo} ${classes.share}`}>
            <div className={classes.dotsIcon}>
              <ShareIcon />
            </div>
            <div className={classes.dropdownContainer}>
              <div className={classes.dropdown}>
                <div className={classes.item}>
                  <CopyText message={window.location.href} icon>
                    Copy link
                  </CopyText>
                </div>
              </div>
            </div>
          </div>
          <div className={classes.dropdownInfo}>
            <div className={classes.dotsIcon}>
              <DotsIcon />
            </div>
            <div className={classes.dropdownContainer}>
              <div className={classes.dropdown}>
                {creator.toLowerCase() === account?.toLowerCase() && (
                  <div onClick={() => setToggleApproveTransferModal(true)} className={classes.item}>
                    Approve NFT <Tooltip data="Approve this NFT to be sold on other marketplace" />
                  </div>
                )}
                {isOwner() ? (
                  <>
                    {isListed() && (
                      <div
                        onClick={() => setToggleUpdateListingModal(true)}
                        className={classes.item}>
                        Change price
                      </div>
                    )}
                    <Link href={`${router.asPath}/transfer`} className={classes.item}>
                      Transfer NFT
                    </Link>
                    <div onClick={() => refetch()} className={classes.item}>
                      Refresh metadata
                    </div>
                  </>
                ) : (
                  <div onClick={() => refetch()} className={classes.item}>
                    Refresh metadata
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className={classes.subContainer2}>
          {isOwner() ? (
            <Link href={`${router.asPath}/transfer`} className={classes.transfer}>
              <TransferIcon />
              <div>Transfer</div>
            </Link>
          ) : null}
          <div onClick={() => refetch()} className={classes.reload}>
            <ReloadIcon />
            <div>Refresh metadata</div>
          </div>
        </div>
        {isOwner() && isListed() ? (
          <div className={classes.subContainer3}>
            <div className={classes.price}>
              <div>Price</div>
              <div className={classes._price}>{price} matic</div>
              <div>{(usd * Number(price)).toFixed(3)} usd</div>
            </div>
            <div onClick={() => setToggleCancelModal(true)} className={classes.button}>
              <Button accent>Cancel Listing</Button>
            </div>
          </div>
        ) : null}
        {isOwner() && !isListed() ? (
          <div className={classes.subContainer3}>
            <Link href={`${router.asPath}/sell`} className={classes.button}>
              <Button accent>List NFT</Button>
            </Link>
          </div>
        ) : null}
        {!isOwner() && !isListed() ? (
          <div className={classes.subContainer3}>
            <div className={classes.button}>
              <Button dark disabled>
                Not Listed
              </Button>
            </div>
          </div>
        ) : null}
        {!isOwner() && isListed() ? (
          <div className={classes.subContainer3}>
            <div className={classes.price}>
              <div>Price</div>
              <div className={classes._price}>{price} matic</div>
              <div>{(usd * Number(price)).toFixed(1)} usd</div>
            </div>
            <div onClick={() => setTogglePurchaseNFTModal(true)} className={classes.button}>
              <Button accent>Buy</Button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default NFTInfo;
