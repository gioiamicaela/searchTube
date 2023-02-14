import React from "react";
import { getChannelId } from "../utils/httpClient";
import VideoCard from "./VideoCard";
import styles from "./VideosGrid.module.css";
import { Spinner } from "./Spinner";
import NoMatch from "./NoMatch";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import videoList from "../videos.json";
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

  const dispatch = useDispatch();

  const getChannel = async () => {
    console.log(searchText);
    // const authAxios = axios.create({
    //   params: {
    //     part: "contentDetails",
    //     key,
    //     forUsername: searchText,
    //   },
    // });
    try {
      // const response = await authAxios.get(searchURL + "channels");
      // if (response.data.items[0].id) {
      //   setChanneId(response.data.items[0].id);
      //   await getVideosList();
      //   dispatch(setVideoLength(videos.length));
      // }
    } catch (err) {
      console.error(err);
    }
  };

  const getVideosList = async () => {
    console.log(channelId);
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
      console.log(response.data.items);
      setVideos((prevVideos) => prevVideos.concat(response.data.items));
      response.data.nextPageToken
        ? setPage(response.data.nextPageToken)
        : setPage("");
      console.log("videos", videos);
    } catch (err) {
      console.error(err);
    }
  };

  React.useEffect(() => {
    setIsLoading(true);
    if (searchText) {
      getChannel();
    }
  }, [searchText, page]);

  if (!isLoading && videos.length === 0) {
    return <NoMatch />;
  }

  // Get current posts
  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideo = videoList.slice(indexOfFirstVideo, indexOfLastVideo);

  // Change page
  const paginate = (pageNumber) => {
    console.log("hola");
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="container px-0 minHeightContainer">
        {currentVideo.length > 0 && (
          <ul className={styles.movieGrid}>
            {currentVideo.map((video, index) => {
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
      <div className="row">
        <div className="col-12 d-flex justify-content-center">
          <Pagination
            videosPerPage={videosPerPage}
            totalVideos={videoList.length}
            paginate={paginate}
          />
        </div>
      </div>
    </>
  );
}
