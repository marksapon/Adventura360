import React from "react";
import { IoIosClose } from "react-icons/io";
import { MdContentCopy } from "react-icons/md";

const Sharelink = ({ visible, onClose }) => {
  if (!visible) return null;

  const currentUrl = window.location.href;

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        alert("URL copied to clipboard: " + currentUrl);
      })
      .catch((error) =>
        console.error("Error copying URL to clipboard: ", error)
      );
  };

  return (
    <div
      id="container"
      onClick={null}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-25"
    >
      <div className="flex bg-white h-24 w-80 md:h-32 md:w-[464px] lg:h-36 lg:w-[664px] relative rounded-lg flex-col">
        <div className="flex flex-row w-full h-auto items-center">
          <div className="flex relative w-full flex-row-reverse items-center justify-items-end">
            <div className="flex items-end justify-items-end relative">
              <button
                className="flex justify-center items-end mt-auto mb-auto"
                onClick={onClose}
              >
                <IoIosClose className="h-6 w-6 md:h-8 md:w-8 lg:h-10 lg:w-10" />
              </button>
            </div>
            <div className="flex w-full h-full items-center justify-center mt-4">
              <p className="text-green-600 text-xl sm:text-xl md:text-3xl lg:text-4xl">
                Share what you see!
              </p>
            </div>
          </div>
        </div>
        <div className="flex px-6  my-3 sm:my-2 md:my-4 lg:my-4 justify-between items-center h-full w-full gap-4">
          <div className="flex bg-gray-200 w-[12%] h-full rounded-lg items-center justify-center text-green-600 ">
            <button onClick={copyToClipboard} className="">
              <MdContentCopy className="h-6 w-6 md:h-8 md:w-8 lg:h-10 lg:w-10" />
            </button>
          </div>
          <div className="bg-gray-200 h-full w-full rounded-lg flex items-center">
            <p className="text-gray-700 pl-4 text-xs sm:2xl md:2xl lg:3xl">
              {currentUrl}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sharelink;
