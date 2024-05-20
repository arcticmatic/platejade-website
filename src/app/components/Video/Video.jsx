"use client";

import css from "./Video.module.css";
import Image from "next/image";
import MobileVideoPreview from "../../components/images/MobileVideoPreview.jpg";
import DesktopVideoPoster from "../images/DesktopVideoPoster.png";

export default function Video() {
  return (
    <>
      <section className={css.videoSection}>
        <div className={css.videoThumb}>
          <Image
            className={css.aboutVideo}
            alt="mobile video preview"
            src={MobileVideoPreview}
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
