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
      title: "Lorem",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 2,
      icon: checkboxIcon,
      title: "Lorem",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 3,
      icon: checkboxIcon,
      title: "Lorem",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 4,
      icon: checkboxIcon,
      title: "Lorem",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 5,
      icon: checkboxIcon,
      title: "Lorem",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 6,
      icon: checkboxIcon,
      title: "Lorem",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ];

  return (
    <>
      <section className={css.advantagesSection}>
        <h2 className={css.advantagesTitle}>Advantages</h2>
        <p className={css.advantagesDescription}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra nunc
          ante velit vitae. Est tellus vitae, nullam lobortis enim. Faucibus
          amet etiam tincidunt rhoncus, ullamcorper velit. Ullamcorper risus
          tempor, ac nunc libero urna, feugiat.
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
