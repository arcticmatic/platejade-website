"use client";

import React, { useState, useEffect } from "react";
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
  const [contactsArray, setContactsArray] = useState([]);
  const [socialMediaArray, setSocialMediaArray] = useState([]);
  const [formData, setFormData] = useState({});
  const [formFieldsArray, setFormFieldsArray] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch("/api/contact-info/get-contact-info");
        if (response.ok) {
          const data = await response.json();
          setContactsArray(data.data);
        } else {
          console.error("Failed to fetch contact info");
        }
      } catch (error) {
        console.error("Error occurred while fetching contact info:", error);
      }
    };

    const fetchSocialMedia = async () => {
      try {
        const response = await fetch("/api/social-media/get-social-media");
        if (response.ok) {
          const data = await response.json();
          setSocialMediaArray(data.data);
        } else {
          console.error("Failed to fetch social media info");
        }
      } catch (error) {
        console.error(
          "Error occurred while fetching social media info:",
          error
        );
      }
    };

    const fetchContactFormFields = async () => {
      try {
        const response = await fetch("/api/contact-form/get-contact-form");
        if (response.ok) {
          const data = await response.json();
          setFormFieldsArray(data.data);
          const initialData = {};
          data.data.forEach((field) => {
            initialData[field.value] = "";
          });
          setFormData(initialData);
        } else {
          console.error("Failed to fetch form fields");
        }
      } catch (error) {
        console.error("Error occurred while fetching form fields:", error);
      }
    };

    fetchContactFormFields();
    fetchSocialMedia();
    fetchContacts();
  }, []);

  const iconsArray = [phone, email, location];

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
      // Clear the form fields by resetting the formData
      const initialData = {};
      formFieldsArray.forEach((field) => {
        initialData[field.value] = "";
      });
      setFormData(initialData);
      console.log("Form submitted successfully");
    } else {
      console.log("Failed to submit form");
    }
  };

  return (
    <>
      <section id="contacts" className={css.contactsSection}>
        <div className={css.contactInfoSection}>
          <div className={css.contactIfoDescriptionThumb}>
            <h2 className={css.contactInfoTitle}>Contact Information</h2>
            <p className={css.contactInfoDescription}>
              Feel free to contact us
            </p>
          </div>
          <ul className={css.contactList}>
            {contactsArray.map((contact, index) => (
              <li key={index} className={css.contactItem}>
                <Link
                  target="_blank"
                  className={css.contactLink}
                  href={contact.href}
                >
                  <Image
                    width="25"
                    height="25"
                    className={css.contactIcon}
                    alt="contact icon"
                    src={iconsArray[index % iconsArray.length]}
                  />
                  {contact.details}
                </Link>
              </li>
            ))}
          </ul>
          <ul className={css.socialMediaIconsList}>
            {socialMediaArray.map((socialMedia, index) => (
              <li key={index} className={css.socialMediaItem}>
                <Link target="_blank" href={socialMedia.link}>
                  <Image
                    width="40"
                    height="40"
                    className={css.socialMediaIcon}
                    alt="platejade social media icon"
                    src={socialMedia.iconHome}
                  />
                </Link>
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
                  Thank you for contacting us
                </p>
                <p className={css.notificationDescription}>
                  We will reply you soon
                </p>
              </div>
            )}
            {formFieldsArray.map((field, index) => (
              <label
                key={field.id}
                className={`${css.contactLabel} ${
                  index === formFieldsArray.length - 1
                    ? css.separateLabel
                    : css.contactLabel
                }`}
              >
                {field.name}
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
