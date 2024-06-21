"use client";
import css from "./DealersHero.module.css";
import { useState, useEffect } from "react";
import Image from "next/image";
import AutoCarousel from "@/app/features/AutoCarousel/AutoCarousel";
import Link from "next/link";
import ChevronRight from "../images/ChevronRight.svg";
import ChevronLeft from "../images/ChevronLeft.svg";

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
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setTextCurrentSlide((prev) => (prev + 1) % textsArray.length);
      setTabletCurrentSlide((prev) => (prev + 1) % tabletSlidesArray.length);
      setDesktopCurrentSlide((prev) => (prev + 1) % desktopSlidesArray.length);
    }, 8000);
    return () => {
      clearInterval(intervalId);
    };
  }, [
    slides.length,
    textsArray.length,
    tabletSlidesArray.length,
    desktopSlidesArray.length,
  ]);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTextCurrentSlide((prev) => (prev + 1) % textsArray.length);
    setTabletCurrentSlide((prev) => (prev + 1) % tabletSlidesArray.length);
    setDesktopCurrentSlide((prev) => (prev + 1) % desktopSlidesArray.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTextCurrentSlide(
      (prev) => (prev - 1 + textsArray.length) % textsArray.length
    );
    setTabletCurrentSlide(
      (prev) => (prev - 1 + tabletSlidesArray.length) % tabletSlidesArray.length
    );
    setDesktopCurrentSlide(
      (prev) =>
        (prev - 1 + desktopSlidesArray.length) % desktopSlidesArray.length
    );
  };

  const handleDotClick = (index) => {
    setCurrentSlide(index);
    setTextCurrentSlide(index);
    setTabletCurrentSlide(index);
    setDesktopCurrentSlide(index);
  };

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
      <button className={css.prevSlide} onClick={handlePrevSlide}>
        <Image alt="chevron left" src={ChevronLeft} width={24} height={24} />
      </button>
      <button className={css.nextSlide} onClick={handleNextSlide}>
        <Image alt="chevron right" src={ChevronRight} width={24} height={24} />
      </button>

      <div className={css.dotsContainer}>
        {slides.map((_, index) => (
          <span
            key={index}
            className={`${css.dot} ${index === currentSlide ? css.active : ""}`}
            onClick={() => handleDotClick(index)}
          ></span>
        ))}
      </div>

      <div className={css.dotsTabletContainer}>
        {tabletSlidesArray.map((_, index) => (
          <span
            key={index}
            className={`${css.dot} ${
              index === tabletCurrentSlide ? css.active : ""
            }`}
            onClick={() => handleDotClick(index)}
          ></span>
        ))}
      </div>

      <div className={css.dotsDesktopContainer}>
        {desktopSlidesArray.map((_, index) => (
          <span
            key={index}
            className={`${css.dot} ${
              index === desktopCurrentSlide ? css.active : ""
            }`}
            onClick={() => handleDotClick(index)}
          ></span>
        ))}
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
                    width="500"
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
