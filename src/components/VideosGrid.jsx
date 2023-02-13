import React from "react";
import { getChannelId } from "../utils/httpClient";
import VideoCard from "./VideoCard";
import styles from "./VideosGrid.module.css";
import { Spinner } from "./Spinner";
import NoMatch from "./NoMatch";
import axios from "axios";

export default function VideosGrid({ searchText }) {
  const [videos, setVideos] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [page, setPage] = React.useState("");
  // const [hasMore, setHasMore] = React.useState(true);
  const searchURL = process.env.REACT_APP_URL;
  const key = process.env.REACT_APP_KEY;
  const [channelId, setChanneId] = React.useState("");

  const getChannel = async () => {
    const authAxios = axios.create({
      params: {
        part: "contentDetails",
        key,
        forUsername: searchText,
      },
    });
    try {
      const response = await authAxios.get(searchURL + "channels");
      setChanneId(response.data.items[0].id);
    } catch (err) {
      console.error(err);
    }
  };

  const getVideosList = async () => {
    const authAxios = axios.create({
      baseURL: searchURL + "search",
      params: {
        part: "snippet",
        key,
        channelId: channelId,
        order: "date",
        maxResults: "50",
        nextPageToken: page,
      },
    });
    try {
      const response = await authAxios.get(searchURL + "search");
      setVideos((prevVideos) => prevVideos.concat(response.data.items));
      setPage(response.data.nextPageToken);
    } catch (err) {
      console.error("err", err);
    }
  };

  React.useEffect(() => {
    setIsLoading(true);
    if (searchText) {
      getChannel();
    }
    if (channelId) {
      getVideosList();
    }
  }, [searchText, page]);

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
                  <VideoCard key={index} video={video} />;
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
}
