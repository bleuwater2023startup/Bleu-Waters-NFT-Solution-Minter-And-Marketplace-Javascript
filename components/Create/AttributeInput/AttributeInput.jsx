import { use, useContext, useState } from "react";
import { setMintData } from "../../../context/state.actions";
import { StateContext } from "../../../context/state.context";
import Button from "../../Button/Button";
import AttributeModal from "../../Modals/AttributeModal/AttributeModal";
import classes from "./AttributeInput.module.css";

const AttributeInput = ({ name, preview }) => {
  const [add, setAdd] = useState(false);
  const { dispatch, mintData } = useContext(StateContext);

  const handleClose = () => {
    setAdd(false);
  };

  const handleSave = (value) => {
    dispatch(setMintData({ ...mintData, [name]: value }));
  };

  console.log({ attribute: mintData[name] });

  return (
    <div className={classes.container}>
      {add ? (
        <AttributeModal allAttributes={mintData[name]} onSave={handleSave} onClose={handleClose} />
      ) : null}
      <div className={classes.innerContainer}>
        <div>
          <div className={classes.name}>Item Attributes</div>
          <div className={classes.description}>
            Textual traits that shows up as rectangles on NFT page
          </div>
        </div>
        {!preview && (
          <div className={classes.addAttributeBtn} onClick={() => setAdd(true)}>
            <Button dark outline height="1">
              Add Attribute
            </Button>
          </div>
        )}
      </div>
      <div className={classes.attributeContainer}>
        {mintData[name].length &&
          mintData[name].map(({ trait_type, value }, idx) => (
            <div key={idx} className={classes.attribute}>
              <div className={classes.trait_type}>{trait_type}</div>
              <div>{value}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AttributeInput;
