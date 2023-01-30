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

const NFTs = ({ collection }) => {
  const [searchValue, setSearchValue] = useState("");
  const [nftDetails, setNftDetails] = useState(null);
  const { dispatch } = useContext(StateContext);
  const [showFilter, setShowFilter] = useState(false);
  const [activeFilter, setActiveFilter] = useState([]);
  const [usd, setUsd] = useState(0);
  const [filteredNftDetails, setFilteredNftDetails] = useState(null);

  const router = useRouter();

  const { nfts, name, chainId } = collection;

  const handleChange = (value) => {
    setSearchValue(value);
    console.log({ value });
  };

  const handleAttributeClick = (id) => {
    setActiveFilter((a) => a.filter((i, idx) => idx != id));
  };

  const _getNftDetails = async (storedIpfsData) => {
    const { ipfsData, details } = await getNftDetails({ storedIpfsData, nfts });
    dispatch(setIpfsData({ ...ipfsData, ...storedIpfsData }));
    setFilteredNftDetails(details);
    setNftDetails(details);
  };

  useEffect(() => {
    let storedIpfsData = window.localStorage.getItem("ipfs_data");
    storedIpfsData = JSON.parse(storedIpfsData);
    _getNftDetails(storedIpfsData);
  }, []);

  useEffect(() => {
    if (!nftDetails) return;
    const res = nftDetails.filter(({ attributes }) => {
      return attributes.some((a) => activeFilter.includes(`${a.trait_type}:${a.value}`));
    });
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
          <Search faint placeholder="search" />
        </div>
        <div className={classes.selectContainer}>
          <PriceSort onChange={handleChange} />
        </div>
      </div>

      <div className={classes.display}>
        {showFilter && (
          <Filter
            nftDetails={nftDetails}
            setActiveFilter={setActiveFilter}
            activeFilter={activeFilter}
            onClose={() => setShowFilter(false)}
          />
        )}
        <div className={classes.innerContainer}>
          <div className={classes.filterContainer}>
            {activeFilter.map((active, idx) => (
              <div key={idx} className={classes.attribute}>
                <div>{active}</div>
                <div className={classes.closeIcon} onClick={() => handleAttributeClick(idx)}>
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
