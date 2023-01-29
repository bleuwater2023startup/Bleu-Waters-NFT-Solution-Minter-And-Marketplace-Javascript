import classes from "./Toggle.module.css";
import { useEffect, useState } from "react";

const ToggleButton = ({ onClick }) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    onClick(active);
  }, [active]);

  return (
    <div
      onClick={() => {
        setActive(!active);
      }}
      className={`${classes.container} ${active && classes.active}`}
    >
      <div className={classes.innerContainer}></div>
    </div>
  );
};

export default ToggleButton;
