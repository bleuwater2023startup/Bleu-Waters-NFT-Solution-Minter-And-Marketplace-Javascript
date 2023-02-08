import { useContext, useEffect, useRef, useState } from "react";
import Button from "../../../components/Button/Button";
import { StateContext } from "../../../context/state.context";
import classes from "../../../styles/CollectionSettings.module.css";
import AddIcon from "../../../assets/icon-add.svg";
import BackIcon from "../../../assets/icon-arrow.svg";
import {
  createCollectionProfile,
  getCollectionImage,
  getCollectionProfile,
  uploadCollectionImage,
} from "../../../firebase/firebase";
import Loader from "../../../components/LoadingScreen/Loader/Loader";
import { setNotification } from "../../../context/state.actions";
import DiscordIcon from "../../../assets/icon-discord-dark.svg";
import TwitterIcon from "../../../assets/icon-twitter-dark.svg";
import TelegramIcon from "../../../assets/icon-telegram-dark.svg";
import { useRouter } from "next/router";

const ICollection = {
  description: "",
  discord: "",
  twitter: "",
  instagram: "",
  telegram: "",
};

const ICollectionImage = {
  collectionBanner: null,
  collectionImage: null,
};

const Edit = () => {
  const { dispatch } = useContext(StateContext);
  const [inputValue, setInputValue] = useState(ICollection);
  const [imageInput, setImageInput] = useState(ICollectionImage);
  const [toggleLoader, setToggleLoader] = useState(false);
  const [toggleInitLoader, setToggleInitLoader] = useState(true);

  const bannerRef = useRef(null);
  const imageRef = useRef(null);
  const router = useRouter();
  const id = router.query.id;

  const handleInputChange = async (event) => {
    const { name, value, type, files } = event.target;
    if (type === "file") {
      setImageInput((input) => ({ ...input, [name]: files[0] }));
    } else {
      setInputValue((input) => ({ ...input, [name]: value }));
    }
  };

  const handleSave = async () => {
    if (!id) return;
    setToggleLoader(true);
    if (imageInput.collectionBanner) {
      await uploadCollectionImage({
        id,
        name: "collectionBanner",
        file: imageInput.collectionBanner,
      });
    }
    if (imageInput.collectionImage) {
      await uploadCollectionImage({
        id,
        name: "collectionImage",
        file: imageInput.collectionImage,
      });
    }
    const res = await createCollectionProfile(inputValue);
    setToggleLoader(false);
    if (!res) {
      dispatch(
        setNotification({
          type: "success",
          message: "Collection updated successfully.",
        })
      );
    } else {
      dispatch(
        setNotification({
          type: "error",
          message: res.error,
        })
      );
    }
  };

  const init = async () => {
    setToggleInitLoader(true);
    const data = await getCollectionProfile(id);
    if (data) {
      setInputValue(data);
    } else {
      setInputValue({ ...ICollection, id });
    }
    const collectionBanner = await getCollectionImage({ id, name: "collectionBanner" });
    const collectionImage = await getCollectionImage({ id, name: "collectionImage" });
    if (collectionBanner && collectionImage) {
      setImageInput((input) => ({ ...input, collectionBanner, collectionImage }));
    } else {
      setImageInput(ICollectionImage);
    }
    setToggleInitLoader(false);
  };

  useEffect(() => {
    if (!id) return;
    init();
  }, [id]);

  return (
    <div className={classes.container}>
      <div onClick={() => router.back()} className={classes.arrow}>
        <BackIcon />
      </div>
      {toggleInitLoader ? (
        <Loader />
      ) : (
        <>
          {toggleLoader && <Loader overlay />}
          <div className={classes.heading}>Edit Collection</div>

          <section>
            <div className={classes.title}>Upload collection images</div>
            <div className={classes.description}>
              Click on the each dotted box to upload Banner image ( 1400 X 350 px) and Logo image
              (350 X 350 px) for your collection{" "}
            </div>
            <div
              onClick={() => bannerRef.current.click()}
              className={`${classes.collectionBanner} ${
                imageInput.collectionBanner && classes.active
              }`}>
              {imageInput.collectionBanner ? (
                <img src={URL.createObjectURL(imageInput.collectionBanner)} alt="" />
              ) : (
                <div>Profile Banner</div>
              )}
              <div className={classes.addIcon}>
                <AddIcon />
              </div>
            </div>
            <div
              onClick={() => imageRef.current.click()}
              className={`${classes.collectionImage} ${
                imageInput.collectionImage && classes.active
              }`}>
              {imageInput.collectionImage ? (
                <img src={URL.createObjectURL(imageInput.collectionImage)} alt="" />
              ) : (
                <div>Profile Image</div>
              )}
              <div className={classes.addIcon}>
                <AddIcon />
              </div>
            </div>
            <input
              ref={bannerRef}
              style={{ display: "none" }}
              type="file"
              name="collectionBanner"
              onChange={handleInputChange}
              accept=".png"
            />
            <input
              ref={imageRef}
              style={{ display: "none" }}
              type="file"
              name="collectionImage"
              onChange={handleInputChange}
              accept=".png"
            />
          </section>

          <section>
            <div className={classes.title}>Collection Description</div>
            <div className={classes.description}>
              {"The description will appear on the item's detail page under each NFT."}
            </div>
            <textarea
              name="description"
              value={inputValue.description}
              onChange={handleInputChange}
            />
          </section>

          <section>
            <div className={classes.title}>Links and Social Connections</div>
            <div className={classes.description}>
              Build stronger reputation and help people find and connect with your community by
              adding your social links, this will be displayed on your collection page
            </div>
            <div className={classes.labeledInput}>
              <label>Discord</label>
              <div className={classes.wrapper}>
                <DiscordIcon className={classes.icon} />
                <input
                  name="discord"
                  placeholder="Your discord handle"
                  value={inputValue.discord}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className={classes.labeledInput}>
              <label>Twitter</label>
              <div className={classes.wrapper}>
                <TwitterIcon className={classes.icon} />
                <input
                  name="twitter"
                  placeholder="Your twitter handle"
                  value={inputValue.twitter}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* <div className={classes.labeledInput}>
              <label>Instagram</label>
              <div className={classes.wrapper}>
                <InstagramIcon className={classes.icon} />
                <input
                  name="instagram"
                  placeholder="Your instagram handle"
                  value={inputValue.instagram}
                  onChange={handleInputChange}
                />
              </div>
            </div> */}

            <div className={classes.labeledInput}>
              <label>Telegram</label>
              <div className={classes.wrapper}>
                <TelegramIcon className={classes.icon} />
                <input
                  name="telegram"
                  placeholder="Your telegram handle"
                  value={inputValue.telegram}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </section>

          <div onClick={handleSave} className={classes.saveButton}>
            <Button accent>Save</Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Edit;
