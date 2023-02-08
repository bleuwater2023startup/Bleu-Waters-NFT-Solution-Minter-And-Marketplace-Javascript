import { useContext, useEffect, useState } from "react";
import Search from "../../Search/Search";
import Filter from "../Filter/Filter";
import NFTCard from "../NFTCard/NFTCard";
import classes from "./NFTs.module.css";
import ChevronIcon from "../../../assets/icon-chevron.svg";
import { getNftDetails } from "../../../utils/ipfs";
import { StateContext } from "../../../context/state.context";
import { setIpfsData } from "../../../context/state.actions";
import Paginate from "../../Paginate/Paginate";
import { getMaticUsdPrice } from "../../../utils";
import { useRouter } from "next/router";
import CloseIcon from "../../../assets/icon-close.svg";
import Filtericon from "../../../assets/icon-filter.svg";
import PriceSort from "../PriceSort/PriceSort";
import {
  getCollectionsByCommunityListed,
  getCollectionsByListed,
  getCollectionsByPriceRange,
  getCollectionsBySearch,
  sortBy,
} from "../../Explore/ExploreScript";

const NFTs = ({ collection }) => {
  const [nftDetails, setNftDetails] = useState(null);
  const { dispatch } = useContext(StateContext);
  const [showFilter, setShowFilter] = useState(false);
  const [activeFilter, setActiveFilter] = useState([]);
  const [usd, setUsd] = useState(0);
  const [isToggle, setIsToggle] = useState(false);
  const [filteredNftDetails, setFilteredNftDetails] = useState(null);

  const router = useRouter();

  const { nfts, name, chainId } = collection;

  const handlePriceChange = (value) => {
    const res = sortBy({ value, collections: isToggle ? filteredNftDetails : nftDetails });
    setFilteredNftDetails(res);
  };

  const handleSearchChange = (e) => {
    if (!nftDetails) return;
    const res = getCollectionsBySearch({
      collections: nftDetails,
      searchTerm: e.target.value,
      params: ["name", "id", "tokenId", "nftAddress", "description"],
    });
    setFilteredNftDetails(res);
  };

  const handleAttributeClose = (id) => {
    setActiveFilter((a) => a.filter((_, idx) => idx != id));
  };

  const handleToggleChange = (value) => {
    if (value.state) {
      let res;
      if (value.type === "community") {
        res = getCollectionsByCommunityListed({ collections: nftDetails });
      } else {
        res = getCollectionsByListed({ collections: nftDetails });
      }
      setIsToggle(true);
      setFilteredNftDetails(res);
    } else {
      setIsToggle(false);
      setFilteredNftDetails(nftDetails);
    }
  };

  const handlePriceRange = (value) => {
    if (value.min === value.max) {
      setFilteredNftDetails(nftDetails);
    } else {
      const res = getCollectionsByPriceRange({
        value,
        collections: isToggle ? filteredNftDetails : nftDetails,
      });
      setFilteredNftDetails(res);
    }
  };

  const _getNftDetails = async (storedIpfsData) => {
    const { ipfsData, details } = await getNftDetails({ storedIpfsData, nfts });
    dispatch(setIpfsData({ ...ipfsData, ...storedIpfsData }));
    setFilteredNftDetails(details);
    setNftDetails(details);
  };

  useEffect(() => {
    if (!nftDetails) return;
    const res = nftDetails.filter(
      ({ attributes }) =>
        attributes && attributes.some((a) => activeFilter.includes(`${a.trait_type}:${a.value}`))
    );
    if (res.length) {
      setFilteredNftDetails(res);
    } else {
      setFilteredNftDetails(nftDetails);
    }
  }, [activeFilter]);

  useEffect(() => {
    const getUsd = async () => {
      const res = await getMaticUsdPrice(chainId);
      setUsd(res);
    };
    getUsd();
  }, [router.asPath]);

  useEffect(() => {
    let storedIpfsData = window.localStorage.getItem("ipfs_data");
    storedIpfsData = JSON.parse(storedIpfsData);
    _getNftDetails(storedIpfsData);
  }, []);
  return (
    <div className={classes.container}>
      <div className={classes.control}>
        <div onClick={() => setShowFilter(!showFilter)} className={classes.filter}>
          <>
            <ChevronIcon className={`${classes.chevronIcon} ${showFilter && classes.isFilter}`} />
            <div className={classes.filterText}>Filter</div>
          </>
          <div className={classes.filterIcon}>
            <Filtericon />
          </div>
        </div>
        <div className={classes.searchContainer}>
          <Search faint placeholder="search" onChange={handleSearchChange} />
        </div>
        <div className={classes.selectContainer}>
          <PriceSort onChange={handlePriceChange} />
        </div>
      </div>

      <div className={classes.display}>
        {showFilter && (
          <Filter
            nftDetails={nftDetails}
            setActiveFilter={setActiveFilter}
            activeFilter={activeFilter}
            handlePriceRange={handlePriceRange}
            handleToggleChange={handleToggleChange}
            onClose={() => setShowFilter(false)}
          />
        )}
        <div className={classes.innerContainer}>
          <div className={classes.filterContainer}>
            {activeFilter.map((active, idx) => (
              <div key={idx} className={classes.attribute}>
                <div>{active}</div>
                <div className={classes.closeIcon} onClick={() => handleAttributeClose(idx)}>
                  <CloseIcon />
                </div>
              </div>
            ))}
            {activeFilter.length ? (
              <div className={classes.clearBtn} onClick={() => setActiveFilter([])}>
                <div>clear all</div>
                <div className={classes.closeIcon}>
                  <CloseIcon />
                </div>
              </div>
            ) : null}
          </div>
          {filteredNftDetails && (
            <Paginate
              items={filteredNftDetails}
              offsetHeight={860}
              countPerPage={20}
              renderItem={(filteredNftDetails) => (
                <div className={`${classes.nfts} ${showFilter && classes.isFilter}`}>
                  {filteredNftDetails.map((nft, idx) => (
                    <NFTCard
                      key={idx}
                      nft={nft}
                      collectionName={name}
                      chainId={chainId}
                      usd={usd}
                    />
                  ))}
                </div>
              )}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default NFTs;
