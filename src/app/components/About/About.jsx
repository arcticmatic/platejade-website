"use client";

import css from "./About.module.css";
import Image from "next/image";
import { PlayIcon } from "../images/icons/PlayIcon";
import Pause from "../images/Pause.svg";
import { AppStoreIcon } from "../images/icons/AppStoreIcon";
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
import GooglePlayIcon from "../images/GooglePlayIcon.svg";
import Link from "next/link";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function About() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [subText, setSubText] = useState("");
  const [secondSubText, setSecondSubText] = useState([]);
  const [aboutWorkItems, setAboutWorkItems] = useState([]);
  const [videoSrc, setVideoSrc] = useState("");
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await fetch("/api/about/get-about");
        if (response.ok) {
          const data = await response.json();
          setSlides(data.slides);
        } else {
          console.error("Failed to fetch slides");
        }
      } catch (error) {
        console.error("Error fetching slides:", error);
      }
    };

    fetchSlides();
  }, []);

  useEffect(() => {
    async function fetchVideoBlocks() {
      // setIsLoading(true);
      try {
        const response = await fetch("/api/video-block/get-video");
        if (response.ok) {
          const data = await response.json();
          const videoBlockData = data.data[0];
          setTitle(videoBlockData.title);
          setText(videoBlockData.text);
          setSubText(videoBlockData.subText);
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

  useEffect(() => {
    const fetchWorkItems = async () => {
      try {
        const response = await fetch("/api/about/how-it-works/get-work-items");
        if (response.ok) {
          const data = await response.json();
          setAboutWorkItems(data.data);
        } else {
          console.error("Failed to fetch work items");
        }
      } catch (error) {
        console.error("Error occurred while fetching work items:", error);
      }
    };

    fetchWorkItems();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlide((prev) => {
        return prev + 1 === slides.length ? 0 : prev + 1;
      });
    }, 8000);
    return () => {
      clearInterval(intervalId);
    };
  }, [slides]);

  return (
    <>
      <section id="about" className={css.aboutSection}>
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
                {slide.description.map((item) => (
                  <p className={css.aboutDescription}>{item}</p>
                ))}

                <button className={css.aboutStartBtn}>Get Started</button>
                <Link href="/#how-works">
                  <button className={css.aboutWorkBtn}>
                    <PlayIcon className={css.aboutWorkBtnIcon} /> How it works
                  </button>
                </Link>
                <div className={css.aboutDownloadThumbDesktop}>
                  <p className={css.aboutDownloadText}>
                    {/* Download app from App Store or Google Play */}
                  </p>
                  <div className={css.qrCodeThumb}>
                    <div>
                      <Image alt="download platejade" src={QR} />
                    </div>
                    <div className={css.aboutDownloadIconsThumb}>
                      <AppStoreIcon className={css.downloadAppStoreIcon} />
                      <Image
                        alt="google play plate jade"
                        className={css.downloadGooglePlayIcon}
                        src={GooglePlayIcon}
                      />
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
                    width="200"
                    height="200"
                    className={css.aboutScreenBg}
                    src={slide.imageSrc}
                    alt={`Slide ${index + 1}`}
                  />

                  <div className={css.aboutImagesOverlayThumb}>
                    <Image
                      width="200"
                      height="200"
                      className={css.aboutScreenBg}
                      src={slide.backgroundSrc}
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
            {/* Download app from App Store or Google Play */}
          </p>
          <div className={css.aboutDownloadIcons}>
            <AppStoreIcon className={css.downloadAppStoreIcon} />
            <Image
              alt="google play plate jade"
              className={css.downloadGooglePlayIcon}
              src={GooglePlayIcon}
            />{" "}
          </div>
        </div>
      </section>
      <section className={css.aboutVideoSection}>
        <div>
          <div id="how-works" className={css.videoThumb}>
            <VideoPlayer />
          </div>
          <div className={css.aboutVideoThumb}>
            <p className={css.aboutVideoTitle}>{title} </p>

            <div className={css.aboutVideoDescriptionThumb}>
              <p className={css.aboutVideoDescription}>{text}</p>
              <p className={css.aboutVideoDescription}>{subText}</p>
              <div className={css.aboutDownloadIconsDesktop}>
                <AppStoreIcon className={css.downloadAppStoreIcon} />
                <Image
                  alt="google play plate jade"
                  className={css.downloadGooglePlayIcon}
                  src={GooglePlayIcon}
                />
              </div>
            </div>
          </div>
          <div className={css.aboutDownloadIcons}>
            <AppStoreIcon className={css.downloadAppStoreIcon} />
            <Image
              alt="google play plate jade"
              className={css.downloadGooglePlayIcon}
              src={GooglePlayIcon}
            />
          </div>
        </div>
        <div className={css.aboutVideoThumbDesktop}>
          <VideoPlayer src={videoSrc} />
        </div>
      </section>
      <section>
        <div className={css.aboutWorkThumb}>
          <h2 className={css.aboutWorkTitle}>How it works</h2>
          <ul className={css.aboutWorkList}>
            {aboutWorkItems.map((item) => (
              <li key={item.id} className={css.aboutWorkItem}>
                <Image
                  width="50"
                  height="50"
                  className={css.aboutWorkImage}
                  src={item.icon}
                />
                <p className={css.aboutWorkThumbTitle}>{item.title}</p>
                <p className={css.aboutWorkText}>{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
