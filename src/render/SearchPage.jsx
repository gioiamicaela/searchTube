import React from "react";
import { Search } from "../components/Search";
import { useDebounce } from "../hooks/useDebounce";
import ScrollToTop from "react-scroll-to-top";
import VideosGrid from "../components/VideosGrid";
import { useSelector, useDispatch } from "react-redux";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Data from "../components/Data";

function SearchPage() {
  const searchText = useSelector((state) => {
    return state.text.text;
  });
  const dispatch = useDispatch();
  const debouncedSearch = useDebounce(searchText, 500);
  const [key, setKey] = React.useState("videos");

  return (
    <div className="container minHeightContainer">
      <Search />
      <div>
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="my-5"
        >
          <Tab eventKey="videos" title="Videos">
            <VideosGrid key={debouncedSearch} searchText={debouncedSearch} />
          </Tab>
          <Tab eventKey="data" title="Data">
            <Data searchText={debouncedSearch} />
          </Tab>
        </Tabs>
      </div>

      <ScrollToTop
        smooth
        color={"black"}
        style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
      />
    </div>
  );
}

export default SearchPage;
