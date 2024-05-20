import css from "./ContactForm.module.css";
import Image from "next/image";

export default function ContactForm() {
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
      value: "number",
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

  return (
    <>
      <section className={css.contactFormSection}>
        <div className={css.contactFormDescriptionThumb}>
          <h2 className={css.contactFormTitle}>Contact Us</h2>
          <p className={css.contactInfoDescription}>Feel free to contact us</p>
        </div>
        <form className={css.contactForm}>
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
                className={css.contactInput}
                placeholder={field.placeholder}
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
