"use client";

import Link from "next/link";
import css from "./Footer.module.css";
import WhiteLogo from "../images/WhiteLogo.png";
import Image from "next/image";
import { CopyRightIcon } from "../images/icons/CopyRightIcon";
import { usePathname } from "next/navigation";

export default function Footer() {
  const path = usePathname();

  const disableNavWithFooter = ["/admin", "/admin/home", "/admin/reset"];

  const menuNavigation = [
    { id: 1, title: "About", link: "/#about" },
    { id: 2, title: "Features", link: "/#features" },
    { id: 3, title: "Advantages", link: "/#advantages" },
    { id: 4, title: "Testimonials", link: "/#testimonials" },
    { id: 5, title: "FAQ", link: "/#faq" },
    { id: 6, title: "Contacts", link: "/#contacts" },
  ];

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
