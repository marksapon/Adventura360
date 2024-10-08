import React, { useState } from "react";
import { IoIosClose } from "react-icons/io";
import { MdContentCopy } from "react-icons/md";

const Sharelink = ({ onClose }) => {
  const currentUrl = window.location.href;
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(currentUrl)
      .catch((error) =>
        console.error("Error copying URL to clipboard: ", error),
      );
    setIsCopied(true);
  };

  return (
    <div
      id="container"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-25 px-4"
    >
      <div className="relative z-50 flex  flex-col rounded-xl bg-white p-2">
        <div className="flex h-auto w-full flex-row items-center">
          <div className="relative flex w-full flex-row-reverse items-center justify-items-end">
            <div className="relative flex items-end justify-items-end">
              <button
                className="mb-auto mt-auto flex items-end justify-center"
                onClick={() => {
                  onClose();
                }}
              >
                <IoIosClose className="h-6 w-6 text-black md:h-8 md:w-8 lg:h-10 lg:w-10" />
              </button>
            </div>
            <div className="mt-4 flex h-full w-full flex-col items-center justify-between">
              <p className="text-2xl font-bold text-green-600">
                Share what you see!
              </p>
            </div>
          </div>
        </div>

        <div className="my-2 flex h-full w-full flex-col items-center justify-start px-2">
          <div className="flex gap-4">
            <div className="flex h-full items-start justify-start rounded-lg bg-gray-200 p-3 text-green-600">
              <button
                onClick={() => {
                  copyToClipboard();
                }}
              >
                <MdContentCopy className="h-6 w-6" />
              </button>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex h-full w-full items-center rounded-lg bg-gray-200 p-4">
                <p className="sm:2xl md:2xl lg:3xl text-sm text-gray-700">
                  {currentUrl}
                </p>
              </div>
              {isCopied && (
                <p className="flex w-full items-center justify-start text-center text-xs text-green-600">
                  Link copied!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sharelink;
