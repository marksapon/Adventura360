import React from "react";

const Page3Content = () => (
  <div className="flex h-full w-full items-center justify-center">
    <div className="flex h-full max-h-[600px] w-full max-w-[800px] flex-col justify-between rounded-2xl border-black bg-white">
      <div className="relative flex h-full w-full flex-col items-center">
        <div className="absolute z-10 mt-12 flex h-auto w-full">
          <h1 className="text-4xl font-black text-green-600">Controls</h1>
        </div>
        <div className="mt-16 flex h-full w-full flex-col items-center justify-center gap-6 px-5 text-2xl">
          <div className="flex w-full flex-row gap-5">
            <img
              src={"/assets/Modals/help modal/share.png"}
              alt="mouse"
              className="h-10 w-10"
            />
            <p className="flex h-full w-full items-center justify-start text-xs">
              Share the location and view to other people through a link.
            </p>
          </div>
          <div className="flex w-full flex-row gap-5">
            <img
              src={"/assets/Modals/help modal/help.png"}
              alt="mouse"
              className="h-10 w-10"
            />
            <p className="flex h-full w-full items-center justify-start text-xs">
              This is the help button. Click this when you need a refresher for
              Adventure 360°.
            </p>
          </div>
          <div className="flex w-full flex-row gap-5">
            <img
              src={"/assets/Modals/help modal/bug.png"}
              alt="mouse"
              className="h-10 w-10"
            />
            <p className="flex h-full w-full items-center justify-start text-xs">
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
