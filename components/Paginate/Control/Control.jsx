import classes from "./Control.module.css";
import ChevronIcon from "../../../assets/icon-chevron.svg";

const Control = ({ controProps }) => {
  const {
    handleGoto,
    handleNext,
    handlePrev,
    currentPage,
    currentPageValue,
    paginate,
    handleSetState,
  } = controProps;
  return (
    <div className={classes.paginate}>
      <ChevronIcon onClick={handlePrev} className={classes.iconLeft} />
      <div className={classes.pageCount}>
        {currentPage} of {Object.keys(paginate).length}
      </div>
      <ChevronIcon onClick={handleNext} className={classes.iconRight} />
      <div className={classes.goBtn} onClick={handleGoto}>
        Goto
      </div>
      <input
        min={1}
        max={Object.keys(paginate).length}
        type="number"
        value={currentPageValue}
        onChange={(e) =>
          handleSetState({
            currentPageValue: e.target.value >= 1 ? e.target.value : "",
          })
        }
      />
    </div>
  );
};

export default Control;
