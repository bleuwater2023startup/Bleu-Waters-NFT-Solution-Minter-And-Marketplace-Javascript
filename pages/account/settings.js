import { useContext, useEffect, useRef, useState } from "react";
import Button from "../../components/Button/Button";
import { StateContext } from "../../context/state.context";
import classes from "../../styles/ProfileSettings.module.css";
import AddIcon from "../../assets/icon-add.svg";
import BackIcon from "../../assets/icon-arrow.svg";
import {
  createUserProfile,
  deleteImage,
  getImage,
  getUserProfile,
  uploadImage,
} from "../../firebase/firebase";
import Loader from "../../components/LoadingScreen/Loader/Loader";
import { setNotification } from "../../context/state.actions";
import { useRouter } from "next/router";

const IUser = {
  username: "",
  bio: "",
  email: "",
  twitter: "",
  instagram: "",
  website: "",
  account: "",
};

const IProfileImage = {
  profileBanner: null,
  profileImage: null,
};

const ProfileSettings = () => {
  const { account, dispatch } = useContext(StateContext);
  const [inputValue, setInputValue] = useState(IUser);
  const [imageInput, setImageInput] = useState(IProfileImage);
  const [toggleLoader, setToggleLoader] = useState(false);
  const [toggleInitLoader, setToggleInitLoader] = useState(true);

  const bannerRef = useRef(null);
  const imageRef = useRef(null);
  const router = useRouter();

  const handleInputChange = async (event) => {
    const { name, value, type, files } = event.target;
    if (type === "file") {
      setImageInput((input) => ({ ...input, [name]: files[0] }));
    } else {
      setInputValue((input) => ({ ...input, [name]: value }));
    }
  };

  const handleSave = async () => {
    if (!account) return;
    setToggleLoader(true);
    if (imageInput.profileBanner) {
      await uploadImage({
        account,
        name: "profileBanner",
        file: imageInput.profileBanner,
      });
    }
    if (imageInput.profileImage) {
      await uploadImage({
        account,
        name: "profileImage",
        file: imageInput.profileImage,
      });
    }
    const res = await createUserProfile(inputValue);
    setToggleLoader(false);
    if (!res) {
      dispatch(
        setNotification({
          type: "success",
          message: "Profile updated successfully.",
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

  const handleDeleteImages = async () => {
    await deleteImage({ account, name: "profileBanner" });
    await deleteImage({ account, name: "profileImage" });
    const profileBanner = await getImage({ account, name: "profileBanner" });
    const profileImage = await getImage({ account, name: "profileImage" });
    if (profileBanner && profileImage) {
      setImageInput((input) => ({ ...input, profileBanner, profileImage }));
    } else {
      setImageInput(IProfileImage);
    }
  };

  const init = async () => {
    setToggleInitLoader(true);
    const data = await getUserProfile(account);
    if (data) {
      setInputValue(data);
    } else {
      setInputValue({ ...IUser, account });
    }
    const profileBanner = await getImage({ account, name: "profileBanner" });
    const profileImage = await getImage({ account, name: "profileImage" });
    if (profileBanner) {
      setImageInput((input) => ({ ...input, profileBanner }));
    }
    if (profileImage) {
      setImageInput((input) => ({ ...input, profileImage }));
    }
    setToggleInitLoader(false);
  };

  useEffect(() => {
    if (!account) return;
    init();
  }, [account]);

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
          <div className={classes.heading}>Profile Details</div>
          <div className={classes.description}>Update your profile</div>
          <div className={classes.inputContainer}>
            <div>
              <div
                onClick={() => bannerRef.current.click()}
                className={`${classes.profileBanner} ${
                  imageInput.profileBanner && classes.active
                }`}>
                {imageInput.profileBanner ? (
                  <img src={URL.createObjectURL(imageInput.profileBanner)} alt="" />
                ) : (
                  <div>Profile Banner</div>
                )}
                <div className={classes.addIcon}>
                  <AddIcon />
                </div>
              </div>
              <div
                onClick={() => imageRef.current.click()}
                className={`${classes.profileImage} ${imageInput.profileImage && classes.active}`}>
                {imageInput.profileImage ? (
                  <img src={URL.createObjectURL(imageInput.profileImage)} alt="" />
                ) : (
                  <div>Profile Image</div>
                )}
                <div className={classes.addIcon}>
                  <AddIcon />
                </div>
              </div>
              {(imageInput.profileBanner || imageInput.profileImage) && (
                <div onClick={handleDeleteImages} className={classes.deleteImageButton}>
                  <Button dark outline height={1}>
                    Delete images
                  </Button>
                </div>
              )}
              <input
                ref={bannerRef}
                style={{ display: "none" }}
                type="file"
                name="profileBanner"
                onChange={handleInputChange}
                accept=".png"
              />
              <input
                ref={imageRef}
                style={{ display: "none" }}
                type="file"
                name="profileImage"
                onChange={handleInputChange}
                accept=".png"
              />
            </div>
            <div>
              <label>Username</label>
              <input
                type="text"
                name="username"
                placeholder="Enter username"
                value={inputValue.username}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Bio</label>
              <input
                type="text"
                name="bio"
                placeholder="Tell the world your story!"
                value={inputValue.bio}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Enter email"
                value={inputValue.email}
                onChange={handleInputChange}
              />
            </div>
            <section>Links and Social Connections</section>
            <div>
              <label>Twitter</label>
              <input
                type="text"
                name="twitter"
                placeholder="Twitter url"
                value={inputValue.twitter}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Instagram</label>
              <input
                type="text"
                name="instagram"
                placeholder="Instagram url"
                value={inputValue.instagram}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Links</label>
              <input
                type="text"
                name="website"
                placeholder="Website url"
                value={inputValue.website}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Wallet Address</label>
              <input
                disabled
                type="text"
                name="account"
                value={account}
                onChange={handleInputChange}
              />
            </div>

            <div onClick={handleSave} className={classes.saveButton}>
              <Button accent>Save</Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileSettings;
