import React from "react";

const Page2Content = () => (
  <div className="flex justify-center items-center h-full">
    <div className="bg-white rounded-2xl w-full max-w-[800px] flex flex-col justify-between h-full max-h-[600px] border-black">
      <div className="flex flex-col w-full h-full items-center relative">
        <div className="flex w-full h-auto mt-12 md:mt-14 lg:mt-16 absolute z-10">
          <h1 className="text-4xl md:text-6xl lg:text-6xl xl:text-7xl text-brandPrimary font-black">Controls</h1>
        </div>
        <div className="flex flex-col w-full h-full gap-6 md:gap-12 lg:gap-16 items-left justify-center z-20">
          <div className="flex flex-col h-auto w-full mt-24 md:mt-14 lg:mt-16 items-center justify-items-center">
            <p className="justify-center text-left text-wrap text-base md:text-2xl lg:text-2xl font-light">
              To control the view, you can use your{" "}
              <span className="text-brandPrimary font-bold">
                mouse, keyboard, and touchscreen gestures{" "}
              </span>{" "}
              for mobile.
            </p>
          </div>
          <div className="flex gap-4 md:gap-8 lg:gap-10 justify-center items-center">
            <img
              src={"/assets/helpModal/modalpic1.png"}
              alt="mouse"
              className="w-40 h-20 md:w-60 md:h-32 lg:w-72 lg:h-40"
            />
            <img
              src={"/assets/helpModal/swipe.png"}
              alt="gesture"
              className="w-40 h-24 md:w-56 md:h-40 lg:w-64 lg:h-48"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Page2Content;
