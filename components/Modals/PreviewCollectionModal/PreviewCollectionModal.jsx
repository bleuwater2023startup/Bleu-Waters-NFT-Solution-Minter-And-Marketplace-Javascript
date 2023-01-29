import classes from "./PreviewCollectionModal.module.css";
import CloseIcon from "../../../assets/icon-close.svg";

const PreviewCollectionModal = ({ asset, onClose }) => {
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.heading}>
          <div className={classes.name}>{asset.name}</div>
          <div onClick={onClose} className={classes.closeIcon}>
            <CloseIcon />
          </div>
        </div>
        <img src={URL.createObjectURL(asset.image)} alt="" />
        <div className={classes.attributeContainer}>
          {asset.attributes.map(({ trait_type, value }, idx) => (
            <div key={idx} className={classes.attribute}>
              <div>{trait_type}</div>
              <div>{value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PreviewCollectionModal;
