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
  const initialFormData = {
    dealerShipName: "",
    address: "",
    selectedPlan: "",
    email: "",
    contactPerson: "",
    phone: "",
  };

  const [selectedFile, setSelectedFile] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [fileUrl, setFileUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isNotification, setIsNotification] = useState(false);

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

  const handlePlanSelect = (plan) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      selectedPlan: plan,
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

    console.log("fileurl", fileUrl);
    console.log(formData);

    const res = await fetch("/api/dealers/add-dealer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...formData, fileUrl }),
    });

    if (res.ok) {
      setIsNotification(true);
      // Reset form data and file input
      setFormData(initialFormData);
      setSelectedFile(null);
      setFileUrl("");
    } else {
      console.log("Failed to submit form");
    }
  };

  const fromFieldsArray = [
    {
      id: 1,
      label: "Name of the dealership",
      placeholder: "Enter dealership name",
      value: "dealerShipName",
    },
    {
      id: 2,
      label: "Address",
      placeholder: "Address",
      value: "address",
    },
    {
      id: 3,
      label: "Cooperation plan",
      placeholder: "Select a plan",
      value: "selectedPlan",
      icon: ChevronDown,
      packages: ["Monthly", "Quarterly", "Annually"],
    },
    {
      id: 4,
      label: "Email",
      placeholder: "Enter your email",
      value: "email",
    },
    {
      id: 5,
      label: "Contact person",
      placeholder: "Contact person",
      value: "contactPerson",
    },
    {
      id: 6,
      label: "Phone Number",
      placeholder: "Phone Number",
      value: "phone",
    },
  ];

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
        <p className={css.cooperationDescription}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra nunc
          ante velit vitae. Est tellus vitae, nullam lobortis enim. Faucibus
          amet etiam tincidunt rhoncus, ullamcorper velit. Ullamcorper risus
          tempor, ac nunc libero urna, feugiat.
        </p>
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
            {fromFieldsArray.map((field) => (
              <label key={field.id} className={css.cooperationLabel}>
                {field.label}
                {field.value === "selectedPlan" ? (
                  <div className={css.dropdownContainer}>
                    <div
                      className={css.selectedPlan}
                      onClick={() => setShowDropdown(!showDropdown)}
                    >
                      {formData.selectedPlan || field.placeholder}
                      <Image
                        className={css.dropdownIcon}
                        alt="dropdown"
                        src={field.icon}
                      />
                    </div>
                    {showDropdown && (
                      <ul className={css.dropdownList}>
                        {field.packages.map((plan, index) => (
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
                  <input
                    name={field.value}
                    className={css.cooperationInput}
                    placeholder={field.placeholder}
                    value={formData[field.value]} // Add this line to bind the input value to the state
                    onChange={handleInputChange}
                  />
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
