import React from "react";
import { GrNext } from "react-icons/gr";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import { useMediaQuery } from "react-responsive";

const BuildingGallery = ({ imageSet }) => {
  const images = checkImageSet();

  function checkImageSet() {
    if (imageSet === undefined || imageSet.length === 0) {
      return new Array(10).fill("https://via.placeholder.com/150");
    } else {
      return [...imageSet];
    }
  }

  const isSmallScreen = useMediaQuery({ query: "(max-width: 640px)" });

  const iphoneSE = useMediaQuery({ query: "(max-width: 667px)" });

  let visibleSlides;
  if (isSmallScreen) {
    visibleSlides = 2.1;
  } else if (iphoneSE) {
    visibleSlides = 4.2;
  } else {
    visibleSlides = 3.5;
  }

  return (
    <div className="relative mb-4 border-b-2 pb-2 pl-4">
      <h1 className="p-4 pl-1 text-start font-montserrat text-2xl font-semibold">
        Gallery
      </h1>
      <CarouselProvider
        naturalSlideWidth={50}
        naturalSlideHeight={50}
        totalSlides={images.length}
        visibleSlides={visibleSlides}
      >
        <Slider>
          {images.map((image, index) => (
            <Slide key={index} index={index}>
              <img
                src={image}
                className="h-full w-full rounded-xl object-cover p-1"
                alt={`Slide ${index + 1}`}
              />
            </Slide>
          ))}
        </Slider>
        <div className="pointer-events-none absolute left-0 top-0 mt-6 flex h-full w-full items-center justify-between px-1">
          <ButtonBack className="pl-2">
            <GrNext className="pointer-events-auto size-10 rotate-180 transform items-center justify-center rounded-full bg-gray-200 p-1 pl-2 opacity-70 hover:opacity-90" />
          </ButtonBack>
          <ButtonNext className="pr-2">
            <GrNext className="pointer-events-auto size-10 items-center justify-center rounded-full bg-gray-200 p-1 pl-2 opacity-70 hover:opacity-90" />
          </ButtonNext>
        </div>
      </CarouselProvider>
    </div>
  );
};

export default BuildingGallery;
