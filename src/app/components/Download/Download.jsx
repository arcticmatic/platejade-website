"use client";

import css from "./Download.module.css";
import { useState, useEffect } from "react";
import Image from "next/image";
import iconClose from "../images/iconClose.svg";
import iconOpen from "../images/iconOpen.svg";
import { AppStoreIcon } from "../images/icons/AppStoreIcon";
import { GooglePlayIcon } from "../images/icons/GooglePlay";
import Link from "next/link";

export default function Download(props) {
  const { downloadWhiteSection } = props;
  const [downloadItem, setDownloadItem] = useState([]);

  useEffect(() => {
    const fetchDownload = async () => {
      try {
        const response = await fetch("/api/download/get-download");
        if (response.ok) {
          const data = await response.json();
          setDownloadItem(data.data);
        } else {
          console.error("Failed to fetch work items");
        }
      } catch (error) {
        console.error("Error occurred while fetching work items:", error);
      }
    };

    fetchDownload();
  }, []);

  return (
    <>
      <section
        className={
          downloadWhiteSection ? css.downloadSectionWhite : css.downloadSection
        }
      >
        {downloadItem.map((item, index) => (
          <div key={index}>
            <h2
              className={
                downloadWhiteSection
                  ? css.downloadTitleBlack
                  : css.downloadTitle
              }
            >
              {item.title}
            </h2>
            <p
              className={
                downloadWhiteSection
                  ? css.downloadDescriptionBlack
                  : css.downloadDescription
              }
            >
              {item.text}
            </p>
            <div className={css.downloadIconsThumb}>
              <Link target="_blank" href={item.appleLink}>
                <AppStoreIcon className={css.downloadAppStoreIcon} />
              </Link>

              <Link href={item.googleLink}>
                <GooglePlayIcon className={css.downloadGooglePlayIcon} />
              </Link>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
