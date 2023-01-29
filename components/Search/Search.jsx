import SearchIcon from "../../assets/icon-search.svg";
import classes from "./Search.module.css";

const Search = ({ faint, onChange, value, placeholder, accent }) => {
  return (
    <div className={`${classes.container} ${accent && classes.accent}`}>
      <SearchIcon
        className={`${classes.searchIcon} ${faint && classes.faint}`}
      />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Search;
