import classes from "./SelectContractModal.module.css";
import CloseIcon from "../../../assets/icon-close.svg";
import Button from "../../Button/Button";
import Search from "../../Search/Search";
import { useContext, useState } from "react";
import { chainIdToName } from "../../../utils/supportedChains";
import { StateContext } from "../../../context/state.context";
import { setMintData } from "../../../context/state.actions";
import { INITIAL_STATE } from "../../../context/state.reducer";

const SelectContractModal = ({ onClose, onContractSelect, collections }) => {
  const [searchValue, setSearchValue] = useState("");
  const { dispatch } = useContext(StateContext);

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div onClick={onClose} className={classes.closeIcon}>
          <CloseIcon />
        </div>
        <div className={classes.heading}>Select collection</div>
        <div className={classes.description}>
          Click to select a collection you want to mint to or create a new collection
        </div>
        <div className={classes.searchContainer}>
          <Search
            onChange={handleChange}
            faint
            value={searchValue}
            placeholder="Search by name.."
          />
        </div>
        <div className={classes.contractContainer}>
          {collections.map(({ id, name, symbol, nfts, chainId }, idx) => (
            <div key={idx} className={classes.contract}>
              <div className={classes.innerContainer}>
                <div className={classes.contractName}>{`${name} (${symbol})`}</div>
                <div className={classes.contractDescription}>
                  <div className={classes.itemCount}>{nfts.length} NFTs</div>
                  <div className={classes.network}>{`:${chainIdToName[chainId]}`}</div>
                </div>
                <div className={classes.royalty}>
                  {`${nfts[0] ? nfts[0].royaltyInfo / 100 : 0}% Royalty`}
                </div>
              </div>
              <div
                onClick={() => {
                  dispatch(
                    setMintData({
                      ...INITIAL_STATE.mintData,
                      "Collection Address": id,
                      MintType: "Single",
                    })
                  );
                  onContractSelect("existing");
                }}
                className={classes.selectButton}>
                Select
              </div>
            </div>
          ))}
        </div>
        <div
          onClick={() => {
            dispatch(setMintData({ ...INITIAL_STATE.mintData, MintType: "Collection" }));
            onContractSelect("create-new");
          }}
          className={classes.createButton}>
          <Button accent>Create new</Button>
        </div>
      </div>
    </div>
  );
};

export default SelectContractModal;
