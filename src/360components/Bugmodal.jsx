import React, { useState } from 'react';
import { IoIosClose } from 'react-icons/io';

const Bugmodal = ({ visible, onClose }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
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
  };

  const handleSubmit = () => {
    handleClose(); // Close the modal
    setShowThankYouModal(true); // Show the "Thank You" modal
  };

  return (
    <>
      <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-25 z-50 ${visible ? '' : 'hidden'}`}>
        <div className="flex flex-col w-[260px] h-[360px]  md:h-[460px] md:w-[360px] lg:h-[560px] lg:w-[460px] bg-white rounded-lg shadow-lg border-brandPrimary border">
          <button className="flex justify-end items-end p-2 text-xl text-gray-600 hover:text-gray-800" onClick={handleClose}>
            <IoIosClose className="h-10 w-10" />
          </button>
          <div className="relative">
            <h1 className="flex text-4xl text-brandPrimary text font-bold ml-12">
              Feedback
            </h1>
            <p className="flex text-balance text-lg font-sans ml-12 mt-3">Your feedback is crucial to us. Please share any thoughts or concerns to help us improve. Thank you for being part of our journey!</p>
          </div>
          <div className="relative">
            <div className="relative flex items-center justify-center ">
              <div className="dropdown-header cursor-pointer p-2 border border-brandPrimary w-[380px] h-12 mt-4 rounded-lg items-center justify-center" onClick={toggleDropdown}>
                {selectedItem ? selectedItem : 'Category'}
              </div>
              {isOpen && (
                <ul className="absolute w-[380px] bg-white border border-brandPrimary rounded-lg shadow-lg flex-row justify-center items-center mt-[280px] z-50">
                  <li className="p-2 cursor-pointer hover:bg-gray-100 text-center border-b" onClick={() => selectItem('Bug')}>Bug</li>
                  <li className="p-2 cursor-pointer hover:bg-gray-100 text-center border-b" onClick={() => selectItem('Suggestions')}>Suggestions</li>
                  <li className="p-2 cursor-pointer hover:bg-gray-100 text-center border-b" onClick={() => selectItem('Content Request')}>Content Request</li>
                  <li className="p-2 cursor-pointer hover:bg-gray-100 text-center border-b" onClick={() => selectItem('Feature Request')}>Feature Request</li>
                  <li className="p-2 cursor-pointer hover:bg-gray-100 text-center border-b" onClick={() => selectItem('Others')}>Others</li>
                </ul>
              )}
            </div>
          </div>
          <div className="relative">
            <div className="relative flex items-center justify-center">
              <input
                type="email"
                className="p-2 border border-brandPrimary w-[380px] h-12 mt-2 rounded-lg"
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
                className="p-2 w-[380px] h-36  mt-2 text-sm text-gray-900 bg-white rounded-lg border border-brandPrimary"
                placeholder="Write your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
          </div>
          <div className="relative flex flex-col justify-center mt-auto">
          <div className="flex w-auto items-center justify-center">
             <button className=" h-auto w-auto rounded-full mb-4 px-4 bg-white text-brandPrimary border border-gray-400 text-3xl" onClick={handleSubmit}>Submit</button>
          </div>
        </div>
        </div>
      </div>
      {showThankYouModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-25 z-50">
          <div className="flex flex-col h-[320px] w-[360px] bg-white rounded-lg shadow-lg border-brandPrimary border">
            <button className="flex justify-end items-end p-2">
              <IoIosClose className="h-8 w-8" onClick={() => setShowThankYouModal(false)} />
            </button>
            <div className="flex items-center justify-center">
              <h1 className="text-4xl text-brandPrimary font-bold">Thank You!</h1>
            </div>
            <div className="flex items-center justify-center mt-4">
              <p className="text-lg text-gray-700">Your feedback has been submitted successfully.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Bugmodal;
