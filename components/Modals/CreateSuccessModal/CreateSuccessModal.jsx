import Button from "../../Button/Button";
import classes from "./CreateSuccessModal.module.css";
import SuccessIcon from "../../../assets/icon-success.svg";
import CloseIcon from "../../../assets/icon-close.svg";
import { useContext } from "react";
import { StateContext } from "../../../context/state.context";
import { setCreateSuccessModal } from "../../../context/state.actions";

const CreateSuccessModal = ({ name, hash, mintType }) => {
  const { dispatch } = useContext(StateContext);

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div
          onClick={() => dispatch(setCreateSuccessModal({}))}
          className={classes.closeIcon}
        >
          <CloseIcon />
        </div>
        <SuccessIcon className={classes.icon} />
        <div className={classes.title}>Success!</div>
        <div className={classes.description}>
          <span>You have successfully created</span>{" "}
          <span className={classes.name}>{name}</span>
          <span>{mintType === "Collection" ? "collection" : "NFT"}</span>
        </div>
        <a
          className={classes.button}
          href={`https://mumbai.polygonscan.com/tx/${hash}`}
          target="_blank"
          rel="noreferrer noopener"
        >
          <Button accent>View on polygon</Button>
        </a>
      </div>
    </div>
  );
};

export default CreateSuccessModal;
