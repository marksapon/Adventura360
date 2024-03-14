import React from "react";

const Page3Content = () => (
  <div className="flex justify-center items-center w-full h-full">
    <div className="bg-white rounded-2xl w-full max-w-[800px] flex flex-col justify-between h-full max-h-[600px] border-black">
      <div className="flex flex-col w-full h-full items-center relative">
        <div className="flex w-full h-auto mt-12 md:mt-14 lg:mt-16 absolute z-10">
          <h1 className="text-4xl md:text-6xl lg:text-6xl xl:text-7xl text-green-600 font-black">
            Controls
          </h1>
        </div>
        <div className="flex flex-col w-full h-full justify-center items-center mt-16 text-2xl gap-6 px-5">
          <div className="w-full flex flex-row gap-5">
            <img
              src={"/assets/helpModal/share.png"}
              alt="mouse"
              className="w-10 h-10 md:w-16 md:h-16 lg:w-20 lg:h-20"
            />
            <p className="flex w-full h-full items-center justify-start text-xs md:text-xl lg:text-2xl">
              Share the location and view to other people through a link.
            </p>
          </div>
          <div className="w-full flex flex-row gap-5">
            <img
              src={"/assets/helpModal/help.png"}
              alt="mouse"
              className="w-10 h-10 md:w-16 md:h-16 lg:w-20 lg:h-20"
            />
            <p className="flex w-full h-full items-center justify-start text-xs md:text-xl lg:text-2xl">
              This is the help button. Click this when you need a refresher for
              Adventure 360°.
            </p>
          </div>
          <div className="w-full flex flex-row gap-5">
            <img
              src={"/assets/helpModal/bug.png"}
              alt="mouse"
              className="w-10 h-10 md:w-16 md:h-16 lg:w-20 lg:h-20"
            />
            <p className="flex w-full h-full items-center justify-start text-xs md:text-xl lg:text-2xl">
              Experiencing bugs? Or simply wants to share us your thoughts? Send
              us a feedback.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Page3Content;
