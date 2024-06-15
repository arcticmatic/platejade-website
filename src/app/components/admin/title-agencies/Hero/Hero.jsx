"use client";

import css from "./Hero.module.css";
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
import XClose from "../../../images/XClose.svg";
import ClipBlack from "../../../images/ClipBlack.svg";
import CrossRed from "../../../images/CrossRed.svg";
import CheckMarkGreen from "../../../images/CheckMarkGreen.svg";
import { TailSpin } from "react-loader-spinner";
import Table from "../../../images/Table.svg";
import TitleAgencyIcon from "../../../images/TitleAgencyIcon.svg";
import SellersIcon from "../../../images/SellersIcon.svg";
import ChatIcon from "../../../images/ChatIcon.svg";

export default function Hero() {
  const { data: session, status } = useSession();
  const [selectedOption, setSelectedOption] = useState("simple");
  const [loadingAdditionalItems, setLoadingAdditionalItems] = useState({});
  const [isNotification, setIsNotification] = useState(false);
  const [newSlides, setNewSlides] = useState([]);

  if (status === "unauthenticated") {
    redirect("/admin");
  }

  const [selectedPage, setSelectedPage] = useState(null);
  const [selectedPageId, setSelectedPageId] = useState(3);
  const [selectedFile, setSelectedFile] = useState(null);
  const [addiionalFile, setAdditionalFile] = useState(null);
  const [mobileSlides, setMobileSlides] = useState([]);
  const [tabletSlides, setTabletSlides] = useState([]);
  const [newMobileSlides, setNewMobileSlides] = useState([]);
  const [newTabletSlides, setNewTabletSlides] = useState([]);
  const [newDesktopSlides, setNewDesktopSlides] = useState([]);
  const [desktopSlides, setDesktopSlides] = useState([]);
  const [slides, setSlides] = useState([]);
  const [textsArray, setTextsArray] = useState([]);
  const [newTextsArray, setNewTextsArray] = useState([]);
  const [loadingItems, setLoadingItems] = useState(mobileSlides.map(() => []));
  const [loadingTabletItems, setLoadingTabletItems] = useState(
    tabletSlides.map(() => [])
  );
  const [loadingDesktopItems, setLoadingDesktopItems] = useState(
    desktopSlides.map(() => [])
  );

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
        {
          id: 1,
          name: "Hero section",
          link: "/admin/title-agencies/hero",
          isChosen: true,
        },
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
    setSelectedPage(pagesArray[1]);

    const fetchTexts = async () => {
      try {
        const response = await fetch("/api/slides-texts/get-slide-texts");
        if (response.ok) {
          const data = await response.json();
          const filteredSlides = data.data.filter(
            (slide) => slide.page === "title-agencies"
          );
          console.log("filtered slides:", filteredSlides);
          setTextsArray(filteredSlides);
        } else {
          console.error("Failed to fetch slides");
        }
      } catch (error) {
        console.error("Error fetching slides:", error);
      }
    };

    const fetchSlides = async () => {
      try {
        const response = await fetch("/api/slides/get-slides");
        if (response.ok) {
          const data = await response.json();
          const filteredSlides = data.data.filter(
            (slide) => slide.page === "title-agencies"
          );
          setMobileSlides(filteredSlides);
        } else {
          console.error("Failed to fetch slides");
        }
      } catch (error) {
        console.error("Error fetching slides:", error);
      }
    };

    const fetchTabletSlides = async () => {
      try {
        const response = await fetch("/api/tablet-slides/get-tablet-slides");
        if (response.ok) {
          const data = await response.json();
          const filteredSlides = data.data.filter(
            (slide) => slide.page === "title-agencies"
          );
          setTabletSlides(filteredSlides);
        } else {
          console.error("Failed to fetch slides");
        }
      } catch (error) {
        console.error("Error fetching slides:", error);
      }
    };

    const fetchDesktopSlides = async () => {
      try {
        const response = await fetch("/api/desktop-slides/get-desktop-slides");
        if (response.ok) {
          const data = await response.json();
          const filteredSlides = data.data.filter(
            (slide) => slide.page === "title-agencies"
          );
          setDesktopSlides(filteredSlides);
        } else {
          console.error("Failed to fetch slides");
        }
      } catch (error) {
        console.error("Error fetching slides:", error);
      }
    };

    fetchTexts();
    fetchSlides();
    fetchTabletSlides();
    fetchDesktopSlides();
  }, [newTextsArray, newMobileSlides, newTabletSlides, newDesktopSlides]);

  const handleAddTabletSlide = () => {
    setTabletSlides((prevSlides) => [
      ...prevSlides,
      {
        id: uuidv4(),
        icons: [""],
        page: "title-agencies",
      },
    ]);
  };

  const handleAddDesktopSlide = () => {
    setDesktopSlides((prevSlides) => [
      ...prevSlides,
      {
        id: uuidv4(),
        icons: [""],
        page: "title-agencies",
      },
    ]);
  };

  const handleRemoveSlide = (slideIndex) => {
    const slideToRemove = tabletSlides[slideIndex];

    if (slideToRemove.hasOwnProperty("_id")) {
      fetch(`/api/tablet-slides/delete-tablet-slides/${slideToRemove._id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            setTabletSlides((prevSlides) =>
              prevSlides.filter((_, index) => index !== slideIndex)
            );
          } else {
            console.error("Failed to delete slide from server");
          }
        })
        .catch((error) => {
          console.error("Error occurred while deleting slide:", error);
        });
    } else {
      setTabletSlides((prevSlides) =>
        prevSlides.filter((_, index) => index !== slideIndex)
      );
    }
  };
  const handleRemoveDesktopSlide = (slideIndex) => {
    const slideToRemove = desktopSlides[slideIndex];

    if (slideToRemove.hasOwnProperty("_id")) {
      fetch(`/api/desktop-slides/delete-desktop-slides/${slideToRemove._id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            setDesktopSlides((prevSlides) =>
              prevSlides.filter((_, index) => index !== slideIndex)
            );
          } else {
            console.error("Failed to delete slide from server");
          }
        })
        .catch((error) => {
          console.error("Error occurred while deleting slide:", error);
        });
    } else {
      setDesktopSlides((prevSlides) =>
        prevSlides.filter((_, index) => index !== slideIndex)
      );
    }
  };

  const handleInputChange = (e, slideId, field, index) => {
    const value = e.target.value;
    setTextsArray((prevTextArray) =>
      prevTextArray.map((slide) =>
        slide._id === slideId
          ? {
              ...slide,
              [field]: slide[field].map((item, idx) =>
                idx === index ? value : item
              ),
            }
          : slide
      )
    );
  };

  const handleDescriptionChange = (e, slideId, textIndex) => {
    const value = e.target.value;
    setTextsArray((prevTextArray) =>
      prevTextArray.map((slide) =>
        slide._id === slideId
          ? {
              ...slide,
              text: slide.text.map((text, index) =>
                index === textIndex ? value : text
              ),
            }
          : slide
      )
    );
  };

  const addDescription = (slideId) => {
    const newText = "New paragraph";

    setTextsArray((prevTextArray) =>
      prevTextArray.map((slide) =>
        slide._id === slideId
          ? { ...slide, text: [...slide.text, newText] }
          : slide
      )
    );
  };

  const removeDescription = (slideId, textIndex) => {
    setTextsArray((prevTextArray) =>
      prevTextArray.map((slide) =>
        slide._id === slideId
          ? {
              ...slide,
              text: slide.text.filter((_, index) => index !== textIndex),
            }
          : slide
      )
    );
  };

  const addTextSlide = () => {
    const newSlide = {
      id: uuidv4(),
      text: [""],
      title: [""],
      page: "title-agencies",
    };
    setTextsArray((prevTextArray) => [...prevTextArray, newSlide]);
  };

  const removeTextSlide = (slideIndex) => {
    const slideToRemove = textsArray[slideIndex];

    if (slideToRemove.hasOwnProperty("_id")) {
      fetch(`/api/slides-texts/delete-slide-texts/${slideToRemove._id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            setTextsArray((prevSlides) =>
              prevSlides.filter((_, index) => index !== slideIndex)
            );
          } else {
            console.error("Failed to delete slide from server");
          }
        })
        .catch((error) => {
          console.error("Error occurred while deleting slide:", error);
        });
    } else {
      setTextsArray((prevSlides) =>
        prevSlides.filter((_, index) => index !== slideIndex)
      );
    }
  };

  const handleFileChange = async (slideIndex, iconIndex, event) => {
    const file = event.target.files[0];

    if (file) {
      setLoadingItems((prevLoadingItems) => {
        const updatedLoadingItems = [...prevLoadingItems];
        if (!updatedLoadingItems[slideIndex]) {
          updatedLoadingItems[slideIndex] = [];
        }
        updatedLoadingItems[slideIndex][iconIndex] = true;
        return updatedLoadingItems;
      });

      const fileName = `${file.name}_${file.size}`;
      const fileType = file.type;

      const url = await generatePresignedUrl(fileName, fileType);

      if (url) {
        try {
          await uploadFile(file, url);
          const updatedMobileSlides = mobileSlides.map((slide, sIndex) =>
            sIndex === slideIndex
              ? {
                  ...slide,
                  icons: slide.icons.map((icon, iIndex) =>
                    iIndex === iconIndex ? url.split("?")[0] : icon
                  ),
                }
              : slide
          );

          setMobileSlides(updatedMobileSlides);
        } catch (error) {
          console.error("Error uploading file:", error);
        } finally {
          setLoadingItems((prevLoadingItems) => {
            const updatedLoadingItems = [...prevLoadingItems];
            updatedLoadingItems[slideIndex][iconIndex] = false;
            return updatedLoadingItems;
          });
        }
      } else {
        console.error("Failed to generate pre-signed URL");
      }
    } else {
      console.warn("No file selected");
    }
  };

  const handleTabletFileChange = async (tabletSlideIndex, iconIndex, event) => {
    const file = event.target.files[0];

    if (file) {
      setLoadingTabletItems((prevLoadingItems) => {
        const updatedLoadingItems = [...prevLoadingItems];
        if (!updatedLoadingItems[tabletSlideIndex]) {
          updatedLoadingItems[tabletSlideIndex] = [];
        }
        updatedLoadingItems[tabletSlideIndex][iconIndex] = true;
        return updatedLoadingItems;
      });

      const fileName = `${file.name}_${file.size}`;
      const fileType = file.type;

      const url = await generatePresignedUrl(fileName, fileType);

      if (url) {
        try {
          await uploadFile(file, url);
          const updatedTabletSlides = tabletSlides.map((slide, sIndex) =>
            sIndex === tabletSlideIndex
              ? {
                  ...slide,
                  icons: slide.icons.map((icon, iIndex) =>
                    iIndex === iconIndex ? url.split("?")[0] : icon
                  ),
                }
              : slide
          );

          setTabletSlides(updatedTabletSlides);
        } catch (error) {
          console.error("Error uploading file:", error);
        } finally {
          setLoadingTabletItems((prevLoadingItems) => {
            const updatedLoadingItems = [...prevLoadingItems];
            updatedLoadingItems[tabletSlideIndex][iconIndex] = false;
            return updatedLoadingItems;
          });
        }
      } else {
        console.error("Failed to generate pre-signed URL");
      }
    } else {
      console.warn("No file selected");
    }
  };

  const handleDesktopFileChange = async (
    desktopSlideIndex,
    iconIndex,
    event
  ) => {
    const file = event.target.files[0];

    if (file) {
      setLoadingDesktopItems((prevLoadingItems) => {
        const updatedLoadingItems = [...prevLoadingItems];
        if (!updatedLoadingItems[desktopSlideIndex]) {
          updatedLoadingItems[desktopSlideIndex] = [];
        }
        updatedLoadingItems[desktopSlideIndex][iconIndex] = true;
        return updatedLoadingItems;
      });

      const fileName = `${file.name}_${file.size}`;
      const fileType = file.type;

      const url = await generatePresignedUrl(fileName, fileType);

      if (url) {
        try {
          await uploadFile(file, url);
          const updatedDesktopSlides = desktopSlides.map((slide, sIndex) =>
            sIndex === desktopSlideIndex
              ? {
                  ...slide,
                  icons: slide.icons.map((icon, iIndex) =>
                    iIndex === iconIndex ? url.split("?")[0] : icon
                  ),
                }
              : slide
          );

          setDesktopSlides(updatedDesktopSlides);
        } catch (error) {
          console.error("Error uploading file:", error);
        } finally {
          setLoadingDesktopItems((prevLoadingItems) => {
            const updatedLoadingItems = [...prevLoadingItems];
            updatedLoadingItems[desktopSlideIndex][iconIndex] = false;
            return updatedLoadingItems;
          });
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
    const existingMobileSlides = mobileSlides.filter((slide) =>
      slide.hasOwnProperty("_id")
    );
    const existingTabletSlides = tabletSlides.filter((slide) =>
      slide.hasOwnProperty("_id")
    );
    const newTabletSlides = tabletSlides.filter(
      (slide) => !slide.hasOwnProperty("_id")
    );
    const existingDesktopSlides = desktopSlides.filter((slide) =>
      slide.hasOwnProperty("_id")
    );
    const newDesktopSlides = desktopSlides.filter(
      (slide) => !slide.hasOwnProperty("_id")
    );
    const existingTextsSlides = textsArray.filter((slide) =>
      slide.hasOwnProperty("_id")
    );
    const newTextsSlides = textsArray.filter(
      (slide) => !slide.hasOwnProperty("_id")
    );

    for (const slide of existingTextsSlides) {
      const responseUpdate = await fetch(
        `/api/slides-texts/edit-slide-texts/${slide._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ slidesText: slide }),
        }
      );
    }

    for (const slide of newTextsSlides) {
      const responseUpdate = await fetch(`/api/slides-texts/add-slide-texts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ slideText: slide }),
      });
    }

    try {
      for (const slide of existingMobileSlides) {
        const responseUpdate = await fetch(
          `/api/slides/edit-slides/${slide._id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ mobileSlide: slide }),
          }
        );

        if (!responseUpdate.ok) {
          throw new Error(
            `Failed to update mobile slide with ID: ${slide._id}`
          );
        }
      }

      for (const slide of existingTabletSlides) {
        const responseUpdate = await fetch(
          `/api/tablet-slides/edit-tablet-slides/${slide._id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ tabletSlide: slide }),
          }
        );
      }

      for (const slide of newTabletSlides) {
        const responseUpdate = await fetch(
          `/api/tablet-slides/add-tablet-slides`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ tabletSlide: slide }),
          }
        );
      }

      for (const slide of existingDesktopSlides) {
        const responseUpdate = await fetch(
          `/api/desktop-slides/edit-desktop-slides/${slide._id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ desktopSlide: slide }),
          }
        );
      }

      for (const slide of newDesktopSlides) {
        const responseUpdate = await fetch(
          `/api/desktop-slides/add-desktop-slides`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ desktopSlide: slide }),
          }
        );
      }

      setIsNotification(true);
      setNewTextsArray([]);
      setNewMobileSlides([]);
      setNewTabletSlides([]);
      setNewDesktopSlides([]);

      console.log("Existing slides updated successfully");
    } catch (error) {
      console.error("Error occurred while updating slides:", error);
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

  const handleAddItemIcon = (slideIndex) => {
    const newIcon = "";
    setMobileSlides((prevSlides) => {
      const updatedSlides = prevSlides.map((slide, index) => {
        if (index === slideIndex) {
          const updatedIcons = [...slide.icons, newIcon];
          return { ...slide, icons: updatedIcons };
        }
        return slide;
      });
      return updatedSlides;
    });
  };

  const handleAddTabletItemIcon = (tabletSlideIndex) => {
    const newIcon = "";
    setTabletSlides((prevTabletSlides) => {
      const updatedTabletSlides = prevTabletSlides.map((slide, index) => {
        if (index === tabletSlideIndex) {
          const updatedIcons = [...slide.icons, newIcon];
          return { ...slide, icons: updatedIcons };
        }
        return slide;
      });
      return updatedTabletSlides;
    });
  };

  const handleAddDesktopItemIcon = (desktopSlideIndex) => {
    const newIcon = "";
    setDesktopSlides((prevDesktopSlides) => {
      const updatedDesktopSlides = prevDesktopSlides.map((slide, index) => {
        if (index === desktopSlideIndex) {
          const updatedIcons = [...slide.icons, newIcon];
          return { ...slide, icons: updatedIcons };
        }
        return slide;
      });
      return updatedDesktopSlides;
    });
  };

  const handleRemoveItem = (slideIndex, iconIndex, isNewItem) => {
    const updatedSlides = mobileSlides.map((slide, index) => {
      if (index === slideIndex) {
        const updatedIcons = slide.icons.filter((_, i) => i !== iconIndex);
        return { ...slide, icons: updatedIcons };
      }
      return slide;
    });
    setMobileSlides(updatedSlides);
  };

  const handleRemoveTabletIcon = (slideIndex, iconIndex) => {
    const updatedSlides = tabletSlides.map((slide, index) => {
      if (index === slideIndex) {
        const updatedIcons = slide.icons.filter((_, i) => i !== iconIndex);
        return { ...slide, icons: updatedIcons };
      }
      return slide;
    });
    setTabletSlides(updatedSlides);
  };

  const handleRemoveDesktopIcon = (slideIndex, iconIndex) => {
    const updatedSlides = desktopSlides.map((slide, index) => {
      if (index === slideIndex) {
        const updatedIcons = slide.icons.filter((_, i) => i !== iconIndex);
        return { ...slide, icons: updatedIcons };
      }
      return slide;
    });
    setDesktopSlides(updatedSlides);
  };

  const handleDeleteFile = async (slideId, iconUrl, type) => {
    try {
      const responseDelete = await fetch(`/api/s3/delete-file`, {
        method: "PATCH",
        body: JSON.stringify({
          url: iconUrl,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!responseDelete.ok) {
        throw new Error("Failed to delete file from AWS");
      }

      if (type === "mobile") {
        setMobileSlides((prevSlides) =>
          prevSlides.map((slide) =>
            slide.id === slideId
              ? {
                  ...slide,
                  icons: slide.icons.filter((icon) => icon !== iconUrl),
                }
              : slide
          )
        );
      }
      if (type === "tablet") {
        setTabletSlides((prevSlides) =>
          prevSlides.map((slide) =>
            slide.id === slideId
              ? {
                  ...slide,
                  icons: slide.icons.filter((icon) => icon !== iconUrl),
                }
              : slide
          )
        );
      }
      if (type === "desktop") {
        console.log("inside desktop type");
        setDesktopSlides((prevSlides) =>
          prevSlides.map((slide) =>
            slide.id === slideId
              ? {
                  ...slide,
                  icons: slide.icons.filter((icon) => icon !== iconUrl),
                }
              : slide
          )
        );
      }

      console.log("File deleted successfully");
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
              <p className={css.heroLabelTextTitle}>Slides title and text</p>
              <div className={css.heroLabel}>
                <div>
                  {textsArray.map((slide, index) => (
                    <div key={slide._id} className={css.slideContainer}>
                      <p className={css.heroLabel}>Slide {index + 1}</p>

                      <label className={css.heroLabel}>Title</label>
                      {slide.title.map((title, titleIndex) => (
                        <input
                          key={titleIndex}
                          className={css.heroTitleInput}
                          type="text"
                          value={title}
                          onChange={(e) =>
                            handleInputChange(e, slide._id, "title", titleIndex)
                          }
                        />
                      ))}

                      <label className={css.heroLabel}>Text</label>
                      {slide.text.map((text, textIndex) => (
                        <div
                          key={textIndex}
                          className={css.descriptionContainer}
                        >
                          <input
                            className={css.heroTextInput}
                            type="text"
                            value={text}
                            onChange={(e) =>
                              handleDescriptionChange(e, slide._id, textIndex)
                            }
                          />
                          {slide.text.length > 1 && textIndex !== 0 && (
                            <button
                              className={css.removeBtn}
                              type="button"
                              onClick={() =>
                                removeDescription(slide._id, textIndex)
                              }
                            >
                              Remove paragraph
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        className={css.addBtn}
                        type="button"
                        onClick={() => addDescription(slide._id)}
                      >
                        Add new paragraph
                      </button>
                      <button
                        className={css.removeBtn}
                        type="button"
                        onClick={() => removeTextSlide(index)}
                      >
                        Remove slide
                      </button>
                    </div>
                  ))}
                  <button
                    className={css.addBtn}
                    type="button"
                    onClick={addTextSlide}
                  >
                    Add new slide
                  </button>
                </div>
              </div>
              <div className={css.heroLabel}>
                <p className={css.heroLabelTextTitle}>Mobile slides</p>

                {mobileSlides.map((slide, slideIndex) => (
                  <div key={slideIndex}>
                    {slide.icons.map((icon, iconIndex) => (
                      <>
                        <p className={css.heroLabelText}>
                          Slide {iconIndex + 1}
                        </p>
                        <div key={iconIndex} className={css.uploadInputThumb}>
                          {loadingItems[slideIndex] &&
                            loadingItems[slideIndex][iconIndex] && <TailSpin />}
                          {(!loadingItems[slideIndex] ||
                            !loadingItems[slideIndex][iconIndex]) &&
                            icon && (
                              <Image alt="arrow done" src={CheckMarkGreen} />
                            )}
                          {icon ? (
                            <p className={css.uploadFileText}>
                              <Image
                                className={css.uploadedClip}
                                alt="uploaded clip"
                                src={ClipBlack}
                              />
                              {icon.substring(icon.lastIndexOf("/") + 1)}
                              <Image
                                className={css.uploadedDeleteCross}
                                alt="delete cross"
                                onClick={() =>
                                  handleDeleteFile(slide.id, icon, "mobile")
                                }
                                src={CrossRed}
                              />
                            </p>
                          ) : (
                            (!loadingItems[slideIndex] ||
                              !loadingItems[slideIndex][iconIndex]) &&
                            !icon && (
                              <>
                                <label
                                  htmlFor={`file-upload-${slideIndex}-${iconIndex}`}
                                  className={css.uploadThumb}
                                >
                                  <input
                                    id={`file-upload-${slideIndex}-${iconIndex}`}
                                    type="file"
                                    className={css.uploadInput}
                                    onChange={(e) =>
                                      handleFileChange(slideIndex, iconIndex, e)
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

                        <button
                          type="button"
                          className={css.removeBtn}
                          onClick={() =>
                            handleRemoveItem(slideIndex, iconIndex)
                          }
                        >
                          Remove icon
                        </button>
                      </>
                    ))}

                    <div>
                      <button
                        className={css.addBtn}
                        type="button"
                        onClick={() => handleAddItemIcon(slideIndex)}
                      >
                        Add icon
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className={css.heroLabel}>
                <p className={css.heroLabelTextTitle}>Tablet slides</p>
                <p className={css.heroLabelTextTitle}>
                  2 images are needed for the slide to work correctly
                </p>

                {tabletSlides.map((slide, tabletSlideIndex) => (
                  <div key={tabletSlideIndex}>
                    <p className={css.heroLabelText}>
                      Slide {tabletSlideIndex + 1}
                    </p>

                    {slide.icons.map((icon, iconIndex) => (
                      <>
                        <p className={css.heroLabelText}>
                          Icon {iconIndex + 1}
                        </p>
                        <div key={iconIndex} className={css.uploadInputThumb}>
                          {loadingTabletItems[tabletSlideIndex] &&
                            loadingTabletItems[tabletSlideIndex][iconIndex] && (
                              <TailSpin />
                            )}
                          {(!loadingTabletItems[tabletSlideIndex] ||
                            !loadingTabletItems[tabletSlideIndex][iconIndex]) &&
                            icon && (
                              <Image alt="arrow done" src={CheckMarkGreen} />
                            )}
                          {icon ? (
                            <p className={css.uploadFileText}>
                              <Image
                                className={css.uploadedClip}
                                alt="uploaded clip"
                                src={ClipBlack}
                              />
                              {icon.substring(icon.lastIndexOf("/") + 1)}
                              <Image
                                className={css.uploadedDeleteCross}
                                alt="delete cross"
                                onClick={() =>
                                  handleDeleteFile(slide.id, icon, "tablet")
                                }
                                src={CrossRed}
                              />
                            </p>
                          ) : (
                            (!loadingTabletItems[tabletSlideIndex] ||
                              (!loadingTabletItems[tabletSlideIndex][
                                iconIndex
                              ] &&
                                !icon)) && (
                              <>
                                <label
                                  htmlFor={`file-upload-${tabletSlideIndex}-${iconIndex}`}
                                  className={css.uploadThumb}
                                >
                                  <input
                                    id={`file-upload-${tabletSlideIndex}-${iconIndex}`}
                                    type="file"
                                    className={css.uploadInput}
                                    onChange={(e) =>
                                      handleTabletFileChange(
                                        tabletSlideIndex,
                                        iconIndex,
                                        e
                                      )
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
                        <button
                          type="button"
                          className={css.removeBtn}
                          onClick={() =>
                            handleRemoveTabletIcon(tabletSlideIndex, iconIndex)
                          }
                        >
                          Remove icon
                        </button>
                      </>
                    ))}

                    <div>
                      <button
                        className={css.addBtn}
                        type="button"
                        onClick={() =>
                          handleAddTabletItemIcon(tabletSlideIndex)
                        }
                      >
                        Add icon
                      </button>
                    </div>
                    {tabletSlides.length > 1 && (
                      <button
                        className={css.addBtn}
                        type="button"
                        onClick={() => handleRemoveSlide(tabletSlideIndex)}
                      >
                        Remove slide
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={handleAddTabletSlide}
                className={css.addBtn}
              >
                + Add tablet slide
              </button>

              <div className={css.heroLabel}>
                <p className={css.heroLabelTextTitle}>Desktop slides</p>
                <p className={css.heroLabelTextTitle}>
                  4 images are needed for the slide to work correctly
                </p>

                {desktopSlides.map((slide, desktopSlideIndex) => (
                  <div key={desktopSlideIndex}>
                    <p className={css.heroLabelText}>
                      Slide {desktopSlideIndex + 1}
                    </p>

                    {slide.icons.map((icon, iconIndex) => (
                      <>
                        <p className={css.heroLabelText}>
                          Icon {iconIndex + 1}
                        </p>
                        <div key={iconIndex} className={css.uploadInputThumb}>
                          {loadingDesktopItems[desktopSlideIndex] &&
                            loadingDesktopItems[desktopSlideIndex][
                              iconIndex
                            ] && <TailSpin />}
                          {(!loadingDesktopItems[desktopSlideIndex] ||
                            !loadingDesktopItems[desktopSlideIndex][
                              iconIndex
                            ]) &&
                            icon && (
                              <Image alt="arrow done" src={CheckMarkGreen} />
                            )}
                          {icon ? (
                            <p className={css.uploadFileText}>
                              <Image
                                className={css.uploadedClip}
                                alt="uploaded clip"
                                src={ClipBlack}
                              />
                              {icon.substring(icon.lastIndexOf("/") + 1)}
                              <Image
                                className={css.uploadedDeleteCross}
                                alt="delete cross"
                                onClick={() =>
                                  handleDeleteFile(slide.id, icon, "desktop")
                                }
                                src={CrossRed}
                              />
                            </p>
                          ) : (
                            (!loadingDesktopItems[desktopSlideIndex] ||
                              (!loadingDesktopItems[desktopSlideIndex][
                                iconIndex
                              ] &&
                                !icon)) && (
                              <>
                                <label
                                  htmlFor={`file-upload-${desktopSlideIndex}-${iconIndex}`}
                                  className={css.uploadThumb}
                                >
                                  <input
                                    id={`file-upload-${desktopSlideIndex}-${iconIndex}`}
                                    type="file"
                                    className={css.uploadInput}
                                    onChange={(e) =>
                                      handleDesktopFileChange(
                                        desktopSlideIndex,
                                        iconIndex,
                                        e
                                      )
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
                        <button
                          type="button"
                          className={css.removeBtn}
                          onClick={() =>
                            handleRemoveDesktopIcon(
                              desktopSlideIndex,
                              iconIndex
                            )
                          }
                        >
                          Remove icon
                        </button>
                      </>
                    ))}

                    <div>
                      <button
                        className={css.addBtn}
                        type="button"
                        onClick={() =>
                          handleAddDesktopItemIcon(desktopSlideIndex)
                        }
                      >
                        Add icon
                      </button>
                    </div>
                    {tabletSlides.length > 1 && (
                      <button
                        className={css.addBtn}
                        type="button"
                        onClick={() =>
                          handleRemoveDesktopSlide(desktopSlideIndex)
                        }
                      >
                        Remove slide
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={handleAddDesktopSlide}
                className={css.addBtn}
              >
                + Add desktop slide
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
