"use client";

import css from "./About.module.css";
import Image from "next/image";
import { PlayIcon } from "../images/icons/PlayIcon";
import Pause from "../images/Pause.svg";
import { AppStoreIcon } from "../images/icons/AppStoreIcon";
import { GooglePlayIcon } from "../images/icons/GooglePlay";
import { Montserrat } from "next/font/google";
import ScreenBackground from "../images/ScreenBackground.png";
import ScreenContent from "../images/ScreenContent.png";
import sun from "../images/sun.svg";
import stars from "../images/stars.svg";
import map from "../images/map.svg";
import { useState, useEffect } from "react";
import VideoPlayer from "@/app/features/VideoPlayer/VideoPlayer";
import mobileVideoPreview from "../images/mobileVideoPreview.jpg";
import QR from "../images/QR.png";
import DesktopVideoPoster from "../images/DesktopVideoPoster.png";
import AboutMockup from "../images/AboutMockup.png";
import AboutBgMockup from "../images/AboutBgMockup.png";

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

      backgroundSrc: AboutBgMockup,
      backgroundSrcSecond: AboutMockup,
      title:
        "Discover Plate Jade: Revolutionising Car License Plate and Frame Customization with Augmented Reality",
      description:
        "Plate Jade is an innovative app that uses augmented reality to help you explore, customise, and order license plates and frames effortlessly. Download Plate Jade now and bring your vehicle personalization to the next level!",
    },
    {
      id: 2,
      imageSrc: "",
      backgroundSrc: AboutMockup,
      backgroundSrcSecond: AboutBgMockup,
      title:
        "Discover Plate Jade: Revolutionising Car License Plate and Frame Customization with Augmented Reality",
      description:
        "Plate Jade is an innovative app that uses augmented reality to help you explore, customise, and order license plates and frames effortlessly. Download Plate Jade now and bring your vehicle personalization to the next level!",
    },
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlide((prev) => {
        return prev + 1 === slides.length ? 0 : prev + 1;
      });
    }, 800000);
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

                  <div className={css.aboutImagesOverlayThumb}>
                    <Image
                      className={css.aboutScreenBg}
                      src={slide.backgroundSrcSecond}
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
          <div className={css.videoThumb}>
            <VideoPlayer />
          </div>
          <div className={css.aboutVideoThumb}>
            <p className={css.aboutVideoTitle}>
              Download and Try Plate Jade App for Free Right Now
            </p>

            <div className={css.aboutVideoDescriptionThumb}>
              <p className={css.aboutVideoDescription}>
                Experience the ultimate convenience and creativity in vehicle
                personalization with Plate Jade. Our app offers a seamless way
                to explore, customise, and order license plates and frames using
                state-of-the-art augmented reality technology. Whether you're
                looking to see how a specific license plate design looks on your
                car, or you want to find the perfect frame that complements your
                style, Plate Jade has you covered.
              </p>
              <p className={css.aboutVideoDescription}>
                With Plate Jade, you can enjoy a hassle-free and interactive
                experience right from your mobile device. Download the app for
                free today and take advantage of its powerful features to
                transform your vehicle’s appearance. Join our growing community
                of satisfied users who are discovering the ease and fun of
                individualising their cars with Plate Jade. Don’t miss out—get
                Plate Jade now and start your vehicle personalization journey!
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
          <VideoPlayer />
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
