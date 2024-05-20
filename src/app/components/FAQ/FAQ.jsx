"use client";

import css from "./FAQ.module.css";
import { useState } from "react";
import Image from "next/image";
import iconClose from "../../../../public/assets/images/iconClose.svg";
import iconOpen from "../../../../public/assets/images/iconOpen.svg";

export default function FAQ() {
  const [openFAQId, setOpenFAQId] = useState(null);

  const FAQsArray = [
    {
      id: 1,
      icon: "",
      question: "What is Webflow and why is it the best website builder?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      id: 2,
      icon: "",
      question: "What is your favorite template from BRIX Templates?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      id: 3,
      icon: "",
      question: "How do you clone a Webflow Template from the Showcase?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      id: 4,
      icon: "",
      question: "Why is BRIX Templates the best Webflow agency out there?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
  ];

  return (
    <>
      <section className={css.FAQSection}>
        <h2 className={css.FAQTitle}>FAQ</h2>
        <ul className={css.FAQList}>
          {FAQsArray.map((item) => (
            <li
              key={item.id}
              className={openFAQId === item.id ? css.FAQItemOpen : css.FAQItem}
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
      </section>
    </>
  );
}
