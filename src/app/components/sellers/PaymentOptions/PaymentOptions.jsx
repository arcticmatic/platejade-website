"use client";

import css from "./PaymentOptions.module.css";
import { useState, useEffect } from "react";
import DealerOptionCheckmark from "../../images/DealerOptionCheckmark.svg";
import Image from "next/image";
import Link from "next/link";

export default function PaymentOptions() {
  const [paymentOptions, setPaymentOptions] = useState([]);

  useEffect(() => {
    const fetchPaymentOptions = async () => {
      try {
        const response = await fetch(
          "/api/dealers/payment-options/get-payment-options"
        );
        if (response.ok) {
          const data = await response.json();
          const filteredItems = data.data.filter(
            (item) => item.page === "sellers"
          );
          setPaymentOptions(filteredItems);
        } else {
          console.error("Failed to fetch work items");
        }
      } catch (error) {
        console.error("Error occurred while fetching work items:", error);
      }
    };

    fetchPaymentOptions();
  }, []);

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
                      src={DealerOptionCheckmark}
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
