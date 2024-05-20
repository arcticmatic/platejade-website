"use client";
import css from "./DealersHero.module.css";
import { useState, useEffect } from "react";
import Image from "next/image";
import AutoCarousel from "@/app/features/AutoCarousel/AutoCarousel";
import CarTemplate from "../../images/CarTemplate.png";
import DealersTemplate from "../../images/DealersTemplate.png";
import carTemplateTablet1 from "../../images/carTemplateTablet1.png";
import carTemplateTablet2 from "../../images/carTemplateTablet2.png";
import carTemplateTablet3 from "../../images/carTemplateTablet3.png";
import carTemplateTablet4 from "../../images/carTemplateTablet4.png";
import desktopCar1 from "../../images/desktopCar1.png";
import desktopCar2 from "../../images/desktopCar2.png";
import desktopCar3 from "../../images/desktopCar3.png";
import desktopCar4 from "../../images/desktopCar4.png";

export default function DealersHero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [tabletCurrentSlide, setTabletCurrentSlide] = useState(0); // New state for tablet carousel
  const [desktopCurrentSlide, setDesktopCurrentSlide] = useState(0); // New state for desktop carousel

  const OPTIONS = { containScroll: false, align: "start" };
  const SLIDE_COUNT = 5;
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

  const slides = [
    {
      id: 1,
      icon: CarTemplate,
    },
    {
      id: 2,
      icon: CarTemplate,
    },
    {
      id: 3,
      icon: CarTemplate,
    },
    {
      id: 4,
      icon: CarTemplate,
    },
  ];

  const tabletSlidesArray = [
    {
      id: 1,
      icons: [carTemplateTablet1, carTemplateTablet2],
    },
    {
      id: 2,
      icons: [carTemplateTablet3, carTemplateTablet4],
    },
  ];

  const desktopSlidesArray = [
    {
      id: 1,
      icons: [desktopCar1, desktopCar2, desktopCar3, desktopCar4],
    },
    {
      id: 2,
      icons: [desktopCar4, desktopCar3, desktopCar2, desktopCar1],
    },
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
      setTabletCurrentSlide((prev) => (prev + 1) % tabletSlidesArray.length);
      setDesktopCurrentSlide((prev) => (prev + 1) % desktopSlidesArray.length);
    }, 8000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <section className={css.dealersHeroSection}>
      <div className={css.dealersTextThumb}>
        <h2 className={css.dealersHeroTitle}>Lorem ipsum dolor sit amet</h2>
        <p className={css.dealersHeroDescription}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem
          ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor
          sit amet, consectetur adipiscing elit lorem
        </p>
        <div className={css.dealersButtonsThumb}>
          <button className={css.contactUsBtn}>Contact Us</button>
          <button className={css.readMoreBtn}>Read more</button>
        </div>
        <div className={css.mobileCarousel}>
          <AutoCarousel slides={slides} options={OPTIONS} />
        </div>
      </div>

      <div className={css.tabletCarouselThumb}>
        {tabletSlidesArray.map((slide, index) => (
          <div
            key={index}
            className={
              index === tabletCurrentSlide
                ? css.aboutScreensThumb
                : css.hiddenSlide // Use tabletCurrentSlide for class condition
            }
          >
            <div className={css.dealersImagesThumb}>
              {slide.icons.map((icon, i) => (
                <div key={i} className={css.dealerImagesContainer}>
                  <Image
                    className={css.dealerIcon}
                    src={icon}
                    alt={`Slide ${index + 1} Icon ${i + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className={css.desktopCarouselThumb}>
        {desktopSlidesArray.map((slide, index) => (
          <div
            key={index}
            className={
              index === desktopCurrentSlide
                ? css.aboutScreensThumb
                : css.hiddenSlide // Use desktopCurrentSlide for class condition
            }
          >
            <div className={css.dealersImagesThumb}>
              {slide.icons.map((icon, i) => (
                <div key={i} className={css.dealerImagesContainer}>
                  <Image
                    className={css.dealerIcon}
                    src={icon}
                    alt={`Slide ${index + 1} Icon ${i + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
