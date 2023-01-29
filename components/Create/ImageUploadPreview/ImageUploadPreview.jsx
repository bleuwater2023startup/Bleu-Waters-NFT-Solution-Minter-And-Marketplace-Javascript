import classes from "./ImageUploadPreview.module.css";
import CloseIcon from "../../../assets/icon-close.svg";

const ImageUploadPreview = ({ file, handleClick, collection }) => {
  return (
    <div className={classes.container}>
      {collection
        ? file && (
            <div className={classes.wrapper}>
              <img
                className={classes.image1}
                src={URL.createObjectURL(file[0]?.image)}
                alt=""
              />
              <img
                className={classes.image2}
                src={URL.createObjectURL(file[1]?.image)}
                alt=""
              />
              <img
                className={classes.image3}
                src={URL.createObjectURL(file[2]?.image)}
                alt=""
              />
            </div>
          )
        : file && <img src={URL.createObjectURL(file)} alt="" />}
      <div onClick={handleClick} className={classes.closeIcon}>
        <CloseIcon />
      </div>
    </div>
  );
};

export default ImageUploadPreview;

{
  /* <img src={URL.createObjectURL(file[0].image)} alt="" /> */
}
