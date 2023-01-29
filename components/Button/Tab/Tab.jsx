import classes from "./Tab.module.css";
import { useEffect, useState } from "react";

const TabButton = ({ tabs, onClick }) => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    onClick(active);
  }, [active]);

  return (
    <div className={classes.container}>
      <div className={classes.tabs}>
        {tabs.map((tab, idx) => (
          <div
            onClick={() => {
              setActive(idx);
            }}
            key={idx}
            className={`${classes.tab} ${active === idx && classes.active}`}
          >
            {tab}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabButton;
