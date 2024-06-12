"use client";
import css from "./DealersHero.module.css";
import { useState, useEffect } from "react";
import Image from "next/image";
import AutoCarousel from "@/app/features/AutoCarousel/AutoCarousel";
import CarTemplate from "../images/CarTemplate.png";
import DealersTemplate from "../images/DealersTemplate.png";
import carTemplateTablet1 from "../images/carTemplateTablet1.png";
import carTemplateTablet2 from "../images/carTemplateTablet2.png";
import carTemplateTablet3 from "../images/carTemplateTablet3.png";
import carTemplateTablet4 from "../images/carTemplateTablet4.png";
import desktopCar1 from "../images/desktopCar1.png";
import desktopCar2 from "../images/desktopCar2.png";
import desktopCar3 from "../images/desktopCar3.png";
import desktopCar4 from "../images/desktopCar4.png";
import Link from "next/link";

export default function DealersHero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [textCurrentSlide, setTextCurrentSlide] = useState(0);
  const [tabletCurrentSlide, setTabletCurrentSlide] = useState(0);
  const [desktopCurrentSlide, setDesktopCurrentSlide] = useState(0);
  const [slides, setSlides] = useState([]);
  const [textsArray, setTextsArray] = useState([]);
  const [tabletSlidesArray, setTabletSlidesArray] = useState([]);
  const [desktopSlidesArray, setDesktopSlidesArray] = useState([]);

  const OPTIONS = { containScroll: false, align: "start" };
  const SLIDE_COUNT = 5;
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await fetch("/api/slides/get-slides");
        if (response.ok) {
          const data = await response.json();
          const filteredSlides = data.data.filter(
            (slide) => slide.page === "dealers"
          );
          setSlides(filteredSlides);
        } else {
          console.error("Failed to fetch slides");
        }
      } catch (error) {
        console.error("Error fetching slides:", error);
      }
    };

    const fetchTabletSlides = async () => {
      try {
        const response = await fetch("/api/tablet-slides/get-tablet-slides");
        if (response.ok) {
          const data = await response.json();
          const filteredSlides = data.data.filter(
            (slide) => slide.page === "dealers"
          );
          setTabletSlidesArray(filteredSlides);
        } else {
          console.error("Failed to fetch slides");
        }
      } catch (error) {
        console.error("Error fetching slides:", error);
      }
    };

    const fetchDesktopSlides = async () => {
      try {
        const response = await fetch("/api/desktop-slides/get-desktop-slides");
        if (response.ok) {
          const data = await response.json();
          const filteredSlides = data.data.filter(
            (slide) => slide.page === "dealers"
          );
          setDesktopSlidesArray(filteredSlides);
        } else {
          console.error("Failed to fetch slides");
        }
      } catch (error) {
        console.error("Error fetching slides:", error);
      }
    };

    const fetchTexts = async () => {
      try {
        const response = await fetch("/api/slides-texts/get-slide-texts");
        if (response.ok) {
          const data = await response.json();
          const filteredSlides = data.data.filter(
            (slide) => slide.page === "dealers"
          );
          console.log("filtered slides:", filteredSlides);
          setTextsArray(filteredSlides);
          setTextCurrentSlide(0);
        } else {
          console.error("Failed to fetch slides");
        }
      } catch (error) {
        console.error("Error fetching slides:", error);
      }
    };

    fetchSlides();
    fetchTabletSlides();
    fetchDesktopSlides();
    fetchTexts();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
      setTextCurrentSlide((prev) => (prev + 1) % textsArray.length);
      setTabletCurrentSlide((prev) => (prev + 1) % tabletSlidesArray.length);
      setDesktopCurrentSlide((prev) => (prev + 1) % desktopSlidesArray.length);
    }, 8000);
    return () => {
      clearInterval(intervalId);
    };
  }, [textsArray.length, tabletSlidesArray.length, desktopSlidesArray.length]);

  return (
    <section className={css.dealersHeroSection}>
      <div className={css.dealersTextThumb}>
        {textsArray.map((text, index) => (
          <div
            key={index}
            className={
              index === textCurrentSlide ? css.slideVisible : css.hiddenSlide
            }
          >
            <h2 className={css.dealersHeroTitle}>{text.title}</h2>
            <p className={css.dealersHeroDescription}>{text.text}</p>
          </div>
        ))}
        <div className={css.dealersButtonsThumb}>
          <button className={css.contactUsBtn}>
            <Link href="/contacts">Contact Us </Link>
          </button>

          <button className={css.readMoreBtn}>
            <Link href="/dealers/#dealers-work">Read more </Link>
          </button>
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
                : css.hiddenSlide
            }
          >
            <div className={css.dealersImagesThumb}>
              {slide.icons.map((icon, i) => (
                <div key={i} className={css.dealerImagesContainer}>
                  <Image
                    width="100"
                    height="50"
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
                : css.hiddenSlide
            }
          >
            <div className={css.dealersImagesThumb}>
              {slide.icons.map((icon, i) => (
                <div key={i} className={css.dealerImagesContainer}>
                  <Image
                    width={i === 0 || i === 3 ? 328 : 218}
                    height={i === 0 || i === 3 ? 230 : 298}
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
