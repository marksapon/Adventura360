import React from "react";
import { PiPlayCircleLight } from "react-icons/pi"; // Autoplay Button
import { TbMaximize, TbMaximizeOff } from "react-icons/tb"; // Fullscreen On/Off
import { IoMdSearch } from "react-icons/io"; // Search Button
const Page4Content = () => (
  <div className="flex h-full w-full items-center justify-center">
    <div className="flex h-full max-h-[600px] w-full max-w-[800px] flex-col justify-between rounded-2xl border-black bg-white">
      <div className="relative flex h-full w-full flex-col items-center">
        <div className="absolute z-10 mt-12 flex h-auto w-full">
          <h1 className="text-4xl font-black text-green-600">Controls</h1>
        </div>
        <div className="mt-16 flex h-full w-full flex-col items-center justify-center gap-10 px-5 text-2xl">
          <div className="flex w-full flex-row gap-5">
            {/* <img
              src={"/assets/Modals/help modal/autoplay.webp"}
              alt="mouse"
              className="h-10 w-10"
            /> */}
            <PiPlayCircleLight className="h-10 w-10 text-green-600" />
            <p className="flex h-full w-full items-center justify-start text-xs">
              Tired of scrolling through 360° images? Click this button to auto play the 360° images.
            </p>
          </div>
          <div className="flex w-full flex-row gap-5">
            {/* <img
              src={"/assets/Modals/help modal/fullscreen.webp"}
              alt="mouse"
              className="h-10 w-10"
            /> */}
            <TbMaximize className="h-10 w-10 text-green-600" />
            <p className="flex h-full w-full items-center justify-start text-xs">
              This is the Fullscreen button. Click this when you you want to
              experience Anventura360° in fullscreen.
            </p>
          </div>

          <div className="flex w-full flex-row gap-5">
            {/* <img
              src={"/assets/Modals/help modal/fullscreen.webp"}
              alt="mouse"
              className="h-10 w-10"
            /> */}
            <IoMdSearch className="h-10 w-10 text-green-600" />
            <p className="flex h-full w-full items-center justify-start text-xs">
              This is the search button. Click this when you need to search a
              building or a landmark in Adventura360°.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Page4Content;
