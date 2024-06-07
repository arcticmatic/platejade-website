"use client";

import css from "./Advantages.module.css";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import checkboxIcon from "../images/checkboxIcon.svg";
import ScreenBackground from "../images/ScreenBackground.png";
import ScreenContent from "../images/ScreenContent.png";
import AdvantagesMockup from "../images/AdvantagesMockup.png";
import AdvantagesBgMockup from "../images/AdvantagesBgMockup.png";

export default function Advantages() {
  const [advantagesArray, setAdvantagesArray] = useState([]);

  useEffect(() => {
    const fetchAdvantages = async () => {
      try {
        const response = await fetch("/api/advantages/get-advantages");
        if (response.ok) {
          const data = await response.json();
          setAdvantagesArray(data.data);
        } else {
          console.error("Failed to fetch work items");
        }
      } catch (error) {
        console.error("Error occurred while fetching work items:", error);
      }
    };

    fetchAdvantages();
  }, []);

  return (
    <>
      <section id="advantages" className={css.advantagesSection}>
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
                  src={checkboxIcon}
                />
                <div>
                  <p className={css.advantageItemTitle}>{advantage.title}</p>
                  <p className={css.advantageItemDescription}>
                    {advantage.text}
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
                src={AdvantagesBgMockup}
              />

              <div className={css.advantagesImagesOverlayThumb}>
                <Image
                  alt="platejade app"
                  className={css.advantagesScreenBg}
                  src={AdvantagesMockup}
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
                src={AdvantagesBgMockup}
              />

              <div className={css.advantagesImagesOverlayThumb}>
                <Image
                  alt="platejade app"
                  className={css.advantagesScreenBg}
                  src={AdvantagesMockup}
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
                  src={checkboxIcon}
                />
                <div>
                  <p className={css.advantageItemTitle}>{advantage.title}</p>
                  <p className={css.advantageItemDescription}>
                    {advantage.text}
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
