"use client";
import React, { useState } from "react";
import css from "./CooperationForm.module.css";
import Image from "next/image";
import UploadFile from "../../images/UploadFile.svg";
import ChevronDown from "../../images/ChevronDown.svg";

export default function CooperationForm() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setShowDropdown(false);
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
      value: "chosenPlan",
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

  return (
    <>
      <section className={css.cooperationSection}>
        <h2 className={css.cooperationTitle}>Let’s work together!</h2>
        <p className={css.cooperationDescription}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra nunc
          ante velit vitae. Est tellus vitae, nullam lobortis enim. Faucibus
          amet etiam tincidunt rhoncus, ullamcorper velit. Ullamcorper risus
          tempor, ac nunc libero urna, feugiat.
        </p>
        <form className={css.cooperationForm}>
          <div className={css.cooperationThumb}>
            {fromFieldsArray.map((field) => (
              <label key={field.id} className={css.cooperationLabel}>
                {field.label}
                {field.value === "chosenPlan" ? (
                  <div className={css.dropdownContainer}>
                    <div
                      className={css.selectedPlan}
                      onClick={() => setShowDropdown(!showDropdown)}
                    >
                      {selectedPlan ? selectedPlan : field.placeholder}
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
                    className={css.cooperationInput}
                    placeholder={field.placeholder}
                  />
                )}
              </label>
            ))}
          </div>
          <div className={css.uploadFileThumb}>
            <div className={css.copperationFileThumb}>
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
            </div>
            <p className={css.cooperationFileDescription}>
              Attach file. File size of your documents should not exceed 10MB
            </p>
          </div>
          <button className={css.cooperationFormSubmit}>Submit</button>
        </form>
      </section>
    </>
  );
}
