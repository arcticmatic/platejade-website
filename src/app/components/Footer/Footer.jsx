import Link from "next/link";
import css from "./Footer.module.css";
import WhiteLogo from "../../images/WhiteLogo.png";
import Image from "next/image";
import { CopyRightIcon } from "../../images/icons/CopyRightIcon";

export default function Footer() {
  const menuNavigation = [
    { id: 1, title: "About", link: "/" },
    { id: 2, title: "Features", link: "/" },
    { id: 3, title: "Advantages", link: "/title-agency" },
    { id: 4, title: "Testimonials", link: "/sellers" },
    { id: 5, title: "FAQ", link: "/sellers" },
    { id: 6, title: "Contacts", link: "/contacts" },
  ];

  return (
    <>
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
          <CopyRightIcon className={css.footerCopyrightIcon} /> Copyright 2024.
          Plate Jade. All Rights Reserved.
        </p>
      </div>
    </>
  );
}
