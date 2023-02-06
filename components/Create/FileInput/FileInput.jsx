import { useContext, useRef, useState } from "react";
import classes from "./FileInput.module.css";
import { extractJson, extractZip } from "./FileInputScript";
import ZipIcon from "../../../assets/icon-zip.svg";
import { StateContext } from "../../../context/state.context";
import { setMintData, setNotification, setPreviewCollection } from "../../../context/state.actions";
import ImageUploadPreview from "../ImageUploadPreview/ImageUploadPreview";
import PreviewInfo from "../PreviewCollection/PreviewInfo";

let description = [
  "Upload a zip file containing your art and metadata",
  "You need to upload  a zip file from your already generated asset to proceed. Learn more...",
];

const FileInput = ({ name, preview, collection }) => {
  const inputRef = useRef(null);
  const { dispatch, mintData } = useContext(StateContext);

  const handleClick = () => {
    inputRef.current.click();
  };

  const handlePreview = () => {
    dispatch(setPreviewCollection(true));
  };

  const handleFileChange = async (event) => {
    let file = event.target.files[0];
    if (!file) return;

    // const nameExtension = file.name.replace(/\.+\s*\./, ".").split(".");
    // setFilename(nameExtension.slice(0, nameExtension.length - 1).join("."));

    let res;
    try {
      if (file.name.split(".").includes("json")) {
        res = await extractJson(file);
      } else {
        res = await extractZip(file);
      }
    } catch (error) {
      dispatch(
        setNotification({
          type: "error",
          message: "Invalid file format.",
        })
      );
    }

    dispatch(setMintData({ ...mintData, [name]: res, File_Name: file.name }));
  };

  const handleImageChange = (event) => {
    const image = event.target.files[0];
    // const nameExtension = image.name.replace(/\.+\s*\./, ".").split(".");
    if (!image) return;
    dispatch(setMintData({ ...mintData, [name]: image, File_Name: image.name }));
  };

  return (
    <div className={classes.container}>
      <div>
        <div className={classes.network}>Contract address</div>
        <a
          href={`https://mumbai.polygonscan.com/address/${mintData["Collection Address"]}`}
          target="_blank"
          rel="noreferrer noopener"
          className={classes.address}>
          {mintData["Collection Address"]}
        </a>
        {collection && !preview && (
          <>
            <div className={classes.mainDescription}>{description[0]}</div>
            <div>{description[1]}</div>
          </>
        )}
      </div>
      <Input
        inputRef={inputRef}
        collection={collection}
        handleFileChange={handleFileChange}
        handleImageChange={handleImageChange}
        preview={preview}
      />
      {mintData[name] ? (
        <ImageUploadPreview
          file={mintData[name]}
          handleClick={handleClick}
          collection={collection}
        />
      ) : preview && mintData.File_Name ? (
        <div>{mintData.File_Name}</div>
      ) : (
        <div className={classes.imageContainer}>
          <div onClick={handleClick} className={classes.wrapper}>
            <ZipIcon className={classes.zipIcon} />
            {collection && (
              <>
                <div>Drag and drop your .ZIP file</div>
                <div>or</div>
              </>
            )}

            <div className={classes.uploadBtn}>Click to select file</div>
          </div>
          <div className={classes.fileName}>{mintData.File_Name}</div>
        </div>
      )}
      {collection && !preview && mintData.File && <PreviewInfo handlePreview={handlePreview} />}
    </div>
  );
};

export default FileInput;

const Input = ({ inputRef, collection, handleFileChange, handleImageChange, preview }) => (
  <input
    ref={inputRef}
    onChange={collection ? handleFileChange : handleImageChange}
    style={{ display: "none" }}
    type="file"
    accept={collection ? ".zip, .json" : "image/png"}
    disabled={preview}
  />
);
