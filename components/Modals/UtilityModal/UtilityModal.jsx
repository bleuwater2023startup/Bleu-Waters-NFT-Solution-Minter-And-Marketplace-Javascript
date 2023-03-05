import classes from "./UtilityModal.module.css";
import CloseIcon from "../../../assets/icon-close.svg";
import { useState } from "react";
import Button from "../../Button/Button";
import Select from "../../Select/Select";
import { useContext } from "react";
import { StateContext } from "../../../context/state.context";
import { setNotification } from "../../../context/state.actions";

const utitilityListDuration = {
  "Waitlist Spot": ["One time"],
  "E-Learning Class": ["1 month", "3 months", "6 months"],
  "One-on-one call": ["2 calls", "4 calls", "6 calls"],
  "Protected NFTs": ["Infinity"],
};

const getUtilityDuration = (allUtilities) => {
  return Object.keys(utitilityListDuration).filter((u) =>
    allUtilities.every((au) => au.utility !== u)
  );
};

const UtilityModal = ({ onSave, onClose, allUtilities }) => {
  const { dispatch } = useContext(StateContext);
  const [utilityList, setUtilityList] = useState(
    allUtilities.length ? getUtilityDuration(allUtilities) : Object.keys(utitilityListDuration)
  );
  const [utilities, setUtilities] = useState(allUtilities.length ? allUtilities : []);

  const handleAddUtility = (e) => {
    const newUtilities = {
      id: Date.now(),
      utility: e,
      duration: "",
    };

    setUtilityList((util) => util.filter((u) => u !== e));
    setUtilities((utilities) => [...utilities, newUtilities]);
  };

  const handleUtilityChange = (e) => {
    const { name, id, value } = e.target;
    const newUtilities = utilities.map((utility) =>
      String(utility.id) === id ? { ...utility, [name]: value } : utility
    );

    setUtilities(newUtilities);
  };

  const handleRemoveUtility = (id) => {
    const { utility } = utilities.find((utility) => utility.id === id);
    const newUtilities = utilities.filter((utility) => utility.id !== id);
    setUtilities(newUtilities);
    setUtilityList((util) => [...util, utility]);
  };

  const handleSave = () => {
    const isEmpty = utilities.find(({ duration }) => !duration);
    if (isEmpty) {
      dispatch(
        setNotification({
          type: "warning",
          message: "Please set duration",
        })
      );
    } else {
      const newUtilities = utilities.filter(({ duration }) => duration);
      onSave(newUtilities);
      onClose();
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div onClick={onClose} className={classes.closeIcon_round}>
          <CloseIcon />
        </div>
        <div className={classes.heading}>Add utility</div>
        <div className={classes.utilities}>
          {utilities.map(({ id, utility, duration }) => (
            <div key={id} className={classes.utility}>
              <input
                id={id}
                name="utility"
                value={utility}
                onChange={handleUtilityChange}
                placeholder="Utility"
                disabled
              />
              <select value={duration} onChange={handleUtilityChange} name="duration" id={id}>
                <option value="" selected disabled hidden>
                  Set duration
                </option>
                {utitilityListDuration[utility].map((u) => (
                  <option key={u} value={u}>
                    {u}
                  </option>
                ))}
              </select>
              <div onClick={() => handleRemoveUtility(id)} className={classes.remUtility}>
                <div className={classes.closeIcon_square}>
                  <CloseIcon />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={classes.select}>
          <Select
            list={utilityList}
            _default="Select utility"
            onChange={(e) => handleAddUtility(e)}
          />
        </div>

        <div onClick={handleSave} className={classes.button}>
          <Button accent>Save</Button>
        </div>
      </div>
    </div>
  );
};

export default UtilityModal;
