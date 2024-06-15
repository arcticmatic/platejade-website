"use client";

import css from "./CollaborationForm.module.css";
import { useState, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import WhiteLogo from "../../../images/WhiteLogo.png";
import Newspaper from "../../../images/Newspaper.svg";
import NewspaperWhite from "../../../images/NewspaperWhite.svg";
import Shell from "../../../images/Shell.svg";
import contactsIcon from "../../../images/contactsIcon.svg";
import WhiteChevronDown from "../../../images/WhiteChevronDown.svg";
import WhiteChevronTop from "../../../images/WhiteChevronTop.svg";
import Image from "next/image";
import Link from "next/link";
import ChevronRight from "../../../images/ChevronRight.svg";
import UploadIcon from "../../../images/UploadIcon.svg";
import LogoutIcon from "../../../images/LogoutIcon.svg";
import { redirect } from "next/navigation";
import SlideForm from "@/app/features/SlideForm/SlideForm";
import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";
import { TailSpin } from "react-loader-spinner";
import ClipBlack from "../../../images/ClipBlack.svg";
import CrossRed from "../../../images/CrossRed.svg";
import CheckMarkGreen from "../../../images/CheckMarkGreen.svg";
import XClose from "../../../images/XClose.svg";
import TitleAgencyIcon from "../../../images/TitleAgencyIcon.svg";
import SellersIcon from "../../../images/SellersIcon.svg";
import ChatIcon from "../../../images/ChatIcon.svg";
import Table from "../../../images/Table.svg";

export default function CollaborationForm() {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [isNotification, setIsNotification] = useState(false);

  if (status === "unauthenticated") {
    redirect("/admin");
  }

  const [selectedPage, setSelectedPage] = useState(null);
  const [selectedPageId, setSelectedPageId] = useState(4);
  const [selectedFile, setSelectedFile] = useState(null);
  const [contactFormArray, setContactFormArray] = useState([]);
  const [advantagesArray, setAdvantagesArray] = useState([]);
  const [loadingItems, setLoadingItems] = useState({});
  const [newFields, setNewFields] = useState([]);
  const [dropdownList, setDropdownList] = useState([]);
  const [description, setDescription] = useState({
    _id: "",
    text: "",
  });

  const pagesArray = [
    {
      id: 1,
      name: "Home",
      icon: NewspaperWhite,
      activeIcon: Newspaper,
      navLinks: [
        { id: 1, name: "Hero section", link: "/admin/home" },
        { id: 2, name: "Video block", link: "/admin/home/video-block" },
        { id: 3, name: "How it works", link: "/admin/home/how-it-works" },
        { id: 4, name: "Features", link: "/admin/home/features" },
        { id: 5, name: "Advantages", link: "/admin/home/advantages" },
        { id: 6, name: "Testimonials", link: "/admin/home/testimonials" },
        { id: 7, name: "FAQ", link: "/admin/home/faq" },
        { id: 8, name: "Download", link: "/admin/home/download" },
        {
          id: 9,
          name: "Contact form",
          link: "/admin/collaboration-form",
        },
      ],
    },
    {
      id: 2,
      name: "Dealers",
      icon: Shell,
      activeIcon: "",
      navLinks: [
        {
          id: 1,
          name: "Hero section",
          link: "/admin/dealers/hero",
        },
        {
          id: 2,
          name: "Video block",
          link: "/admin/dealers/video-block",
        },
        {
          id: 3,
          name: "How it works",
          link: "/admin/dealers/how-it-works",
        },
        {
          id: 4,
          name: "Payment options",
          link: "/admin/dealers/payment-options",
        },
        { id: 5, name: "Opportunites", link: "/admin/dealers/opportunities" },
        {
          id: 6,
          name: "Collaboration form",
          link: "/admin/dealers/collaboration-form",
        },
        { id: 7, name: "FAQ", link: "/admin/dealers/faq" },
      ],
    },
    {
      id: 3,
      name: "Title Agencies",
      icon: TitleAgencyIcon,
      activeIcon: "",
      navLinks: [
        { id: 1, name: "Hero section", link: "/admin/title-agencies/hero" },
        {
          id: 2,
          name: "Video block",
          link: "/admin/title-agencies/video-block",
        },
        {
          id: 3,
          name: "How it works",
          link: "/admin/title-agencies/how-it-works",
        },
        {
          id: 4,
          name: "Payment options",
          link: "/admin/title-agencies/payment-options",
        },
        {
          id: 5,
          name: "Opportunites",
          link: "/admin/title-agencies/opportunities",
        },
        {
          id: 6,
          name: "Collaboration form",
          link: "/admin/title-agencies/collaboration-form",
        },
        { id: 7, name: "FAQ", link: "/admin/title-agencies/faq" },
      ],
    },
    {
      id: 4,
      name: "Sellers",
      icon: SellersIcon,
      activeIcon: "",
      navLinks: [
        { id: 1, name: "Hero section", link: "/admin/sellers/hero" },
        { id: 2, name: "Video block", link: "/admin/sellers/video-block" },
        { id: 3, name: "How it works", link: "/admin/sellers/how-it-works" },
        {
          id: 4,
          name: "Payment options",
          link: "/admin/sellers/payment-options",
        },
        { id: 5, name: "Opportunites", link: "/admin/sellers/opportunities" },
        {
          id: 6,
          name: "Collaboration form",
          link: "/admin/sellers/collaboration-form",
          isChosen: true,
        },
        { id: 7, name: "FAQ", link: "/admin/sellers/faq" },
      ],
    },
    {
      id: 5,
      name: "Contacts",
      icon: contactsIcon,
      activeIcon: contactsIcon,
      navLinks: [
        { id: 1, name: "Contact Information", link: "/admin/contact-info" },
      ],
    },
    {
      id: 6,
      name: "Forms",
      icon: Table,
      activeIcon: contactsIcon,
      navLinks: [
        { id: 1, name: "Dealers", link: "/admin/collaboration-form/dealers" },
        {
          id: 2,
          name: "Title Agencies",
          link: "/admin/collaboration-form/title-agencies",
        },
        { id: 3, name: "Sellers", link: "/admin/collaboration-form/sellers" },
      ],
    },
  ];

  useEffect(() => {
    setSelectedPage(pagesArray[3]);

    const fetchContactFields = async () => {
      try {
        const response = await fetch(
          "/api/dealers/collaboration-form/get-collaboration-form"
        );
        if (response.ok) {
          const data = await response.json();
          const filteredItems = data.data.filter(
            (item) => item.page === "sellers"
          );
          setContactFormArray(filteredItems);
        } else {
          console.error("Failed to fetch work items");
        }
      } catch (error) {
        console.error("Error occurred while fetching work items:", error);
      }
    };

    const fetchDescription = async () => {
      try {
        const response = await fetch(
          "/api/forms-description/get-forms-description"
        );
        if (response.ok) {
          const data = await response.json();
          setDescription(data.data[2]);
        } else {
          console.error("Failed to fetch work items");
        }
      } catch (error) {
        console.error("Error occurred while fetching work items:", error);
      }
    };

    fetchDescription();
    fetchContactFields();
  }, [newFields]);

  const handleInputChange = (e, itemId, field, value) => {
    const updatedItems = contactFormArray.map((item) =>
      item.id === itemId ? { ...item, [field]: value } : item
    );
    setContactFormArray(updatedItems);
  };

  const handleDropdownChange = (index, optionIndex, value) => {
    setContactFormArray((prevItems) => {
      const updatedItems = [...prevItems];
      if (updatedItems[index] && updatedItems[index].dropdownListOptions) {
        const updatedOptions = [...updatedItems[index].dropdownListOptions];
        updatedOptions[optionIndex] = value;
        updatedItems[index].dropdownListOptions = updatedOptions;
      }
      return updatedItems;
    });
  };

  const handleDescriptionChange = (e) => {
    setDescription({
      ...description,
      text: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newFields = contactFormArray.filter(
      (field) => !field.hasOwnProperty("_id")
    );
    const existingFields = contactFormArray.filter((field) =>
      field.hasOwnProperty("_id")
    );

    try {
      const response = await fetch(
        `/api/forms-description/edit-forms-description/${description._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ description }),
        }
      );

      for (const field of newFields) {
        const response = await fetch(
          "/api/dealers/collaboration-form/add-collaboration-form",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ field }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to save new slides");
        }
      }

      for (const field of existingFields) {
        const responseUpdate = await fetch(
          `/api/dealers/collaboration-form/edit-collaboration-form/${field._id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ contact: field }),
          }
        );

        setIsNotification(true);

        setNewFields([]);
      }
    } catch (error) {
      console.error("Error occurred while saving slides:", error);
    }
  };

  const handlePageClick = (page) => {
    setSelectedPage(selectedPage?.id === page.id ? null : page);
    setSelectedPageId(selectedPage?.id === page.id ? null : page.id);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    signOut();
  };

  const handleAddField = () => {
    setContactFormArray((prevItems) => [
      ...prevItems,
      { id: uuidv4(), name: "", placeholder: "", value: "" },
    ]);
  };

  const handleRemoveField = async (field) => {
    if (!field.hasOwnProperty("_id")) {
      setContactFormArray((prevFields) =>
        prevFields.filter((item) => item.id !== field.id)
      );
    } else {
      const id = field._id;
      try {
        const response = await fetch(
          `/api/dealers/collaboration-form/delete-collaboration-form/${id}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          setContactFormArray((prevFields) =>
            prevFields.filter((item) => item._id !== field._id)
          );
          console.log("Field is deleted successfully");
        } else {
          console.error("Failed to delete opportunity");
        }
      } catch (error) {
        console.error("Error occurred while deleting opportunity:", error);
      }
    }
  };

  return (
    <>
      {status === "authenticated" && (
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
            <div className={css.formsThumb}>
              <Link className={css.navItem} href="/admin/communication-form">
                <Image
                  className={css.navLinkIcon}
                  alt="cooperation form"
                  src={ChatIcon}
                />
                Communication form
              </Link>
            </div>
          </div>
          <div className={css.heroThumb}>
            <div className={css.heroTitleThumb}>
              <p className={css.heroTitle}>
                Sellers
                <Image
                  className={css.chevron}
                  alt="chevron right"
                  src={ChevronRight}
                />
                Collaboration form
              </p>
              <Image
                onClick={handleLogout}
                className={css.logoutIcon}
                alt="logout"
                src={LogoutIcon}
              />
            </div>
            <p className={css.heroSectionTitle}> Collaboration form</p>
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

              <label className={css.heroLabel}>
                Form description
                <input
                  className={css.heroTextInput}
                  placeholder="Enter form description"
                  value={description.text}
                  onChange={handleDescriptionChange}
                />
              </label>

              {contactFormArray.map((item, index) => (
                <>
                  <div key={item.id}>
                    <label className={css.heroLabel}>
                      Form field
                      <input
                        className={css.heroTitleInput}
                        placeholder="Enter form field name"
                        value={item.name}
                        onChange={(e) =>
                          handleInputChange(e, item.id, "name", e.target.value)
                        }
                      />
                    </label>
                    <label className={css.heroLabel}>
                      <p className={css.heroText}>
                        Value
                        <span className={css.heroLabelSubText}>
                          (type only one word with first letter lowercase)
                        </span>
                      </p>
                      <input
                        className={css.heroTitleInput}
                        placeholder="Enter the value"
                        value={item.value}
                        onChange={(e) =>
                          handleInputChange(e, item.id, "value", e.target.value)
                        }
                      />
                    </label>
                    <label className={css.heroLabel}>
                      <p className={css.heroText}>
                        Placeholder
                        <span className={css.heroSubText}>
                          (will be shown before user enters the text)
                        </span>
                      </p>
                      <input
                        className={css.heroTitleInput}
                        placeholder="Enter placeholder"
                        value={item.placeholder}
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            item.id,
                            "placeholder",
                            e.target.value
                          )
                        }
                      />
                    </label>
                    {item.dropdownListOptions && (
                      <p className={css.heroText}>List options</p>
                    )}
                    {item.dropdownListOptions &&
                      item.dropdownListOptions.map((option, optionIndex) => (
                        <>
                          <label className={css.heroLabel}>
                            <input
                              className={css.heroTitleInput}
                              placeholder="Enter the option"
                              value={option}
                              onChange={(e) =>
                                handleDropdownChange(
                                  index,
                                  optionIndex,
                                  e.target.value
                                )
                              }
                            />
                          </label>
                        </>
                      ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveField(item)}
                    className={css.fieldBtn}
                  >
                    Remove field
                  </button>
                </>
              ))}
              <button
                type="button"
                onClick={handleAddField}
                className={css.fieldBtn}
              >
                Add field
              </button>

              <div className={css.advantagesBtnThumb}>
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
      )}
    </>
  );
}
