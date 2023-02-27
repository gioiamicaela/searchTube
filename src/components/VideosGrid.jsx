import React from "react";
import VideoCard from "./VideoCard";
import styles from "./VideosGrid.module.css";
import NoMatch from "./NoMatch";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "./Pagination";

export default function VideosGrid() {
  const searchText = useSelector((state) => {
    return state.text.text;
  });
  const [videos, setVideos] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [page, setPage] = React.useState("");
  const searchURL = process.env.REACT_APP_URL;
  const key = process.env.REACT_APP_KEY;
  const [channelId, setChanneId] = React.useState("");

  const [currentPage, setCurrentPage] = React.useState(1);
  const [videosPerPage, setVideosPerPage] = React.useState(12);
  const [nextLoad, setNextLoad] = React.useState("");

  React.useEffect(() => {
    console.log(videos);
  }, [videos]);

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
      setIsLoading(false);
      if (response.data.pageInfo.totalResults > 0) {
        setChanneId(response.data.items[0].id);
      }
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
        pageToken: page,
      },
    });
    try {
      const response = await authAxios.get(searchURL + "search");
      setVideos((prevVideos) => prevVideos.concat(response.data.items));
      response.data.nextPageToken
        ? setPage(response.data.nextPageToken)
        : setPage("");
    } catch (err) {
      console.error(err);
    }
  };

  React.useEffect(() => {
    setIsLoading(true);
    if (searchText) {
      setVideos([]);
      getChannel();
    }
  }, [searchText]);

  React.useEffect(() => {
    setIsLoading(true);

    if (channelId) {
      getVideosList();
    }
  }, [channelId, , nextLoad]);

  if (!isLoading && videos.length === 0) {
    return <NoMatch />;
  }

  // Get current posts
  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideo = videos.slice(indexOfFirstVideo, indexOfLastVideo);

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const loadVideos = () => {
    setNextLoad(page);
  };

  return (
    <>
      <div className="container px-0 minHeightContainer">
        {currentVideo.length > 0 && (
          <>
            <ul className={styles.videoGrid}>
              {currentVideo.map((video, index) => {
                return (
                  <li
                    style={{ listStyle: "none" }}
                    className={styles.videoCard}
                    key={index}
                  >
                    <VideoCard key={index} video={video} />;
                  </li>
                );
              })}
            </ul>
            <div className="row">
              <div className="col-12 d-flex justify-content-center">
                <Pagination
                  videosPerPage={videosPerPage}
                  totalVideos={videos.length}
                  paginate={paginate}
                  loadVideos={loadVideos}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
