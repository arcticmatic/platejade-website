"use client";

import Link from "next/link";
import css from "./Footer.module.css";
import WhiteLogo from "../images/WhiteLogo.png";
import Image from "next/image";
import { CopyRightIcon } from "../images/icons/CopyRightIcon";
import { usePathname } from "next/navigation";

export default function Footer() {
  const path = usePathname();

  const disableNavWithFooter = [
    "/admin",
    "/admin/home",
    "/admin/reset",
    "/admin/home/video-block",
    "/admin/home/how-it-works",
    "/admin/home/features",
    "/admin/home/advantages",
    "/admin/home/testimonials",
    "/admin/home/faq",
    "/admin/home/download",
    "/admin/home/contacts",
    "/admin/contact-info",
    "/admin/contact-form",
    "/admin/dealers/hero",
    "/admin/dealers/video-block",
    "/admin/dealers/how-it-works",
    "/admin/dealers/how-it-works",
    "/admin/dealers/payment-options",
    "/admin/dealers/faq",
    "/admin/dealers/opportunities",
    "/admin/dealers/collaboration-form",
    "/admin/title-agencies/hero",
    "/admin/title-agencies/video-block",
    "/admin/title-agencies/how-it-works",
    "/admin/title-agencies/payment-options",
    "/admin/title-agencies/opportunities",
    "/admin/title-agencies/collaboration-form",
    "/admin/title-agencies/faq",
    "/admin/sellers/hero",
    "/admin/sellers/video-block",
    "/admin/sellers/how-it-works",
    "/admin/sellers/payment-options",
    "/admin/sellers/opportunities",
    "/admin/sellers/collaboration-form",
    "/admin/sellers/faq",
    "/admin/contact-info",
    "/admin/collaboration-form/dealers",
    "/admin/collaboration-form/sellers",
    "/admin/collaboration-form",
    "/admin/communication-form",
    "/admin/collaboration-form/title-agencies",
    "/admin/forgot-password",
    "/admin/password-reset",
    "/admin/reset-password",
    "/admin/reset-success",
  ];

  const menuNavigation = [
    { id: 1, title: "About", link: "/#about" },
    { id: 2, title: "Features", link: "/#features" },
    { id: 3, title: "Advantages", link: "/#advantages" },
    { id: 4, title: "Testimonials", link: "/#testimonials" },
    { id: 5, title: "FAQ", link: "/#faq" },
    {
      id: 6,
      title: "Contacts",
      link:
        path === "/"
          ? "/#contacts"
          : path === "/contacts"
          ? "/contacts/#contact-us"
          : "/contacts/#contacts-us",
    },
  ];

  console.log("path:", path);

  return (
    <>
      {!disableNavWithFooter.includes(path) && (
        <div className={css.footerThumb}>
          <div className={css.footerNavThumb}>
            <Image
              alt="PlateJade logo"
              className={css.footerImage}
              width={160}
              height={57}
              src={WhiteLogo}
            />
            <ul className={css.navLinksList}>
              {menuNavigation.map((item) => (
                <li className={css.navLink} key={item.id}>
                  <Link href={item.link}>{item.title}</Link>
                </li>
              ))}
            </ul>
          </div>
          <p className={css.footerCopyright}>
            <CopyRightIcon className={css.footerCopyrightIcon} /> Copyright
            2024. Plate Jade. All Rights Reserved.
          </p>
        </div>
      )}
    </>
  );
}
