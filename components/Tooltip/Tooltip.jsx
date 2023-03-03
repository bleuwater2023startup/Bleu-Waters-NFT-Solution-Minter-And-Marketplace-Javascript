import classes from "./Tooltip.module.css";
import InfoIcon from "../../assets/icon-info-2.svg";
import { useRef, useState } from "react";

const Tooltip = ({ data }) => {
  const containerRef = useRef(null);
  const [shiftLeft, setShiftLeft] = useState(false);

  const handlePosition = () => {
    const container = containerRef.current;
    const { right } = container.getBoundingClientRect();
    const sub = window.innerWidth - (right + 120);
    if (sub <= 0) {
      setShiftLeft(true);
    } else {
      setShiftLeft(false);
    }
  };

  return (
    <div onMouseEnter={handlePosition} ref={containerRef} className={classes.container}>
      <InfoIcon />
      <div className={`${classes.tooltip} ${shiftLeft && classes.left}`}>{data}</div>
    </div>
  );
};

export default Tooltip;
