import css from "./ContactsPage.module.css";
import Image from "next/image";
import ContactsPhoto from "../../../../public/assets/images/ContactsPhoto.png";
import PhoneBlack from "../../../../public/assets/images/PhoneBlack.svg";
import EmailBlack from "../../../../public/assets/images/EmailBlack.svg";
import LocationBlack from "../../../../public/assets/images/LocationBlack.svg";
import Twitter from "../../../../public/assets/images/icons/Twitter.svg";
import Instagram from "../../../../public/assets/images/icons/Instagram.svg";
import Discord from "../../../../public/assets/images/icons/Discord.svg";
import Facebook from "../../../../public/assets/images/icons/Facebook.svg";
import Messenger from "../../../../public/assets/images/icons/Messenger.svg";
import Pinterest from "../../../../public/assets/images/icons/Pinterest.svg";
import Union from "../../../../public/assets/images/icons/Union.svg";
import TwitterBlack from "../../../../public/assets/images/icons/TwitterBlack.svg";
import LinkedIn from "../../../../public/assets/images/icons/LinkedIn.svg";

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
