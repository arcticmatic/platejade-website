"use client";

import css from "./FAQ.module.css";
import { useState } from "react";
import Image from "next/image";
import iconClose from "../images/iconClose.svg";
import iconOpen from "../images/iconOpen.svg";

export default function FAQ() {
  const [openFAQId, setOpenFAQId] = useState(null);

  const FAQsArray = [
    {
      id: 1,
      icon: "",
      question: "1. What is Plate Jade?",
      answer:
        " Plate Jade is an app that uses augmented reality to help users from USA,Canada or Mexico to explore, customise, and order license plates and frames.",
    },
    {
      id: 2,
      icon: "",
      question: "2. How do I download the app?",
      answer:
        "You can download Plate Jade from the App Store or Google Play. Follow the links on our homepage.",
    },
    {
      id: 3,
      icon: "",
      question:
        "3. Can I see how a license plate looks on my car before buying?",
      answer:
        "Yes, you can use the AR feature to virtually apply license plates and frames to your car.",
    },
    {
      id: 4,
      icon: "",
      question: "4. Can I order license plate frames through the app?",
      answer:
        "Yes, you can order frames directly from marketplaces like Amazon and eBay.",
    },
    {
      id: 5,
      icon: "",
      question: "5. How can I request a new licence plate from a title agency?",
      answer:
        "You can make requests for new licence plates from local title agencies directly through the app.",
    },
    {
      id: 6,
      icon: "",
      question: "6. What customization options are available?",
      answer:
        "You can customise license plates and frames based on colour, theme, material, finish, type, number of attachment holes, and more. License plates can be customised by state or theme.",
    },
    {
      id: 7,
      icon: "",
      question: "7. Can I share my designs with others?",
      answer:
        "Yes, you can share your customised designs via social media like Meta, Instagram, X,TikTok or messaging apps such as WhatsApp, Telegram, Viber or simply text or email as you would share your picture.",
    },
  ];

  return (
    <>
      <section id="faq" className={css.FAQSection}>
        <div className={css.FAQThumb}>
          <h2 className={css.FAQTitle}>FAQ</h2>
          <ul className={css.FAQList}>
            {FAQsArray.map((item) => (
              <li
                key={item.id}
                className={
                  openFAQId === item.id ? css.FAQItemOpen : css.FAQItem
                }
              >
                <div className={css.FAQCartThumb}>
                  <p className={css.FAQQuestion}>{item.question}</p>
                  {openFAQId === item.id ? (
                    <Image
                      onClick={() => setOpenFAQId(null)}
                      className={css.FAQArrowOpen}
                      alt="open faq arrow"
                      src={iconOpen}
                    />
                  ) : (
                    <Image
                      onClick={() => setOpenFAQId(item.id)}
                      className={css.FAQArrowOpen}
                      alt="close faq arrow"
                      src={iconClose}
                    />
                  )}
                </div>
                {openFAQId === item.id && (
                  <p className={css.FAQDescription}>{item.answer}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
