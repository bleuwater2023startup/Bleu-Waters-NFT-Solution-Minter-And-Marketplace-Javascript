import { useState } from "react";
import SearchIcon from "../../assets/icon-search.svg";
import classes from "./Search.module.css";

const Search = ({ faint, onChange, placeholder, accent }) => {
  const [value, setValue] = useState("");
  const handleChange = (e) => {
    setValue(e.target.value);
    onChange(e);
  };
  return (
    <div className={`${classes.container} ${accent && classes.accent}`}>
      <SearchIcon className={`${classes.searchIcon} ${faint && classes.faint}`} />
      <input type="text" placeholder={placeholder} value={value} onChange={handleChange} />
    </div>
  );
};

export default Search;
