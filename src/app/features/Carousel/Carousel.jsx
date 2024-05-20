"use client";

import React from "react";
import { PrevButton, NextButton, usePrevNextButtons } from "./CarouselButtons";
import useEmblaCarousel from "embla-carousel-react";
import css from "./Carousel.module.css";
import UserIcon from "../../../../public/images/UserIcon.png";
import Image from "next/image";

const EmblaCarousel = (props) => {
  const { slides, options } = props;

  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <div className={css.embla}>
      <div className={css.reviewsControlsThumb}>
        <h2 className={css.reviewsTitle}>What everyone says</h2>
        <div className={css.controlsButtonsThumb}>
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
      <div className={css.embla__viewport} ref={emblaRef}>
        <div className={css.embla__container}>
          {slides.map((review, index) => (
            <div className={css.embla__slide} key={index}>
              <div className={css.reviewItem}>
                <p className={css.reviewText}>{review.text}</p>
                <div className={css.reviewCustomerThumb}>
                  <Image
                    className={css.reviewCustomerIcon}
                    alt="user icon"
                    src={UserIcon}
                  />
                  <div className={css.customerDetailsThumb}>
                    <p className={css.customerName}>{review.customerName}</p>
                    <p className={css.customerRole}>{review.customerRole}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;
