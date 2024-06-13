"use client";

import css from "./VideoBlock.module.css";
import VideoPlayer from "../../../features/VideoPlayer/VideoPlayer";
import { useState, useEffect } from "react";

export default function VideoBlock() {
  const [videoSrc, setVideoSrc] = useState("");

  useEffect(() => {
    async function fetchVideoBlocks() {
      // setIsLoading(true);
      try {
        const response = await fetch("/api/video-block/get-video");
        if (response.ok) {
          const data = await response.json();
          const videoBlockData = data.data[3];

          setVideoSrc(videoBlockData.videoSrc);
        } else {
          console.error("Failed to fetch video blocks");
        }
      } catch (error) {
        console.error("Error fetching video blocks:", error);
      }
    }
    fetchVideoBlocks();
  }, []);

  return (
    <>
      <section className={css.videoSection}>
        <VideoPlayer src={videoSrc} />
      </section>
    </>
  );
}
