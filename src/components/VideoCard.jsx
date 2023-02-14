import React from "react";
import styles from "./VideoCard.module.css";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";

function VideoMovie({ video }) {
  return (
    <Link to={"/" + video.id}>
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${video.id.videoId}`}
        alt={video.snippet.title}
        className={styles.movieImage}
        width="100%"
        height="100%"
        controls
        origin="http://localhost:3000/"
      />
    </Link>
  );
}

export default VideoMovie;
