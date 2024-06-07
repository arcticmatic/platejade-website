import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import css from "./AutoCarousel.module.css";
import Image from "next/image";

const AutoCarousel = (props) => {
  const { slides, options, className } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  return (
    <div className={css.embla}>
      <div className={css.embla__viewport} ref={emblaRef}>
        <div className={css.embla__container}>
          {slides.map((slide, index) => (
            <div className={css.embla__slide} key={index}>
              <div className={css.embla__slide__number}>
                <Image className={css.sliderImage} src={slide.icon} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AutoCarousel;
