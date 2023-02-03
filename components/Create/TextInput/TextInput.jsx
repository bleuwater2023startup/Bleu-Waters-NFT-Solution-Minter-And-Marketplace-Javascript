import { useContext } from "react";
import { setMintData } from "../../../context/state.actions";
import { StateContext } from "../../../context/state.context";
import classes from "./TextInput.module.css";

const TextInput = ({ type, name, description, required, preview }) => {
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
        <input type="text" value={mintData[name]} onChange={handleChange} disabled={preview} />
      )}
      {type === "text-area" && (
        <textarea value={mintData[name]} onChange={handleChange} disabled={preview} />
      )}
    </div>
  );
};

export default TextInput;
