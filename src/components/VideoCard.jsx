import React from "react";
import styles from "./VideoCard.module.css";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";
import axios from "axios";

function VideoMovie({ video }) {
  const searchURL = process.env.REACT_APP_URL;
  const key = process.env.REACT_APP_KEY;
  const [videoStatistics, setVideoStatistics] = React.useState([]);

  const getVideoInfo = async () => {
    const videoId = video.id.videoId;
    const authAxios = axios.create({
      baseURL: searchURL + "videos",
      params: {
        part: "statistics",
        key,
        id: videoId,
      },
    });
    try {
      const response = await authAxios.get(searchURL + "videos");
      setVideoStatistics(response.data.items[0].statistics);
    } catch (err) {
      console.error(err);
    }
  };

  React.useEffect(() => {
    if (video) {
      getVideoInfo();
    }
  }, [video]);

  return (
    <>
      <div className="container h-100">
        <div className="row h-100">
          <div className="col-12">
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${video.id.videoId}`}
              alt={video.snippet.title}
              className={styles.movieImage}
              width="100%"
              height="100%"
              controls
              origin="http://localhost:3000/"
            />
          </div>
          <div className="row d-flex flex-column justify-content-center">
            <div className="col-12">
              <h4 style={{ color: "white", fontSize: "1rem" }}>
                <strong>Name:</strong> {video.snippet.title}
              </h4>
              <h4 style={{ color: "white", fontSize: "1rem" }}>
                <strong>Published at:</strong> {video.snippet.publishedAt}
              </h4>
              <h4 style={{ color: "white", fontSize: "1rem" }}>
                <strong>Visits: </strong>
                {videoStatistics.viewCount}
              </h4>
              {/* <h4 style={{ color: "white", fontSize: "1rem" }}>
                etag: {video.etag}
              </h4> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default VideoMovie;
