"use client";

import css from "./Opportunities.module.css";
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
import Table from "../../../images/Table.svg";
import TitleAgencyIcon from "../../../images/TitleAgencyIcon.svg";
import SellersIcon from "../../../images/SellersIcon.svg";
import ChatIcon from "../../../images/ChatIcon.svg";

export default function Opportunities() {
  const { data: session, status } = useSession();
  const [selectedOption, setSelectedOption] = useState("simple");
  const [isLoading, setIsLoading] = useState(false);
  const [isNotification, setIsNotification] = useState(false);

  if (status === "unauthenticated") {
    redirect("/admin");
  }

  const [selectedPage, setSelectedPage] = useState(null);
  const [selectedPageId, setSelectedPageId] = useState(4);
  const [selectedFile, setSelectedFile] = useState(null);
  const [opportunities, setOpportunities] = useState([]);
  const [loadingItems, setLoadingItems] = useState({});
  const [newOpportunities, setNewOpportunities] = useState([]);

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
          name: "Contact Form",
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
        {
          id: 5,
          name: "Opportunites",
          link: "/admin/dealers/opportunities",
        },
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
        {
          id: 5,
          name: "Opportunites",
          link: "/admin/sellers/opportunities",
          isChosen: true,
        },
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
        { id: 1, name: "Contact Information", link: "admin/contact-info" },
      ],
    },
    {
      id: 6,
      name: "Forms",
      icon: Table,
      activeIcon: contactsIcon,
      navLinks: [
        {
          id: 1,
          name: "Dealers",
          link: "/admin/collaboration-form/dealers",
        },
        {
          id: 2,
          name: "Title Agencies",
          link: "/admin/collaboration-form/title-agencies",
        },
        {
          id: 3,
          name: "Sellers",
          link: "/admin/collaboration-form/sellers",
        },
      ],
    },
  ];

  useEffect(() => {
    setSelectedPage(pagesArray[3]);

    const fetchOpportunities = async () => {
      try {
        const response = await fetch(
          "/api/dealers/opportunities/get-opportunities"
        );
        if (response.ok) {
          const data = await response.json();
          const filteredItems = data.data.filter(
            (item) => item.page === "sellers"
          );
          setOpportunities(filteredItems);
        } else {
          console.error("Failed to fetch work items");
        }
      } catch (error) {
        console.error("Error occurred while fetching work items:", error);
      }
    };

    fetchOpportunities();
  }, [newOpportunities]);

  const handleInputChange = (e, itemId, key) => {
    const { value } = e.target;
    setOpportunities((prevOpportunities) => {
      const opportunityWithMainTextExists = prevOpportunities.some(
        (opportunity) => opportunity.mainText && opportunity.id !== itemId
      );

      return prevOpportunities.map((opportunity) => {
        if (opportunity.id === itemId) {
          if (key === "mainText" && opportunityWithMainTextExists) {
            alert("Only one opportunity can have mainText at a time.");
            return opportunity;
          }
          return { ...opportunity, [key]: value };
        }
        return opportunity;
      });
    });
  };

  const handleFileChange = async (event, opportunityId) => {
    const file = event.target.files[0];

    setLoadingItems((prevLoadingItems) => ({
      ...prevLoadingItems,
      [opportunityId]: true,
    }));

    if (file) {
      const fileName = `${file.name}_${file.size}`;
      const fileType = file.type;

      const url = await generatePresignedUrl(fileName, fileType);

      if (url) {
        try {
          await uploadFile(file, url);

          const uploadedFileUrl = url.split("?")[0];
          const updatedOpportunities = opportunities.map((opportunity) =>
            opportunity.id === opportunityId
              ? { ...opportunity, icon: uploadedFileUrl }
              : opportunity
          );

          setOpportunities(updatedOpportunities);
          setLoadingItems((prevLoadingItems) => ({
            ...prevLoadingItems,
            [opportunityId]: false,
          }));
        } catch (error) {
          console.error("Error uploading file:", error);
          setLoadingItems((prevLoadingItems) => ({
            ...prevLoadingItems,
            [opportunityId]: false,
          }));
        }
      } else {
        console.error("Failed to generate pre-signed URL");
      }
    } else {
      console.warn("No file selected");
    }
  };

  const generatePresignedUrl = async (fileName, fileType) => {
    try {
      const response = await fetch("/api/s3/upload-file-admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: fileName, type: fileType }),
      });

      if (!response.ok) {
        throw new Error("Failed to get pre-signed URL");
      }

      const data = await response.json();
      return data.url;
    } catch (error) {
      console.error("Error generating pre-signed URL:", error);
      return null;
    }
  };

  const uploadFile = async (file, url) => {
    try {
      await fetch(url, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      });
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
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
        setOpportunities((prevItems) =>
          prevItems.map((opportunity) =>
            opportunity._id === item._id
              ? { ...opportunity, icon: "" }
              : opportunity
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

  const handleAddOpportunity = () => {
    setOpportunities((prevOpportunities) => [
      ...prevOpportunities,
      {
        id: uuidv4(),
        // customerName: "",
        // customerRole: "",
        text: "",
        icon: "",
        page: "sellers",
      },
    ]);
  };

  const handleRemoveOpportunity = async (opportunity) => {
    if (!opportunity.hasOwnProperty("_id")) {
      setOpportunities((prevOpportunities) =>
        prevOpportunities.filter((item) => item.id !== opportunity.id)
      );
    } else {
      const id = opportunity._id;
      try {
        const response = await fetch(
          `/api/dealers/opportunities/delete-opportunities/${id}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          setOpportunities((prevOpportunities) =>
            prevOpportunities.filter((item) => item._id !== opportunity._id)
          );
          console.log("Opportunity is deleted successfully");
        } else {
          console.error("Failed to delete opportunity");
        }
      } catch (error) {
        console.error("Error occurred while deleting opportunity:", error);
      }
    }
  };

  const handleRemoveMainText = async (opportunity) => {
    const updatedOpportunity = { ...opportunity, mainText: "" };

    try {
      const response = await fetch(
        `/api/dealers/opportunities/edit-opportunities/${opportunity._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ opportunity: updatedOpportunity }),
        }
      );

      if (response.ok) {
        setOpportunities((prevOpportunities) =>
          prevOpportunities.map((item) =>
            item._id === opportunity._id ? { ...item, mainText: "" } : item
          )
        );
        console.log("MainText removed successfully");
      } else {
        console.error("Failed to remove mainText");
      }
    } catch (error) {
      console.error("Error occurred while removing mainText:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newOpportunities = opportunities.filter(
      (opportunity) => !opportunity.hasOwnProperty("_id")
    );
    const existingOpportunities = opportunities.filter((opportunity) =>
      opportunity.hasOwnProperty("_id")
    );

    try {
      for (const opportunity of newOpportunities) {
        const response = await fetch(
          "/api/dealers/opportunities/add-opportunities",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ opportunity }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to save new slides");
        }
      }

      for (const opportunity of existingOpportunities) {
        const responseUpdate = await fetch(
          `/api/dealers/opportunities/edit-opportunities/${opportunity._id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ opportunity }),
          }
        );

        if (!responseUpdate.ok) {
          console.error(`Failed to update slide with ID: ${opportunity._id}`);
        }
      }

      setIsNotification(true);
      if (newOpportunities) {
        setNewOpportunities([]);
      }

      console.log(" saved successfully");
    } catch (error) {
      console.error("Error occurred while saving slides:", error);
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
                Home
                <Image
                  className={css.chevron}
                  alt="chevron right"
                  src={ChevronRight}
                />
                Opportunities
              </p>
              <Image
                onClick={handleLogout}
                className={css.logoutIcon}
                alt="logout"
                src={LogoutIcon}
              />
            </div>
            <p className={css.heroSectionTitle}> Opportunities</p>
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

              {opportunities.map((item) => (
                <div key={item.id}>
                  {(item.mainText || item.mainText === "") && (
                    <>
                      <label className={css.heroLabel}>
                        Description
                        <input
                          className={css.heroTitleInput}
                          type="text"
                          placeholder="Main Text"
                          value={item.mainText}
                          onChange={(e) =>
                            handleInputChange(e, item.id, "mainText")
                          }
                        />
                      </label>
                      <button
                        className={css.addBtn}
                        type="button"
                        onClick={() => handleRemoveMainText(item)}
                      >
                        Remove description
                      </button>
                    </>
                  )}
                  <label className={css.heroLabel}>
                    Title
                    <input
                      className={css.heroTitleInput}
                      placeholder="Enter title"
                      value={item.title}
                      onChange={(e) =>
                        handleInputChange(e, item.id, "title", e.target.value)
                      }
                    />
                  </label>
                  <label className={css.heroLabel}>
                    Text
                    <input
                      className={css.heroTextInput}
                      placeholder="Enter description"
                      value={item.text}
                      onChange={(e) =>
                        handleInputChange(e, item.id, "text", e.target.value)
                      }
                    />
                  </label>
                  <div className={css.heroLabel}>
                    <p className={css.heroLabelText}>Photo</p>
                    <div className={css.heroImagesThumb}>
                      <div className={css.uploadInputThumb}>
                        {loadingItems[item.id] && <TailSpin />}

                        {item.icon && (
                          <Image alt="arrow done" src={CheckMarkGreen} />
                        )}
                        {item.icon && !loadingItems[item.id] ? (
                          <>
                            <p className={css.uploadFileText}>
                              File is uploaded
                            </p>
                            <p className={css.uploadedVideoName}>
                              <Image
                                className={css.uploadedClip}
                                alt="uploaded clip"
                                src={ClipBlack}
                              />
                              {item.icon.split("/").pop()}
                              <Image
                                className={css.uploadedDeleteCross}
                                alt="delete cross"
                                onClick={() => handleDeleteFile(item)}
                                src={CrossRed}
                              />
                            </p>
                          </>
                        ) : (
                          !loadingItems[item.id] && (
                            <>
                              <label
                                htmlFor={`file-upload-${item._id}`}
                                className={css.uploadThumb}
                              >
                                <input
                                  id={`file-upload-${item._id}`}
                                  type="file"
                                  className={css.uploadInput}
                                  onChange={(e) => handleFileChange(e, item.id)}
                                />
                                <Image
                                  className={css.uploadIcon}
                                  alt="upload"
                                  src={UploadIcon}
                                />
                                Select a file
                              </label>
                              <p className={css.uploadText}>or</p>
                              <p className={css.uploadFileText}>
                                Drag and drop a file here
                              </p>
                            </>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                  {opportunities.length > 0 && (
                    <button
                      className={css.removeBtn}
                      type="button"
                      onClick={() => handleRemoveOpportunity(item)}
                    >
                      Remove opportunity
                    </button>
                  )}
                </div>
              ))}

              <button
                type="button"
                onClick={handleAddOpportunity}
                className={css.addBtn}
              >
                + Add opportunity
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
      )}
    </>
  );
}
