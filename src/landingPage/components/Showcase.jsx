import React from "react";

const Showcase = () => {
  return (
    <div
      id="Showcase"
      className="flex h-full w-full flex-col items-center justify-center"
    >
      <h1 className="mb-24 text-center text-4xl ">ABOUT</h1>
      <h2 className="mb-16 px-2 text-center text-5xl font-bold text-green-700 md:text-7xl">
        CAVITE STATE UNIVERSITY
      </h2>

      <div className="flex w-3/4">
        <div className="grid grid-cols-1 gap-4 rounded-3xl bg-orange-100 p-8 shadow-md shadow-black/30 md:grid-cols-6">
          <div className="col-span-1 flex items-center justify-center md:col-span-2">
            <img
              src="/assets/Landing Page/cvsu.png"
              alt="cvsu"
              className="object-fill"
            />
          </div>
          <h1 className="col-span-1 text-center md:col-span-4">
            <b className="text-green-700">Cavite State University</b>, is simply
            dummy text of the printing and typesetting industry. Lorem Ipsum has
            been the industry's standard dummy text ever since the 1500s, when
            an unknown printer took a galley of type and scrambled it to make a
            type.
          </h1>
        </div>
      </div>

      <div className="my-8 flex w-3/4">
        <div className="flex w-full flex-col items-center justify-center gap-4 rounded-3xl  bg-orange-100 p-8 shadow-md shadow-black/30">
          <h1 className="my-8 text-3xl font-medium">FEATURES</h1>
          <h2 className="mb-16 text-center text-7xl font-semibold leading-snug text-green-700">
            Experience a <br />
            feature-rich interactive tour
          </h2>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between gap-4 ">
              <div className="flex w-3/5 flex-col items-start justify-center gap-8">
                <h1 className="w-fit rounded-full border border-black px-24 py-2 text-4xl font-bold">
                  360°
                </h1>
                <h2 className="text-5xl leading-snug text-green-700">
                  Accurate depiction of the actual location
                </h2>
                <h3 className="text-4xl leading-snug">
                  Explore the campus through accurate <b>360° images</b> with
                  built-in support for <b>gyro</b> and <b>VR</b> , available
                  only on <b>supported mobile devices.</b>
                </h3>
              </div>
              <img
                src="/assets/Landing Page/img1.png"
                className=" object-contain"
                alt="img1"
              />
            </div>

            <div className="flex justify-between gap-4 ">
              <img
                src="/assets/Landing Page/img1.png"
                className=" object-contain"
                alt="img2"
              />
              <div className="flex w-3/5 flex-col items-start justify-center gap-8">
                <h1 className="w-fit rounded-full border border-black px-24 py-2 text-4xl font-bold">
                  Map
                </h1>
                <h2 className="text-5xl leading-snug text-green-700">
                  With interactive campus map to find what you’re looking for.
                </h2>
                <h3 className="text-4xl leading-snug">
                  Equipped with an interactive campus map, which gives an
                  overview of the campus, it contains features to find and get
                  directions to the buildings you want to visit.
                </h3>
              </div>
            </div>

            <div className="flex justify-between gap-4 ">
              <div className="flex w-3/5 flex-col items-start justify-center gap-8">
                <h1 className="w-fit rounded-full border border-black px-24 py-2 text-4xl font-bold">
                  Building Info
                </h1>
                <h2 className="text-5xl leading-snug text-green-700">
                  Check out every buildings in the campus
                </h2>
                <h3 className="text-4xl leading-snug">
                  Get informed about the building’s services, information and
                  courses offered by the campus.
                </h3>
              </div>
              <img
                src="/assets/Landing Page/img1.png"
                className=" object-contain"
                alt="img3"
              />
            </div>

            <div className="flex justify-between gap-4 pb-16">
              <img
                src="/assets/Landing Page/img1.png"
                className=" object-contain"
                alt="img2"
              />
              <div className="flex w-3/5 flex-col items-start justify-center gap-8">
                <h1 className="w-fit rounded-full border border-black px-24 py-2 text-4xl font-bold">
                  Tour Guide
                </h1>
                <h2 className="text-5xl leading-snug text-green-700">
                  With a virtual tour guide to accompany your journey
                </h2>
                <h3 className="text-4xl leading-snug">
                  A virtual tour guide that will accompany you through out the
                  experience.
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Showcase;
