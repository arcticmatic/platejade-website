"use client";

import css from "./FAQ.module.css";
import { useState, useEffect } from "react";
import Image from "next/image";
import iconClose from "../images/iconClose.svg";
import iconOpen from "../images/iconOpen.svg";

export default function FAQ() {
  const [openFAQId, setOpenFAQId] = useState(null);
  const [FAQsArray, setFAQsArray] = useState([]);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await fetch("/api/faq/home/get-faqs");
        if (response.ok) {
          const data = await response.json();

          setFAQsArray(data.data);
        } else {
          console.error("Failed to fetch work items");
        }
      } catch (error) {
        console.error("Error occurred while fetching work items:", error);
      }
    };

    fetchFaqs();
  }, []);

  return (
    <>
      <section id="faq" className={css.FAQSection}>
        <div className={css.FAQThumb}>
          <h2 className={css.FAQTitle}>FAQ</h2>
          <ul className={css.FAQList}>
            {FAQsArray.map((item) => (
              <li
                key={item._id}
                className={
                  openFAQId === item._id ? css.FAQItemOpen : css.FAQItem
                }
              >
                <div className={css.FAQCartThumb}>
                  <p className={css.FAQQuestion}>{item.title}</p>
                  {openFAQId === item._id ? (
                    <Image
                      onClick={() => setOpenFAQId(null)}
                      className={css.FAQArrowOpen}
                      alt="open faq arrow"
                      src={iconOpen}
                    />
                  ) : (
                    <Image
                      onClick={() => setOpenFAQId(item._id)}
                      className={css.FAQArrowOpen}
                      alt="close faq arrow"
                      src={iconClose}
                    />
                  )}
                </div>
                {openFAQId === item._id && (
                  <p className={css.FAQDescription}>{item.text}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
