import Link from "next/link";
import Button from "../../Button/Button";
import classes from "./ResumeSessionModal.module.css";

const ResumeSessionModal = ({ session, onClose }) => {
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.heading}>Resume previous session</div>
        <div className={classes.warning}>
          Please note that your session cannot be restored once discarded.
        </div>

        <div className={classes.buttonContainer}>
          <div onClick={onClose} className={classes.button}>
            <Button height={1} dark outline>
              Discard
            </Button>
          </div>
          <Link href={session} className={classes.button}>
            <Button height={1} accent>
              Resume
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResumeSessionModal;
