import React from "react";

const Page2Content = () => (
  <div className="flex h-full items-center justify-center">
    <div className="flex h-full max-h-[600px] w-full max-w-[800px] flex-col justify-between rounded-2xl border-black bg-white">
      <div className="relative flex h-full w-full flex-col items-center">
        <div className="absolute z-10 mt-12 flex h-auto w-full md:mt-14 lg:mt-16">
          <h1 className="text-4xl font-black text-green-600">Controls</h1>
        </div>
        <div className="items-left z-20 flex h-full w-full flex-col justify-center gap-6">
          <div className="mt-24 flex h-auto w-full flex-col items-center justify-items-center ">
            <p className="justify-center text-wrap text-left text-base font-light">
              To control the view, you can use your{" "}
              <span className="font-bold text-green-600">
                mouse, keyboard, and touchscreen gestures{" "}
              </span>{" "}
              for mobile.
            </p>
          </div>
          <div className="flex items-center justify-center gap-4 ">
            <img
              src={"/assets/helpModal/modalpic1.png"}
              alt="mouse"
              className="h-20 w-40"
            />
            <img
              src={"/assets/helpModal/swipe.png"}
              alt="gesture"
              className="h-24 w-24"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Page2Content;
