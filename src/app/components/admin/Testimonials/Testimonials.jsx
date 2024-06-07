"use client";

import css from "./Testimonials.module.css";
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

export default function Testimonials() {
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
  const [testimonials, setTestimonials] = useState([]);
  const [loadingItems, setLoadingItems] = useState({});
  const [newTestimonials, setNewTestimonials] = useState([]);

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
          isChosen: true,
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

    const fetchTestimonials = async () => {
      try {
        const response = await fetch("/api/testimonials/get-testimonials");
        if (response.ok) {
          const data = await response.json();
          setTestimonials(data.data);
        } else {
          console.error("Failed to fetch work items");
        }
      } catch (error) {
        console.error("Error occurred while fetching work items:", error);
      }
    };

    fetchTestimonials();
  }, [newTestimonials]);

  // const handleInputChange = (e, itemId, field, value) => {
  //   const updatedItems = testimonials.map((item) =>
  //     item.id === itemId ? { ...item, [field]: value } : item
  //   );
  //   setTestimonials(updatedItems);
  // };
  const handleInputChange = (e, itemId, key) => {
    const { value } = e.target;
    setTestimonials((prevTestimonials) =>
      prevTestimonials.map((testimonial) => {
        if (testimonial.id === itemId) {
          return { ...testimonial, [key]: value };
        }
        return testimonial;
      })
    );
  };

  const handleFileChange = async (event, testimonialId) => {
    const file = event.target.files[0];

    setLoadingItems((prevLoadingItems) => ({
      ...prevLoadingItems,
      [testimonialId]: true,
    }));

    if (file) {
      const fileName = `${file.name}_${file.size}`;
      const fileType = file.type;

      const url = await generatePresignedUrl(fileName, fileType);

      if (url) {
        try {
          await uploadFile(file, url);

          const uploadedFileUrl = url.split("?")[0];
          const updatedTestimonials = testimonials.map((testimonial) =>
            testimonial.id === testimonialId
              ? { ...testimonial, icon: uploadedFileUrl }
              : testimonial
          );

          console.log("updated testimonials", updatedTestimonials);

          setTestimonials(updatedTestimonials);
          setLoadingItems((prevLoadingItems) => ({
            ...prevLoadingItems,
            [testimonialId]: false,
          }));
        } catch (error) {
          console.error("Error uploading file:", error);
          setLoadingItems((prevLoadingItems) => ({
            ...prevLoadingItems,
            [testimonialId]: false,
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
        setTestimonials((prevItems) =>
          prevItems.map((testimonial) =>
            testimonial._id === item._id
              ? { ...testimonial, icon: "" }
              : testimonial
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

  const handleAddTestimonial = () => {
    setTestimonials((prevTestimonials) => [
      ...prevTestimonials,
      {
        id: uuidv4(),
        customerName: "",
        customerRole: "",
        text: "",
        icon: "",
      },
    ]);
  };

  const handleRemoveTestimonial = async (testimonial) => {
    if (!testimonial.hasOwnProperty("_id")) {
      setTestimonials((prevTestimonials) =>
        prevTestimonials.filter((item) => item.id !== testimonial.id)
      );
    }

    if (testimonial.hasOwnProperty("_id")) {
      const id = testimonial._id;
      try {
        const response = await fetch(
          `/api/testimonials/delete-testimonials/${id}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          setTestimonials((prevTestimonials) =>
            prevTestimonials.filter((item) => item._id !== testimonial._id)
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
    const newTestimonials = testimonials.filter(
      (testimonial) => !testimonial.hasOwnProperty("_id")
    );
    const existingTestimonials = testimonials.filter((testimonial) =>
      testimonial.hasOwnProperty("_id")
    );

    try {
      for (const testimonial of testimonials) {
        const response = await fetch("/api/testimonials/add-testimonials", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ testimonial }),
        });

        if (response.ok) {
          setIsNotification(true);
        }
        if (!response.ok) {
          throw new Error("Failed to save new slides");
        }
      }

      for (const testimonial of existingTestimonials) {
        const responseUpdate = await fetch(
          `/api/testimonials/edit-testimonials/${testimonial._id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ testimonial }),
          }
        );

        if (responseUpdate.ok) {
          setIsNotification(true);
        }

        if (!responseUpdate.ok) {
          console.error(`Failed to update slide with ID: ${testimonial._id}`);
        }
      }

      if (newTestimonials) {
        setNewTestimonials(newTestimonials);
      }
      if (existingTestimonials) {
        setNewTestimonials(newTestimonials);
      }

      console.log("Testimonials saved successfully");
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
              Testimonials
            </p>
            <Image
              onClick={handleLogout}
              className={css.logoutIcon}
              alt="logout"
              src={LogoutIcon}
            />
          </div>
          <p className={css.heroSectionTitle}>Testimonials</p>
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
            {testimonials.map((item) => (
              <div key={item.id}>
                <label className={css.heroLabel}>
                  Customer name
                  <input
                    className={css.heroTitleInput}
                    placeholder="Enter customer name"
                    value={item.customerName}
                    onChange={(e) =>
                      handleInputChange(
                        e,
                        item.id,
                        "customerName",
                        e.target.value
                      )
                    }
                  />
                </label>
                <label className={css.heroLabel}>
                  Customer position
                  <input
                    className={css.heroTitleInput}
                    placeholder="Enter customer position"
                    value={item.customerRole}
                    onChange={(e) =>
                      handleInputChange(
                        e,
                        item.id,
                        "customerRole",
                        e.target.value
                      )
                    }
                  />
                </label>
                <label className={css.heroLabel}>
                  Customer testimonial
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
                  <p className={css.heroLabelText}>Customer photo</p>
                  <div className={css.heroImagesThumb}>
                    <div className={css.uploadInputThumb}>
                      {loadingItems[item.id] && <TailSpin />}

                      {item.icon && (
                        <Image alt="arrow done" src={CheckMarkGreen} />
                      )}
                      {item.icon && !loadingItems[item.id] ? (
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
                {testimonials.length > 0 && (
                  <button
                    className={css.removeBtn}
                    type="button"
                    onClick={() => handleRemoveTestimonial(item)}
                  >
                    Remove testimonial
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={handleAddTestimonial}
              className={css.addBtn}
            >
              + Add testimonial
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
