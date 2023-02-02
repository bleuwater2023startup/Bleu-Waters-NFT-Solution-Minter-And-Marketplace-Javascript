import { useState } from "react";
import classes from "./Button.module.css";

const Button = ({
  children,
  outline,
  outline_dark,
  fill,
  dark,
  accent,
  height,
  disabled,
  error,
  onClick,
}) => {
  const [clicked, setClicked] = useState(false);
  const heights = ["2.2em", "2.4em", "2.6em", "2.8em", "3em", "3.2em", "3.4em"];
  return (
    <div
      onClick={onClick}
      onMouseDown={() => setClicked(true)}
      onMouseUp={() => setClicked(false)}
      style={{ height: height ? heights[height] : "3em" }}
      className={`${classes.container} ${outline && classes.outline} ${fill && classes.fill} ${
        dark && classes.dark
      } ${accent && classes.accent}  ${disabled && classes.disabled} ${error && classes.error} ${
        clicked && classes.clicked
      }  ${outline_dark && classes.outline_dark}`}>
      {children}
    </div>
  );
};

export default Button;
