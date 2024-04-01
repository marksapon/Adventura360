import React, { useState } from "react";
import { IoIosClose } from "react-icons/io";

const Bugmodal = ({ visible, onClose }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [showThankYouModal, setShowThankYouModal] = useState(false);

  const handleCloseAndReset = () => {
    onClose();
    resetState();
  };

  const selectItem = (item) => {
    setSelectedItem(item);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
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

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-25 px-2">
      <div className="flex h-auto w-full items-center justify-center">
        <div className="flex h-full max-h-[600px] w-auto min-w-[300px] max-w-[560px] flex-col justify-center rounded-2xl border border-black bg-white px-4">
          <div className="flex h-full flex-col items-end py-4">
            <button
              className="flex items-center justify-center"
              onClick={() => {
                handleCloseAndReset;
              }}
            >
              <IoIosClose className="h-12 w-12" />
            </button>
            <div className="gap-6">
              <h1 className="flex text-4xl font-bold text-green-600">
                Feedback
              </h1>
              <p className="text-full mt-3 flex font-sans text-lg">
                Your feedback is crucial to us. Please share any thoughts or
                concerns to help us improve. Thank you for being part of our
                journey!
              </p>
            </div>
          </div>
          <div className="flex h-full w-full flex-col justify-between gap-4">
            <div className="h-full w-full">
              <div
                className="dropdown-header h-12 w-full cursor-pointer items-center justify-center rounded-lg border border-green-600 p-2"
                onClick={toggleDropdown}
              >
                {selectedItem ? selectedItem : "Category"}
                {isOpen && (
                  <ul className="relative z-auto mt-6 w-full max-w-[508px] flex-row rounded-lg border border-green-600 bg-white shadow-lg">
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

              <div className="flex w-full">
                <input
                  type="email"
                  className="mt-2 h-12 w-full rounded-lg border border-green-600 p-2"
                  placeholder="Enter your email here..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="flex w-full">
                <textarea
                  id="message"
                  className="mt-2 h-36 w-full resize-none rounded-lg border border-green-600 bg-white p-2 text-sm text-gray-900"
                  placeholder="Write your message here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
            </div>

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
                className="h-12 w-12"
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
    </div>
  );
};

export default Bugmodal;
