import React from "react";

const Page2Content = () => (
  <div className="flex h-full items-center justify-center">
    <div className="flex h-full max-h-[600px] w-full max-w-[800px] flex-col justify-between rounded-2xl border-black bg-white">
      <div className="relative flex h-full w-full flex-col items-center">
        <div className="absolute z-10 mt-12 flex h-auto w-full md:mt-14 lg:mt-16">
          <h1 className="text-4xl font-black text-green-600 md:text-6xl lg:text-6xl xl:text-7xl">
            Controls
          </h1>
        </div>
        <div className="items-left z-20 flex h-full w-full flex-col justify-center gap-6 md:gap-12 lg:gap-16">
          <div className="mt-24 flex h-auto w-full flex-col items-center justify-items-center md:mt-14 lg:mt-16">
            <p className="justify-center text-wrap text-left text-base font-light md:text-2xl lg:text-2xl">
              To control the view, you can use your{" "}
              <span className="font-bold text-green-600">
                mouse, keyboard, and touchscreen gestures{" "}
              </span>{" "}
              for mobile.
            </p>
          </div>
          <div className="flex items-center justify-center gap-4 md:gap-8 lg:gap-10">
            <img
              src={"/assets/helpModal/modalpic1.png"}
              alt="mouse"
              className="h-20 w-40 md:h-32 md:w-60 lg:h-40 lg:w-72"
            />
            <img
              src={"/assets/helpModal/swipe.png"}
              alt="gesture"
              className="h-24 w-40 md:h-40 md:w-56 lg:h-48 lg:w-64"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Page2Content;
