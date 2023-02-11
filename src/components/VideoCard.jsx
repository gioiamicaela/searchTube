import React from "react";
import styles from "./VideoCard.module.css";
import { Link } from "react-router-dom";

function VideoMovie({ video }) {
  return (
    <Link to={"/" + video.id}>
      <video
        // src={imageURL}
        // alt={movie.title}
        className={styles.movieImage}
        width={230}
        height={345}
      />
    </Link>
  );
}

export default VideoMovie;
