import React, { useRef, useState, useEffect } from "react";
import css from "./VideoPlayer.module.css";
import PlateJadeVideo from "../../components/images/PlateJadeVideo.mp4";
import Play from "../../components/images/Play.svg";
import Pause from "../../components/images/Pause.svg";
import Image from "next/image";

const VideoPlayer = () => {
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
        ref={videoRef}
        width="834"
        height="503"
        poster="../images/DesktopVideoPoster.png"
        src={PlateJadeVideo}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        controls={true}
      ></video>
      <button className={css.playPause} onClick={togglePlay}>
        {!isPlaying && <Image src={Play} />}
      </button>
    </div>
  );
};

export default VideoPlayer;
