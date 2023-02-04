import { useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import { GET_SEARCH } from "../../utils/subgraphQuery";
import Search from "../Search/Search";
import classes from "./GlobalSearch.module.css";
import { categories, handleNavigate, params } from "./GlobalSearch.script";
import CircularProgress from "@mui/material/CircularProgress";

const GlobalSearch = ({ toggleSearch, handleClose, setIsActive }) => {
  const router = useRouter();
  const [getSearch, { error, loading, data }] = useLazyQuery(GET_SEARCH);
  const [category, setCategory] = useState("");

  const handleSearchChange = (e) => {
    let value = e.target.value;
    if (!value) return setCategory("Search");
    getSearch({ variables: { _value: value.toLowerCase() }, notifyOnNetworkStatusChange: true });
  };

  const getCategory = () => {
    const res = categories.find((c) => data[c].length);
    console.log(data[res]);
    setCategory(res);
  };

  useEffect(() => {
    if (!data) return;
    getCategory();
  }, [data, loading, error]);

  return (
    <>
      {toggleSearch ? (
        <div onClick={handleClose} className={classes.mainSearchContainer}>
          <div
            onMouseEnter={() => setIsActive(true)}
            onMouseLeave={() => setIsActive(false)}
            className={classes.mainSearchWrapper}>
            <Search onChange={handleSearchChange} accent autoFocus />
            <div className={classes.searchResult}>
              <div className={classes.category}>{category}</div>
              <div className={classes.resultContainer}>
                {error ? (
                  <div className={classes.error}>
                    Failed to fetch results, please check your network and try again.
                  </div>
                ) : loading ? (
                  <div className={classes.loading}>
                    <CircularProgress style={{ width: "1em", height: "1em" }} />
                  </div>
                ) : data && data[category] ? (
                  data[category].map((res, idx) => (
                    <div
                      onClick={async () => {
                        handleClose("--force");
                        handleNavigate({ category, router, data: res });
                      }}
                      className={classes.result}
                      key={idx}>
                      {res[params[category]]}
                    </div>
                  ))
                ) : (
                  <div>No results</div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default GlobalSearch;
