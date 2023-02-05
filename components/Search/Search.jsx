import { useState } from "react";
import SearchIcon from "../../assets/icon-search.svg";
import classes from "./Search.module.css";

const Search = ({ faint, onChange, placeholder, accent, onClick, disabled, autoFocus }) => {
  const [value, setValue] = useState("");
  const handleChange = (e) => {
    setValue(e.target.value);
    onChange(e);
  };
  return (
    <div
      onClick={onClick}
      className={`${classes.container} ${accent && classes.accent} ${
        disabled && classes.disabled
      }`}>
      <SearchIcon className={`${classes.searchIcon} ${faint && classes.faint}`} />
      <input
        disabled={disabled}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        autoFocus={autoFocus}
      />
    </div>
  );
};

export default Search;
