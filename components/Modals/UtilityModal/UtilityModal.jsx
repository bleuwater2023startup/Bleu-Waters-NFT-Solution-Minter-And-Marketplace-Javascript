import classes from "./UtilityModal.module.css";
import CloseIcon from "../../../assets/icon-close.svg";
import AddIcon from "../../../assets/icon-add.svg";
import { useState } from "react";
import Button from "../../Button/Button";

const UtilityModal = ({ handleSave, onClose, allAttributes }) => {
  const [attributes, setAttributes] = useState(
    allAttributes.length
      ? allAttributes
      : [{ id: Date.now(), trait_type: "", value: "" }]
  );

  const handleAddAttribute = () => {
    const newAttribute = {
      id: Date.now(),
      trait_type: "",
      value: "",
    };

    setAttributes((attributes) => [...attributes, newAttribute]);
  };

  const handleAttributeChange = (e) => {
    const { name, id, value } = e.target;
    const newAttributes = attributes.map((attribute) =>
      String(attribute.id) === id ? { ...attribute, [name]: value } : attribute
    );

    setAttributes(newAttributes);
  };

  const handleRemoveAttribute = (id) => {
    const newAttributes = attributes.filter((attribute) => attribute.id !== id);
    setAttributes(newAttributes);
  };

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <CloseIcon className={classes.closeIcon_round} onClick={onClose} />
        <div className={classes.heading}>Add attribute</div>
        <div className={classes.attributes}>
          {attributes.map(({ id, trait_type, value }) => (
            <div key={id} className={classes.attribute}>
              <input
                id={id}
                name="trait_type"
                value={trait_type}
                onChange={handleAttributeChange}
                placeholder="trait_type"
                className={classes.key}
              />
              <input
                id={id}
                name="value"
                value={value}
                onChange={handleAttributeChange}
                placeholder="value"
                className={classes.value}
              />
              <div
                onClick={() => handleRemoveAttribute(id)}
                className={classes.remAttribute}
              >
                <CloseIcon className={classes.closeIcon_square} />
              </div>
            </div>
          ))}
        </div>
        <div onClick={handleAddAttribute} className={classes.addIcon}>
          <AddIcon />
          <div>Add more</div>
        </div>

        <div
          onClick={() => {
            handleSave(attributes), onClose();
          }}
          className={classes.button}
        >
          <Button accent>Save</Button>
        </div>
      </div>
    </div>
  );
};

export default UtilityModal;
