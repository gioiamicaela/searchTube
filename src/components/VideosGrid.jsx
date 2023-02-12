import React from "react";
import { getChannelId } from "../utils/httpClient";
import VideoCard from "./VideoCard";
import styles from "./VideosGrid.module.css";
import { Spinner } from "./Spinner";
import NoMatch from "./NoMatch";

export default function VideosGrid({ searchText }) {
  const [videos, setVideos] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  // const [page, setPage] = React.useState(1);
  // const [hasMore, setHasMore] = React.useState(true);

  React.useEffect(() => {
    setIsLoading(true);
    getChannelId("channels", searchText).then((data) => {
      setVideos((prevVideos) => prevVideos.concat(data.results));
      // setHasMore(data.page < data.total_pages);
      setIsLoading(false);
    });
  }, [searchText]);

  if (!isLoading && videos.length === 0) {
    return <NoMatch />;
  }

  return (
    <>
      <div className="container px-0 minHeightContainer">
        {videos.length > 0 && (
          <ul className={styles.movieGrid}>
            {videos.map((video, index) => {
              return (
                <li
                  style={{ listStyle: "none" }}
                  className={styles.movieCard}
                  key={index}
                >
                  <VideoCard key={video.id} video={video} />;
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
}
