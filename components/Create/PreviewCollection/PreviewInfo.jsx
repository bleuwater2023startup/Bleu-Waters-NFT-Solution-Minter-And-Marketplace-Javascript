import InfoIcon from "../../../assets/icon-info-2.svg";
import classes from "./PreviewCollection.module.css";

const PreviewInfo = ({ handlePreview }) => (
  <div className={classes.preview}>
    <InfoIcon className={classes.infoIcon} />
    <div className={classes.info}>
      You can preview your collection to confirm that item attributes are correct.
    </div>
    <div onClick={handlePreview} className={classes.previewButton}>
      Preview collection
    </div>
  </div>
);

export default PreviewInfo;
