import styles from "./WavyBg.module.css";
import { animated, useSpring } from "react-spring";
import { useState } from "react";

const WavyBg = () => {
  const [flip, setFlip] = useState(true);

  const { light } = useSpring({
    light: 1,
    from: { light: 0 },
    reset: false,
    reverse: flip,
    delay: 2000,
    onRest: () => setFlip(!flip),
    config: { duration: 5000 },
  });

  return (
    <animated.div
      style={{
        background: light.to([0, 1], [100, 200]).to(
          (n) => ` repeating-linear-gradient(
        30deg,
        rgb(123, 213, 245) 100%,
        rgb(120, 127, 246) ${n.toFixed(2)}%,
        rgb(74, 222, 222) 200%
      )`
        ),
      }}
      className={styles.container}
    />
  );
};

export default WavyBg;
