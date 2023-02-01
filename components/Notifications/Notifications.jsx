import classes from "./Notifications.module.css";
import SuccessIcon from "../../assets/n-success.svg";
import ErrorIcon from "../../assets/n-error.svg";
import WarningIcon from "../../assets/n-warning.svg";
import InfoIcon from "../../assets/n-info.svg";
import { useContext, useEffect, useState } from "react";
import { StateContext } from "../../context/state.context";
import { setNotification } from "../../context/state.actions";
import CloseIcon from "../../assets/icon-close.svg";

const Notifications = () => {
  const { notification, dispatch } = useContext(StateContext);
  const [isVisible, setIsVisible] = useState(false);

  const { type, message } = notification;

  const icons = {
    success: <SuccessIcon className={classes.icon} />,
    error: <ErrorIcon className={classes.icon} />,
    warning: <WarningIcon className={classes.icon} />,
    info: <InfoIcon className={classes.icon} />,
  };

  let timerId;

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      timerId = setTimeout(() => {
        setIsVisible(false);
        dispatch(setNotification({}));
      }, 6500);
    }
  }, [notification]);

  return (
    <div className={classes.container}>
      {isVisible && (
        <div className={classes.notificationContainer}>
          <div>{icons[type]}</div>
          <div className={classes.text}>
            {message.substring(0, 60)}
            {message.length > 60 ? "..." : ""}
          </div>
          <div className={`${classes.line} ${classes[type]} ${isVisible && classes.active}`}></div>
          <div
            onClick={() => {
              clearInterval(timerId);
              setIsVisible(false);
            }}
            className={classes.closeIcon}>
            <CloseIcon />
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;
