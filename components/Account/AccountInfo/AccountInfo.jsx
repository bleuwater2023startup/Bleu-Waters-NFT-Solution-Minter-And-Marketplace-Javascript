import classes from "./AccountInfo.module.css";
import { useContext, useEffect, useRef, useState } from "react";
import { StateContext } from "../../../context/state.context";
import { formatAccount } from "../../../utils";
import CopyText from "../../CopyText/CopyTest";
import Button from "../../Button/Button";
import WalletBalanceModal from "../../Modals/WalletBalanceModal/WalletBalanceModal";
import { useLazyQuery } from "@apollo/client";
import { GET_ROYALTIES } from "../../../utils/subgraphQuery";
import { getImage, uploadImage } from "../../../firebase/firebase";
import AddIcon from "../../../assets/icon-add.svg";
import { useRouter } from "next/router";

const IProfileImage = {
  profileBanner: null,
  profileImage: null,
};
const AccountInfo = () => {
  const { account } = useContext(StateContext);
  const [imageInput, setImageInput] = useState(IProfileImage);
  const [toggleWalletBalanceModal, setToggleWalletBalanceModal] = useState(false);
  const [userAccount, setUserAccount] = useState();
  const bannerRef = useRef(null);
  const imageRef = useRef(null);
  const router = useRouter();

  const [getRoyaltyInfo, { error, loading, data }] = useLazyQuery(GET_ROYALTIES);

  const handleClick = async () => {
    setToggleWalletBalanceModal(true);
    getRoyaltyInfo({
      variables: { _account: userAccount },
    });
  };

  const handleInputChange = async (event) => {
    const { name, files } = event.target;
    setImageInput((input) => ({ ...input, [name]: files[0] }));
    if (files[0] && userAccount) {
      uploadImage({ account: userAccount, name, file: files[0] });
    }
  };

  const getProfileImage = async (userAccount) => {
    const profileBanner = await getImage({ account: userAccount, name: "profileBanner" });
    const profileImage = await getImage({ account: userAccount, name: "profileImage" });
    if (profileBanner && profileImage) {
      setImageInput((input) => ({ ...input, profileBanner, profileImage }));
    } else {
      setImageInput(IProfileImage);
    }
  };

  const isCurrentUser = () => {
    return userAccount === account;
  };

  useEffect(() => {
    setToggleWalletBalanceModal(false);
    if (!account) return;
    if (router.query.account) {
      setUserAccount(router.query.account);
    } else {
      setUserAccount(account);
    }
  }, [account, router.query.account]);

  useEffect(() => {
    if (!userAccount) return;
    getProfileImage(userAccount);
  }, [userAccount]);

  return (
    <div className={classes.container}>
      {toggleWalletBalanceModal && (
        <WalletBalanceModal
          onClose={() => setToggleWalletBalanceModal(false)}
          error={error}
          loading={loading}
          data={data}
        />
      )}
      <div
        onClick={() => {
          isCurrentUser() ? bannerRef.current.click() : {};
        }}
        className={`${classes.profileBanner} ${isCurrentUser() && classes.hover} ${
          imageInput.profileBanner && classes.active
        }`}>
        {imageInput.profileBanner ? (
          <img src={URL.createObjectURL(imageInput.profileBanner)} alt="" />
        ) : (
          <div></div> //Profile Banner
        )}
        {isCurrentUser() ? (
          <div className={classes.addIcon}>
            <AddIcon />
          </div>
        ) : null}
      </div>
      <div className={classes.innerContainer}>
        <div
          onClick={() => {
            userAccount === account ? imageRef.current.click() : {};
          }}
          className={`${classes.profileImage} ${isCurrentUser() && classes.hover} ${
            imageInput.profileImage && classes.active
          }`}>
          {imageInput.profileImage ? (
            <img src={URL.createObjectURL(imageInput.profileImage)} alt="" />
          ) : (
            <div></div> //Profile Image
          )}
          {isCurrentUser() ? (
            <div className={classes.addIcon}>
              <AddIcon />
            </div>
          ) : null}
        </div>
        <div className={classes.accountDetail}>
          <div className={classes.name}>
            <CopyText message={userAccount} icon>
              {formatAccount(userAccount)}
            </CopyText>
          </div>
          {isCurrentUser() ? (
            <div>
              <Button onClick={handleClick} dark outline_dark>
                Earnings
              </Button>
            </div>
          ) : null}
        </div>
      </div>
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
  );
};

export default AccountInfo;
