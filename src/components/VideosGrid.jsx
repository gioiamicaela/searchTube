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
  // const [page, setPage] = React.useState(1);
  // const [hasMore, setHasMore] = React.useState(true);
  const searchURL = process.env.REACT_APP_URL;
  const key = process.env.REACT_APP_KEY;
  const [channelId, setChanneId] = React.useState("");

  const getChannel = async () => {
    const authAxios = axios.create({
      baseURL: searchURL + "channels",
      params: {
        part: "contentDetails",
        key,
        forUsername: searchText,
      },
    });
    try {
      const response = await authAxios.get(searchURL + "channels");
      console.log(response.data);
      setChanneId(
        response.data.items[0].contentDetails.relatedPlaylists.uploads
      );
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
        playlistId: channelId,
        order: "date",
      },
    });
    try {
      const response = await authAxios.get(searchURL + "search");
      setVideos(response.data.items);
    } catch (err) {
      console.error(err);
    }
  };

  React.useEffect(() => {
    setIsLoading(true);
    console.log(searchText);
    if (searchText) {
      getChannel();
      console.log(channelId);
    }
    if (channelId) {
      getVideosList();
    }
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
