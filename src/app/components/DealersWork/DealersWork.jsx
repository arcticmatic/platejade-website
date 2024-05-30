"use client";

import css from "./DealersWork.module.css";
import { useState } from "react";
import Image from "next/image";
import DealersWorkIcon from "../images/DealersWorkIcon.svg";
import BottomDealersArrow from "../images/BottomDealersArrow.svg";
import Link from "next/link";

export default function DealersWork() {
  const dealersOptions = [
    {
      id: 1,
      icon: DealersWorkIcon,
      title: "Lorem",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 2,
      icon: DealersWorkIcon,
      title: "Lorem",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 3,
      icon: DealersWorkIcon,
      title: "Lorem",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 4,
      icon: DealersWorkIcon,
      title: "Lorem",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ];
  return (
    <>
      <section id="dealers-work" className={css.dealersWorkSection}>
        <h2 className={css.dealersHeroTitle}>How it works for dealers?</h2>
        <ul className={css.dealersOptionsList}>
          {dealersOptions.map((option, index) => (
            <li className={css.dealerOptionItem}>
              <div className={css.dealerOptionDescriptionThumb}>
                <Image
                  className={css.dealerOptionIcon}
                  alt="dealers collaboration options"
                  src={option.icon}
                />
                <p className={css.dealersOptionTitle}>{option.title}</p>
                <p className={css.dealersOptionDescription}>
                  {option.description}
                </p>
              </div>
              {index !== dealersOptions.length - 1 && (
                <Image
                  className={css.dealerOptionArrow}
                  alt="dealers collaboration icon"
                  src={BottomDealersArrow}
                />
              )}
            </li>
          ))}
        </ul>
        <button className={css.contactUsBtn}>
          {" "}
          <Link href="/contacts">Contact Us </Link>
        </button>
      </section>
    </>
  );
}
