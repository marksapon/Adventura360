import React from "react";

const Showcase = () => {
  return (
    <div
      id="Showcase"
      className="flex h-full w-full flex-col items-center justify-center"
    >
      <h1 className="mb-16 text-center text-2xl ">ABOUT</h1>
      <h2 className="text-cvsu font-bitter mb-16 px-2 text-center text-3xl font-bold md:text-5xl">
        CAVITE STATE UNIVERSITY
      </h2>

      <div className="flex w-3/4 lg:w-2/3 ">
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
              simply dummy text of the printing and typesetting industry. Lorem
              Ipsum has been the industry's standard dummy text ever since the
              1500s, when an unknown printer took a galley of type and scrambled
              it to make a type.
            </h1>
          </div>
        </div>
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
            <div className="flex w-full flex-col items-center justify-center gap-4 px-4  md:flex-row md:gap-2 md:px-24 lg:justify-between lg:px-44">
              <div className="flex w-full flex-col items-center gap-2 text-center md:w-4/6  md:items-start md:gap-8 md:text-start ">
                <h1 className="w-fit rounded-full border border-black px-10 py-1 text-sm">
                  360°
                </h1>
                <h2 className="text-customgreen font-bitter text-2xl leading-snug md:text-3xl">
                  Accurate depiction of the actual location
                </h2>
                <p className="text-base md:text-xl">
                  Explore the campus through accurate <b>360° images </b>
                  with built-in support for <b>gyro</b> and <b>VR</b>, available
                  only <b>on supported mobile devices</b>.
                </p>
              </div>

              <div className="flex h-96">
                <img
                  src="/assets/Landing Page/img1.png"
                  className="h-full object-contain"
                  alt="img1"
                />
              </div>
            </div>

            <div className="flex w-full flex-col items-center justify-center gap-4 px-4  md:flex-row-reverse md:gap-2 md:px-24 lg:justify-between lg:px-44">
              <div className="flex w-full flex-col items-center gap-2 text-center md:w-4/6  md:items-start md:gap-8 md:text-start ">
                <h1 className="w-fit rounded-full border border-black px-10 py-1 text-sm">
                  Map
                </h1>
                <h2 className="text-customgreen font-bitter text-2xl leading-snug md:text-3xl">
                  With interactive campus map to find what you’re looking for.
                </h2>
                <p className="text-base md:text-xl">
                  Equipped with an interactive campus map, which gives an
                  overview of the campus, it contains features to find and get
                  directions to the buildings you want to visit.
                </p>
              </div>

              <div className="flex h-96">
                <img
                  src="/assets/Landing Page/img2.png"
                  className=" h-full object-contain"
                  alt="img2"
                />
              </div>
            </div>

            <div className="flex w-full flex-col items-center justify-center gap-4 px-4  md:flex-row md:gap-2 md:px-24 lg:justify-between lg:px-44">
              <div className="flex w-full flex-col items-center gap-2 text-center md:w-4/6  md:items-start md:gap-8 md:text-start ">
                <h1 className="w-fit rounded-full border border-black px-10 py-1 text-sm">
                  Building Info
                </h1>
                <h2 className="text-customgreen font-bitter text-2xl leading-snug md:text-3xl">
                  Check out every buildings in the campus
                </h2>
                <p className="text-base md:text-xl">
                  Get informed about the building’s services, information and
                  courses offered by the campus.
                </p>
              </div>

              <div className="flex h-96">
                <img
                  src="/assets/Landing Page/img3.png"
                  className="h-full object-contain"
                  alt="img3"
                />
              </div>
            </div>

            <div className="flex w-full flex-col items-center justify-center gap-4 px-4  md:flex-row-reverse md:gap-2 md:px-24 lg:justify-between lg:px-44">
              <div className="flex w-full flex-col items-center gap-2 text-center md:w-4/6  md:items-start md:gap-8 md:text-start ">
                <h1 className="w-fit rounded-full border border-black px-10 py-1 text-sm">
                  Tour Guide
                </h1>
                <h2 className="text-customgreen font-bitter text-2xl leading-snug md:text-3xl">
                  With a virtual tour guide to accompany your journey
                </h2>
                <p className="text-base md:text-xl">
                  A virtual tour guide that will accompany you through out the
                  experience.
                </p>
              </div>

              <div className="flex h-96">
                <img
                  src="/assets/Landing Page/img4.png"
                  className="h-full object-contain"
                  alt="img4"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Showcase;
