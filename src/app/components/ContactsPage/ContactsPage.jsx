"use client";

import { useEffect, useState } from "react";
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
import Link from "next/link";

export default function ContactsPage() {
  const [contactsArray, setContactsArray] = useState([]);
  const [socialMediaArray, setSocialMediaArray] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch("/api/contact-info/get-contact-info");
        if (response.ok) {
          const data = await response.json();
          setContactsArray(data.data);
        } else {
          console.error("Failed to fetch work items");
        }
      } catch (error) {
        console.error("Error occurred while fetching work items:", error);
      }
    };

    const fetchSocialMedia = async () => {
      try {
        const response = await fetch("/api/social-media/get-social-media");
        if (response.ok) {
          const data = await response.json();
          console.log("data:", data.data);
          setSocialMediaArray(data.data);
        } else {
          console.error("Failed to fetch work items");
        }
      } catch (error) {
        console.error("Error occurred while fetching work items:", error);
      }
    };

    fetchSocialMedia();
    fetchContacts();
  }, []);

  const iconsArray = [PhoneBlack, EmailBlack, LocationBlack];

  return (
    <>
      <section id="contact-us" className={css.contactsSection}>
        <h2 className={css.contactsTitle}>Contacts</h2>
        <div className={css.contactsAllThumb}>
          <Image
            width="500"
            className={css.contactsPhoto}
            alt="platejade contacts"
            src={contactsPhoto}
          />

          <div className={css.contactUsThumb}>
            <p className={css.contactUsTitle}>Contact Us</p>
            <div className={css.contactsThumb}>
              <ul>
                {contactsArray.map((contact, index) => (
                  <li className={css.contactItem}>
                    <Link className={css.contactLink} href={contact.href}>
                      <Image
                        className={css.contactIcon}
                        alt="contact icon"
                        src={iconsArray[index % iconsArray.length]}
                      />
                      {contact.details}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <ul className={css.socialMediaIconsList}>
              {socialMediaArray.map((socialMedia) => (
                <li className={css.socialMediaItem}>
                  <Link href={socialMedia.link}>
                    <Image
                      width="45"
                      height="45"
                      className={css.socialMediaIcon}
                      alt="platejade social media icon"
                      src={socialMedia.iconContacts}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
