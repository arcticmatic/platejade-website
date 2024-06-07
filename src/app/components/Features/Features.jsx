"use client";

import css from "./Features.module.css";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import searchIcon from "../images/searchIcon.svg";
import ScreenBackground from "../images/ScreenBackground.png";
import ScreenContent from "../images/ScreenContent.png";
import FeaturesMockup from "../images/FeaturesMockup.png";

export default function Features() {
  const [leftFeaturesArray, setLeftFeaturesArray] = useState([]);
  const [rightFeaturesArray, setRightFeaturesArray] = useState([]);
  const [featuresArray, setFeaturesArray] = useState([]);
  const [selectedPageId, setSelectedPageId] = useState(1);

  useEffect(() => {
    const fetchLeftFeatures = async () => {
      try {
        const response = await fetch("/api/features/get-left-features");
        if (response.ok) {
          const data = await response.json();
          setLeftFeaturesArray(data.data);
        } else {
          console.error("Failed to fetch work items");
        }
      } catch (error) {
        console.error("Error occurred while fetching work items:", error);
      }
    };

    fetchLeftFeatures();

    const fetchRightFeatures = async () => {
      try {
        const response = await fetch("/api/features/get-right-features");
        if (response.ok) {
          const data = await response.json();
          setRightFeaturesArray(data.data);
        } else {
          console.error("Failed to fetch work items");
        }
      } catch (error) {
        console.error("Error occurred while fetching work items:", error);
      }
    };

    fetchRightFeatures();
  }, []);

  useEffect(() => {
    const allFeatures = leftFeaturesArray.concat(rightFeaturesArray);
    setFeaturesArray(allFeatures);
  }, [leftFeaturesArray]);

  return (
    <>
      <section id="features" className={css.featuresSection}>
        <h2 className={css.featuresTitle}>Features</h2>
        {/* <p className={css.featuresDescription}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra nunc
          ante velit vitae. Est tellus vitae, nullam lobortis enim. Faucibus
          amet etiam tincidunt rhoncus, ullamcorper velit. Ullamcorper risus
          tempor, ac nunc libero urna, feugiat.
        </p> */}
        <div className={css.mobileFeaturesThumb}>
          <ul>
            {featuresArray.map((feature) => (
              <li className={css.featureItem}>
                <Image
                  width="50"
                  height="50"
                  alt="platejade app features"
                  className={css.featureIcon}
                  src={feature.icon}
                />
                <div>
                  <p className={css.featureItemTitle}>{feature.title}</p>
                  <p className={css.featureItemDescription}>{feature.text}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className={css.featuresImagesThumb}>
            <Image
              width="50"
              height="50"
              className={css.featuresScreenBg}
              src={FeaturesMockup}
            />
            {/* <Image className={css.aboutScreen} src={ScreenContent} /> */}
          </div>
        </div>

        <div className={css.desktopFeaturesThumb}>
          <ul className={css.featuresListLeft}>
            {leftFeaturesArray.map((feature) => (
              <li className={css.featureItem}>
                <Image
                  width="50"
                  height="50"
                  alt="platejade app features"
                  className={css.featureIcon}
                  src={feature.icon}
                />
                <div>
                  <p className={css.featureItemTitle}>{feature.title}</p>
                  <p className={css.featureItemDescription}>{feature.text}</p>
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
                  width="50"
                  height="50"
                  alt="platejade app features"
                  className={css.featureIcon}
                  src={feature.icon}
                />
                <div>
                  <p className={css.featureItemTitle}>{feature.title}</p>
                  <p className={css.featureItemDescription}>{feature.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
