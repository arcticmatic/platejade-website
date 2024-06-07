"use client";

import css from "./DealersWork.module.css";
import { useState, useEffect } from "react";
import Image from "next/image";
import DealersWorkIcon from "../images/DealersWorkIcon.svg";
import BottomDealersArrow from "../images/BottomDealersArrow.svg";
import Link from "next/link";

export default function DealersWork() {
  const [dealersOptions, setDealersOptions] = useState([]);

  useEffect(() => {
    const fetchDealersOptions = async () => {
      try {
        const response = await fetch(
          "/api/dealers/how-it-works/get-how-it-works"
        );
        if (response.ok) {
          const data = await response.json();
          setDealersOptions(data.data);
        } else {
          console.error("Failed to fetch work items");
        }
      } catch (error) {
        console.error("Error occurred while fetching work items:", error);
      }
    };

    fetchDealersOptions();
  }, []);
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
                  src={DealersWorkIcon}
                />
                <p className={css.dealersOptionTitle}>{option.title}</p>
                <p className={css.dealersOptionDescription}>{option.text}</p>
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
