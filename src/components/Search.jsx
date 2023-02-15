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
  const handleSetText = (e) => {
    e.preventDefault();
    dispatch(setSearchText(text));
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
            aria-label="Search Channel"
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
      <div className="row mt-5">
        <h2 className={styles.channelTitle}>CHANNELS</h2>
        <hr className="mb-4 text-white-50"></hr>
      </div>
    </div>
  );
}
