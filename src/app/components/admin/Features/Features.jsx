"use client";

import css from "./Features.module.css";
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

export default function Features() {
  const { data: session, status } = useSession();
  const [selectedOption, setSelectedOption] = useState("simple");
  const [isLoading, setIsLoading] = useState(false);
  const [isNotification, setIsNotification] = useState(false);

  if (status === "unauthenticated") {
    redirect("/admin");
  }

  const [selectedPage, setSelectedPage] = useState(null);
  const [selectedPageId, setSelectedPageId] = useState(1);
  const [selectedFile, setSelectedFile] = useState(null);
  const [leftFeatures, setLeftFeatures] = useState([]);
  const [rightFeatures, setRightFeatures] = useState([]);
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
          isChosen: true,
        },
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
        { id: 1, name: "Contact Information", link: "admin/contact-info" },
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

    const fetchLeftFeatures = async () => {
      try {
        const response = await fetch("/api/features/get-left-features");
        if (response.ok) {
          const data = await response.json();
          // console.log("data", data);
          setLeftFeatures(data.data);
        } else {
          console.error("Failed to fetch work items");
        }
      } catch (error) {
        console.error("Error occurred while fetching work items:", error);
      }
    };

    fetchLeftFeatures();

    const fetchRightFeatures = async () => {
      try {
        const response = await fetch("/api/features/get-right-features");
        if (response.ok) {
          const data = await response.json();
          setRightFeatures(data.data);
        } else {
          console.error("Failed to fetch work items");
        }
      } catch (error) {
        console.error("Error occurred while fetching work items:", error);
      }
    };

    fetchRightFeatures();
  }, []);

  const handleInputChange = (e, itemId, field, value) => {
    const updatedItems = leftFeatures.map((item) =>
      item._id === itemId ? { ...item, [field]: value } : item
    );
    setLeftFeatures(updatedItems);

    const updatedRightItems = rightFeatures.map((item) =>
      item._id === itemId ? { ...item, [field]: value } : item
    );
    setRightFeatures(updatedRightItems);
  };

  const handleFileChange = async (e, itemId) => {
    console.log("item id", itemId);
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
      console.log("uploaded file url:", uploadedFileUrl);

      const updatedItems = leftFeatures.map((item) =>
        item._id === itemId ? { ...item, icon: uploadedFileUrl } : item
      );

      setLeftFeatures(updatedItems);

      const updatedRightItems = rightFeatures.map((item) =>
        item._id === itemId ? { ...item, icon: uploadedFileUrl } : item
      );

      setRightFeatures(updatedRightItems);

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

  const handleEditFeature = async (e) => {
    e.preventDefault();

    for (const leftFeature of leftFeatures) {
      const responseUpdate = await fetch(
        `/api/features/edit-left-features/${leftFeature._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ feature: leftFeature }),
        }
      );
      if (responseUpdate.ok) {
        setIsNotification(true);
      }
      if (!responseUpdate.ok) {
        console.error(`Failed to update slide with ID: ${leftFeature._id}`);
      }
    }

    for (const rightFeature of rightFeatures) {
      const responseUpdate = await fetch(
        `/api/features/edit-right-features/${rightFeature._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ feature: rightFeature }),
        }
      );
      if (responseUpdate.ok) {
        setIsNotification(true);
      }
      if (!responseUpdate.ok) {
        console.error(`Failed to update slide with ID: ${rightFeature._id}`);
      }
    }
  };

  const handleDeleteFile = async (item) => {
    console.log("item:", item);
    try {
      const response = await fetch(`/api/s3/delete-file`, {
        method: "PATCH",
        body: JSON.stringify({ url: item.icon }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // console.log("File deleted successfully");
        setLeftFeatures((prevItems) =>
          prevItems.map((leftFeature) =>
            leftFeature._id === item._id
              ? { ...leftFeature, icon: "" }
              : leftFeature
          )
        );
        setRightFeatures((prevItems) =>
          prevItems.map((rightFeature) =>
            rightFeature._id === item._id
              ? { ...rightFeature, icon: "" }
              : rightFeature
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
  };

  const handleLogout = (e) => {
    e.preventDefault();
    signOut();
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
                  selectedPage?.id === page.id ? css.active : ""
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
              Features{" "}
            </p>
            <Image
              onClick={handleLogout}
              className={css.logoutIcon}
              alt="logout"
              src={LogoutIcon}
            />
          </div>
          <p className={css.heroSectionTitle}>Features</p>
          <form onSubmit={(e) => handleEditFeature(e)} className={css.heroForm}>
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
            <p className={css.heroFeaturesType}>Left features</p>

            {leftFeatures.map((item) => (
              <div key={item.id}>
                <label className={css.heroLabel}>
                  Title
                  <input
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
                  <input
                    className={css.heroTextInput}
                    placeholder="Enter description"
                    value={item.text}
                    onChange={(e) =>
                      handleInputChange(e, item._id, "text", e.target.value)
                    }
                  />
                </label>
                <div className={css.heroLabel}>
                  <p className={css.heroLabelText}>Icon</p>
                  <div className={css.heroImagesThumb}>
                    <div className={css.uploadInputThumb}>
                      {loadingItems[item._id] && <TailSpin />}

                      {item.icon && (
                        <Image alt="arrow done" src={CheckMarkGreen} />
                      )}
                      {item.icon && !loadingItems[item._id] ? (
                        <>
                          <p className={css.uploadFileText}>File is uploaded</p>
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
                        !loadingItems[item._id] && (
                          <>
                            <label
                              htmlFor={`file-upload-${item._id}`}
                              className={css.uploadThumb}
                            >
                              <input
                                id={`file-upload-${item._id}`}
                                type="file"
                                className={css.uploadInput}
                                onChange={(e) => handleFileChange(e, item._id)}
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
              </div>
            ))}

            <p className={css.heroFeaturesType}>Right features</p>

            {rightFeatures.map((item) => (
              <div key={item.id}>
                <label className={css.heroLabel}>
                  Title
                  <input
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
                  <input
                    className={css.heroTextInput}
                    placeholder="Enter description"
                    value={item.text}
                    onChange={(e) =>
                      handleInputChange(e, item._id, "text", e.target.value)
                    }
                  />
                </label>
                <div className={css.heroLabel}>
                  <p className={css.heroLabelText}>Icon</p>
                  <div className={css.heroImagesThumb}>
                    <div className={css.uploadInputThumb}>
                      {loadingItems[item._id] && <TailSpin />}

                      {item.icon && (
                        <Image alt="arrow done" src={CheckMarkGreen} />
                      )}
                      {item.icon && !loadingItems[item._id] ? (
                        <>
                          <p className={css.uploadFileText}>File is uploaded</p>
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
                        !loadingItems[item._id] && (
                          <>
                            <label
                              htmlFor={`file-upload-${item._id}`}
                              className={css.uploadThumb}
                            >
                              <input
                                id={`file-upload-${item._id}`}
                                type="file"
                                className={css.uploadInput}
                                onChange={(e) => handleFileChange(e, item._id)}
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
              </div>
            ))}
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
