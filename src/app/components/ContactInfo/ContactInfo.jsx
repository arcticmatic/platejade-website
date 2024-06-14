import css from "./ContactInfo.module.css";
import Image from "next/image";
import { PlayIcon } from "../images/icons/PlayIcon";
import { AppStoreIcon } from "../images/icons/AppStoreIcon";
import { GooglePlayIcon } from "../images/icons/GooglePlay";
import phone from "../images/icons/phone.svg";
import email from "../images/icons/email.svg";
import location from "../images/icons/location.svg";
import Twitter from "../images/icons/Twitter.svg";
import Instagram from "../images/icons/Instagram.svg";
import Discord from "../images/icons/Discord.svg";

export default function ContactInfo() {
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

  // const socialMediaIconsArray = [
  //   {
  //     id: 1,
  //     icon: Twitter,
  //   },
  //   {
  //     id: 2,
  //     icon: Instagram,
  //   },
  //   {
  //     id: 3,
  //     icon: Discord,
  //   },
  // ];

  return (
    <>
      <section id="contacts-home" className={css.contactInfoSection}>
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
              {contact.link}
            </li>
          ))}
        </ul>
        <ul className={css.socialMediaIconsList}>
          {socialMediaArray.map((socialMedia) => (
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
