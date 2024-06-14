"use client";

import css from "./CommunicationForm.module.css";
import { useState, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import WhiteLogo from "../../images/WhiteLogo.png";
import Newspaper from "../../images/Newspaper.svg";
import NewspaperWhite from "../../images/NewspaperWhite.svg";
import Shell from "../../images/Shell.svg";
import contactsIcon from "../../images/contactsIcon.svg";
import WhiteChevronDown from "../../images/WhiteChevronDown.svg";
import Image from "next/image";
import Link from "next/link";
import ChevronRight from "../../images/ChevronRight.svg";
import UploadIcon from "../../images/UploadIcon.svg";
import LogoutIcon from "../../images/LogoutIcon.svg";
import SlideForm from "@/app/features/SlideForm/SlideForm";
import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";
import ClipBlack from "../../images/ClipBlack.svg";
import TrashIcon from "../../images/TrashIcon.svg";
import Table from "../../images/Table.svg";
import TitleAgencyIcon from "../../images/TitleAgencyIcon.svg";
import SellersIcon from "../../images/SellersIcon.svg";
import ChatIcon from "../../images/ChatIcon.svg";
import searchFormIcon from "../../images/searchFormIcon.svg";
import { redirect } from "next/navigation";

export default function CommunicationForm() {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPage, setSelectedPage] = useState(null);
  const [selectedPageId, setSelectedPageId] = useState(null);
  const [lettersArray, setLettersArray] = useState([]);
  const [fields, setFields] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [newLetters, setNewLetters] = useState("no");

  if (status === "unauthenticated") {
    redirect("/admin");
  }

  useEffect(() => {
    setSelectedPage(pagesArray[0]);

    const fetchLetters = async () => {
      try {
        const response = await fetch("/api/letters/get-letters");
        if (response.ok) {
          const data = await response.json();
          setLettersArray(data.data);
        } else {
          console.error("Failed to fetch work items");
        }
      } catch (error) {
        console.error("Error occurred while fetching work items:", error);
      }
    };

    const fetchFields = async () => {
      try {
        const response = await fetch("/api/contact-form/get-contact-form");
        if (response.ok) {
          const data = await response.json();
          setFields(data.data);
        } else {
          console.error("Failed to fetch work items");
        }
      } catch (error) {
        console.error("Error occurred while fetching work items:", error);
      }
    };

    fetchFields();
    fetchLetters();
  }, [newLetters]);

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
          name: "ContactForm",
          link: "/admin/collaboration-form",
          isChosen: true,
        },
      ],
    },
    {
      id: 2,
      name: "Dealers",
      icon: Shell,
      activeIcon: "",
      navLinks: [
        { id: 1, name: "Hero section", link: "/admin/dealers/hero" },
        { id: 2, name: "Video block", link: "/admin/dealers/video-block" },
        { id: 3, name: "How it works", link: "/admin/dealers/how-it-works" },
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
    setSelectedPage(pagesArray[0]);
  }, []);

  const handlePageClick = (page) => {
    setSelectedPage(selectedPage?.id === page.id ? null : page);
    setSelectedPageId(selectedPage?.id === page.id ? null : page.id);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    signOut();
  };

  const filterObject = (obj) => {
    const filteredEntries = Object.entries(obj).filter(
      ([key, value]) => !["createdAt", "updatedAt", "_id", "__v"].includes(key)
    );
    return Object.fromEntries(filteredEntries);
  };

  const handleDelete = async (id, index) => {
    try {
      const response = await fetch(`/api/letters/delete-letters/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setLettersArray((prev) => prev.filter((_, i) => i !== index));
        setNewLetters("");
      } else {
        console.error("Failed to delete item");
      }
    } catch (error) {
      console.error("Error occurred while deleting item:", error);
    }
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredLetters = lettersArray.filter((item) => {
    const values = Object.values(item).join("").toLowerCase();
    return values.includes(searchQuery.toLowerCase());
  });

  const orderArray = fields.map((item) => item.value);

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
              <Link
                className={css.navItemTextActive}
                href="/admin/communication-form"
              >
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
              <p className={css.communicationFormTitle}>Cooperation form</p>
              <Image
                onClick={handleLogout}
                className={css.logoutIcon}
                alt="logout"
                src={LogoutIcon}
              />
            </div>
            <div className={css.searchThumb}>
              <Image className={css.searchIcon} src={searchFormIcon} />
              <input
                type="text"
                className={css.searchText}
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchInputChange}
              />
            </div>
            <div className={css.communicationFormsThumb}>
              <ul className={css.navFormList}>
                {fields.map((item) => (
                  <li
                    className={
                      item.name !== "Message"
                        ? css.navFormItemTitle
                        : css.navFormItemTitleLast
                    }
                    key={item.id}
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
              <ul className={css.navFormValuesList}>
                {filteredLetters.map((item, index) => (
                  <li className={css.navFormValue} key={index}>
                    {orderArray.map(
                      (key) =>
                        key !== "_id" &&
                        key !== "updatedAt" &&
                        key !== "createdAt" &&
                        key !== "__v" && (
                          <p
                            className={
                              key !== "message"
                                ? css.navFormItem
                                : css.navFormItemLast
                            }
                            key={key}
                          >
                            {item[key]}
                          </p>
                        )
                    )}
                    <div className={css.trashIconThumb}>
                      <Image
                        src={TrashIcon}
                        onClick={() => handleDelete(item._id, index)}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
