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

const IProfileImage = {
  profileBanner: null,
  profileImage: null,
};
const AccountInfo = () => {
  const { account } = useContext(StateContext);
  const [imageInput, setImageInput] = useState(IProfileImage);
  const bannerRef = useRef(null);
  const imageRef = useRef(null);
  const [toggleWalletBalanceModal, setToggleWalletBalanceModal] = useState(false);

  const [getRoyaltyInfo, { error, loading, data }] = useLazyQuery(GET_ROYALTIES);

  const handleClick = async () => {
    setToggleWalletBalanceModal(true);
    getRoyaltyInfo({
      variables: { _account: account },
    });
  };

  const handleInputChange = async (event) => {
    const { name, files } = event.target;
    setImageInput((input) => ({ ...input, [name]: files[0] }));
    if (files[0] && account) {
      uploadImage({ account, name, file: files[0] });
    }
  };

  const getProfileImage = async () => {
    const profileBanner = await getImage({ account, name: "profileBanner" });
    const profileImage = await getImage({ account, name: "profileImage" });
    if (profileBanner && profileImage) {
      setImageInput((input) => ({ ...input, profileBanner, profileImage }));
    } else {
      setImageInput(IProfileImage);
    }
  };

  useEffect(() => {
    setToggleWalletBalanceModal(false);
    if (!account) return;
    getProfileImage();
  }, [account]);

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
        onClick={() => bannerRef.current.click()}
        className={`${classes.profileBanner} ${imageInput.profileBanner && classes.active}`}>
        {imageInput.profileBanner ? (
          <img src={URL.createObjectURL(imageInput.profileBanner)} alt="" />
        ) : (
          <div>Profile Banner</div>
        )}
        <div className={classes.addIcon}>
          <AddIcon />
        </div>
      </div>
      <div className={classes.innerContainer}>
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
        <div className={classes.accountDetail}>
          <div className={classes.name}>
            <CopyText message={account}>{formatAccount(account)}</CopyText>
          </div>
          <div>
            <Button onClick={handleClick} dark outline_dark>
              Earnings
            </Button>
          </div>
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
