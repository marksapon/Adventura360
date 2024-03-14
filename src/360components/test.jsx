import React, { useState } from "react";
import { IoIosClose } from "react-icons/io";

const Bugmodal = ({ visible, onClose }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [showThankYouModal, setShowThankYouModal] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectItem = (item) => {
    setSelectedItem(item);
    setIsOpen(false);
  };

  const handleClose = () => {
    onClose();
    resetState(); // Reset the state when closing
  };

  const handleSubmit = () => {
    handleClose(); // Close the modal and reset the state
    setShowThankYouModal(true); // Show the "Thank You" modal
  };

  const resetState = () => {
    setSelectedItem(null);
    setEmail("");
    setMessage("");
    setIsOpen(false);
    setShowThankYouModal(false);
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-25 ${
          visible ? "" : "hidden"
        }`}
      >
        <div className="flex h-[360px] w-[260px] flex-col rounded-lg border border-green-600 bg-white shadow-lg sm:h-[400px] md:h-[460px] lg:h-[560px]">
          <button
            className="flex items-end justify-end p-2 text-xl text-gray-600 hover:text-gray-800"
            onClick={handleClose}
          >
            <IoIosClose className="h-10 w-10" />
          </button>
          <div className="relative">
            <h1 className="text ml-12 flex text-4xl font-bold text-green-600">
              Feedback
            </h1>
            <p className="ml-12 mt-3 flex text-balance font-sans text-lg">
              Your feedback is crucial to us. Please share any thoughts or
              concerns to help us improve. Thank you for being part of our
              journey!
            </p>
          </div>
          <div className="relative">
            <div className="relative flex items-center justify-center ">
              <div
                className="dropdown-header mt-4 h-12 w-[380px] cursor-pointer items-center justify-center rounded-lg border border-green-600 p-2"
                onClick={toggleDropdown}
              >
                {selectedItem ? selectedItem : "Category"}
              </div>
              {isOpen && (
                <ul className="absolute z-50 mt-[280px] w-[380px] flex-row items-center justify-center rounded-lg border border-green-600 bg-white shadow-lg">
                  <li
                    className="cursor-pointer border-b p-2 text-center hover:bg-gray-100"
                    onClick={() => selectItem("Bug")}
                  >
                    Bug
                  </li>
                  <li
                    className="cursor-pointer border-b p-2 text-center hover:bg-gray-100"
                    onClick={() => selectItem("Suggestions")}
                  >
                    Suggestions
                  </li>
                  <li
                    className="cursor-pointer border-b p-2 text-center hover:bg-gray-100"
                    onClick={() => selectItem("Content Request")}
                  >
                    Content Request
                  </li>
                  <li
                    className="cursor-pointer border-b p-2 text-center hover:bg-gray-100"
                    onClick={() => selectItem("Feature Request")}
                  >
                    Feature Request
                  </li>
                  <li
                    className="cursor-pointer border-b p-2 text-center hover:bg-gray-100"
                    onClick={() => selectItem("Others")}
                  >
                    Others
                  </li>
                </ul>
              )}
            </div>
          </div>
          <div className="relative">
            <div className="relative flex items-center justify-center">
              <input
                type="email"
                className="mt-2 h-12 w-[380px] rounded-lg border border-green-600 p-2"
                placeholder="Enter your email here..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="relative">
            <div className="flex items-start justify-center">
              <textarea
                id="message"
                className="mt-2 h-36 w-[380px]  rounded-lg border border-green-600 bg-white p-2 text-sm text-gray-900"
                placeholder="Write your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
          </div>
          <div className="relative mt-auto flex flex-col justify-center">
            <div className="flex w-auto items-center justify-center">
              <button
                className=" mb-4 h-auto w-auto rounded-full border border-gray-400 bg-white px-4 text-3xl text-green-600"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      {showThankYouModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-25">
          <div className="flex h-[320px] w-[360px] flex-col rounded-lg border border-green-600 bg-white shadow-lg">
            <button className="flex items-end justify-end p-2">
              <IoIosClose
                className="h-8 w-8"
                onClick={() => setShowThankYouModal(false)}
              />
            </button>
            <div className="flex items-center justify-center">
              <h1 className="text-4xl font-bold text-green-600">Thank You!</h1>
            </div>
            <div className="mt-4 flex items-center justify-center">
              <p className="text-lg text-gray-700">
                Your feedback has been submitted successfully.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Bugmodal;
