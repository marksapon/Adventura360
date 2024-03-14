import React from "react";

const Page1Content = () => (
  <div className="flex h-full items-center justify-center">
    <div className="flex h-full max-h-[600px] w-full max-w-[800px] flex-col justify-between rounded-2xl border-black bg-white">
      <div className="relative flex h-full w-full flex-col  items-center">
        <div className="absolute z-10 mt-12 flex h-auto w-full md:mt-14 lg:mt-16">
          <h1 className="text-5xl font-black text-green-600 sm:text-7xl md:text-7xl lg:text-7xl xl:text-7xl">
            Welcome
          </h1>
        </div>
        <div className="items-left z-20 flex h-full w-full flex-col justify-center pt-8 md:pt-6 lg:pt-4 xl:pt-6">
          <div className="flex h-auto w-full ">
            <p className="text-1xl text-wrap text-left sm:text-2xl">
              Adventura 360° offers a Virtual Tour around the campus. In order
              to ease out in traversing the campus you can use your{" "}
              <span className="font-bold text-green-600">
                mouse, keyboard, screen arrows{" "}
              </span>
              or <span className="font-bold text-green-600">touch</span> to move
              the camera
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Page1Content;
