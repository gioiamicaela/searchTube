import { Search } from "../components/Search";
import { useDebounce } from "../hooks/useDebounce";
import ScrollToTop from "react-scroll-to-top";
import VideosGrid from "../components/VideosGrid";

function SearchPage({ searchText }) {
  const debouncedSearch = useDebounce(searchText, 300);
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
