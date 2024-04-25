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

const Showcase = () => {
  const sm = useMediaQuery({ query: "(max-width: 640px)" });
  const lg = useMediaQuery({ query: "(max-width: 1024px)" });

  const images = [
    "https://schoolfiber.com/wp-content/uploads/2016/08/landscape2-dummy-768x435.jpg",
    "https://rylind.com/wp-content/uploads/2021/04/efe.jpg",
    "https://rylind.com/wp-content/uploads/2021/04/efe.jpg",
    "https://rylind.com/wp-content/uploads/2021/04/efe.jpg",
    "https://rylind.com/wp-content/uploads/2021/04/efe.jpg",
    "https://rylind.com/wp-content/uploads/2021/04/efe.jpg",
    "https://rylind.com/wp-content/uploads/2021/04/efe.jpg",
    "https://rylind.com/wp-content/uploads/2021/04/efe.jpg",
    "https://rylind.com/wp-content/uploads/2021/04/efe.jpg",
    "https://rylind.com/wp-content/uploads/2021/04/efe.jpg",
    "https://rylind.com/wp-content/uploads/2021/04/efe.jpg",
    "https://rylind.com/wp-content/uploads/2021/04/efe.jpg",
  ];

  const images2 = [
    "https://schoolfiber.com/wp-content/uploads/2016/08/landscape2-dummy-768x435.jpg",
    "https://schoolfiber.com/wp-content/uploads/2016/08/landscape2-dummy-768x435.jpg",
    "https://rylind.com/wp-content/uploads/2021/04/efe.jpg",
    "https://schoolfiber.com/wp-content/uploads/2016/08/landscape2-dummy-768x435.jpg",
    "https://rylind.com/wp-content/uploads/2021/04/efe.jpg",
    "https://schoolfiber.com/wp-content/uploads/2016/08/landscape2-dummy-768x435.jpg",
    "https://rylind.com/wp-content/uploads/2021/04/efe.jpg",
    "https://rylind.com/wp-content/uploads/2021/04/efe.jpg",
    "https://rylind.com/wp-content/uploads/2021/04/efe.jpg",
    "https://rylind.com/wp-content/uploads/2021/04/efe.jpg",
    "https://rylind.com/wp-content/uploads/2021/04/efe.jpg",
    "https://rylind.com/wp-content/uploads/2021/04/efe.jpg",
  ];

  const images3 = [
    "https://schoolfiber.com/wp-content/uploads/2016/08/landscape2-dummy-768x435.jpg",
    "https://schoolfiber.com/wp-content/uploads/2016/08/landscape2-dummy-768x435.jpg",
    "https://schoolfiber.com/wp-content/uploads/2016/08/landscape2-dummy-768x435.jpg",
    "https://schoolfiber.com/wp-content/uploads/2016/08/landscape2-dummy-768x435.jpg",
    "https://schoolfiber.com/wp-content/uploads/2016/08/landscape2-dummy-768x435.jpg",
    "https://schoolfiber.com/wp-content/uploads/2016/08/landscape2-dummy-768x435.jpg",
    "https://schoolfiber.com/wp-content/uploads/2016/08/landscape2-dummy-768x435.jpg",
    "https://schoolfiber.com/wp-content/uploads/2016/08/landscape2-dummy-768x435.jpg",
    "https://rylind.com/wp-content/uploads/2021/04/efe.jpg",
    "https://rylind.com/wp-content/uploads/2021/04/efe.jpg",
    "https://rylind.com/wp-content/uploads/2021/04/efe.jpg",
    "https://rylind.com/wp-content/uploads/2021/04/efe.jpg",
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
      <h2 className="mb-2 flex w-full items-center justify-center text-4xl font-semibold">
        Gallery
      </h2>
      <p className="flex w-full items-center justify-center pb-8 text-gray-700">
        showcases the beauty of the university and thesis ??
      </p>
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
          totalSlides={images2.length}
          visibleSlides={layer3}
          isPlaying={true} // Start the slideshow
          interval={3500} // Change slides every 3 seconds
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
      </div>
      <div className="flex w-full flex-col items-center">
        <h1 className="mb-2 flex w-full items-center justify-center text-center text-4xl font-semibold">
          Adventura VN
        </h1>
        <p className="w-full items-center justify-center px-4 pb-8 text-center [text-wrap:balance] md:w-1/2">
          Adventura VN is a Visual Novel game that allows the users to navigate
          inside the actual place of Cavite State University Indang Campus.
        </p>
      </div>
      <div className="z-40 flex w-full flex-col items-center justify-start">
        <div className="relative aspect-video w-80">
          <img
            sizes="10"
            loading="lazy"
            src="../assets/adventuraVN/adventuraVN.png"
            alt="Adventura VN"
          />
        </div>
        <a
          href="https://placide.itch.io/adventura"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-10 items-center justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-500"
        >
          Play Adventura
        </a>
      </div>
    </div>
  );
};

export default Showcase;
