"use client";
import React, { useState, useEffect } from "react";
import css from "./CooperationForm.module.css";
import Image from "next/image";
import UploadFile from "../images/UploadFile.svg";
import ChevronDown from "../images/ChevronDown.svg";
import { TailSpin } from "react-loader-spinner";
import UploadedFile from "../images/UploadedFile.svg";
import Clip from "../images/Clip.svg";
import Delete from "../images/Delete.svg";
import XClose from "../images/XClose.svg";

export default function CooperationForm() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [formData, setFormData] = useState({});
  const [fileUrl, setFileUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isNotification, setIsNotification] = useState(false);
  const [formFieldsArray, setFormFieldsArray] = useState([]);
  const [description, setDescription] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  useEffect(() => {
    const uploadFile = async () => {
      if (!selectedFile) return;

      setIsLoading(true);

      const res = await fetch("/api/s3/upload-file", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: selectedFile.name,
          type: selectedFile.type,
        }),
      });

      const { url } = await res.json();

      const uploadRes = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": selectedFile.type,
        },
        body: selectedFile,
      });

      if (uploadRes.ok) {
        const uploadedFileUrl = uploadRes.url.split("?")[0];
        setFileUrl(uploadedFileUrl);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    };

    uploadFile();
  }, [selectedFile]);

  useEffect(() => {
    const fetchContactFields = async () => {
      try {
        const response = await fetch(
          "/api/dealers/collaboration-form/get-collaboration-form"
        );
        if (response.ok) {
          const data = await response.json();
          const filteredItems = data.data.filter(
            (item) => item.page === "dealers"
          );
          setFormFieldsArray(filteredItems);
        } else {
          console.error("Failed to fetch work items");
        }
      } catch (error) {
        console.error("Error occurred while fetching work items:", error);
      }
    };

    const fetchDescription = async () => {
      try {
        const response = await fetch(
          "/api/forms-description/get-forms-description"
        );
        if (response.ok) {
          const data = await response.json();
          setDescription(data.data[0].text);
        } else {
          console.error("Failed to fetch work items");
        }
      } catch (error) {
        console.error("Error occurred while fetching work items:", error);
      }
    };

    fetchDescription();
    fetchContactFields();
  }, []);

  const handlePlanSelect = (plan) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      plan: plan,
      page: "dealers",
    }));
    setShowDropdown(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/requests/add-request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...formData, fileUrl }),
    });

    if (res.ok) {
      setIsNotification(true);
      setFormData({});
      setSelectedFile(null);
      setFileUrl("");
    } else {
      console.log("Failed to submit form");
    }
  };

  const handleDeleteFile = () => {
    setFileUrl("");
  };

  function formatFileSize(sizeInBytes) {
    const kb = sizeInBytes / 1024;
    const mb = kb / 1024;

    if (mb >= 1) {
      return `${mb.toFixed(2)} MB`;
    } else {
      return `${kb.toFixed(2)} KB`;
    }
  }

  return (
    <>
      <section id="cooperation" className={css.cooperationSection}>
        <h2 className={css.cooperationTitle}>Let’s work together!</h2>
        <p className={css.cooperationDescription}>{description}</p>
        <form className={css.cooperationForm} onSubmit={handleSubmit}>
          {isNotification && (
            <div className={css.notificationThumb}>
              <Image
                onClick={() => setIsNotification(false)}
                className={css.notificationCloseIcon}
                src={XClose}
              />
              <p className={css.notificationText}>
                Thank you for your application
              </p>
              <p className={css.notificationDescription}>
                We will review it as soon as possible and contact you soon
              </p>
            </div>
          )}
          <div className={css.cooperationThumb}>
            {formFieldsArray.map((field) => (
              <label key={field.id} className={css.cooperationLabel}>
                {field.value !== "fileUrl" && field.name}
                {field.value === "plan" ? (
                  <div className={css.dropdownContainer}>
                    <div
                      className={css.selectedPlan}
                      onClick={() => setShowDropdown(!showDropdown)}
                    >
                      {formData.plan || field.placeholder}
                      <Image
                        className={css.dropdownIcon}
                        alt="dropdown"
                        src={ChevronDown}
                      />
                    </div>
                    {showDropdown && (
                      <ul className={css.dropdownList}>
                        {field.dropdownListOptions.map((plan, index) => (
                          <li
                            key={index}
                            onClick={() => handlePlanSelect(plan)}
                            className={css.dropdownItem}
                          >
                            {plan}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  field.value !== "fileUrl" && (
                    <input
                      name={field.value}
                      className={css.cooperationInput}
                      placeholder={field.placeholder}
                      value={formData[field.value]}
                      onChange={handleInputChange}
                    />
                  )
                )}
              </label>
            ))}
          </div>
          <div className={css.uploadFileThumb}>
            <div
              className={
                !fileUrl
                  ? css.copperationFileThumb
                  : css.cooperationUploadedThumb
              }
            >
              {isLoading && (
                <>
                  <TailSpin
                    visible={true}
                    height="40"
                    width="40"
                    color="#fff"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                    wrapperStyle={{}}
                    wrapperClass=""
                  />
                </>
              )}
              {!isLoading && !fileUrl && (
                <>
                  <label htmlFor="file-upload" className={css.uploadLabel}>
                    <Image
                      className={css.cooperationFileIcon}
                      alt="dealers upload file"
                      src={UploadFile}
                    />
                    Upload Additional file
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    className={css.uploadInput}
                    onChange={handleFileChange}
                  />
                </>
              )}
              {fileUrl && (
                <div className={css.uploadedFileThumb}>
                  <p className={css.cooperationFileText}>
                    <Image className={css.uploadedIcon} src={UploadedFile} />
                    File is uploaded
                  </p>
                  <p className={css.uploadedFileName}>
                    <Image className={css.uploadedClipIcon} src={Clip} />
                    {selectedFile.name} ({formatFileSize(selectedFile.size)})
                    <Image
                      onClick={handleDeleteFile}
                      width="40"
                      height="50"
                      className={css.uploadedDeleteIcon}
                      src={Delete}
                    />
                  </p>
                </div>
              )}
            </div>
            {!isLoading && (
              <p className={css.cooperationFileDescription}>
                Attach file. File size of your documents should not exceed 10MB
              </p>
            )}
          </div>
          <button className={css.cooperationFormSubmit} type="submit">
            Submit
          </button>
        </form>
      </section>
    </>
  );
}
