"use client";

import css from "./Advantages.module.css";
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
import Table from "../../images/Table.svg";
import TitleAgencyIcon from "../../images/TitleAgencyIcon.svg";
import SellersIcon from "../../images/SellersIcon.svg";
import ChatIcon from "../../images/ChatIcon.svg";

export default function Advantages() {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [isNotification, setIsNotification] = useState(false);

  if (status === "unauthenticated") {
    redirect("/admin");
  }

  const [selectedPage, setSelectedPage] = useState(null);
  const [selectedPageId, setSelectedPageId] = useState(1);
  const [selectedFile, setSelectedFile] = useState(null);
  const [advantagesArray, setAdvantagesArray] = useState([]);
  const [loadingItems, setLoadingItems] = useState({});

  const pagesArray = [
    {
      id: 1,
      name: "Home",
      icon: NewspaperWhite,
      activeIcon: Newspaper,
      navLinks: [
        { id: 1, name: "Hero section", link: "/admin/home" },
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
          isChosen: true,
        },
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

    const fetchAdvantages = async () => {
      try {
        const response = await fetch("/api/advantages/get-advantages");
        if (response.ok) {
          const data = await response.json();
          setAdvantagesArray(data.data);
        } else {
          console.error("Failed to fetch work items");
        }
      } catch (error) {
        console.error("Error occurred while fetching work items:", error);
      }
    };

    fetchAdvantages();
  }, []);

  const handleInputChange = (e, itemId, field, value) => {
    const updatedItems = advantagesArray.map((item) =>
      item._id === itemId ? { ...item, [field]: value } : item
    );
    setAdvantagesArray(updatedItems);
  };

  const handleFileChange = async (e, itemId) => {
    const selectedFile = e.target.files[0];

    e.preventDefault();
    if (!selectedFile || !itemId) return;

    setIsLoading(true);
    setLoadingItems((prevLoadingItems) => ({
      ...prevLoadingItems,
      [itemId]: true,
    }));

    try {
      const uploadResponse = await fetch("/api/s3/upload-file-admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: selectedFile.name,
          type: selectedFile.type,
        }),
      });

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload file");
      }

      const { url } = await uploadResponse.json();

      const uploadRes = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": selectedFile.type,
        },
        body: selectedFile,
      });

      if (!uploadRes.ok) {
        throw new Error("Failed to upload file to S3");
      }

      const uploadedFileUrl = uploadRes.url.split("?")[0];

      const updatedItems = workItems.map((item) =>
        item._id === itemId ? { ...item, icon: uploadedFileUrl } : item
      );

      setWorkItems(updatedItems);

      setIsLoading(false);
      setLoadingItems((prevLoadingItems) => ({
        ...prevLoadingItems,
        [itemId]: false,
      }));
    } catch (error) {
      setIsLoading(false);
      setLoadingItems((prevLoadingItems) => ({
        ...prevLoadingItems,
        [itemId]: false,
      }));
      console.error("Error uploading file:", error);
    }
  };

  const handleEditAdvantage = async (e) => {
    e.preventDefault();

    for (const advantage of advantagesArray) {
      const responseUpdate = await fetch(
        `/api/advantages/edit-advantages/${advantage._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ advantage }),
        }
      );
      if (responseUpdate.ok) {
        setIsNotification(true);
      }
      if (!responseUpdate.ok) {
        console.error(`Failed to update slide with ID: ${advantage._id}`);
      }
    }
  };

  const handleDeleteFile = async (item) => {
    try {
      const response = await fetch(`/api/s3/delete-file`, {
        method: "PATCH",
        body: JSON.stringify({ url: item.icon }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("File deleted successfully");
        setWorkItems((prevItems) =>
          prevItems.map((workItem) =>
            workItem._id === item._id ? { ...workItem, icon: "" } : workItem
          )
        );
      } else {
        console.error("Failed to delete file");
      }
    } catch (error) {
      console.error("Error occurred while deleting file:", error);
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
                Home
                <Image
                  className={css.chevron}
                  alt="chevron right"
                  src={ChevronRight}
                />
                Advantages
              </p>
              <Image
                onClick={handleLogout}
                className={css.logoutIcon}
                alt="logout"
                src={LogoutIcon}
              />
            </div>
            <p className={css.heroSectionTitle}> Advantages</p>
            <form onSubmit={handleEditAdvantage} className={css.heroForm}>
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

              {advantagesArray.map((item) => (
                <div key={item.id}>
                  {item.mainTitle && (
                    <label className={css.heroLabel}>
                      Main page text
                      <textarea
                        className={css.heroTitleInput}
                        placeholder="Enter title"
                        value={item.mainTitle}
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            item._id,
                            "mainTitle",
                            e.target.value
                          )
                        }
                      />
                    </label>
                  )}
                  <label className={css.heroLabel}>
                    Title
                    <textarea
                      className={css.heroTitleInput}
                      placeholder="Enter title"
                      value={item.title}
                      onChange={(e) =>
                        handleInputChange(e, item._id, "title", e.target.value)
                      }
                    />
                  </label>
                  <label className={css.heroLabel}>
                    Text
                    <textarea
                      className={css.heroTextInput}
                      placeholder="Enter description"
                      value={item.text}
                      onChange={(e) =>
                        handleInputChange(e, item._id, "text", e.target.value)
                      }
                    />
                  </label>
                </div>
              ))}
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
