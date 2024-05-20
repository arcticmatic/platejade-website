"use client";

import css from "./About.module.css";
import Image from "next/image";
import { PlayIcon } from "../../images/icons/PlayIcon";
import { AppStoreIcon } from "../../images/icons/AppStoreIcon";
import { GooglePlayIcon } from "../../images/icons/GooglePlay";
import { Montserrat } from "next/font/google";
import ScreenBackground from "../../images/ScreenBackground.png";
import ScreenContent from "../../images/ScreenContent.png";
import sun from "../../images/sun.svg";
import stars from "../../images/stars.svg";
import map from "../../images/map.svg";
import { useState, useEffect } from "react";
import ApplePresentation from "../../images/video/ApplePresentation.mp4";
import VideoPlayer from "@/app/features/VideoPlayer/VideoPlayer";
import mobileVideoPreview from "../../images/MobileVideoPreview.jpg";
import QR from "../../images/QR.png";
import DesktopVideoPoster from "../../images/DesktopVideoPoster.png";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function About() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const aboutWorkItems = [
    {
      id: 1,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
      image: sun,
    },
    {
      id: 2,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
      image: map,
    },
    {
      id: 3,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
      image: stars,
    },
  ];

  const slides = [
    {
      id: 1,
      imageSrc: ScreenContent,
      backgroundSrc: ScreenBackground,
      title: "Lorem ipsum dolor sit amet consectetur ",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    // {
    //   id: 2,
    //   imageSrc: sun,
    //   backgroundSrc: ScreenBackground,
    //   title: "Test",
    //   description: "Test",
    // },
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlide((prev) => {
        return prev + 1 === slides.length ? 0 : prev + 1;
      });
    }, 8000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <>
      <section className={css.aboutSection}>
        <div className={css.aboutThumb}>
          {slides.map((slide, index) => (
            <>
              <div
                key={slide.id}
                className={
                  index === currentSlide ? css.aboutTextThumb : css.hiddenSlide
                }
              >
                <p className={css.aboutTitle}>{slide.title}</p>
                <p className={css.aboutDescription}>{slide.description}</p>

                <button className={css.aboutStartBtn}>Get Started</button>
                <button className={css.aboutWorkBtn}>
                  <PlayIcon className={css.aboutWorkBtnIcon} /> How it works
                </button>

                <div className={css.aboutDownloadThumbDesktop}>
                  <p className={css.aboutDownloadText}>
                    Download app from App Store or Google Play
                  </p>
                  <div className={css.qrCodeThumb}>
                    <div>
                      <Image alt="download platejade" src={QR} />
                    </div>
                    <div className={css.aboutDownloadIconsThumb}>
                      <AppStoreIcon className={css.downloadAppStoreIcon} />
                      <GooglePlayIcon className={css.downloadGooglePlayIcon} />
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={
                  index === currentSlide
                    ? css.aboutScreensThumb
                    : css.hiddenSlide
                }
              >
                <div className={css.aboutImagesThumb}>
                  <Image
                    className={css.aboutScreenBg}
                    src={slide.backgroundSrc}
                    alt={`Slide ${index + 1}`}
                  />
                  <Image
                    className={css.aboutScreen}
                    src={slide.imageSrc}
                    alt={`Slide ${index + 1}`}
                  />
                  <div className={css.aboutImagesOverlayThumb}>
                    <Image
                      className={css.aboutScreenBg}
                      src={slide.backgroundSrc}
                      alt={`Slide ${index + 1}`}
                    />
                    <Image
                      className={css.aboutScreen}
                      src={slide.imageSrc}
                      alt={`Slide ${index + 1}`}
                    />
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>

        <div className={css.aboutDownloadTextThumb}>
          <p className={css.aboutDownloadText}>
            Download app from App Store or Google Play
          </p>
          <div className={css.aboutDownloadIcons}>
            <AppStoreIcon className={css.downloadAppStoreIcon} />
            <GooglePlayIcon className={css.downloadGooglePlayIcon} />
          </div>
        </div>
      </section>
      <section className={css.aboutVideoSection}>
        <div>
          {/* <VideoPlayer className={css.aboutVideo} src={ApplePresentation} /> */}
          {/* <video className={css.aboutVideo}>
            <source src={ApplePresentation} type="video/mp4" />
          </video> */}
          <div className={css.videoThumb}>
            <Image
              className={css.aboutVideo}
              alt="mobile video preview"
              src={mobileVideoPreview}
            />
          </div>
          <div className={css.aboutVideoThumb}>
            <p className={css.aboutVideoTitle}>
              Get and try Plate Jade app for free right now
            </p>

            <div className={css.aboutVideoDescriptionThumb}>
              <p className={css.aboutVideoDescription}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <p className={css.aboutVideoDescription}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem
                ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <div className={css.aboutDownloadIconsDesktop}>
                <AppStoreIcon className={css.downloadAppStoreIcon} />
                <GooglePlayIcon className={css.downloadGooglePlayIcon} />
              </div>
            </div>
          </div>
          <div className={css.aboutDownloadIcons}>
            <AppStoreIcon className={css.downloadAppStoreIcon} />
            <GooglePlayIcon className={css.downloadGooglePlayIcon} />
          </div>
        </div>
        <div className={css.aboutVideoThumbDesktop}>
          <Image
            className={css.aboutVideo}
            alt="mobile video preview"
            src={DesktopVideoPoster}
          />
        </div>
      </section>
      <section>
        <div className={css.aboutWorkThumb}>
          <h2 className={css.aboutWorkTitle}>How it works</h2>
          <ul className={css.aboutWorkList}>
            {aboutWorkItems.map((item) => (
              <li key={item.id} className={css.aboutWorkItem}>
                <Image className={css.aboutWorkImage} src={item.image} />
                <p className={css.aboutWorkText}>{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
