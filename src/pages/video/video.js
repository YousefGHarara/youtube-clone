import { useParams } from "react-router-dom";
import PlayVideo from "../../components/playVideo/playVideo";
import Recommended from "../../components/recommended/recommended";
import "./video.css";

import React from "react";

const Video = () => {

  // const {videoId} = useParams()

  return (
    <div className="play-container">
      <PlayVideo />
      <Recommended />
    </div>
  );
};

export default Video;
