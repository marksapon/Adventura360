import React from "react";

const Page1Content = () => (
  <div className="flex justify-center items-center h-full">
    <div className="bg-white rounded-2xl w-full max-w-[800px] flex flex-col justify-between h-full max-h-[600px] border-black">
      <div className="flex flex-col w-full h-full items-center  relative">
        <div className="flex w-full h-auto mt-12 md:mt-14 lg:mt-16 absolute z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-green-600 font-black">
            Welcome
          </h1>
        </div>
        <div className="flex flex-col w-full h-full items-left justify-center z-20 pt-8 md:pt-6 lg:pt-4 xl:pt-6">
          <div className="flex h-auto w-full ">
            <p className="text-base sm:text-lg md:text-2xl lg:text-2xl xl:text-3xl text-left text-wrap font-light ">
              Adventura 360° offers a Virtual Tour around the campus. In order
              to ease out in traversing the campus you can use your{" "}
              <span className="text-green-600 font-bold">
                mouse, keyboard, screen arrows{" "}
              </span>
              or <span className="text-green-600 font-bold">touch</span> to move
              the camera
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Page1Content;
