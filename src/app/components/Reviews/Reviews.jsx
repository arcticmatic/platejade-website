"use client";

import css from "./Reviews.module.css";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import arrowLeft from "../../../../public/assets/images/arrowLeft.svg";
import arrowRight from "../../../../public/assets/images/arrowRight.svg";
import UserIcon from "../../../../public/assets/images/UserIcon.png";
import EmblaCarousel from "@/app/features/Carousel/Carousel";

export default function Reviews() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const OPTIONS = { dragFree: true };
  const SLIDE_COUNT = 5;
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

  const reviewsArray = [
    {
      id: 1,
      icon: "",
      customerName: "Hellen Jummy",
      customerRole: "Financial Counselor",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 2,
      icon: "",
      customerName: "Lorem",
      customerRole: "Test",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 3,
      icon: "",
      customerName: "Lorem",
      customeRole: "Customer",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 4,
      icon: "",
      customerName: "Hellen Jummy",
      customerRole: "Financial Counselor",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 5,
      icon: "",
      customerName: "Lorem",
      customerRole: "Test",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 6,
      icon: "",
      customerName: "Lorem",
      customeRole: "Customer",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ];

  return (
    <>
      <section className={css.reviewsSection}>
        <EmblaCarousel slides={reviewsArray} options={OPTIONS} />
      </section>
    </>
  );
}
