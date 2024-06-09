"use client";

import css from "./FAQ.module.css";
import { useState, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import WhiteLogo from "../../images/WhiteLogo.png";
import Newspaper from "../../images/Newspaper.svg";
import NewspaperWhite from "../../images/NewspaperWhite.svg";
import Shell from "../../images/Shell.svg";
import contactsIcon from "../../images/contactsIcon.svg";
import WhiteChevronDown from "../../images/WhiteChevronDown.svg";
import WhiteChevronTop from "../../images/WhiteChevronTop.svg";
import Image from "next/image";
import Link from "next/link";
import ChevronRight from "../../images/ChevronRight.svg";
import UploadIcon from "../../images/UploadIcon.svg";
import LogoutIcon from "../../images/LogoutIcon.svg";
import { redirect } from "next/navigation";
import SlideForm from "@/app/features/SlideForm/SlideForm";
import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";
import { TailSpin } from "react-loader-spinner";
import ClipBlack from "../../images/ClipBlack.svg";
import CrossRed from "../../images/CrossRed.svg";
import CheckMarkGreen from "../../images/CheckMarkGreen.svg";
import XClose from "../../images/XClose.svg";

export default function FAQ() {
  const { data: session, status } = useSession();
  const [selectedOption, setSelectedOption] = useState("simple");
  const [isLoading, setIsLoading] = useState(false);
  const [isNotification, setIsNotification] = useState(false);

  // if (status !== "loading" && !session) {
  //   redirect("/admin");
  // }
  const [selectedPage, setSelectedPage] = useState(null);
  const [selectedPageId, setSelectedPageId] = useState(1);
  const [selectedFile, setSelectedFile] = useState(null);
  const [newFaqs, setNewFaqs] = useState([]);
  const [FAQSArray, setFAQSArray] = useState([]);
  const [loadingItems, setLoadingItems] = useState({});

  const pagesArray = [
    {
      id: 1,
      name: "Home",
      icon: NewspaperWhite,
      activeIcon: Newspaper,
      navLinks: [
        {
          id: 1,
          name: "Hero section",
          link: "/admin/home",
        },
        {
          id: 2,
          name: "Video block",
          link: "/admin/home/video-block",
        },
        {
          id: 3,
          name: "How it works",
          link: "/admin/home/how-it-works",
        },
        {
          id: 4,
          name: "Features",
          link: "/admin/home/features",
        },
        {
          id: 5,
          name: "Advantages",
          link: "/admin/home/advantages",
        },

        {
          id: 6,
          name: "FAQ",
          link: "/admin/home/faq",
          isChosen: true,
        },
        {
          id: 7,
          name: "Download block",
          link: "/admin/home/download",
        },
        {
          id: 8,
          name: "Contacts",
          link: "/admin/home/contacts",
        },
      ],
    },
    {
      id: 2,
      name: "Dealers",
      activeIcon: Shell,
      icon: Shell,
      activeIcon: "",
      navLinks: [
        {
          id: 1,
          name: "Hero section",
          link: "/admin/home",
        },
        {
          id: 2,
          name: "Video block",
          link: "/admin/home/video-block",
        },
        {
          id: 3,
          name: "How it works",
          link: "/admin/home/how-it-works",
        },
        {
          id: 4,
          name: "Payment options",
          link: "/payment-options",
        },
        {
          id: 5,
          name: "Opportunites",
          link: "/opportunities",
        },

        {
          id: 6,
          name: "Collaboration form",
          link: "/admin/home/collaboration-form",
        },
        {
          id: 7,
          name: "FAQ",
          link: "/admin/home/faq",
        },
      ],
    },
    {
      id: 3,
      name: "Contacts",
      icon: contactsIcon,
      activeIcon: contactsIcon,
      navLinks: [
        {
          id: 1,
          name: "Contact Information",
          link: "/contact-info",
        },
        {
          id: 2,
          name: "Collaboration form",
          link: "/collaboration-form",
        },
      ],
    },
  ];

  useEffect(() => {
    setSelectedPage(pagesArray[0]);

    const fetchFaqs = async () => {
      try {
        const response = await fetch("/api/faq/home/get-faqs");
        if (response.ok) {
          const data = await response.json();
          setFAQSArray(data.data);
        } else {
          console.error("Failed to fetch work items");
        }
      } catch (error) {
        console.error("Error occurred while fetching work items:", error);
      }
    };

    fetchFaqs();
  }, [newFaqs]);

  const handleInputChange = (e, itemId, field, value) => {
    const updatedItems = FAQSArray.map((item) =>
      item.id === itemId ? { ...item, [field]: value } : item
    );
    setFAQSArray(updatedItems);
  };

  const handlePageClick = (page) => {
    setSelectedPage(selectedPage?.id === page.id ? null : page);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    signOut();
  };

  const handleAddFaq = () => {
    setFAQSArray((prevFAQSArray) => [
      ...prevFAQSArray,
      {
        id: uuidv4(),
        title: "",
        text: "",
      },
    ]);
  };

  const handleRemoveFaq = async (faq) => {
    if (!faq.hasOwnProperty("_id")) {
      setFAQSArray((prevFAQSArray) =>
        prevFAQSArray.filter((item) => item.id !== faq.id)
      );
    }

    if (faq.hasOwnProperty("_id")) {
      const id = faq._id;
      try {
        const response = await fetch(`/api/faq/home/delete-faqs/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setFAQSArray((prevFAQSArray) =>
            prevFAQSArray.filter((item) => item._id !== faq._id)
          );
          console.log("Testimonial is deleted successfully");
        } else {
          console.error("Failed to delete slide");
        }
      } catch (error) {
        console.error("Error occurred while deleting slide:", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newFAQSArray = FAQSArray.filter((faq) => !faq.hasOwnProperty("_id"));
    const existingFAQSArray = FAQSArray.filter((faq) =>
      faq.hasOwnProperty("_id")
    );

    try {
      for (const faq of newFAQSArray) {
        const responseNew = await fetch("/api/faq/home/add-faqs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ faq }),
        });

        if (responseNew.ok) {
          setIsNotification(true);
          setNewFaqs("");
        }
        if (!responseNew.ok) {
          throw new Error("Failed to save new faqs");
        }
      }

      for (const faq of existingFAQSArray) {
        const responseUpdate = await fetch(
          `/api/faq/home/edit-faqs/${faq._id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ faq }),
          }
        );

        if (!responseUpdate.ok) {
          console.error(`Failed to update slide with ID: ${faq._id}`);
        }
      }

      if (newFAQSArray) {
        setNewFaqs("");
      }

      console.log("FAQSArray saved successfully");
    } catch (error) {
      console.error("Error occurred while saving slides:", error);
    }
  };
  return (
    <>
      <section className={css.navSection}>
        <div className={css.navThumb}>
          <Image
            className={css.logoIcon}
            alt="platejade logo"
            src={WhiteLogo}
          />
          <ul className={css.pageList}>
            {pagesArray.map((page) => (
              <li
                key={page.id}
                className={`${css.navItem} ${
                  selectedPageId === page.id ? css.active : ""
                }`}
              >
                <div
                  className={
                    selectedPageId === page.id
                      ? css.navItemTextActive
                      : css.navItemText
                  }
                >
                  <p className={css.navItemText}>
                    <Image
                      className={css.navItemIcon}
                      alt="option icon"
                      src={page.icon}
                    />
                    {page.name}
                  </p>
                  <Image
                    onClick={() => handlePageClick(page)}
                    className={
                      selectedPageId === page.id
                        ? css.chevronIconRotated
                        : css.chevronIcon
                    }
                    src={WhiteChevronDown}
                  />
                </div>
                {selectedPage && selectedPageId === page.id && (
                  <ul>
                    {selectedPage.navLinks.map((link) => (
                      <li className={css.navItem} key={link.id}>
                        <Link
                          className={!link.isChosen ? "" : css.navItemChosen}
                          href={link.link}
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className={css.heroThumb}>
          <div className={css.heroTitleThumb}>
            <p className={css.heroTitle}>
              Home
              <Image
                className={css.chevron}
                alt="chevron right"
                src={ChevronRight}
              />
              FAQ
            </p>
            <Image
              onClick={handleLogout}
              className={css.logoutIcon}
              alt="logout"
              src={LogoutIcon}
            />
          </div>
          <p className={css.heroSectionTitle}>FAQ</p>
          <form onSubmit={handleSubmit} className={css.heroForm}>
            {isNotification && (
              <div className={css.notificationThumb}>
                <Image
                  onClick={() => setIsNotification(false)}
                  className={css.notificationCloseIcon}
                  src={XClose}
                />
                <p className={css.notificationText}>
                  You have successfully updated this block
                </p>
              </div>
            )}
            {FAQSArray.map((item) => (
              <div key={item.id}>
                <label className={css.heroLabel}>
                  Question
                  <input
                    className={css.heroTitleInput}
                    placeholder="Enter the question"
                    value={item.title}
                    onChange={(e) =>
                      handleInputChange(e, item.id, "title", e.target.value)
                    }
                  />
                </label>
                <label className={css.heroLabel}>
                  Answer
                  <input
                    className={css.heroTextInput}
                    placeholder="Enter the answer"
                    value={item.text}
                    onChange={(e) =>
                      handleInputChange(e, item.id, "text", e.target.value)
                    }
                  />
                </label>

                {FAQSArray.length > 0 && (
                  <button
                    className={css.removeBtn}
                    type="button"
                    onClick={() => handleRemoveFaq(item)}
                  >
                    Remove FAQ
                  </button>
                )}
              </div>
            ))}

            <button type="button" onClick={handleAddFaq} className={css.addBtn}>
              + Add FAQ
            </button>
            <div>
              <button type="button" className={css.cancelBtn}>
                Cancel
              </button>
              <button type="submit" className={css.saveBtn}>
                Save
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
