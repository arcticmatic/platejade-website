"use client";

import css from "./Reviews.module.css";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import arrowLeft from "../images/arrowLeft.png";
import arrowRight from "../images/arrowRight.png";
import UserIcon from "../images/UserIcon.png";
import EmblaCarousel from "@/app/features/Carousel/Carousel";

export default function Reviews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reviewsArray, setReviewsArray] = useState([]);

  const OPTIONS = { dragFree: true };
  const SLIDE_COUNT = 5;
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch("/api/testimonials/get-testimonials");
        if (response.ok) {
          const data = await response.json();
          setReviewsArray(data.data);
        } else {
          console.error("Failed to fetch work items");
        }
      } catch (error) {
        console.error("Error occurred while fetching work items:", error);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <>
      <section id="testimonials" className={css.reviewsSection}>
        <EmblaCarousel slides={reviewsArray} options={OPTIONS} />
      </section>
    </>
  );
}
