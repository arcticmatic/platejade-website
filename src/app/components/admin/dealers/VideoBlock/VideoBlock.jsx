"use client";

import css from "./VideoBlock.module.css";
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
import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";
import { TailSpin } from "react-loader-spinner";
import ClipBlack from "../../../images/ClipBlack.svg";
import CrossRed from "../../../images/CrossRed.svg";
import CheckMarkGreen from "../../../images/CheckMarkGreen.svg";
import XClose from "../../../images/XClose.svg";

export default function VideoBlock() {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  // if (status !== "loading" && !session) {
  //   redirect("/admin");
  // }
  const [selectedPage, setSelectedPage] = useState(null);
  const [selectedPageId, setSelectedPageId] = useState(2);
  const [selectedFile, setSelectedFile] = useState(null);
  const [addiionalFile, setAdditionalFile] = useState(null);
  const [workItems, setWorkItems] = useState([]);
  const [videoUrl, setVideoUrl] = useState("");
  const [formData, setFormData] = useState({
    videoUrl: "",
  });
  const [videoBlockId, setVideoBlockId] = useState("");
  const [isNotification, setIsNotification] = useState(false);

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
          link: "/video-block",
          isChosen: true,
        },
        {
          id: 3,
          name: "How it works",
          link: "/about-work",
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
          id: 6,
          name: "Collaboration form",
          link: "/collaboration-form",
        },
        {
          id: 7,
          name: "FAQ",
          link: "/faq",
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
    setSelectedPage(pagesArray[1]);

    async function fetchVideoBlocks() {
      setIsLoading(true);
      try {
        const response = await fetch("/api/video-block/get-video");
        if (response.ok) {
          const data = await response.json();
          const videoBlockData = data.data[1];
          setVideoBlockId(videoBlockData._id);

          setVideoUrl(videoBlockData.videoSrc);
          setFormData({
            videoUrl: videoBlockData.videoSrc,
          });
        } else {
          console.error("Failed to fetch video blocks");
        }
      } catch (error) {
        console.error("Error fetching video blocks:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchVideoBlocks();
  }, []);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    const itemId = videoBlockId;

    e.preventDefault();
    if (!selectedFile || !itemId) return;

    setIsLoading(true);

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

      setFormData((prevFormData) => ({
        ...prevFormData,
        videoUrl: uploadedFileUrl,
      }));
      setVideoUrl(uploadedFileUrl);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error uploading file:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/video-block/edit-video", {
        method: "PATCH",
        body: JSON.stringify({
          id: videoBlockId,

          videoSrc: videoUrl,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setIsNotification(true);
      } else {
        console.error("Failed to send data to backend");
      }
    } catch (error) {
      console.error("Error occurred while sending data:", error);
    }
  };

  const handleDelete = async () => {
    if (!videoUrl) return;

    try {
      const response = await fetch("/api/s3/delete-file", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: videoUrl,
        }),
      });

      if (response.ok) {
        setVideoUrl("");
        setSelectedFile(null);
        await fetch("/api/video-block/edit-video", {
          method: "PATCH",
          body: JSON.stringify({
            id: videoBlockId,
            videoSrc: "",
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log("File deleted successfully");
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
              Home
              <Image
                className={css.chevron}
                alt="chevron right"
                src={ChevronRight}
              />
              Video section
            </p>
            <Image
              onClick={handleLogout}
              className={css.logoutIcon}
              alt="logout"
              src={LogoutIcon}
            />
          </div>
          <p className={css.heroSectionTitle}>Video section</p>
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
              <p className={css.heroLabelText}>Video</p>
              <div className={css.heroImagesThumb}>
                <div className={css.uploadInputThumb}>
                  {isLoading && <TailSpin />}
                  {videoUrl && <Image alt="arrow done" src={CheckMarkGreen} />}
                  {videoUrl && !isLoading ? (
                    <>
                      <p className={css.uploadFileText}>File is uploaded</p>
                      <p className={css.uploadedVideoName}>
                        <Image
                          className={css.uploadedClip}
                          alt="uploaded clip"
                          src={ClipBlack}
                        />
                        {videoUrl.split("/").pop()}
                        <Image
                          className={css.uploadedDeleteCross}
                          alt="delete cross"
                          src={CrossRed}
                          onClick={handleDelete}
                        />
                      </p>
                    </>
                  ) : (
                    !isLoading && (
                      <>
                        <label
                          htmlFor="file-upload"
                          className={css.uploadThumb}
                        >
                          <input
                            id="file-upload"
                            type="file"
                            className={css.uploadInput}
                            onChange={(e) => handleFileChange(e)}
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
