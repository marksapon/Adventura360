import React from "react";
import { useNavigate } from "react-router-dom";
import { CarouselProvider, Slider, Slide } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import { useMediaQuery } from "react-responsive";
import Adventuravn from "../adventuravn";

const Showcase = () => {
  const navigate = useNavigate();
  const sm = useMediaQuery({ query: "(max-width: 640px)" });
  const lg = useMediaQuery({ query: "(max-width: 1024px)" });

  const images = [
    "/assets/Landing Page/snapshots/1.webp",
    "/assets/Landing Page/snapshots/2.webp",
    "/assets/Landing Page/snapshots/3.webp",
    "/assets/Landing Page/snapshots/4.webp",
    "/assets/Landing Page/snapshots/5.webp",
    "/assets/Landing Page/snapshots/6.webp",
    "/assets/Landing Page/snapshots/7.webp",
    "/assets/Landing Page/snapshots/8.webp",
  ];

  const images2 = [
    "/assets/Building Module/Background/cafenr.webp",
    "/assets/Building Module/Background/cemds.webp",
    "/assets/Building Module/Background/cwtlab.webp",
    "/assets/Building Module/Background/dit.webp",
    "/assets/Building Module/Background/grad school.webp",
    "/assets/Building Module/Background/gym.webp",
    "/assets/Building Module/Background/IH1.webp",
    "/assets/Building Module/Background/IH2.webp",
    "/assets/Building Module/Background/inosas.webp",
    "/assets/Building Module/Background/library.webp",
    "/assets/Building Module/Background/ncrdec.webp",
    "/assets/Building Module/Background/rccenter.webp",
    "/assets/Building Module/Background/shs.webp",
  ];

  const images3 = [
    "/assets/Landing Page/snapshots/9.webp",
    "/assets/Landing Page/snapshots/10.webp",
    "/assets/Landing Page/snapshots/11.webp",
    "/assets/Landing Page/snapshots/12.webp",
    "/assets/Landing Page/snapshots/13.webp",
    "/assets/Landing Page/snapshots/14.webp",
    "/assets/Landing Page/snapshots/15.webp",
    "/assets/Landing Page/snapshots/16.webp",
    "/assets/Landing Page/snapshots/17.webp",
    "/assets/Landing Page/snapshots/18.webp",
  ];

  let layer1;
  if (sm) {
    layer1 = 2;
  } else if (lg) {
    layer1 = 3;
  } else {
    layer1 = 4;
  }

  let layer2;
  if (sm) {
    layer2 = 1;
  } else if (lg) {
    layer2 = 2;
  } else {
    layer2 = 3;
  }

  let layer3;
  if (sm) {
    layer3 = 2;
  } else if (lg) {
    layer3 = 3;
  } else {
    layer3 = 4;
  }

  return (
    <div id="Showcase" className="h-full w-full">
      <h2 className="mb-8 flex w-full items-center justify-center text-4xl font-semibold">
        Gallery
      </h2>
      <div className="z-40 h-full w-full px-4 pb-16">
        <CarouselProvider
          naturalSlideWidth={100}
          naturalSlideHeight={45}
          totalSlides={images.length}
          visibleSlides={layer1}
          isPlaying={true} // Start the slideshow
          interval={3500} // Change slides every 3 seconds
        >
          <Slider>
            {images.map((image, index) => (
              <Slide index={index} key={index}>
                <img
                  className="h-full w-full object-cover p-1"
                  src={image}
                  alt={`Slide ${index + 1}`}
                />
              </Slide>
            ))}
          </Slider>
        </CarouselProvider>

        <CarouselProvider
          naturalSlideWidth={100}
          naturalSlideHeight={45}
          totalSlides={images2.length}
          visibleSlides={layer2}
          isPlaying={true} // Start the slideshow
          interval={3000} // Change slides every 3 seconds
        >
          <Slider>
            {images2.map((image, index) => (
              <Slide index={index} key={index}>
                <img
                  className="h-full w-full object-cover p-1"
                  src={image}
                  alt={`Slide ${index + 1}`}
                />
              </Slide>
            ))}
          </Slider>
        </CarouselProvider>

        <CarouselProvider
          naturalSlideWidth={100}
          naturalSlideHeight={45}
          totalSlides={images3.length}
          visibleSlides={layer3}
          isPlaying={true} // Start the slideshow
          interval={3500} // Change slides every 3 seconds
        >
          <Slider>
            {images3.map((image, index) => (
              <Slide index={index} key={index}>
                <img
                  className="h-full w-full object-cover p-1"
                  src={image}
                  alt={`Slide ${index + 1}`}
                />
              </Slide>
            ))}
          </Slider>
        </CarouselProvider>
      </div>
      <div className="z-40 flex w-full flex-col items-center justify-start">
        <div className="relative aspect-video w-80">
          <img
            sizes="10"
            loading="lazy"
            src="../assets/Landing Page/showcase/adventuraVN/adventuraVN.webp"
            alt="Adventura VN"
          />
        </div>
        <p className="mb-px4 w-full items-center justify-center px-4 pb-4 text-center [text-wrap:balance] md:w-1/2">
          Adventura VN is a Visual Novel game that allows the users to navigate
          inside the actual place of Cavite State University Indang Campus.
        </p>
        <button
          className="inline-flex h-10 items-center justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-500"
          onClick={() => navigate("/adventuravn")}
        >
          Play Adventura
        </button>
      </div>
    </div>
  );
};

export default Showcase;
