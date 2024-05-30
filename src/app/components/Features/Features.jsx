"use client";

import css from "./Features.module.css";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import searchIcon from "../images/searchIcon.svg";
import ScreenBackground from "../images/ScreenBackground.png";
import ScreenContent from "../images/ScreenContent.png";
import FeaturesMockup from "../images/FeaturesMockup.png";

export default function Features() {
  const featuresArray = [
    {
      id: 1,
      icon: searchIcon,
      title: "Augmented Reality Integration",
      description:
        "Experience real-time AR technology to see how auto license plates and frames look on your car.",
    },
    {
      id: 2,
      icon: searchIcon,
      title: " Marketplace Integration",
      description:
        "Order your favourite frames from Amazon and eBay seamlessly.",
    },
    {
      id: 3,
      icon: searchIcon,
      title: "Extensive Database",
      description:
        "Access a wide range of licence plates available in your state.",
    },
    {
      id: 4,
      icon: searchIcon,
      title: "Customization Tools",
      description:
        "Easily customise and fit license plate frames to match your style.",
    },
    {
      id: 5,
      icon: searchIcon,
      title: "Local Title Agency Requests",
      description:
        "Request new license plates from local title agencies directly through the app.",
    },
    {
      id: 6,
      icon: searchIcon,
      title: "Social Sharing",
      description:
        "Share your designs with friends on social media or via messaging apps.",
    },
  ];

  const leftFeaturesArray = [
    {
      id: 1,
      icon: searchIcon,
      title: "Augmented Reality Integration",
      description:
        "Experience real-time AR technology to see how auto license plates and frames look on your car.",
    },
    {
      id: 2,
      icon: searchIcon,
      title: " Marketplace Integration",
      description:
        "Order your favourite frames from Amazon and eBay seamlessly.",
    },
    {
      id: 3,
      icon: searchIcon,
      title: "Extensive Database",
      description:
        "Access a wide range of licence plates available in your state.",
    },
  ];

  const rightFeaturesArray = [
    {
      id: 4,
      icon: searchIcon,
      title: "Customization Tools",
      description:
        "Easily customise and fit license plate frames to match your style.",
    },
    {
      id: 5,
      icon: searchIcon,
      title: "Local Title Agency Requests",
      description:
        "Request new license plates from local title agencies directly through the app.",
    },
    {
      id: 6,
      icon: searchIcon,
      title: "Social Sharing",
      description:
        "Share your designs with friends on social media or via messaging apps.",
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
            <Image className={css.featuresScreenBg} src={FeaturesMockup} />
            {/* <Image className={css.aboutScreen} src={ScreenContent} /> */}
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
            <Image className={css.featuresScreenBg} src={FeaturesMockup} />
            {/* <Image className={css.aboutScreen} src={ScreenContent} /> */}
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
