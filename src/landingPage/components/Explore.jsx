import React from "react";
import { IoArrowForwardCircleOutline } from "react-icons/io5";

const Explore = () => {
  return (
    <>
      <div id="Developers" />
      <div className="mb-20 mt-36 h-full w-full">
        <div id="Developers" />
        <div className="flex flex-col items-center">
          <div className="grid w-full grid-cols-4 justify-center text-center">
            <h1 className="col-span-3 text-2xl text-black">CREATED USING</h1>
          </div>
          <img
            src="/assets/Landing Page/Landlogo.png"
            alt="react"
            className="h-full w-1/3 "
          />
        </div>

        <div className="mx-4 flex flex-col items-center justify-center gap-8 md:flex-row ">
          <div className="">
            <video controls className="h-64 w-auto rounded-2xl">
              <source src="path/to/your/video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="relative flex items-center justify-center text-center">
            <div className="absolute inset-1 flex flex-col items-center justify-center space-y-2 px-12 pt-10">
              <p className="px-4 text-justify text-sm font-normal italic text-white lg:text-base">
                <b>Adventura360°</b> is an interactive map and tour made by
                student researchers of BS Computer Science.{" "}
                <b>Adventura360° </b>
                is designed to guide and highlight the locations to entice the
                target audiences.
              </p>
              <h1 className="flex text-nowrap font-bitter text-xl font-bold italic text-white ">
                Learn more about Adventura360°
              </h1>
              <button>
                <IoArrowForwardCircleOutline className="h-10 w-10 text-white" />
              </button>
            </div>
            <img
              src="/assets/Landing Page/blob1.svg"
              className=" h-auto w-96"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Explore;
