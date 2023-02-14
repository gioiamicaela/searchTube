import React from "react";
import { Search } from "../components/Search";
import { useDebounce } from "../hooks/useDebounce";
import ScrollToTop from "react-scroll-to-top";
import VideosGrid from "../components/VideosGrid";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "../components/Pagination";
import { setCurrentPage } from "../redux/paginationSlice";

function SearchPage() {
  const searchText = useSelector((state) => {
    return state.text.text;
  });
  // const videosLength = useSelector((state) => {
  //   return state.video;
  // });
  const dispatch = useDispatch();
  const debouncedSearch = useDebounce(searchText, 500);

  return (
    <div>
      <Search />
      <VideosGrid key={debouncedSearch} searchText={debouncedSearch} />

      <ScrollToTop
        smooth
        color={"black"}
        style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
      />
    </div>
  );
}

export default SearchPage;
