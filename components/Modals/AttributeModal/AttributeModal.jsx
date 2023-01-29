import classes from "./AttributeModal.module.css";
import CloseIcon from "../../../assets/icon-close.svg";
import AddIcon from "../../../assets/icon-add.svg";
import { useState } from "react";
import Button from "../../Button/Button";

const AttributeModal = ({ onSave, onClose, allAttributes }) => {
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

  const handleSave = () => {
    const newAttributes = attributes.filter(
      ({ trait_type, value }) => trait_type && value
    );
    onSave(newAttributes);
    onClose();
  };

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div onClick={onClose} className={classes.closeIcon_round}>
          <CloseIcon />
        </div>
        <div className={classes.heading}>Add attribute</div>
        <div className={classes.attributes}>
          {attributes.map(({ id, trait_type, value }) => (
            <div key={id} className={classes.attribute}>
              <input
                id={id}
                name="trait_type"
                value={trait_type}
                onChange={handleAttributeChange}
                placeholder="Trait_type"
              />
              <input
                id={id}
                name="value"
                value={value}
                placeholder="Value"
                onChange={handleAttributeChange}
                className={classes.value}
              />
              <div
                onClick={() => handleRemoveAttribute(id)}
                className={classes.remAttribute}
              >
                <div className={classes.closeIcon_square}>
                  <CloseIcon />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div onClick={handleAddAttribute} className={classes.addIcon}>
          <Button dark outline height="1">
            <AddIcon />
            <div>Add more</div>
          </Button>
        </div>

        <div onClick={handleSave} className={classes.button}>
          <Button accent>Save</Button>
        </div>
      </div>
    </div>
  );
};

export default AttributeModal;
