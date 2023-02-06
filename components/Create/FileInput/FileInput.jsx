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
  const [isDrag, setIsDrag] = useState(false);

  const handleClick = () => {
    inputRef.current.click();
  };

  const handlePreview = () => {
    dispatch(setPreviewCollection(true));
  };

  const handleFileChange = async (event) => {
    let file = event.target.files[0];
    if (!file) return;

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

  const isAccept = (file) => {
    const accept_collection = ["json", "zip"];
    const accept_1of1 = ["png"];
    const nameExtension = file.name.replace(/\.+\s*\./, ".").split(".");
    const ext = nameExtension[nameExtension.length - 1];
    return collection
      ? accept_collection.includes(ext.toLowerCase())
      : accept_1of1.includes(ext.toLowerCase());
  };

  const handleDrag = (event) => {
    event.preventDefault();
    setIsDrag(true);
  };

  const handleDragEnd = (event) => {
    event.preventDefault();
    setIsDrag(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDrag(false);
    if (event.dataTransfer.items) {
      const item = [...event.dataTransfer.items][0];
      if (item.kind === "file") {
        const file = item.getAsFile();
        if (!isAccept(file))
          return dispatch(
            setNotification({
              type: "error",
              message: "Invalid file format",
            })
          );
        if (collection) {
          handleFileChange({ target: { files: [file] } });
        } else {
          handleImageChange({ target: { files: [file] } });
        }
      }
    } else {
      const file = [...event.dataTransfer.files][0];
      if (!isAccept(file))
        return dispatch(
          setNotification({
            type: "error",
            message: "Invalid file format",
          })
        );
      if (collection) {
        handleFileChange({ target: { files: [file] } });
      } else {
        handleImageChange({ target: { files: [file] } });
      }
    }
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
      <div
        className={classes.dropZone}
        onDrop={handleDrop}
        onDragOver={handleDrag}
        onDragEnd={handleDragEnd}
        onDragLeave={handleDragEnd}>
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
            <div onClick={handleClick} className={`${classes.wrapper} ${isDrag && classes.hover}`}>
              <ZipIcon className={classes.zipIcon} />
              <div>Drag and drop file</div>
              <div>or</div>
              <div className={classes.uploadBtn}>Click to select</div>
            </div>
            <div className={classes.fileName}>Recent uploads: {mintData.File_Name}</div>
          </div>
        )}
      </div>
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
