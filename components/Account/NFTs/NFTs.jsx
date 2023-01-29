import { useContext, useEffect, useState } from "react";
import Search from "../../Search/Search";
import classes from "./NFTs.module.css";
// import ChevronIcon from "../../../assets/icon-chevron.svg";
// import RadioButton from "../../Button/Radio/Radio";
import { getNftDetails } from "../../../utils/ipfs";
import { setIpfsData } from "../../../context/state.actions";
import { StateContext } from "../../../context/state.context";
import NFTCard from "../NFTCard/NFTCard";
import { useRouter } from "next/router";
import { getMaticUsdPrice } from "../../../utils";

const sortKey = [
  "Show all",
  "Recently listed",
  "For sale: Low to High",
  "For sale: High to Low",
  "Oldest",
];

const NFTs = ({ nfts, activeListing }) => {
  const { dispatch } = useContext(StateContext);
  // const [active, setActive] = useState(0);
  const [nftDetails, setNftDetails] = useState(null);
  const [usd, setUsd] = useState(0);
  const router = useRouter();

  const _getNftDetails = async (storedIpfsData, nfts) => {
    const { ipfsData, details } = await getNftDetails({ storedIpfsData, nfts });
    dispatch(setIpfsData({ ...ipfsData, ...storedIpfsData }));
    setNftDetails(details);
  };

  useEffect(() => {
    let storedIpfsData = window.localStorage.getItem("ipfs_data");
    storedIpfsData = JSON.parse(storedIpfsData);
    if (activeListing) {
      const activeListedNfts = nfts.filter(({ txHistory }) => txHistory.length);
      _getNftDetails(storedIpfsData, activeListedNfts);
    } else {
      _getNftDetails(storedIpfsData, nfts);
    }
  }, [nfts]);

  useEffect(() => {
    const getUsd = async () => {
      const res = await getMaticUsdPrice(80001);
      setUsd(res);
    };
    getUsd();
  }, [router.asPath]);

  return (
    <div className={classes.container}>
      <div className={classes.control}>
        {/* <div className={classes.tabContainer}>
          <div className={classes.tabs}>
            <div className={classes.tab}>Sort by:</div>
            <div className={classes.tabBtn}>
              <span>{sortKey[active]}</span>
              <ChevronIcon className={classes.chevronIcon} />
            </div>
            <div className={classes.dropdownContainer}>
              <div className={classes.dropdown}>
                {sortKey.map((s, idx) => (
                  <div key={idx} className={classes.button}>
                    <RadioButton
                      id={idx}
                      active={active}
                      onClick={(e) => {
                        setActive(e);
                      }}
                    />
                    <div>{s}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div> */}
        <div className={classes.searchContainer}>
          <Search
            faint
            placeholder="Search by name, amount..."
            value={""}
            onChange={() => {}}
          />
        </div>
      </div>
      <div className={classes.nftContainer}>
        {nftDetails &&
          nftDetails.map((nft, idx) => (
            <NFTCard key={idx} nft={nft} usd={usd} />
          ))}
      </div>
    </div>
  );
};

export default NFTs;
