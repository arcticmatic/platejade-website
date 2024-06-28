"use client";

import React, { useCallback, useEffect, useState } from "react";
import css from "./CarouselButtons.module.css";
import arrowLeft from "../../components/images/arrowLeft.svg";
import arrowRight from "../../components/images/arrowRight.svg";
import Image from "next/image";

export const usePrevNextButtons = (emblaApi) => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback((emblaApi) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onSelect]);

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  };
};

export const PrevButton = (props) => {
  const { children, ...restProps } = props;

  return (
    <Image
      {...restProps}
      className={css.arrow}
      alt="slider left arrow"
      src={arrowLeft}
    />
  );
};

export const NextButton = (props) => {
  const { children, ...restProps } = props;

  return (
    <Image
      className={css.arrow}
      {...restProps}
      alt="slider right arrow"
      src={arrowRight}
    />
  );
};
