import React from "react";
import styles from "./Search.module.css";
// import { setSearchText, clearSearchText } from "../redux/textSlice";
// import { useSelector, useDispatch } from "react-redux";

export function Search() {
  // const dispatch = useDispatch();
  const [searchText, setSearchText] = React.useState("");
  // const searchText = useSelector((state) => {
  //   return state.text.text;
  // });
  React.useEffect(() => {
    if (searchText) {
      setSearchText(searchText);
    } else {
      setSearchText("");
    }
  }, [searchText]);
  const handleSetText = (e) => {
    e.preventDefault();
    setSearchText("");
  };
  const handleTextChanged = (e) => {
    e.preventDefault();
    setSearchText(e.target.value.toUpperCase());
  };
  React.useEffect(() => {
    setSearchText("");
  }, []);

  return (
    <div className="container mt-3">
      <form className={styles.searchContainer} onSubmit={handleSetText}>
        <div className={styles.searchBox}>
          <input
            className={styles.searchInput}
            type="text"
            value={searchText ? searchText : ""}
            onChange={handleTextChanged}
            placeholder="Title"
            aria-label="Search Movies"
          />
          <i class="fa-solid fa-magnifying-glass"></i>
          {/* <FaSearch
            className={styles.searchButton}
            size={20}
            style={{ backgroundColor: "none" }}
          /> */}
        </div>
      </form>
      <div className="row">
        <h2 className={styles.movieTitle}>VIDEOS</h2>
        <hr className="mb-4 text-white-50"></hr>
      </div>
    </div>
  );
}
