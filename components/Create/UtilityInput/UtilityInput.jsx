import { useState } from "react";
import AttributeModal from "../../Modals/AttributeModal/AttributeModal";
import classes from "./UtilityInput.module.css";

const UtilityInput = () => {
  const [add, setAdd] = useState(false);
  const [attributes, setAttributes] = useState([]);

  return (
    <div className={classes.container}>
      {add ? (
        <AttributeModal
          allAttributes={attributes}
          onSave={(e) => setAttributes(e)}
          onClose={() => setAdd(false)}
        />
      ) : null}
      <div className={classes.innerContainer}>
        <div>
          <div className={classes.name}>Item Utility</div>
          <div>Textual traits that shows up as rectangles on NFT page</div>
        </div>
        <div onClick={() => setAdd(true)}>Add Utility</div>
      </div>

      <div className={classes.attributes}>
        {attributes.map(({ trait_type, value }, idx) => (
          <div key={idx} className={classes.attribute}>
            <div>{trait_type}</div>
            <div>{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UtilityInput;
