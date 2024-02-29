import React from 'react';
import { IoIosClose } from 'react-icons/io';
import { MdContentCopy } from "react-icons/md";

const Sharelink = ({ visible, onClose }) => {
  if (!visible) return null;

  const currentUrl = window.location.href;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentUrl)
      .then(() => {
        alert('URL copied to clipboard: ' + currentUrl);
      })
      .catch((error) => console.error('Error copying URL to clipboard: ', error));
  };

  return (
    <div id="container" onClick={null} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-25">
      <div className="flex bg-white h-[148px] w-[664px] relative rounded-lg flex-col">
        <div className="flex flex-row w-full h-auto items-center">
          <div className="flex relative w-full flex-row-reverse items-center justify-items-end">
            <div className="flex items-end justify-items-end relative">
              <button className="flex justify-center items-end mt-auto mb-auto" onClick={onClose}>
                <IoIosClose className="h-10 w-10" />
              </button>
            </div>
            <div className='flex w-full h-full items-center justify-center mt-4'>
              <p className="text-brandPrimary text-4xl">
                Share what you see!
              </p>
            </div>
          </div>
        </div>
        <div className="flex px-6 my-4 justify-between items-center h-full w-full gap-4">
          <div className="flex bg-gray-200 w-[12%] h-full rounded-lg items-center justify-center text-brandPrimary">
            <button onClick={copyToClipboard}>
              <MdContentCopy className="h-10 w-10" />
            </button>
          </div>
          <div className="bg-gray-200 h-full w-full rounded-lg flex items-center">
            <p className="text-gray-700 pl-4">{currentUrl}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sharelink;
