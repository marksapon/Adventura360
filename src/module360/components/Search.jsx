import React, { useState } from "react";

import { IoIosClose } from "react-icons/io";

const Search = ({ visible, onClose, loginType }) => {
  const handleCloseAndReset = () => {
    onClose();
  };

  if (!visible) return null;

  return (
    <div
      id="container"
      className="fixed inset-0 z-50 flex bg-black bg-opacity-25"
    >
      <div className="flex h-full w-full items-start pr-2">
        <div className="flex h-screen w-[732px] flex-col rounded-br-2xl rounded-tr-2xl bg-white transition-all duration-200 ease-in-out sm:max-w-[500px]">
          <div className="w-full">
            <div className="h-[150px] w-full rounded-tr-2xl bg-cover bg-center bg-no-repeat transition-all md:h-[200px]">
              <div className="relative z-50 flex w-full">
                <div className="w-full">
                  <h1 className="p-4 text-2xl font-bold">Search places</h1>
                  <div className="px-4">
                    <input
                      type="text"
                      placeholder="Search"
                      className="w-full rounded-lg border-2 border-gray-300 p-2"
                    />
                  </div>

                  <div className="w-full px-4 py-2">
                    <h1 className="text-sm text-gray-500">
                      I'm looking for...
                    </h1>
                    <div className="flex w-full gap-2">
                      <div className="flex-nowrap gap-2 py-2 text-sm">
                        <button className="whitespace-nowrap rounded-lg bg-slate-200 px-2 py-1">
                          aaaaaaaaa
                        </button>
                        <button className="whitespace-nowrap rounded-lg bg-slate-200 px-2 py-1">
                          aaaa
                        </button>
                        <button className="whitespace-nowrap rounded-lg bg-slate-200 px-2 py-1">
                          aaa
                        </button>
                        <button className="whitespace-nowrap rounded-lg bg-slate-200 px-2 py-1">
                          Department
                        </button>
                        <button className="whitespace-nowrap rounded-lg bg-slate-200 px-2 py-1">
                          aaaa
                        </button>
                        <button className="whitespace-nowrap rounded-lg bg-slate-200 px-2 py-1">
                          aaaa
                        </button>
                        <button className="whitespace-nowrap rounded-lg bg-slate-200 px-2 py-1">
                          Department
                        </button>
                        <button className="whitespace-nowrap rounded-lg bg-slate-200 px-2 py-1">
                          Depa23123rtment
                        </button>
                        <button className="whitespace-nowrap rounded-lg bg-slate-200 px-2 py-1">
                          2321
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  className="absolute right-0 items-center justify-center"
                  onClick={() => handleCloseAndReset()}
                >
                  <IoIosClose className="h-12 w-12 text-black" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
