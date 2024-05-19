import React from "react";

import { GrMap } from "react-icons/gr"; // Map Button
import { Tb360View } from "react-icons/tb"; // 360 Icon

const Page5Content = () => (
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
            <GrMap className="h-10 w-10 text-green-600" />
            <p className="flex h-full w-full items-center justify-start text-xs">
              Click this button when you want to return in the 360 experience.
            </p>
          </div>
          <div className="flex w-full flex-row gap-5">
            {/* <img
              src={"/assets/Modals/help modal/fullscreen.webp"}
              alt="mouse"
              className="h-10 w-10"
            /> */}
            <Tb360View className="h-10 w-10 text-green-600" />
            <p className="flex h-full w-full items-center justify-start text-xs">
              This is the Map button. Click this when you you want to to go and
              have a lool at the map of our University.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Page5Content;
