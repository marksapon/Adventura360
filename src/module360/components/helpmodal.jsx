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
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-25"
    >
      {/* For small Devices */}
      <div className="flex h-full w-full items-center justify-center p-2 sm:hidden">
        <div className="flex h-full max-h-[374px] w-full max-w-[356px] flex-col justify-between rounded-2xl border border-black bg-white sm:hidden">
          <div className="flex h-full flex-row justify-between">
            <div className="flex h-full items-center justify-center">
              <button
                className="flex items-center justify-center"
                onClick={() => {
                  handleBack;
                }}
              >
                <IoIosArrowBack className="h-8 w-8" />
              </button>
            </div>

            {page === 1 && <Page1Content />}
            {page === 2 && <Page2Content />}
            {page === 3 && <Page3Content />}
            {page === 4 && <Page4Content />}

            <div className="flex h-full w-auto flex-col items-center">
              <div className="relative flex h-full flex-col">
                <div className="absolute mt-4 flex w-full items-center justify-center">
                  <button
                    className="z-1 mb-auto mt-auto flex items-center justify-center"
                    onClick={() => {
                      handleCloseAndReset;
                    }}
                  >
                    <IoIosClose className="h-6 w-6" />
                  </button>
                </div>
                <div className="left-0 top-0 flex h-full w-full items-center justify-center">
                  <button
                    className="mb-auto mt-auto flex items-center justify-center"
                    onClick={() => {
                      handleNext;
                    }}
                  >
                    <IoIosArrowForward className="h-8 w-8" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 py-2">
            <button
              className="flex items-center justify-center"
              onClick={() => setPage(1)}
            >
              {page === 1 ? (
                <IoIosRadioButtonOn color="#4CAF4F" />
              ) : (
                <IoIosRadioButtonOff />
              )}
            </button>
            <button
              className="flex items-center justify-center"
              onClick={() => setPage(2)}
            >
              {page === 2 ? (
                <IoIosRadioButtonOn color="#4CAF4F" />
              ) : (
                <IoIosRadioButtonOff />
              )}
            </button>
            <button
              className="flex items-center justify-center"
              onClick={() => setPage(3)}
            >
              {page === 3 ? (
                <IoIosRadioButtonOn color="#4CAF4F" />
              ) : (
                <IoIosRadioButtonOff />
              )}
            </button>
            <button
              className="flex items-center justify-center"
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
      <div className="hidden h-full w-full items-center justify-center p-2 sm:flex">
        <div className="flex h-full max-h-[600px] w-full max-w-[800px] flex-col justify-between rounded-2xl border border-black bg-white">
          <div className="flex h-full flex-row justify-between">
            <div className="flex h-full items-center justify-center">
              <button
                className="flex items-center justify-center"
                onClick={() => {
                  handleBack;
                }}
              >
                <IoIosArrowBack className="h-20 w-20" />
              </button>
            </div>

            {page === 1 && <Page1Content />}
            {page === 2 && <Page2Content />}
            {page === 3 && <Page3Content />}
            {page === 4 && <Page4Content />}

            <div className="flex h-full w-auto flex-col items-center">
              <div className="relative flex h-full flex-col">
                <div className="absolute mt-4 flex w-full items-center justify-center">
                  <button
                    className="z-1 mb-auto mt-auto flex items-center justify-center"
                    onClick={() => {
                      handleCloseAndReset;
                    }}
                  >
                    <IoIosClose className="h-10 w-10" />
                  </button>
                </div>
                <div className="left-0 top-0 flex h-full w-full items-center justify-center">
                  <button
                    className="mb-auto mt-auto flex items-center justify-center"
                    onClick={() => {
                      handleNext;
                    }}
                  >
                    <IoIosArrowForward className="h-20 w-20" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 py-2">
            <button
              className="flex items-center justify-center"
              onClick={() => setPage(1)}
            >
              {page === 1 ? (
                <IoIosRadioButtonOn color="#4CAF4F" />
              ) : (
                <IoIosRadioButtonOff />
              )}
            </button>
            <button
              className="flex items-center justify-center"
              onClick={() => setPage(2)}
            >
              {page === 2 ? (
                <IoIosRadioButtonOn color="#4CAF4F" />
              ) : (
                <IoIosRadioButtonOff />
              )}
            </button>
            <button
              className="flex items-center justify-center"
              onClick={() => setPage(3)}
            >
              {page === 3 ? (
                <IoIosRadioButtonOn color="#4CAF4F" />
              ) : (
                <IoIosRadioButtonOff />
              )}
            </button>
            <button
              className="flex items-center justify-center"
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
