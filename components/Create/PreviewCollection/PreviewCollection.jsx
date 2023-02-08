import { useContext, useState } from "react";
import { setPreviewCollection } from "../../../context/state.actions";
import { StateContext } from "../../../context/state.context";
import PreviewCollectionModal from "../../Modals/PreviewCollectionModal/PreviewCollectionModal";
import classes from "./PreviewCollection.module.css";
import BackIcon from "../../../assets/icon-arrow.svg";

const PreviewCollection = ({ assets }) => {
  const { dispatch } = useContext(StateContext);
  const [assetId, setAssetId] = useState(null);

  return (
    <div className={`${classes.container} ${assetId && classes.modal}`}>
      <div className={classes.innerContainer}>
        {assetId && (
          <PreviewCollectionModal onClose={() => setAssetId(null)} asset={assets[assetId]} />
        )}
        <div onClick={() => dispatch(setPreviewCollection(false))} className={classes.arrow}>
          <BackIcon />
        </div>
        <div className={classes.assetContainer}>
          {assets
            ?.filter((_, idx) => idx < 100)
            .map((asset, idx) => (
              <div className={classes.asset} key={idx}>
                <img src={URL.createObjectURL(asset.image)} alt="" />
                <div className={classes.detail}>
                  <div>{asset.name}</div>
                  <div onClick={() => setAssetId(idx)} className={classes.attrButton}>
                    View attributes
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PreviewCollection;
