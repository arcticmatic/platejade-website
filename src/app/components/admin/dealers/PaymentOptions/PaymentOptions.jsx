"use client";

import css from "./PaymentOptions.module.css";
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

export default function PaymentOptions() {
  const { data: session, status } = useSession();
  const [selectedOption, setSelectedOption] = useState("simple");
  const [isLoading, setIsLoading] = useState(false);
  const [isNotification, setIsNotification] = useState(false);

  if (status === "unauthenticated") {
    redirect("/admin");
  }

  const [selectedPage, setSelectedPage] = useState(null);
  const [selectedPageId, setSelectedPageId] = useState(2);
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
          isChosen: true,
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
        { id: 1, name: "Contact Information", link: "/admin/contact-info" },
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
    setSelectedPage(pagesArray[1]);

    const fetchWorkItems = async () => {
      try {
        const response = await fetch(
          "/api/dealers/payment-options/get-payment-options"
        );
        if (response.ok) {
          const data = await response.json();
          const filteredItems = data.data.filter(
            (item) => item.page === "dealers"
          );
          setWorkItems(filteredItems);
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

  const handleAddBenefit = (itemId) => {
    const updatedItems = workItems.map((item) =>
      item._id === itemId
        ? { ...item, packageBenefits: [...item.packageBenefits, ""] }
        : item
    );
    setWorkItems(updatedItems);
  };

  const handleDeleteBenefit = (itemId, index) => {
    const updatedItems = workItems.map((item) =>
      item._id === itemId
        ? {
            ...item,
            packageBenefits: item.packageBenefits.filter((_, i) => i !== index),
          }
        : item
    );
    setWorkItems(updatedItems);
  };

  const handleEditBenefit = (itemId, index, value) => {
    const updatedItems = workItems.map((item) =>
      item._id === itemId
        ? {
            ...item,
            packageBenefits: item.packageBenefits.map((benefit, i) =>
              i === index ? value : benefit
            ),
          }
        : item
    );
    setWorkItems(updatedItems);
  };

  const handleEditWorkItem = async (e) => {
    e.preventDefault();

    for (const workItem of workItems) {
      const responseUpdate = await fetch(
        `/api/dealers/payment-options/edit-payment-options/${workItem._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ paymentOption: workItem }),
        }
      );
      if (responseUpdate.ok) {
        setIsNotification(true);
      }
      if (!responseUpdate.ok) {
        console.error(`Failed to update slide with ID: ${workItem._id}`);
      }
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
              Dealers
              <Image
                className={css.chevron}
                alt="chevron right"
                src={ChevronRight}
              />
              Payment options
            </p>
            <Image
              onClick={handleLogout}
              className={css.logoutIcon}
              alt="logout"
              src={LogoutIcon}
            />
          </div>
          <p className={css.heroSectionTitle}> Payment options</p>
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
            {workItems.map((item, index) => (
              <div key={item.id}>
                <p className={css.planTitle}>Subscription plan {index + 1}</p>
                <label className={css.heroLabel}>
                  Subscription period
                  <input
                    className={css.heroTextInput}
                    placeholder="Enter the package name"
                    value={item.subscriptionPeriod}
                    onChange={(e) =>
                      handleInputChange(
                        e,
                        item._id,
                        "subscriptionPeriod",
                        e.target.value
                      )
                    }
                  />
                </label>
                <label className={css.heroLabel}>
                  Description
                  <input
                    className={css.heroTextInput}
                    placeholder="Enter the package description"
                    value={item.description}
                    onChange={(e) =>
                      handleInputChange(e, item._id, "text", e.target.value)
                    }
                  />
                </label>
                <label className={css.heroLabel}>
                  Price
                  <input
                    className={css.heroTitleInput}
                    placeholder="Enter the price"
                    value={item.price}
                    onChange={(e) =>
                      handleInputChange(e, item._id, "price", e.target.value)
                    }
                  />
                </label>
                <label className={css.heroLabel}>
                  Pricing period
                  <input
                    className={css.heroTitleInput}
                    placeholder="Enter the pricing period"
                    value={item.pricingPeriod}
                    onChange={(e) =>
                      handleInputChange(
                        e,
                        item._id,
                        "pricingPeriod",
                        e.target.value
                      )
                    }
                  />
                </label>
                <label className={css.heroLabel}>
                  Customer profit
                  <input
                    className={css.heroTitleInput}
                    placeholder="Enter the profit amount"
                    value={item.profit}
                    onChange={(e) =>
                      handleInputChange(e, item._id, "profit", e.target.value)
                    }
                  />
                </label>
                {item.packageBenefits.map((benefit, index) => (
                  <>
                    <label key={index} className={css.heroLabel}>
                      Benefit {index + 1}
                      <input
                        className={css.heroTextInput}
                        placeholder="Enter the benefit"
                        value={benefit}
                        onChange={(e) =>
                          handleEditBenefit(item._id, index, e.target.value)
                        }
                      />
                    </label>
                    <div className={css.benefitsThumb}>
                      <button
                        className={css.benefitsBtn}
                        type="button"
                        onClick={() => handleDeleteBenefit(item._id, index)}
                      >
                        Delete benefit
                      </button>
                      <button
                        className={css.benefitsBtn}
                        type="button"
                        onClick={() => handleAddBenefit(item._id)}
                      >
                        Add benefit
                      </button>
                    </div>
                  </>
                ))}
              </div>
            ))}
            <div className={css.buttonsThumb}>
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
