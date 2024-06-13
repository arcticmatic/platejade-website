"use client";

import React, { useRef, useState, useEffect } from "react";
import css from "./VideoPlayer.module.css";
import PlatejadeVideo from "../../components/images/PlatejadeVideo.mp4";
import Play from "../../components/images/Play.svg";
import Pause from "../../components/images/Pause.svg";
import Image from "next/image";

const VideoPlayer = ({ src }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className={css.videoPlayer}>
      <video
        className={css.video}
        preload="auto"
        ref={videoRef}
        width="834"
        height="503"
        poster="../images/VideoPreview.jpeg"
        src={src}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        controls={true}
      ></video>
      <button className={css.playPause} onClick={togglePlay}>
        {!isPlaying && <Image className={css.playIcon} src={Play} />}
      </button>
    </div>
  );
};

export default VideoPlayer;
