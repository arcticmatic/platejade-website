"use client";

import css from "./Video.module.css";
import VideoPlayer from "../../features/VideoPlayer/VideoPlayer";

export default function Video() {
  return (
    <>
      <section className={css.videoSection}>
        <VideoPlayer />
      </section>
    </>
  );
}
