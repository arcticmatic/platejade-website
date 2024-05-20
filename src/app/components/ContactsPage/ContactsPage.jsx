import css from "./ContactsPage.module.css";
import Image from "next/image";
import contactsPhoto from "../images/contactsPhoto.png";
import PhoneBlack from "../images/PhoneBlack.svg";
import EmailBlack from "../images/EmailBlack.svg";
import LocationBlack from "../images/LocationBlack.svg";
import Twitter from "../images/icons/Twitter.svg";
import Instagram from "../images/icons/Instagram.svg";
import Discord from "../images/icons/Discord.svg";
import Facebook from "../images/icons/Facebook.svg";
import Messenger from "../images/icons/Messenger.svg";
import Pinterest from "../images/icons/Pinterest.svg";
import Union from "../images/icons/Union.svg";
import TwitterBlack from "../images/icons/TwitterBlack.svg";
import LinkedIn from "../images/icons/LinkedIn.svg";

export default function ContactsPage() {
  const contactsArray = [
    {
      id: 1,
      icon: PhoneBlack,

      details: "+1012 3456 789",
    },
    {
      id: 2,
      icon: EmailBlack,
      details: "demo@gmail.com",
    },
    {
      id: 3,
      icon: LocationBlack,
      details: "132 Dartmouth Street Boston, Massachusetts 02156 United States",
    },
  ];

  const socialMediaIconsArray = [
    {
      id: 1,
      icon: Facebook,
    },
    {
      id: 2,
      icon: Messenger,
    },
    {
      id: 3,
      icon: Pinterest,
    },
    {
      id: 4,
      icon: Union,
    },
    {
      id: 5,
      icon: TwitterBlack,
    },
    {
      id: 6,
      icon: LinkedIn,
    },
  ];

  return (
    <>
      <section className={css.contactsSection}>
        <h2 className={css.contactsTitle}>Contacts</h2>
        <div className={css.contactsAllThumb}>
          <Image
            className={css.contactsPhoto}
            alt="platejade contacts"
            src={ContactsPhoto}
          />

          <div className={css.contactUsThumb}>
            <p className={css.contactUsTitle}>Contact Us</p>
            <div className={css.contactsThumb}>
              <ul>
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
            </div>
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
          </div>
        </div>
      </section>
    </>
  );
}
