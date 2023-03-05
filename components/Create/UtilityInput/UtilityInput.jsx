import { useContext, useState } from "react";
import { setMintData } from "../../../context/state.actions";
import { StateContext } from "../../../context/state.context";
import Button from "../../Button/Button";
import UtilityModal from "../../Modals/UtilityModal/UtilityModal";
import classes from "./UtilityInput.module.css";

const UtilityInput = ({ name, preview }) => {
  const [add, setAdd] = useState(false);
  const { dispatch, mintData } = useContext(StateContext);

  const handleClose = () => {
    setAdd(false);
  };

  const handleSave = (value) => {
    dispatch(setMintData({ ...mintData, [name]: value }));
  };

  return (
    <div className={classes.container}>
      {add ? (
        <UtilityModal allUtilities={mintData[name]} onSave={handleSave} onClose={handleClose} />
      ) : null}
      <div className={classes.innerContainer}>
        <div>
          <div className={classes.name}>Utilities</div>
          <div className={classes.description}>
            Exclusive access to our E-learning classes, access to our IRL events, an hour One-on-one
            call with the team, and some more.
          </div>
        </div>
        {!preview ? (
          <div className={classes.addAttributeBtn} onClick={() => setAdd(true)}>
            <Button dark outline height="1">
              Add Utility
            </Button>
          </div>
        ) : null}
      </div>
      <div className={classes.attributeContainer}>
        {mintData[name].length
          ? mintData[name].map(({ utility, duration }, idx) => (
              <div key={idx} className={classes.attribute}>
                <div className={classes.utility}>{utility}</div>
                <div>{duration}</div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default UtilityInput;
