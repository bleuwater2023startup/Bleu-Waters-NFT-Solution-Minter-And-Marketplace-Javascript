import Button from "../../Button/Button";
import classes from "./ApproveExternalTransferModal.module.css";

const ApproveExternalTransferModal = ({ onClose, onApprove }) => {
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.heading}>Approve this NFT to be traded in other marketplaces.</div>
        <div className={classes.warning}>Please note that this action cannot be reversed.</div>

        <div className={classes.buttonContainer}>
          <div onClick={onClose} className={classes.button}>
            <Button height={1} dark outline>
              Cancel
            </Button>
          </div>
          <div onClick={onApprove} className={classes.button}>
            <Button height={1} accent>
              Approve
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApproveExternalTransferModal;
