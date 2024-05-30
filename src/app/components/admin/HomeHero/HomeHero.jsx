"use client";

import css from "./HomeHero.module.css";
import { useState } from "react";
import WhiteLogo from "../../images/WhiteLogo.png";
import NewsPaper from "../../images/NewsPaper.svg";
import NewsPaperWhite from "../../images/NewsPaperWhite.svg";
import WhiteChevronDown from "../../images/WhiteChevronDown.svg";
import WhiteChevronTop from "../../images/WhiteChevronTop.svg";
import Image from "next/image";
import Link from "next/link";

export default function HomeHero() {
  const [selectedPage, setSelectedPage] = useState(null);

  console.log("selected page", selectedPage);

  const pagesArray = [
    {
      id: 1,
      name: "Home",
      icon: NewsPaperWhite,
      activeIcon: "",
      navLinks: [
        {
          id: 1,
          name: "Hero section",
          link: "/",
        },
        {
          id: 2,
          name: "Video block",
          link: "/video",
        },
        {
          id: 3,
          name: "How it works",
          link: "/about-work",
        },
        {
          id: 4,
          name: "Features",
          link: "/features",
        },
        {
          id: 5,
          name: "Advantages",
          link: "/advantages",
        },
        {
          id: 6,
          name: "Testimonials",
          link: "/testimonials",
        },
        {
          id: 6,
          name: "FAQ",
          link: "/faq",
        },
        {
          id: 7,
          name: "Contacts",
          link: "/contacts",
        },
      ],
    },
    {
      id: 2,
      name: "Dealers",
      icon: "",
      activeIcon: "",
      navLinks: [
        {
          id: 1,
          name: "Hero section",
          link: "/",
        },
        {
          id: 2,
          name: "Video block",
          link: "/video",
        },
        {
          id: 3,
          name: "How it works",
          link: "/about-work",
        },
        {
          id: 4,
          name: "Payment options",
          link: "/payment-options",
        },
        {
          id: 5,
          name: "Opportunites",
          link: "/opportunities",
        },
        {
          id: 5,
          name: "Opportunites",
          link: "/opportunities",
        },
        {
          id: 6,
          name: "Collaboration form",
          link: "/collaboration-form",
        },
        {
          id: 7,
          name: "FAQ",
          link: "/faq",
        },
      ],
    },
    {
      id: 3,
      name: "Contacts",
      icon: "",
      activeIcon: "",
      navLinks: [
        {
          id: 1,
          name: "Contact Information",
          link: "/contact-info",
        },
        {
          id: 2,
          name: "Collaboration form",
          link: "/collaboration-form",
        },
      ],
    },
  ];

  const handlePageClick = (page) => {
    setSelectedPage(selectedPage?.id === page.id ? null : page);
  };

  return (
    <>
      <section className={css.navSection}>
        <div className={css.navThumb}>
          <Image
            className={css.logoIcon}
            alt="platejade logo"
            src={WhiteLogo}
          />
          <ul className={css.pageList}>
            {pagesArray.map((page) => (
              <li
                key={page.id}
                className={`${css.navItem} ${
                  selectedPage?.id === page.id ? css.active : ""
                }`}
              >
                <div
                  className={
                    selectedPage?.id === page.id
                      ? css.navItemTextActive
                      : css.navItemText
                  }
                >
                  <p className={css.navItemText}>
                    <Image
                      className={css.navItemIcon}
                      alt="option icon"
                      src={page.icon}
                    />
                    {page.name}
                  </p>
                  <Image
                    onClick={() => handlePageClick(page)}
                    className={
                      selectedPage?.id === page.id
                        ? css.chevronIconRotated
                        : css.chevronIcon
                    }
                    src={WhiteChevronDown}
                  />
                </div>
                {selectedPage && selectedPage.id === page.id && (
                  <ul>
                    {selectedPage.navLinks.map((link) => (
                      <li className={css.navItem} key={link.id}>
                        <Link href={link.link}>{link.name}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
