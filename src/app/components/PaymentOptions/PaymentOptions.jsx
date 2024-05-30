"use client";

import css from "./PaymentOptions.module.css";
import { useState } from "react";
import DealerOptionCheckmark from "../images/DealerOptionCheckmark.svg";
import Image from "next/image";
import Link from "next/link";

export default function PaymentOptions() {
  const paymentOptions = [
    {
      id: 1,
      subscriptionPeriod: "Monthly",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ",
      price: "$79",
      pricingPeriod: "per month",
      profit: "",
      benefitsIcon: DealerOptionCheckmark,
      packageBenefits: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ",
      ],
    },

    {
      id: 2,
      subscriptionPeriod: "Quarterly",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ",
      price: "$79",
      pricingPeriod: "per month",
      profit: "save $240 per year",
      benefitsIcon: DealerOptionCheckmark,
      packageBenefits: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ",
      ],
    },
    {
      id: 3,
      subscriptionPeriod: "Annually",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ",
      price: "$79",
      pricingPeriod: "per month",
      profit: "save $360 per year",
      benefitsIcon: DealerOptionCheckmark,
      packageBenefits: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ",
      ],
    },
  ];

  const textColors = ["black", "white", "white"];
  const buttonColors = ["#ffffff", "#000000", "#9C8D7F"];

  return (
    <>
      <section className={css.paymentOptionsSection}>
        <h2 className={css.paymentOptionsTitle}>
          Choose your best payment option
        </h2>
        <ul className={css.paymentOptionsList}>
          {paymentOptions.map((option, index) => (
            <li className={css.paymentOptionItem}>
              <p className={css.optionSubscriptionPeriod}>
                {option.subscriptionPeriod}
              </p>
              <p className={css.optionSubscriptionDescription}>
                {option.description}
              </p>

              <p className={css.optionSubscriptionTime}>
                <span className={css.optionSubscriptionPrice}>
                  {option.price}
                </span>
                /{option.pricingPeriod}
              </p>
              <p className={css.optionSubscriptionProfit}>{option.profit}</p>
              <ul>
                {option.packageBenefits.map((benefit, index) => (
                  <li className={css.paymentBenefitItem} key={index}>
                    <Image
                      className={css.paymentBenefitIcon}
                      src={option.benefitsIcon}
                    />
                    {benefit}
                  </li>
                ))}
              </ul>

              <button
                className={index !== 0 ? css.buyBtn : css.buyBtnWhite}
                style={{
                  backgroundColor: buttonColors[index % buttonColors.length],
                }}
              >
                <Link href="/dealers/#cooperation">Buy</Link>
              </button>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
