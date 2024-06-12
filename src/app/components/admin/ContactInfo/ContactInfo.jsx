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

export default function Opportunities() {
  const { data: session, status } = useSession();
  const [selectedOption, setSelectedOption] = useState("simple");
  const [isLoading, setIsLoading] = useState(false);
  const [isNotification, setIsNotification] = useState(false);

  if (status === "unauthenticated") {
    redirect("/admin");
  }

  const [selectedPage, setSelectedPage] = useState(null);
  const [selectedPageId, setSelectedPageId] = useState(3);
  const [selectedFile, setSelectedFile] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [loadingItems, setLoadingItems] = useState({});
  const [loadingContactsItems, setLoadingContactsItems] = useState({});
  const [newContacts, setNewContacts] = useState([]);
  const [socialMediaArray, setSocialMediaArray] = useState([]);
  const [newSocialMedia, setNewSocialMedia] = useState([]);

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
          name: "Testimonials",
          link: "/admin/home/testimonials",
        },
        {
          id: 7,
          name: "FAQ",
          link: "/admin/home/faq",
        },
        {
          id: 8,
          name: "Download block",
          link: "/admin/home/download",
        },
        {
          id: 9,
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
        {
          id: 7,
          name: "FAQ",
          link: "/admin/dealers/faq",
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
          link: "/admin/contact-info",
          isChosen: true,
        },
      ],
    },
    {
      id: 4,
      name: "Forms",
      icon: contactsIcon,
      activeIcon: contactsIcon,
      navLinks: [
        {
          id: 1,
          name: "Dealers",
          link: "/admin/contact-info",
          // isChosen: true,
        },
        {
          id: 2,
          name: "Title Agencies",
          link: "/admin/contact-info",
          // isChosen: true,
        },
        {
          id: 3,
          name: "Sellers",
          link: "/admin/contact-info",
          // isChosen: true,
        },
      ],
    },
  ];

  useEffect(() => {
    setSelectedPage(pagesArray[2]);

    const fetchContacts = async () => {
      try {
        const response = await fetch("/api/contact-info/get-contact-info");
        if (response.ok) {
          const data = await response.json();
          setContacts(data.data);
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
  }, [newContacts, newSocialMedia]);

  const handleInputChange = (e, itemId, key) => {
    const { value } = e.target;
    setContacts((prevContacts) => {
      return prevContacts.map((contact) => {
        if (contact.id === itemId) {
          return { ...contact, [key]: value };
        }
        return contact;
      });
    });
    setSocialMediaArray((prevArray) => {
      return prevArray.map((socialMedia) => {
        if (socialMedia.id === itemId) {
          return { ...socialMedia, [key]: value };
        }
        return socialMedia;
      });
    });
  };

  const handleFileChange = async (event, socialMediaId, type) => {
    const file = event.target.files[0];

    if (file) {
      if (type === "iconHome") {
        setLoadingItems((prevLoadingItems) => ({
          ...prevLoadingItems,
          [socialMediaId]: true,
        }));
      } else if (type === "iconContacts") {
        setLoadingContactsItems((prevLoadingItems) => ({
          ...prevLoadingItems,
          [socialMediaId]: true,
        }));
      }

      const fileName = `${file.name}_${file.size}`;
      const fileType = file.type;

      const url = await generatePresignedUrl(fileName, fileType);

      if (url) {
        try {
          await uploadFile(file, url);

          const uploadedFileUrl = url.split("?")[0];

          setSocialMediaArray((prevArray) =>
            prevArray.map((socialMedia) =>
              socialMedia.id === socialMediaId
                ? {
                    ...socialMedia,
                    [type]: uploadedFileUrl,
                  }
                : socialMedia
            )
          );

          // setNewSocialMedia([]);

          setLoadingItems((prevLoadingItems) => ({
            ...prevLoadingItems,
            [socialMediaId]: false,
          }));

          setLoadingContactsItems((prevLoadingItems) => ({
            ...prevLoadingItems,
            [socialMediaId]: false,
          }));
        } catch (error) {
          console.error("Error uploading file:", error);

          setLoadingItems((prevLoadingItems) => ({
            ...prevLoadingItems,
            [socialMediaId]: false,
          }));
          setLoadingContactsItems((prevLoadingItems) => ({
            ...prevLoadingItems,
            [socialMediaId]: false,
          }));
        }
      } else {
        console.error("Failed to generate pre-signed URL");

        setLoadingItems((prevLoadingItems) => ({
          ...prevLoadingItems,
          [socialMediaId]: false,
        }));
        setLoadingContactsItems((prevLoadingItems) => ({
          ...prevLoadingItems,
          [socialMediaId]: false,
        }));
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

  const handleDeleteFile = async (item, type) => {
    try {
      const response = await fetch(`/api/s3/delete-file`, {
        method: "PATCH",
        body: JSON.stringify({
          url: type === "iconHome" ? item.iconHome : item.iconContacts,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok && type === "iconHome") {
        setSocialMediaArray((prevItems) =>
          prevItems.map((socialMedia) =>
            socialMedia._id === item._id
              ? { ...socialMedia, iconHome: "" }
              : socialMedia
          )
        );
      }
      if (response.ok && type === "iconContacts") {
        setSocialMediaArray((prevItems) =>
          prevItems.map((socialMedia) =>
            socialMedia._id === item._id
              ? { ...socialMedia, iconContacts: "" }
              : socialMedia
          )
        );
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

  const handleAddSocialMedia = () => {
    setSocialMediaArray((prevSocialMedia) => [
      ...prevSocialMedia,
      {
        id: uuidv4(),
        link: "",
        iconHome: "",
        iconContacts: "",
      },
    ]);
  };

  const handleRemoveSocialMedia = async (socialMedia) => {
    if (!socialMedia.hasOwnProperty("_id")) {
      setSocialMediaArray((prevSocialMedia) =>
        prevSocialMedia.filter((item) => item.id !== socialMedia.id)
      );
    } else {
      const id = socialMedia._id;
      try {
        const response = await fetch(
          `/api/social-media/delete-social-media/${id}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          setSocialMediaArray((prevSocialMedia) =>
            prevSocialMedia.filter((item) => item._id !== socialMedia._id)
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
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const existingContacts = contacts.filter((contact) =>
      contact.hasOwnProperty("_id")
    );
    const newSocialMedia = socialMediaArray.filter(
      (socialMedia) => !socialMedia.hasOwnProperty("_id")
    );
    const existingSocialMedia = socialMediaArray.filter((socialMedia) =>
      socialMedia.hasOwnProperty("_id")
    );

    try {
      for (const contact of existingContacts) {
        const responseUpdate = await fetch(
          `/api/contact-info/edit-contact-info/${contact._id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ contact }),
          }
        );
      }

      for (const socialMedia of newSocialMedia) {
        const response = await fetch(`/api/social-media/add-social-media`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ socialMedia }),
        });

        if (!response.ok) {
          throw new Error("Failed to save new slides");
        }
      }

      for (const socialMedia of existingSocialMedia) {
        const responseUpdate = await fetch(
          `/api/social-media/edit-social-media/${socialMedia._id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ socialMedia }),
          }
        );
      }

      setIsNotification(true);
      setNewSocialMedia([]);

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
          </div>
          <div className={css.heroThumb}>
            <div className={css.heroTitleThumb}>
              <p className={css.heroTitle}>
                Contacts
                <Image
                  className={css.chevron}
                  alt="chevron right"
                  src={ChevronRight}
                />
                Contacts
              </p>
              <Image
                onClick={handleLogout}
                className={css.logoutIcon}
                alt="logout"
                src={LogoutIcon}
              />
            </div>
            <p className={css.heroSectionTitle}> Contacts</p>
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
              {contacts.map((item) => (
                <div key={item.id}>
                  <label className={css.heroLabelTitle}>
                    {item.type}
                    <input
                      className={css.heroTitleInput}
                      placeholder="Enter phone number"
                      value={item.details}
                      onChange={(e) =>
                        handleInputChange(e, item.id, "details", e.target.value)
                      }
                    />
                  </label>
                  <label className={css.heroLabel}>
                    Link
                    <input
                      className={css.heroTitleInput}
                      placeholder="Enter the link"
                      value={item.href}
                      onChange={(e) =>
                        handleInputChange(e, item.id, "href", e.target.value)
                      }
                    />
                  </label>
                </div>
              ))}
              {socialMediaArray.map((item, index) => (
                <>
                  <div key={item.id}>
                    <p className={css.heroLabelTitle}>
                      Social media {index + 1}
                    </p>
                    <label className={css.heroLabel}>
                      Link
                      <input
                        className={css.heroTitleInput}
                        placeholder="Enter the link"
                        value={item.link}
                        onChange={(e) =>
                          handleInputChange(e, item.id, "link", e.target.value)
                        }
                      />
                    </label>
                  </div>
                  <div className={css.heroLabel}>
                    <p className={css.heroLabelText}>Home page icon</p>
                    <div className={css.heroImagesThumb}>
                      <div className={css.uploadInputThumb}>
                        {loadingItems[item.id] && <TailSpin />}

                        {item.iconHome && (
                          <Image alt="arrow done" src={CheckMarkGreen} />
                        )}
                        {item.iconHome && !loadingItems[item.id] ? (
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
                              {item.iconHome.split("/").pop()}
                              <Image
                                className={css.uploadedDeleteCross}
                                alt="delete cross"
                                onClick={() =>
                                  handleDeleteFile(item, "iconHome")
                                }
                                src={CrossRed}
                              />
                            </p>
                          </>
                        ) : (
                          !loadingItems[item.id] &&
                          !item.iconHome && (
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
                                    handleFileChange(e, item.id, "iconHome")
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
                    <p>Contacts page icon</p>
                    <div className={css.heroImagesThumb}>
                      <div className={css.uploadInputThumb}>
                        {loadingContactsItems[item.id] && <TailSpin />}

                        {item.iconContacts && (
                          <Image alt="arrow done" src={CheckMarkGreen} />
                        )}
                        {item.iconContacts && !loadingContactsItems[item.id] ? (
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
                              {item.iconContacts.split("/").pop()}
                              <Image
                                className={css.uploadedDeleteCross}
                                alt="delete cross"
                                onClick={() =>
                                  handleDeleteFile(item, "iconContacts")
                                }
                                src={CrossRed}
                              />
                            </p>
                          </>
                        ) : (
                          !loadingContactsItems[item.id] && (
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
                                    handleFileChange(e, item.id, "iconContacts")
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
                  {socialMediaArray.length > 0 && (
                    <button
                      className={css.addBtn}
                      type="button"
                      onClick={() => handleRemoveSocialMedia(item)}
                    >
                      Remove social media
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handleAddSocialMedia}
                    className={css.addBtn}
                  >
                    + Add social media
                  </button>
                </>
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
      )}
    </>
  );
}
