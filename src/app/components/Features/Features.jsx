"use client";

import css from "./Features.module.css";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import searchIcon from "../../../../public/assets/images/searchIcon.svg";
import ScreenBackground from "../../../../public/assets/images/ScreenBackground.png";
import ScreenContent from "../../../../public/assets/images/ScreenContent.png";

export default function Features() {
  const featuresArray = [
    {
      id: 1,
      icon: searchIcon,
      title: "Lorem",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 2,
      icon: searchIcon,
      title: "Lorem",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 3,
      icon: searchIcon,
      title: "Lorem",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 4,
      icon: searchIcon,
      title: "Lorem",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 5,
      icon: searchIcon,
      title: "Lorem",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 6,
      icon: searchIcon,
      title: "Lorem",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ];

  const leftFeaturesArray = [
    {
      id: 1,
      icon: searchIcon,
      title: "Lorem",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 2,
      icon: searchIcon,
      title: "Lorem",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 3,
      icon: searchIcon,
      title: "Lorem",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ];

  const rightFeaturesArray = [
    {
      id: 4,
      icon: searchIcon,
      title: "Lorem",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 5,
      icon: searchIcon,
      title: "Lorem",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 6,
      icon: searchIcon,
      title: "Lorem",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ];

  return (
    <>
      <section className={css.featuresSection}>
        <h2 className={css.featuresTitle}>Features</h2>
        <p className={css.featuresDescription}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra nunc
          ante velit vitae. Est tellus vitae, nullam lobortis enim. Faucibus
          amet etiam tincidunt rhoncus, ullamcorper velit. Ullamcorper risus
          tempor, ac nunc libero urna, feugiat.
        </p>
        <div className={css.mobileFeaturesThumb}>
          <ul>
            {featuresArray.map((feature) => (
              <li className={css.featureItem}>
                <Image
                  alt="platejade app features"
                  className={css.featureIcon}
                  src={feature.icon}
                />
                <div>
                  <p className={css.featureItemTitle}>{feature.title}</p>
                  <p className={css.featureItemDescription}>
                    {feature.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className={css.featuresImagesThumb}>
            <Image className={css.featuresScreenBg} src={ScreenBackground} />
            <Image className={css.aboutScreen} src={ScreenContent} />
          </div>
        </div>

        <div className={css.desktopFeaturesThumb}>
          <ul className={css.featuresListLeft}>
            {leftFeaturesArray.map((feature) => (
              <li className={css.featureItem}>
                <Image
                  alt="platejade app features"
                  className={css.featureIcon}
                  src={feature.icon}
                />
                <div>
                  <p className={css.featureItemTitle}>{feature.title}</p>
                  <p className={css.featureItemDescription}>
                    {feature.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className={css.featuresImagesThumb}>
            <Image className={css.featuresScreenBg} src={ScreenBackground} />
            <Image className={css.aboutScreen} src={ScreenContent} />
          </div>

          <ul className={css.featuresListRight}>
            {rightFeaturesArray.map((feature) => (
              <li className={css.featureItem}>
                <Image
                  alt="platejade app features"
                  className={css.featureIcon}
                  src={feature.icon}
                />
                <div>
                  <p className={css.featureItemTitle}>{feature.title}</p>
                  <p className={css.featureItemDescription}>
                    {feature.description}
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
