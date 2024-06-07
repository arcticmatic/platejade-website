"use client";

import React, { useState } from "react";
import Image from "next/image";
import css from "./SlideForm.module.css";
import UploadIcon from "../../components/images/UploadIcon.svg";
import { TailSpin } from "react-loader-spinner";
import ClipBlack from "../../components/images/ClipBlack.svg";
import CrossRed from "../../components/images/CrossRed.svg";
import CheckMarkGreen from "../../components/images/CheckMarkGreen.svg";

const SlideForm = ({
  slide,
  handleFileChange,
  handleAdditionalFileChange,
  handleInputChange,
  handleInputTextChange,
  handleRemoveSlide,
  showRemoveButton,
  handleDeleteFile,
  handleDeleteAdditionalFile,
  imageFileName,
  backgroundFileName,
  loadingItems,
  loadingAdditionalItems,
}) => {
  const [selectedOption, setSelectedOption] = useState("simple");

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <>
      <label className={css.heroLabel}>
        Title
        <input
          className={css.heroTitleInput}
          placeholder="Enter title"
          value={slide.title}
          onChange={(e) => handleInputChange(e)}
        />
      </label>
      <label className={css.heroLabel}>
        Text
        <input
          className={css.heroTextInput}
          placeholder="Enter description"
          value={slide.description}
          onChange={(e) => handleInputTextChange(e)}
        />
      </label>
      <div className={css.heroLabel}>
        <p className={css.heroLabelText}>Photo</p>
        <div className={css.radioWrapperThumb}>
          <div className={css.inputThumb}>
            <input
              value="simple"
              type="radio"
              id={`radio1-${slide.id}`}
              name={`radioGroup-${slide.id}`}
              onChange={handleRadioChange}
              checked={selectedOption === "simple"}
            />
            <label htmlFor={`radio1-${slide.id}`}>One simple image</label>

            <input
              type="radio"
              id={`radio2-${slide.id}`}
              name={`radioGroup-${slide.id}`}
              value="phone"
              onChange={handleRadioChange}
              checked={selectedOption === "phone"}
            />
            <label htmlFor={`radio2-${slide.id}`}>Image with phone</label>
          </div>
        </div>
        <div className={css.heroImagesThumb}>
          <div className={css.uploadInputThumb}>
            {loadingItems[slide.id] && <TailSpin />}

            {imageFileName && !loadingItems[slide.id] && (
              <Image alt="arrow done" src={CheckMarkGreen} />
            )}
            {imageFileName && !loadingItems[slide.id] ? (
              <>
                <p className={css.uploadFileText}>
                  <Image
                    className={css.uploadedClip}
                    alt="uploaded clip"
                    src={ClipBlack}
                  />
                  {imageFileName}
                  <Image
                    className={css.uploadedDeleteCross}
                    alt="delete cross"
                    onClick={(e) => handleDeleteFile(e)}
                    src={CrossRed}
                  />
                </p>
              </>
            ) : (
              !loadingItems[slide.id] && (
                <>
                  <label
                    htmlFor={`file-upload-${slide.id}`}
                    className={css.uploadThumb}
                  >
                    <input
                      id={`file-upload-${slide.id}`}
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
          {selectedOption === "phone" && (
            <div className={css.uploadInputThumb}>
              {loadingAdditionalItems[slide.id] && <TailSpin />}
              {backgroundFileName && !loadingAdditionalItems[slide.id] && (
                <Image alt="arrow done" src={CheckMarkGreen} />
              )}
              {!loadingAdditionalItems[slide.id] && (
                <p className={css.heroLabelText}>Additional Photo</p>
              )}

              {backgroundFileName && !loadingAdditionalItems[slide.id] ? (
                <p className={css.uploadFileText}>
                  <Image
                    className={css.uploadedClip}
                    alt="uploaded clip"
                    src={ClipBlack}
                  />
                  {backgroundFileName}
                  <Image
                    className={css.uploadedDeleteCross}
                    alt="delete cross"
                    onClick={(e) => handleDeleteAdditionalFile(e)}
                    src={CrossRed}
                  />
                </p>
              ) : (
                !loadingAdditionalItems[slide.id] && (
                  <>
                    <label
                      htmlFor={`additional-file-upload-${slide.id}`}
                      className={css.uploadThumb}
                    >
                      <input
                        id={`additional-file-upload-${slide.id}`}
                        type="file"
                        className={css.uploadInput}
                        onChange={(e) => handleAdditionalFileChange(e)}
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
          )}
        </div>
      </div>
      {showRemoveButton && (
        <button
          className={css.removeSlideBtn}
          type="button"
          onClick={() => handleRemoveSlide(slide)}
        >
          Remove slide
        </button>
      )}
    </>
  );
};

export default SlideForm;
