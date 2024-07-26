import React from "react";
import BlurFade from "@/components/magicui/blur-fade";

const Showcase = () => {
  const divsContent = [
    {
      id: 1,
      title: "360°",
      heading: "Accurate depiction of the actual location",
      description:
        "Explore the campus through accurate 360° images with built-in support for gyro and VR, available only on supported mobile devices.",
      imgSrc: "/assets/Landing Page/img1.png",
    },
    {
      id: 2,
      title: "Map",
      heading: "With interactive campus map to find what you’re looking for.",
      description:
        "Equipped with an interactive campus map, which gives an overview of the campus, it contains features to find and get directions to the buildings you want to visit.",
      imgSrc: "/assets/Landing Page/img2.png",
    },
    {
      id: 3,
      title: "Building Info",
      heading: "Check out every buildings in the campus",
      description:
        "Get informed about the building’s services, information and courses offered by the campus.",
      imgSrc: "/assets/Landing Page/img3.png",
    },
    {
      id: 4,
      title: "Tour Guide",
      heading: "With a virtual tour guide to accompany your journey",
      description:
        "A virtual tour guide that will accompany you through out the experience.",
      imgSrc: "/assets/Landing Page/img4.png",
    },
  ];

  return (
    <div
      id="Showcase"
      className="flex h-full w-full flex-col items-center justify-center"
    >
      <h1 className="mb-16 text-center text-2xl ">ABOUT</h1>

      <BlurFade delay={0.25 * 3} inView>
        <h2 className="text-cvsu font-bitter mb-16 px-2 text-center text-3xl font-bold md:text-5xl">
          CAVITE STATE UNIVERSITY
        </h2>
      </BlurFade>

      <div className="flex w-3/4 lg:w-2/3 ">
        <BlurFade delay={0.25 * 4} inView>
          <div className="flex rounded-3xl bg-card p-6 shadow-md shadow-black/30 md:p-8 lg:p-12">
            <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-4">
              <div className="col-span-1 flex justify-center ">
                <img
                  src="/assets/Landing Page/cvsu.png"
                  alt="cvsu"
                  className="object-fill"
                />
              </div>
              <h1 className="col-span-1 text-center text-lg leading-relaxed  md:col-span-3 md:text-start">
                <b className=" text-customgreen">Cavite State University</b>, is
                simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type.
              </h1>
            </div>
          </div>
        </BlurFade>
      </div>

      <div className="my-8 flex w-full px-4 md:w-3/4  md:px-0">
        <div className="flex w-full flex-col items-center justify-center rounded-3xl  bg-card py-8 shadow-md shadow-black/30">
          <h1 className="mb-4 text-xl  font-medium tracking-widest lg:mb-8 lg:text-2xl">
            FEATURES
          </h1>
          <h2 className="text-customgreen font-meduim font-bitter mb-8 px-2 text-center text-2xl leading-snug md:text-4xl lg:mb-16 lg:text-6xl">
            Experience a <br />
            feature-rich interactive tour
          </h2>

          <div className="flex w-full flex-col gap-4">
            {divsContent.map((div, index) => (
              <BlurFade key={div.id} delay={0.3 * index} inView>
                <div
                  className={`flex w-full flex-col items-center justify-center gap-4 px-4 ${
                    index % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"
                  } md:gap-2 md:px-24 lg:justify-between lg:px-44`}
                >
                  <div className="flex w-full flex-col items-center gap-2 text-center md:w-4/6  md:items-start md:gap-8 md:text-start ">
                    <h1 className="w-fit rounded-full border border-black px-10 py-1 text-sm">
                      {div.title}
                    </h1>
                    <h2 className="text-customgreen font-bitter text-2xl leading-snug md:text-3xl">
                      {div.heading}
                    </h2>
                    <p className="text-base md:text-xl">{div.description}</p>
                  </div>

                  <div className="flex h-96">
                    <img
                      src={div.imgSrc}
                      className="h-full object-contain"
                      alt={div.title}
                    />
                  </div>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Showcase;
