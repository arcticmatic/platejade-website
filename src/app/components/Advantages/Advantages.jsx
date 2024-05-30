"use client";

import css from "./Advantages.module.css";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import checkboxIcon from "../images/checkboxIcon.svg";
import ScreenBackground from "../images/ScreenBackground.png";
import ScreenContent from "../images/ScreenContent.png";

export default function Advantages() {
  const advantagesArray = [
    {
      id: 1,
      icon: checkboxIcon,
      title: "1. Enhanced Personalization",
      description:
        "Customise your licence plates and frames to reflect your style using AR technology.",
    },
    {
      id: 2,
      icon: checkboxIcon,
      title: "2. Convenient Ordering",
      description:
        "Easily order frames from major marketplaces like Amazon and eBay.",
    },
    {
      id: 3,
      icon: checkboxIcon,
      title: "3. Direct Requests",
      description:
        "Request new plates from local title agencies without leaving the app.",
    },
    {
      id: 4,
      icon: checkboxIcon,
      title: "4. Detailed Information",
      description:
        "Access comprehensive details about each license plate and frame, including their supporting organisations.",
    },
    {
      id: 5,
      icon: checkboxIcon,
      title: "5. Effortless Sharing",
      description:
        "Share your customised designs with friends and family effortlessly.",
    },
    {
      id: 6,
      icon: checkboxIcon,
      title: "6. Comprehensive Filtering",
      description:
        "Filter plates and frames by colour, theme, material, and more to find the perfect match.",
    },
  ];

  return (
    <>
      <section className={css.advantagesSection}>
        <h2 className={css.advantagesTitle}>Advantages</h2>
        <p className={css.advantagesDescription}>
          Discover the myriad benefits of using Plate Jade. Our app not only
          enhances convenience but also offers a range of features that ensure a
          seamless and enjoyable process from start to finish.
        </p>
        <div className={css.mobileAdvantagesThumb}>
          <ul>
            {advantagesArray.map((advantage) => (
              <li className={css.advantageItem}>
                <Image
                  alt="platejade app features"
                  className={css.advantageIcon}
                  src={advantage.icon}
                />
                <div>
                  <p className={css.advantageItemTitle}>{advantage.title}</p>
                  <p className={css.advantageItemDescription}>
                    {advantage.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className={css.advantagesScreensThumb}>
            <div className={css.advantagesImagesThumb}>
              <Image
                alt="platejade app"
                className={css.advantagesScreenBg}
                src={ScreenBackground}
              />
              <Image
                alt="platejade app screenshot"
                className={css.advantagesScreen}
                src={ScreenContent}
              />
              <div className={css.advantagesImagesOverlayThumb}>
                <Image
                  alt="platejade app"
                  className={css.advantagesScreenBg}
                  src={ScreenBackground}
                />
                <Image
                  alt="platejade app screenshot"
                  className={css.advantagesScreen}
                  src={ScreenContent}
                />
              </div>
            </div>
          </div>
        </div>

        <div className={css.desktopAdvantagesThumb}>
          <div className={css.advantagesScreensThumb}>
            <div className={css.advantagesImagesThumb}>
              <Image
                alt="platejade app"
                className={css.advantagesScreenBg}
                src={ScreenBackground}
              />
              <Image
                alt="platejade app screenshot"
                className={css.advantagesScreen}
                src={ScreenContent}
              />
              <div className={css.advantagesImagesOverlayThumb}>
                <Image
                  alt="platejade app"
                  className={css.advantagesScreenBg}
                  src={ScreenBackground}
                />
                <Image
                  alt="platejade app screenshot"
                  className={css.advantagesScreen}
                  src={ScreenContent}
                />
              </div>
            </div>
          </div>
          <ul className={css.advantagesList}>
            {advantagesArray.map((advantage) => (
              <li className={css.advantageItem}>
                <Image
                  alt="platejade app features"
                  className={css.advantageIcon}
                  src={advantage.icon}
                />
                <div>
                  <p className={css.advantageItemTitle}>{advantage.title}</p>
                  <p className={css.advantageItemDescription}>
                    {advantage.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
