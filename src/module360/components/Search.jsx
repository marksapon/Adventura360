import React, { useState, useEffect } from "react";

import { IoIosClose } from "react-icons/io";

import { PiCardsDuotone, PiGridNine, PiList } from "react-icons/pi";

const contentMap = {
  All: [],
  "comfort room": [
    "Comfort room content 1",
    "Comfort room content 2",
    "Comfort room content 3",
  ],
  "wash area": [
    "Wash area content 1",
    "Wash area content 2",
    "Wash area content 3",
  ],
  "school facilities": [
    "School facilities content 1",
    "School facilities content 2",
    "School facilities content 3",
  ],
  "college building": [
    "College building content 1",
    "College building content 2",
    "College building content 3",
  ],
  cafeteria: [
    "Cafeteria content 1",
    "Cafeteria content 2",
    "Cafeteria content 3",
  ],
  "school attraction": [
    "School attraction content 1",
    "School attraction content 2",
    "School attraction content 3",
  ],
  court: ["Court content 1", "Court content 2", "Court content 3"],
  "parking lot": [
    "Parking lot content 1",
    "Parking lot content 2",
    "Parking lot content 3",
  ],
  kiosk: ["Kiosk content 1", "Kiosk content 2", "Kiosk content 3"],
  venue: ["Venue content 1", "Venue content 2", "Venue content 3"],
};

const Search = ({ visible, onClose }) => {
  const [view, setView] = useState("list"); // default view is 'list'
  const [sort, setSort] = useState("All");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // add this line
  const [suggestions, setSuggestions] = useState(contentMap); // add this line

  const handleCloseAndReset = () => {
    onClose();
  };
  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  useEffect(() => {
    let keys = Object.keys(contentMap);
    if (sort !== "All") {
      keys = keys.filter((key) => key.toLowerCase() === sort.toLowerCase());
    }

    const newSuggestions = keys
      .filter((key) =>
        contentMap[key].some((content) =>
          content.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
      )
      .reduce((obj, key) => {
        obj[key] = contentMap[key];
        return obj;
      }, {});

    setSuggestions(newSuggestions);
  }, [searchTerm, sort, contentMap]);

  if (!visible) return null;

  return (
    <div
      id="container"
      className="fixed inset-0 z-50 flex h-full bg-black bg-opacity-25"
    >
      <div className="flex h-full w-full items-start pr-2">
        <div className="flex h-full w-[732px] flex-col rounded-br-2xl rounded-tr-2xl bg-white transition-all duration-200 ease-in-out sm:max-w-[500px]">
          <div className="h-full w-full">
            <div className="h-full w-full rounded-tr-2xl bg-cover bg-center bg-no-repeat transition-all md:h-[200px]">
              <div className="relative z-50 flex h-full w-full">
                <div className="h-full w-full">
                  <h1 className="p-4 text-2xl font-bold">Search places</h1>
                  <div className="flex flex-col border-b px-4">
                    <div className="flex pb-2">
                      <input
                        type="text"
                        placeholder="Search"
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-1 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        value={searchTerm} // add this line
                        onChange={(e) => setSearchTerm(e.target.value)} // add this line
                      />
                      <div className="px-2">
                        <select
                          id="sort"
                          name="sort"
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-1 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          value={sort}
                          onChange={handleSortChange}
                        >
                          <option>All</option>
                          <option>Comfort room</option>
                          <option>Wash area</option>
                          <option>School facilities</option>
                          <option>College building</option>{" "}
                          <option>Cafeteria</option>
                          <option>School attraction</option>
                          <option>Court</option>
                          <option>Parking lot</option>
                          <option>Kiosk</option>
                          <option>Venue</option>
                        </select>
                      </div>
                    </div>
                    <h1 className="pb-2 text-sm text-gray-500">
                      I'm looking for...
                    </h1>

                    <div className="relative pb-2">
                      <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="rounded bg-blue-500 px-4 py-2 text-white"
                      >
                        VIEW
                      </button>
                      {dropdownOpen && (
                        <div className="absolute left-0 z-50 mt-2 w-48 divide-y divide-gray-100 rounded-md bg-white shadow-lg focus:outline-none">
                          <div className="py-1">
                            <button
                              onClick={() => {
                                setView("list");
                                setDropdownOpen(false);
                              }}
                              className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            >
                              List
                              <PiList className="size-8 pl-1" />
                            </button>
                            <button
                              onClick={() => {
                                setView("cards");
                                setDropdownOpen(false);
                              }}
                              className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            >
                              Cards
                              <PiCardsDuotone className="size-8 pl-1" />
                            </button>
                            <button
                              onClick={() => {
                                setView("grid");
                                setDropdownOpen(false);
                              }}
                              className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            >
                              Grid
                              <PiGridNine className="size-8 pl-1" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div
                    className="h-max w-full overflow-auto px-4 py-2"
                    style={{
                      maxHeight: "calc(100vh - 190px)",
                      overflowY: "auto",
                    }}
                  >
                    {sort === "All" && (
                      <div
                        className={`flex flex-col gap-2 pb-2 ${view === "grid" ? "grid grid-cols-3" : ""}`}
                      >
                        {Object.keys(suggestions).map((key, keyIndex) => (
                          <React.Fragment key={keyIndex}>
                            {suggestions[key].map((content, contentIndex) => (
                              <div
                                key={`${key}-${contentIndex}`}
                                className={`overflow-auto rounded-lg border-2 px-1 py-2 ${view === "list" ? "card-class h-fit" : "h-auto"}`}
                              >
                                {view !== "list" && (
                                  <img
                                    src="https://via.placeholder.com/150"
                                    alt="placeholder"
                                  />
                                )}
                                {content}
                              </div>
                            ))}
                          </React.Fragment>
                        ))}
                      </div>
                    )}

                    {sort !== "All" && suggestions[sort.toLowerCase()] && (
                      <div
                        className={`flex flex-col gap-2 pb-2 ${view === "grid" ? "grid grid-cols-3" : ""}`}
                      >
                        {suggestions[sort.toLowerCase()].map(
                          (content, index) => (
                            <div
                              key={`${sort}-${index}`}
                              className={`overflow-auto rounded-lg border-2 px-1 py-2 ${view === "list" ? "card-class h-fit" : "h-auto"}`}
                            >
                              {view !== "list" && (
                                <img
                                  src="https://via.placeholder.com/150"
                                  alt="placeholder"
                                />
                              )}
                              {content}
                            </div>
                          ),
                        )}
                      </div>
                    )}
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
