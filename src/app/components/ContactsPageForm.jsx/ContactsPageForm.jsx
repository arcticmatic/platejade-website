"use client";

import css from "./ContactsPageForm.module.css";
import { useState, useEffect } from "react";
import Image from "next/image";
import XClose from "../images/XClose.svg";

export default function ContactsPageForm() {
  const [isNotification, setIsNotification] = useState(false);
  const [formFieldsArray, setFormFieldsArray] = useState([]);
  const [formData, setFormData] = useState({});

  useEffect(() => {
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
  }, []);

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
      </section>
    </>
  );
}
