import React from "react";
import styles from "./Search.module.css";
import { setSearchText, clearSearchText } from "../redux/textSlice";
import { useSelector, useDispatch } from "react-redux";

export function Search() {
  const dispatch = useDispatch();
  const searchText = useSelector((state) => {
    return state.text.text;
  });
  const [text, setText] = React.useState("");
  // React.useEffect(() => {
  //   if (searchText) {
  //     setSearchText(searchText);
  //   } else {
  //     setSearchText("");
  //   }
  // }, [searchText]);
  const handleSetText = (e) => {
    e.preventDefault();
    dispatch(setSearchText(text));
    //dispatch(clearSearchText(""));
  };
  const handleTextChanged = (e) => {
    e.preventDefault();
    dispatch(setSearchText(e.target.value.toUpperCase()));
  };
  React.useEffect(() => {
    dispatch(clearSearchText(""));
  }, []);

  return (
    <div className="container mt-3">
      <form className={styles.searchContainer} onSubmit={handleSetText}>
        <div className={styles.searchBox}>
          <input
            className={styles.searchInput}
            type="text"
            value={text ? text : ""}
            onChange={(e) => setText(e.target.value.toUpperCase())}
            placeholder="Title"
            aria-label="Search Movies"
          />
          <i
            className="fa-solid fa-magnifying-glass"
            style={{
              position: "absolute",
              right: "8px",
              top: "8px",
              height: "100%",
            }}
          ></i>
        </div>
      </form>
      <div className="row">
        <h2 className={styles.movieTitle}>VIDEOS</h2>
        <hr className="mb-4 text-white-50"></hr>
      </div>
    </div>
  );
}
