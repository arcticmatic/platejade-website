import React, { useRef, useState } from "react";
import mobileVideoPreview from "../../components/images/mobileVideoPreview.jpg";
import css from "./VideoPlayer.module.css";

const VideoPlayer = ({ src, className }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleSeek = (e) => {
    const newTime = e.target.value;
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  return (
    <div className={css.videoPlayer}>
      <video
        className={className}
        ref={videoRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
      ></video>
      <div className="controls">
        <button onClick={togglePlay}>{isPlaying ? "Pause" : "Play"}</button>
        <input
          type="range"
          min={0}
          max={videoRef.current && videoRef.current.duration}
          value={currentTime}
          onChange={handleSeek}
        />
        <span>{currentTime.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default VideoPlayer;
