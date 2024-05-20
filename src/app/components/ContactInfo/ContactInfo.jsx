import css from "./ContactInfo.module.css";
import Image from "next/image";
import { PlayIcon } from "../../../../public/assets/images/icons/PlayIcon";
import { AppStoreIcon } from "../../../../public/assets/images/icons/AppStoreIcon";
import { GooglePlayIcon } from "../../../../public/assets/images/icons/GooglePlay";
import phone from "../../../../public/assets/images/icons/phone.svg";
import email from "../../../../public/assets/images/icons/email.svg";
import location from "../../../../public/assets/images/icons/location.svg";
import Twitter from "../../../../public/assets/images/icons/Twitter.svg";
import Instagram from "../../../../public/assets/images/icons/Instagram.svg";
import Discord from "../../../../public/assets/images/icons/Discord.svg";

export default function ContactInfo() {
  const contactsArray = [
    {
      id: 1,
      icon: phone,

      details: "+1012 3456 789",
    },
    {
      id: 2,
      icon: email,
      details: "demo@gmail.com",
    },
    {
      id: 3,
      icon: location,
      details: "132 Dartmouth Street Boston, Massachusetts 02156 United States",
    },
  ];

  const socialMediaIconsArray = [
    {
      id: 1,
      icon: Twitter,
    },
    {
      id: 2,
      icon: Instagram,
    },
    {
      id: 3,
      icon: Discord,
    },
  ];

  return (
    <>
      <section className={css.contactInfoSection}>
        <div className={css.contactIfoDescriptionThumb}>
          <h2 className={css.contactInfoTitle}>Contact Information</h2>
          <p className={css.contactInfoDescription}>Feel free to contact us</p>
        </div>
        <ul className={css.contactList}>
          {contactsArray.map((contact) => (
            <li className={css.contactItem}>
              <Image
                className={css.contactIcon}
                alt="contact icon"
                src={contact.icon}
              />
              {contact.details}
            </li>
          ))}
        </ul>
        <ul className={css.socialMediaIconsList}>
          {socialMediaIconsArray.map((socialMedia) => (
            <li className={css.socialMediaItem}>
              <Image
                className={css.socialMediaIcon}
                alt="platejade social media icon"
                src={socialMedia.icon}
              />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
