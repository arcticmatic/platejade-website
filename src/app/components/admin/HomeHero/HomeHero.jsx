"use client";

import css from "./HomeHero.module.css";
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
import XClose from "../../images/XClose.svg";
import Table from "../../images/Table.svg";
import TitleAgencyIcon from "../../images/TitleAgencyIcon.svg";
import SellersIcon from "../../images/SellersIcon.svg";
import ChatIcon from "../../images/ChatIcon.svg";

export default function HomeHero() {
  const { data: session, status } = useSession();
  const [selectedOption, setSelectedOption] = useState("simple");
  const [loadingItems, setLoadingItems] = useState({});
  const [loadingAdditionalItems, setLoadingAdditionalItems] = useState({});
  const [isNotification, setIsNotification] = useState(false);
  const [newSlides, setNewSlides] = useState([]);

  if (status === "unauthenticated") {
    redirect("/admin");
  }

  const [selectedPage, setSelectedPage] = useState(null);
  const [selectedPageId, setSelectedPageId] = useState(1);
  const [selectedFile, setSelectedFile] = useState(null);
  const [addiionalFile, setAdditionalFile] = useState(null);

  const [slides, setSlides] = useState([]);
  const pagesArray = [
    {
      id: 1,
      name: "Home",
      icon: NewspaperWhite,
      activeIcon: Newspaper,
      navLinks: [
        { id: 1, name: "Hero section", link: "/admin/home", isChosen: true },
        { id: 2, name: "Video block", link: "/admin/home/video-block" },
        { id: 3, name: "How it works", link: "/admin/home/how-it-works" },
        { id: 4, name: "Features", link: "/admin/home/features" },
        { id: 5, name: "Advantages", link: "/admin/home/advantages" },
        { id: 6, name: "Testimonials", link: "/admin/home/testimonials" },
        { id: 7, name: "FAQ", link: "/admin/home/faq" },
        { id: 8, name: "Download", link: "/admin/home/download" },
        { id: 9, name: "ContactForm", link: "/admin/collaboration-form" },
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

    const fetchSlides = async () => {
      try {
        const response = await fetch("/api/about/get-about");
        if (response.ok) {
          const data = await response.json();
          const existingSlides = data.slides.map((slide) => ({
            ...slide,
          }));
          setSlides(existingSlides);
        } else {
          console.error("Failed to fetch slides");
        }
      } catch (error) {
        console.error("Error fetching slides:", error);
      }
      // finally {
      //   setLoading(false);
      // }
    };

    fetchSlides();
  }, [newSlides]);

  const handleAddSlide = () => {
    setSlides((prevSlides) => [
      ...prevSlides,
      {
        id: uuidv4(),
        title: "",
        description: [""],
        imageSrc: "",
        backgroundSrc: "",
      },
    ]);
  };

  const handleRemoveSlide = async (slide) => {
    if (!slide.hasOwnProperty("_id")) {
      setSlides((prevSlides) =>
        prevSlides.filter((item) => item.id !== slide.id)
      );
    }

    if (slide.hasOwnProperty("_id")) {
      const id = slide._id;
      try {
        const response = await fetch(`/api/about/delete-slide/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setSlides((prevSlides) =>
            prevSlides.filter((item) => item.id !== slide.id)
          );
          console.log("Slide deleted successfully");
        } else {
          console.error("Failed to delete slide");
        }
      } catch (error) {
        console.error("Error occurred while deleting slide:", error);
      }
    }
  };

  const handleInputChange = (e, slideId, key) => {
    const { value } = e.target;
    setSlides((prevSlides) =>
      prevSlides.map((slide) => {
        if (slide.id === slideId) {
          return { ...slide, [key]: value };
        }
        return slide;
      })
    );
  };

  const handleDescriptionChange = (e, slideId, index) => {
    const { value } = e.target;
    setSlides((prevSlides) =>
      prevSlides.map((slide) => {
        if (slide.id === slideId) {
          const newDescriptions = [...slide.description];
          newDescriptions[index] = value;
          return { ...slide, description: newDescriptions };
        }
        return slide;
      })
    );
  };

  const addDescription = (slideId) => {
    setSlides((prevSlides) =>
      prevSlides.map((slide) => {
        if (slide.id === slideId) {
          return { ...slide, description: [...slide.description, ""] };
        }
        return slide;
      })
    );
  };

  const removeDescription = (slideId, index) => {
    setSlides((prevSlides) =>
      prevSlides.map((slide) => {
        if (slide.id === slideId) {
          const newDescriptions = slide.description.filter(
            (_, descIndex) => descIndex !== index
          );
          return { ...slide, description: newDescriptions };
        }
        return slide;
      })
    );
  };

  const handleFileChange = async (slideId, event, type) => {
    const file = event.target.files[0];
    console.log("type:", type);

    if (type === "imageSrc") {
      setLoadingItems((prevLoadingItems) => ({
        ...prevLoadingItems,
        [slideId]: true,
      }));
    }
    if (type === "backgroundSrc") {
      setLoadingAdditionalItems((prevLoadingItems) => ({
        ...prevLoadingItems,
        [slideId]: true,
      }));
    }

    if (file) {
      const fileName = `${file.name}_${file.size}`;
      const fileType = file.type;

      const url = await generatePresignedUrl(fileName, fileType);

      if (url) {
        try {
          await uploadFile(file, url);
          const updatedSlides = slides.map((slide) =>
            slide.id === slideId
              ? { ...slide, [type]: url.split("?")[0] }
              : slide
          );

          setSlides(updatedSlides);
          setLoadingItems((prevLoadingItems) => ({
            ...prevLoadingItems,
            [slideId]: false,
          }));
          setLoadingAdditionalItems((prevLoadingItems) => ({
            ...prevLoadingItems,
            [slideId]: false,
          }));
        } catch (error) {
          console.error("Error uploading file:", error);
          setLoadingItems((prevLoadingItems) => ({
            ...prevLoadingItems,
            [slideId]: false,
          }));
          setLoadingAdditionalItems((prevLoadingItems) => ({
            ...prevLoadingItems,
            [slideId]: false,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newSlides = slides.filter((slide) => !slide.hasOwnProperty("_id"));
    const existingSlides = slides.filter((slide) =>
      slide.hasOwnProperty("_id")
    );

    try {
      for (const slide of newSlides) {
        const responseNew = await fetch("/api/about/add-about", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ slide }),
        });

        if (!responseNew.ok) {
          throw new Error("Failed to save new slides");
        }
        setNewSlides(newSlides);
      }

      for (const slide of existingSlides) {
        const responseUpdate = await fetch(
          `/api/about/edit-about/${slide._id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ slide }),
          }
        );

        if (responseUpdate.ok) {
          setIsNotification(true);
        }

        if (!responseUpdate.ok) {
          console.error(`Failed to update slide with ID: ${slide._id}`);
        }
      }
    } catch (error) {
      console.error("Error occurred while saving", error);
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

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleDeleteFile = async (item, type) => {
    console.log("item, type", item, type);
    try {
      const response = await fetch(`/api/s3/delete-file`, {
        method: "PATCH",
        body: JSON.stringify({
          url: type === "imageSrc" ? item.imageSrc : item.backgroundSrc,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (type === "backgroundSrc" && response.ok) {
        console.log("inside res.ok", response.ok);
        setSlides((prevItems) =>
          prevItems.map((slide) =>
            slide._id === item._id ? { ...slide, backgroundSrc: "" } : slide
          )
        );
      } else if (type === "imageSrc" && response.ok) {
        setSlides((prevItems) =>
          prevItems.map((slide) =>
            slide._id === item._id ? { ...slide, imageSrc: "" } : slide
          )
        );
      } else {
        console.error("Failed to delete file");
      }
    } catch (error) {
      console.error("Error occurred while deleting file:", error);
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
                Hero
                <Image
                  className={css.chevron}
                  alt="chevron right"
                  src={ChevronRight}
                />
                Hero section
              </p>
              <Image
                onClick={handleLogout}
                className={css.logoutIcon}
                alt="logout"
                src={LogoutIcon}
              />
            </div>
            <p className={css.heroSectionTitle}>Hero section</p>
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
              <div className={css.heroLabel}>
                {slides.map((slide, index) => (
                  <SlideForm
                    key={slide.id}
                    slide={slide}
                    handleFileChange={(e) =>
                      handleFileChange(slide.id, e, "imageSrc")
                    }
                    handleAdditionalFileChange={(e) =>
                      handleFileChange(slide.id, e, "backgroundSrc")
                    }
                    handleInputChange={(e) =>
                      handleInputChange(e, slide.id, "title")
                    }
                    handleInputTextChange={(e) =>
                      handleInputChange(e, slide.id, "description")
                    }
                    handleDescriptionChange={handleDescriptionChange}
                    handleRemoveSlide={() => handleRemoveSlide(slide)}
                    handleDeleteFile={() => handleDeleteFile(slide, "imageSrc")}
                    handleDeleteAdditionalFile={() =>
                      handleDeleteFile(slide, "backgroundSrc")
                    }
                    showRemoveButton={slides.length > 1}
                    imageFileName={
                      slide.imageSrc ? slide.imageSrc.split("/").pop() : ""
                    }
                    backgroundFileName={
                      slide.backgroundSrc
                        ? slide.backgroundSrc.split("/").pop()
                        : ""
                    }
                    loadingItems={loadingItems}
                    loadingAdditionalItems={loadingAdditionalItems}
                    addDescription={addDescription}
                    removeDescription={removeDescription}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={handleAddSlide}
                className={css.addSlideBtn}
              >
                + Add slide
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
