"use client";

import css from "./ContactInfo.module.css";
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

export default function ContactInfo() {
  const { data: session, status } = useSession();
  const [selectedOption, setSelectedOption] = useState("simple");
  const [isLoading, setIsLoading] = useState(false);
  const [isNotification, setIsNotification] = useState(false);
  const [selectedPage, setSelectedPage] = useState(null);
  const [selectedPageId, setSelectedPageId] = useState(1);
  const [selectedFile, setSelectedFile] = useState(null);
  const [workItems, setWorkItems] = useState([]);
  const [loadingItems, setLoadingItems] = useState({});

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
          name: "Contact info",
          link: "/admin/home/contact-info",
          isChosen: true,
        },
        { id: 10, name: "Contact form", link: "/admin/home/contact-form" },
      ],
    },
    {
      id: 2,
      name: "Dealers",
      icon: Shell,
      activeIcon: "",
      navLinks: [
        { id: 1, name: "Hero section", link: "/admin/home" },
        { id: 2, name: "Video block", link: "/admin/home/video-block" },
        { id: 3, name: "How it works", link: "/admin/home/how-it-works" },
        { id: 4, name: "Payment options", link: "/payment-options" },
        { id: 5, name: "Opportunites", link: "/opportunities" },
        { id: 6, name: "Collaboration form", link: "/collaboration-form" },
        { id: 7, name: "FAQ", link: "/faq" },
      ],
    },
    {
      id: 3,
      name: "Contacts",
      icon: contactsIcon,
      activeIcon: contactsIcon,
      navLinks: [
        { id: 1, name: "Contact Information", link: "/contact-info" },
        { id: 2, name: "Collaboration form", link: "/collaboration-form" },
      ],
    },
  ];

  useEffect(() => {
    setSelectedPage(pagesArray[0]);

    const fetchWorkItems = async () => {
      try {
        const response = await fetch("/api/contact-info/get-contact-info");
        if (response.ok) {
          const data = await response.json();
          setWorkItems(data.data);
        } else {
          console.error("Failed to fetch work items");
        }
      } catch (error) {
        console.error("Error occurred while fetching work items:", error);
      }
    };

    fetchWorkItems();
  }, []);

  const handleInputChange = (e, itemId, field, value) => {
    const updatedItems = workItems.map((item) =>
      item._id === itemId ? { ...item, [field]: value } : item
    );
    setWorkItems(updatedItems);
  };

  const handleSocialMediaChange = (
    e,
    itemId,
    socialMediaIndex,
    field,
    value
  ) => {
    const updatedItems = workItems.map((item) => {
      if (item._id === itemId) {
        const updatedSocialMedia = item.socialMedia.map((socialItem, index) =>
          index === socialMediaIndex
            ? { ...socialItem, [field]: value }
            : socialItem
        );
        return { ...item, socialMedia: updatedSocialMedia };
      }
      return item;
    });
    setWorkItems(updatedItems);
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

  const handleEditWorkItem = async (e) => {
    e.preventDefault();

    for (const workItem of workItems) {
      console.log("work item:", workItem);
      const responseUpdate = await fetch(
        `/api/contact-info/edit-contact-info/${workItem._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contact: workItem,
          }),
        }
      );
      if (responseUpdate.ok) {
        setIsNotification(true);
      } else {
        console.error(`Failed to update slide with ID: ${workItem._id}`);
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
              Home{" "}
              <Image
                className={css.chevron}
                alt="chevron right"
                src={ChevronRight}
              />
              How it works
            </p>
            <Image
              onClick={handleLogout}
              className={css.logoutIcon}
              alt="logout"
              src={LogoutIcon}
            />
          </div>
          <p className={css.heroSectionTitle}>How it works</p>
          <form onSubmit={handleEditWorkItem} className={css.heroForm}>
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
            {workItems.map((item) => (
              <div key={item._id}>
                <label className={css.heroLabel}>
                  Phone
                  <input
                    className={css.heroTitleInput}
                    placeholder="Enter contact phone"
                    value={item.phone}
                    onChange={(e) =>
                      handleInputChange(e, item._id, "phone", e.target.value)
                    }
                  />
                </label>
                <label className={css.heroLabel}>
                  <Link href={item.email}> E-mail</Link>
                  <input
                    className={css.heroTextInput}
                    placeholder="Enter the e-mail"
                    value={item.email}
                    onChange={(e) =>
                      handleInputChange(e, item._id, "email", e.target.value)
                    }
                  />
                </label>
                <label className={css.heroLabel}>
                  Location
                  <input
                    className={css.heroTextInput}
                    placeholder="Enter the location"
                    value={item.location}
                    onChange={(e) =>
                      handleInputChange(e, item._id, "location", e.target.value)
                    }
                  />
                </label>
                <p className={css.heroLabel}>Social media</p>
                {item.socialMedia.map((socialItem, index) => (
                  <div key={index} className={css.heroLabel}>
                    <label className={css.heroLabel}>
                      Media name
                      <input
                        className={css.heroTextInput}
                        placeholder="Enter the social media name"
                        value={socialItem.mediaName}
                        onChange={(e) =>
                          handleSocialMediaChange(
                            e,
                            item._id,
                            index,
                            "mediaName",
                            e.target.value
                          )
                        }
                      />
                    </label>
                    <label className={css.heroLabel}>
                      Media link
                      <input
                        className={css.heroTextInput}
                        placeholder="Enter the social media link"
                        value={socialItem.link}
                        onChange={(e) =>
                          handleSocialMediaChange(
                            e,
                            item._id,
                            index,
                            "link",
                            e.target.value
                          )
                        }
                      />
                    </label>
                    <p className={css.heroLabelText}>Icon</p>
                    <div className={css.heroImagesThumb}>
                      <div className={css.uploadInputThumb}>
                        {loadingItems[item._id] && <TailSpin />}

                        {socialItem.icon && (
                          <Image alt="arrow done" src={CheckMarkGreen} />
                        )}
                        {socialItem.icon && !loadingItems[item._id] ? (
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
                              {socialItem.icon.split("/").pop()}
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
                                  onChange={(e) =>
                                    handleFileChange(e, item._id)
                                  }
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
                ))}
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
