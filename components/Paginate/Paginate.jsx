import { useEffect, useState } from "react";
import Control from "./Control/Control";

const Paginate = ({ items, countPerPage = 20, renderItem, offsetHeight }) => {
  const [state, setState] = useState({
    currentPage: 1,
    paginate: {},
    currentPageValue: 1,
  });

  const { paginate, currentPage, currentPageValue } = state;

  const handleSetState = (payload) => {
    setState((states) => ({ ...states, ...payload }));
  };

  const handlePrev = () => {
    if (currentPage <= 1) {
      handleSetState({ currentPage: Object.keys(paginate).length });
    } else {
      handleSetState({ currentPage: currentPage - 1 });
    }
    document.documentElement.scrollTop = offsetHeight;
  };

  const handleNext = () => {
    if (currentPage >= Object.keys(paginate).length) {
      handleSetState({ currentPage: 1 });
    } else {
      handleSetState({ currentPage: currentPage + 1 });
    }
    document.documentElement.scrollTop = offsetHeight;
  };

  const handleGoto = () => {
    if (currentPageValue < 1 || currentPageValue > Object.keys(paginate).length)
      return;
    handleSetState({ currentPage: Number(currentPageValue) });
    document.documentElement.scrollTop = offsetHeight;
  };

  useEffect(() => {
    const numberOfPages = Math.ceil(items.length / countPerPage);
    let startIndex = 0;
    let endIndex = startIndex + countPerPage;
    const paginate = {};
    for (let i = 1; i <= numberOfPages; i += 1) {
      paginate[i] = items.slice(startIndex, endIndex);
      startIndex = endIndex;
      endIndex = startIndex + countPerPage;
    }
    handleSetState({ paginate });
  }, [items]);

  return (
    <>
      {Object.keys(paginate).length && renderItem(paginate[currentPage])}
      {Object.keys(paginate).length ? (
        <Control
          controProps={{
            handleNext,
            handlePrev,
            handleGoto,
            ...state,
            handleSetState,
          }}
        />
      ) : null}
    </>
  );
};

export default Paginate;
