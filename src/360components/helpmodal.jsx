import React, { useState } from "react";
import {
  IoIosArrowForward,
  IoIosArrowBack,
  IoIosClose,
  IoIosRadioButtonOff,
  IoIosRadioButtonOn,
} from "react-icons/io";
import Page1Content from "./Page1Content";
import Page2Content from "./Page2Content";
import Page3Content from "./Page3Content";
import Page4Content from "./Page4Content";

const HelpModal = ({ visible, onClose }) => {
  const [page, setPage] = useState(1);

  const handleOnClose = (event) => {
    if (event.target.id === "container") {
      setPage(1);
      onClose();
    }
  };
  const handleCloseAndReset = () => {
    setPage(1);
    onClose();
  };

  const handleNext = () => {
    if (page < 4) {
      setPage(page + 1);
    } else {
      setPage(1);
    }
  };

  const handleBack = () => {
    if (page > 1) {
      setPage(page - 1);
    } else {
      setPage(4);
    }
  };

  if (!visible) return null;

  return (
    <div
      id="container"
      onClick={handleOnClose}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-25"
    >
      {/* For small Devices */}
      <div className="sm:hidden flex items-center justify-center w-full h-full">
        <div className="bg-white rounded-2xl w-full max-w-[356px] flex flex-col justify-between h-full max-h-[374px] border border-black sm:hidden">
          <div className="flex flex-row h-full justify-between">
            <div className="flex justify-center h-full items-center">
              <button
                className="flex justify-center items-center"
                onClick={handleBack}
              >
                <IoIosArrowBack className="h-8 w-8" />
              </button>
            </div>

            {page === 1 && <Page1Content />}
            {page === 2 && <Page2Content />}
            {page === 3 && <Page3Content />}
            {page === 4 && <Page4Content />}

            <div className="flex flex-col h-full w-auto items-center">
              <div className="flex flex-col relative h-full">
                <div className="flex w-full items-center justify-center mt-4 absolute">
                  <button
                    className="z-1 flex justify-center items-center mt-auto mb-auto"
                    onClick={handleCloseAndReset}
                  >
                    <IoIosClose className="h-6 w-6" />
                  </button>
                </div>
                <div className="flex w-full h-full justify-center items-center top-0 left-0">
                  <button
                    className="flex justify-center items-center mt-auto mb-auto"
                    onClick={handleNext}
                  >
                    <IoIosArrowForward className="h-8 w-8" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center gap-4 py-2">
            <button
              className="flex justify-center items-center"
              onClick={() => setPage(1)}
            >
              {page === 1 ? (
                <IoIosRadioButtonOn color="#4CAF4F" />
              ) : (
                <IoIosRadioButtonOff />
              )}
            </button>
            <button
              className="flex justify-center items-center"
              onClick={() => setPage(2)}
            >
              {page === 2 ? (
                <IoIosRadioButtonOn color="#4CAF4F" />
              ) : (
                <IoIosRadioButtonOff />
              )}
            </button>
            <button
              className="flex justify-center items-center"
              onClick={() => setPage(3)}
            >
              {page === 3 ? (
                <IoIosRadioButtonOn color="#4CAF4F" />
              ) : (
                <IoIosRadioButtonOff />
              )}
            </button>
            <button
              className="flex justify-center items-center"
              onClick={() => setPage(4)}
            >
              {page === 4 ? (
                <IoIosRadioButtonOn color="#4CAF4F" />
              ) : (
                <IoIosRadioButtonOff />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* For large Devices */}
      <div className="hidden sm:flex w-full h-full items-center justify-center">
        <div className="bg-white rounded-2xl w-full max-w-[800px] flex flex-col justify-between h-full max-h-[600px] border border-black">
          <div className="flex flex-row h-full justify-between">
            <div className="flex justify-center h-full items-center">
              <button
                className="flex justify-center items-center"
                onClick={handleBack}
              >
                <IoIosArrowBack className="h-20 w-20" />
              </button>
            </div>

            {page === 1 && <Page1Content />}
            {page === 2 && <Page2Content />}
            {page === 3 && <Page3Content />}
            {page === 4 && <Page4Content />}

            <div className="flex flex-col h-full w-auto items-center">
              <div className="flex flex-col relative h-full">
                <div className="flex w-full items-center justify-center mt-4 absolute">
                  <button
                    className="z-1 flex justify-center items-center mt-auto mb-auto"
                    onClick={handleCloseAndReset}
                  >
                    <IoIosClose className="h-10 w-10" />
                  </button>
                </div>
                <div className="flex w-full h-full justify-center items-center top-0 left-0">
                  <button
                    className="flex justify-center items-center mt-auto mb-auto"
                    onClick={handleNext}
                  >
                    <IoIosArrowForward className="h-20 w-20" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center gap-4 py-2">
            <button
              className="flex justify-center items-center"
              onClick={() => setPage(1)}
            >
              {page === 1 ? (
                <IoIosRadioButtonOn color="#4CAF4F" />
              ) : (
                <IoIosRadioButtonOff />
              )}
            </button>
            <button
              className="flex justify-center items-center"
              onClick={() => setPage(2)}
            >
              {page === 2 ? (
                <IoIosRadioButtonOn color="#4CAF4F" />
              ) : (
                <IoIosRadioButtonOff />
              )}
            </button>
            <button
              className="flex justify-center items-center"
              onClick={() => setPage(3)}
            >
              {page === 3 ? (
                <IoIosRadioButtonOn color="#4CAF4F" />
              ) : (
                <IoIosRadioButtonOff />
              )}
            </button>
            <button
              className="flex justify-center items-center"
              onClick={() => setPage(4)}
            >
              {page === 4 ? (
                <IoIosRadioButtonOn color="#4CAF4F" />
              ) : (
                <IoIosRadioButtonOff />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpModal;
