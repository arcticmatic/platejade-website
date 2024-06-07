"use client";

import React, { useState } from "react";
import css from "./ContactForm.module.css";
import Image from "next/image";
import XClose from "../images/XClose.svg";
import { PlayIcon } from "../images/icons/PlayIcon";
import { AppStoreIcon } from "../images/icons/AppStoreIcon";
import { GooglePlayIcon } from "../images/icons/GooglePlay";
import phone from "../images/icons/phone.svg";
import email from "../images/icons/email.svg";
import location from "../images/icons/location.svg";
import Twitter from "../images/icons/Twitter.svg";
import Instagram from "../images/icons/Instagram.svg";
import Discord from "../images/icons/Discord.svg";
import Link from "next/link";

export default function ContactForm() {
  const [isNotification, setIsNotification] = useState(false);

  const contactsArray = [
    {
      id: 1,
      icon: phone,
      details: "+1-954-710-1500",
      href: "tel:+1-954-710-1500",
    },
    {
      id: 2,
      icon: email,
      details: "info@platejade.com",
      href: "mailto:info@platejade.com",
    },
    {
      id: 3,
      icon: location,
      details: "201 SE 2nd Ave Miami, Florida 33131 United States",
      href: "#contact-form",
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

  const fromFieldsArray = [
    {
      id: 1,
      label: "First Name",
      placeholder: "First Name",
      value: "firstName",
    },
    {
      id: 2,
      label: "Last Name",
      placeholder: "Last Name",
      value: "lastName",
    },
    {
      id: 3,
      label: "Phone Number",
      placeholder: "+1 012 3456 789",
      value: "phone",
    },
    {
      id: 4,
      label: "Email",
      placeholder: "Enter your email",
      value: "email",
    },
    {
      id: 5,
      label: "Message",
      placeholder: "Message",
      value: "message",
    },
  ];

  const initialFormData = {
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    message: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/letters/add-letter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setIsNotification(true);
      setFormData(initialFormData);
    } else {
      console.log("Failed to submit form");
    }
  };

  return (
    <>
      <section id="contact-form" className={css.contactsSection}>
        <div className={css.contactInfoSection}>
          <div className={css.contactIfoDescriptionThumb}>
            <h2 className={css.contactInfoTitle}>Contact Information</h2>
            <p className={css.contactInfoDescription}>
              Feel free to contact us
            </p>
          </div>
          <ul className={css.contactList}>
            {contactsArray.map((contact) => (
              <li className={css.contactItem}>
                <Link className={css.contactLink} href={contact.href}>
                  <Image
                    className={css.contactIcon}
                    alt="contact icon"
                    src={contact.icon}
                  />
                  {contact.details}
                </Link>
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
        </div>
        <div className={css.contactFormSection}>
          <div className={css.contactFormDescriptionThumb}>
            <h2 className={css.contactFormTitle}>Contact Us</h2>
            <p className={css.contactUsDescription}>Feel free to contact us</p>
          </div>
          <form className={css.contactForm} onSubmit={handleSubmit}>
            {isNotification && (
              <div className={css.notificationThumb}>
                <Image
                  onClick={() => setIsNotification(false)}
                  className={css.notificationCloseIcon}
                  src={XClose}
                />
                <p className={css.notificationText}>
                  Thank you for your application
                </p>
                <p className={css.notificationDescription}>
                  We will review it as soon as possible and contact you soon
                </p>
              </div>
            )}
            {fromFieldsArray.map((field, index) => (
              <label
                key={field.id}
                className={`${css.contactLabel} ${
                  index === fromFieldsArray.length - 1
                    ? css.separateLabel
                    : css.contactLabel
                }`}
              >
                {field.label}
                <input
                  name={field.value}
                  className={css.contactInput}
                  placeholder={field.placeholder}
                  value={formData[field.value]}
                  onChange={handleInputChange}
                />
              </label>
            ))}
            <button type="submit" className={css.submitContactFormBtn}>
              Submit
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
