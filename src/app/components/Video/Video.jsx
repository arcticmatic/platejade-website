"use client";

import css from "./Video.module.css";
import Image from "next/image";
import mobileVideoPreview from "../../components/images/mobileVideoPreview.jpg";
import DesktopVideoPoster from "../images/DesktopVideoPoster.png";

export default function Video() {
  return (
    <>
      <section className={css.videoSection}>
        <div className={css.videoThumb}>
          <Image
            className={css.aboutVideo}
            alt="mobile video preview"
            src={mobileVideoPreview}
          />
        </div>
        <div className={css.aboutVideoThumbDesktop}>
          <Image
            className={css.aboutVideo}
            alt="mobile video preview"
            src={DesktopVideoPoster}
          />
        </div>
      </section>
    </>
  );
}
