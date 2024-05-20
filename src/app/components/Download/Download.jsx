"use client";

import css from "./Download.module.css";
import { useState } from "react";
import Image from "next/image";
import iconClose from "../../../../public/assets/images/iconClose.svg";
import iconOpen from "../../../../public/assets/images/iconOpen.svg";
import { AppStoreIcon } from "../../../../public/assets/images/icons/AppStoreIcon";
import { GooglePlayIcon } from "../../../../public/assets/images/icons/GooglePlay";

export default function Download(props) {
  const { downloadWhiteSection } = props;

  return (
    <>
      <section
        className={
          downloadWhiteSection ? css.downloadSectionWhite : css.downloadSection
        }
      >
        <h2
          className={
            downloadWhiteSection ? css.downloadTitleBlack : css.downloadTitle
          }
        >
          All you need just in one app
        </h2>
        <p
          className={
            downloadWhiteSection
              ? css.downloadDescriptionBlack
              : css.downloadDescription
          }
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra nunc
          ante velit vitae. Est tellus vitae, nullam lobortis enim.
        </p>
        <div className={css.downloadIconsThumb}>
          <AppStoreIcon className={css.downloadAppStoreIcon} />
          <GooglePlayIcon className={css.downloadGooglePlayIcon} />
        </div>
      </section>
    </>
  );
}
