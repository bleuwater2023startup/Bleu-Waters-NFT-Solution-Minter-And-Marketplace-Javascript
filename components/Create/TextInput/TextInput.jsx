import { useContext } from "react";
import { setMintData } from "../../../context/state.actions";
import { StateContext } from "../../../context/state.context";
import Tooltip from "../../Tooltip/Tooltip";
import classes from "./TextInput.module.css";

const TextInput = ({ type, name, description, required, preview, collection }) => {
  const { mintData, dispatch } = useContext(StateContext);
  const handleChange = (e) => {
    let value = e.target.value;
    dispatch(setMintData({ ...mintData, [name]: value }));
  };

  return (
    <div className={classes.container}>
      <div className={classes.name}>
        <span>{name}</span>
        {required && <span className={classes.required}>*</span>}
      </div>
      <div className={classes.description}>{description}</div>
      {type === "text" && (
        <div className={classes.inputContainer}>
          <input type="text" value={mintData[name]} onChange={handleChange} disabled={preview} />
          {collection && (
            <div className={classes.tooltip}>
              <Tooltip data="This value can’t be changed after your contract is created" />
            </div>
          )}
        </div>
      )}
      {type === "text-area" && (
        <textarea value={mintData[name]} onChange={handleChange} disabled={preview} />
      )}
    </div>
  );
};

export default TextInput;
