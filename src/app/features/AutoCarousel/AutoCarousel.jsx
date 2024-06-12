import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import css from "./AutoCarousel.module.css";
import Image from "next/image";

const AutoCarousel = (props) => {
  const { slides, options, className } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  console.log("slides", slides);

  return (
    <div className={css.embla}>
      <div className={css.embla__viewport} ref={emblaRef}>
        <div className={css.embla__container}>
          {slides.map((slide, index) =>
            slide.icons.map((icon, iconIndex) => (
              <div className={css.embla__slide} key={index}>
                <div className={css.embla__slide__number} key={iconIndex}>
                  <Image
                    width="100"
                    height="50"
                    className={css.sliderImage}
                    src={icon}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AutoCarousel;
