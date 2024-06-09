"use client";

import css from "./Header.module.css";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MobileMenuIcon } from "../images/icons/MobileMenuIcon";
import logo from "../images/logo.png";
import { CloseCrossIcon } from "../images/icons/CloseCrossIcon";
import { usePathname } from "next/navigation";

export default function Header() {
  const path = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const disableNavWithHeader = [
    "/admin/home",
    "/admin/home/video-block",
    "/admin/home/how-it-works",
    "/admin/home/features",
    "/admin/home/advantages",
    "/admin/home/testimonials",
    "/admin/home/faq",
    "/admin/home/download",
    "/admin/home/contacts",
    "/admin/home/contact-info",
    "/admin/home/contact-form",
    "/admin/dealers/hero",
    "/admin/dealers/video-block",
    "/admin/dealers/how-it-works",
    "/admin/dealers/payment-options",
    "/admin/dealers/faq",
    "/admin/dealers/opportunities",
  ];

  const menuNavigation = [
    { id: 1, title: "Home", link: "/" },
    { id: 2, title: "Dealers", link: "/dealers" },
    // { id: 3, title: "Title Agency", link: "/title-agency", },
    // { id: 4, title: "Sellers", link: "/sellers" },
    { id: 5, title: "Contacts", link: "/contacts" },
  ];

  return (
    <>
      {!disableNavWithHeader.includes(path) && (
        <div
          className={
            isMobileMenuOpen ? css.headerMobileOverlay : css.headerDesktop
          }
        >
          <div className={css.headerSection}>
            <Image
              className={css.headerLogo}
              src={logo}
              width={160}
              height={57}
              alt="PlateJade logo"
            />
            {!isMobileMenuOpen ? (
              <MobileMenuIcon
                className={css.mobileMenuIcon}
                onClick={() => setIsMobileMenuOpen(true)}
              />
            ) : (
              <CloseCrossIcon
                className={css.headerLogo}
                onClick={() => setIsMobileMenuOpen(false)}
              />
            )}
          </div>
          {isMobileMenuOpen && (
            <>
              <ul className={css.navLinksListMobile}>
                {menuNavigation.map((item) => (
                  <li className={css.navLink} key={item.id}>
                    <Link
                      onClick={() => setIsMobileMenuOpen(false)}
                      href={item.link}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <button className={css.headerBtnMobile}>Download</button>
            </>
          )}

          <ul className={css.navLinksListDesktop}>
            {menuNavigation.map((item) => (
              <li className={css.navLink} key={item.id}>
                <Link
                  onClick={() => setIsMobileMenuOpen(false)}
                  href={item.link}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
          <div>
            <button className={css.headerBtnDesktop}>Download</button>
          </div>
        </div>
      )}
    </>
  );
}
