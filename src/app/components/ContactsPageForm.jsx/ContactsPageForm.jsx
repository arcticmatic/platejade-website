"use client";

import css from "./ContactsPageForm.module.css";
import { useState } from "react";
import Image from "next/image";
import XClose from "../images/XClose.svg";

export default function ContactsPageForm() {
  const [isNotification, setIsNotification] = useState(false);

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
      <section className={css.contactFormSection}>
        <div className={css.contactFormDescriptionThumb}>
          <h2 className={css.contactFormTitle}>Let`s Talk!</h2>
          <p className={css.contactInfoDescription}>Feel free to contact us</p>
        </div>
        <form onSubmit={handleSubmit} className={css.contactForm}>
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
      </section>
    </>
  );
}
