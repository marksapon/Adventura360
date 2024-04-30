import React, { useState, useEffect } from "react";
import { IoIosClose } from "react-icons/io";
import { PiCardsDuotone, PiGridNine, PiList } from "react-icons/pi";
import { IoIosArrowUp } from "react-icons/io";
import { FaTag } from "react-icons/fa"; // import more icons as needed
import { FaPeopleRoof } from "react-icons/fa6"; // Batibot Icon
import { FaSquareParking } from "react-icons/fa6"; // Parking Lot Icon
import { GrCafeteria } from "react-icons/gr"; // Cafeteria Icon
import { LuSchool } from "react-icons/lu"; // School Facilities Icon
import { PiBinocularsDuotone } from "react-icons/pi"; // School Attraction Icon
import { TbSchool } from "react-icons/tb"; // College Buildings Icon\
import { GiAbstract068 } from "react-icons/gi"; // Court Icon
import {
  FaHome,
  FaSchool,
  FaBuilding,
  FaRestroom,
  FaHotel,
} from "react-icons/fa"; // import more icons as needed

import contentMap from "../../database/contentMap.json";

const Search = ({ visible, onClose }) => {
  // State variables
  const [view, setView] = useState("list");
  const [sort, setSort] = useState("All");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState([]);
  const [suggestions, setSuggestions] = useState(contentMap);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedKey, setSelectedKey] = useState("All");

  // Close search modal
  const handleCloseAndReset = () => {
    onClose();
  };

  // Handle sort change
  const handleSortChange = (key) => {
    setSort(key);
    setIsOpen(false);
  };

  // tag icons and colors
  const tagStyles = {
    CEIT: {
      icon: <FaTag className="flex h-full justify-center text-center" />,
      color: "orange",
    },
    CON: { icon: <FaTag />, color: "	#20a7db " },
    BLDG: { icon: <FaTag />, color: "green" },
  };

  // category icons and colors
  const keyIcons = {
    All: <FaHome className="flex justify-center text-center text-green-600" />,
    restroom: <FaRestroom className="text-green-600" />,
    handwash: <FaBuilding className="text-green-600" />,
    "school facilities": <LuSchool className="text-green-600" />,
    "college buildings": <TbSchool className="text-green-600" />,
    cafeteria: <GrCafeteria className="text-green-600" />,
    "school attraction": <PiBinocularsDuotone className="text-green-600" />,
    court: <GiAbstract068 className="text-green-600" />,
    parking: <FaSquareParking className="text-green-600" />,
    kiosk: <FaPeopleRoof className="text-green-600" />,
    venue: <FaHotel className="text-green-600" />,
    // add more keys as needed
  };

  // Handle tag click to filter suggestions
  const handleTagClick = (tag) => {
    setSelectedTag((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag],
    );
  };

  // Reset search term and selected tag
  const handleReset = () => {
    setSearchTerm("");
    setSelectedTag([]);
  };

  // Effect to filter suggestions based on search term, sort, and selected tag
  useEffect(() => {
    // Get all keys from the contentMap object
    let keys = Object.keys(contentMap);

    // If a sort option other than "All" is selected, filter the keys to only include the ones that match the sort option
    if (sort !== "All") {
      keys = keys.filter((key) => key.toLowerCase() === sort.toLowerCase());
    }

    // Reduce the keys to a new object where each key's value is an array of content that matches the search term or selected tag
    const filteredSuggestions = keys.reduce((obj, key) => {
      // Filter the content of each key to only include the ones that match the search term or selected tag
      const filteredContents = contentMap[key].filter(
        (content) => {
          // Check if the content's text or acronym matches the search term
          const matchesSearchTerm =
            content.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (content.acronym &&
              content.acronym.toLowerCase().includes(searchTerm.toLowerCase()));

          // Check if the content's tags include the selected tag
          const matchesTag =
            selectedTag.length > 0 &&
            content.tags &&
            selectedTag.every((tag) => content.tags.includes(tag));
          // If a search term is entered, return true if the content matches the search term or selected tag
          // If no search term is entered but a tag is selected, return true if the content matches the selected tag
          // If no search term or tag is selected, return true for all content
          return searchTerm
            ? matchesSearchTerm || matchesTag
            : selectedTag.length > 0
              ? matchesTag
              : true;
        },
        [searchTerm, sort, selectedTag],
      );

      // If the filtered content array is not empty, add it to the new object
      if (filteredContents.length > 0) {
        obj[key] = filteredContents;
      }

      // Return the new object to be used as the accumulator in the next iteration
      return obj;
    }, {});

    // Set the state of suggestions to the new object
    setSuggestions(filteredSuggestions);
  }, [searchTerm, sort, selectedTag]); // Run this effect whenever searchTerm, sort, or selectedTag changes

  // Render the search component
  if (!visible) return null;

  return (
    <div
      id="container"
      className="fixed inset-0 z-50 flex h-full bg-black bg-opacity-25"
    >
      {/* main container for the search component. */}
      <div className="flex h-full w-full items-start pr-2">
        {/* container for the search box. */}
        <div className="md:w- flex h-screen w-[500px] flex-col rounded-br-2xl rounded-tr-2xl bg-white transition-all duration-200 ease-in-out">
          {/* container for the search box content. */}
          <div className="h-full w-auto">
            {/* container for the search box header. */}

            {/* container for the search box header content. */}
            <div className="relative z-50 flex h-full w-full">
              {/* container for the search box header text and input fields. */}
              <div className="flex h-screen w-full flex-col">
                <h1 className="p-4 text-2xl font-bold">Search places</h1>
                {/* container for the search input and sort dropdown. */}
                <div className="flex px-4 pb-4">
                  {/* search input. */}
                  <input
                    type="text"
                    placeholder="I'm looking for..."
                    className="mt-1 block w-full rounded-md border bg-white px-2 py-4 shadow-md focus:border-green-600 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {/* NIGGA */}
                <div className="no-scrollbar h-full overflow-auto">
                  <div className="flex flex-col border-b px-4">
                    {/* sort dropdown. */}
                    <div className="h-fit pb-4">
                      <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex items-center text-xl font-bold text-gray-700"
                      >
                        Filter by &nbsp;
                        <IoIosArrowUp
                          className={`transform ${isOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                      <div
                        className={`origin-top transform overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-0 scale-y-0 opacity-0" : "max-h-full scale-y-100 opacity-100"}`}
                      >
                        <div className="px-2 pb-4 pt-2">
                          <div
                            className={`mb-2 flex gap-2 rounded-lg border bg-slate-300 p-2 text-center shadow-lg ${selectedKey === "All" ? "bg-slate-400" : ""}`}
                            onClick={() => {
                              setSelectedKey("All");
                              handleSortChange("All");
                            }}
                          >
                            {keyIcons["All"]} All
                          </div>
                          <div className="grid grid-cols-2 grid-rows-5  gap-2">
                            {Object.keys(contentMap).map((key, index) => (
                              <div
                                key={index}
                                className={`flex items-center  gap-2 rounded-lg border bg-slate-300 p-2 text-center shadow-lg ${selectedKey === key ? "bg-slate-400" : ""}`}
                                onClick={() => {
                                  setSelectedKey(key);
                                  handleSortChange(key);
                                }}
                              >
                                {keyIcons[key]} {key}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* tag buttons. */}
                    <h1 className="pb-2 text-sm font-semibold text-gray-500">
                      Select tags:
                    </h1>
                    <div className="flex w-full flex-wrap gap-2 pb-2">
                      {/* container for the tag buttons. */}
                      {Object.values(contentMap)
                        .flatMap((items) => items)
                        .flatMap((item) => item.tags || [])
                        .filter(
                          (tag, index, self) => self.indexOf(tag) === index,
                        )
                        .map((tag, index) => (
                          <button
                            key={index}
                            onClick={() => handleTagClick(tag)}
                            className={`flex h-auto justify-center gap-1 rounded-xl px-2 py-1 text-center text-xs text-white ${
                              selectedTag.includes(tag)
                                ? "bg-green-500 opacity-50 ring-2 ring-green-500"
                                : ""
                            }`}
                            style={{ backgroundColor: tagStyles[tag]?.color }}
                          >
                            {tagStyles[tag]?.icon}
                            {tag}
                          </button>
                        ))}
                      {/* reset button. */}
                      <button
                        onClick={handleReset}
                        className="h-fit rounded-xl bg-gray-500 px-2 py-1 text-xs text-white"
                      >
                        Reset
                      </button>
                    </div>
                    {/* container for the view button and dropdown. */}
                    <div className="relative pb-2">
                      {/* view button. */}
                      <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="rounded bg-blue-500 px-4 py-2 text-white"
                      >
                        VIEW
                      </button>
                      {/* view dropdown. */}
                      {dropdownOpen && (
                        <div className="absolute left-0 z-50 mt-2 w-48 divide-y divide-gray-100 rounded-md bg-white shadow-lg focus:outline-none">
                          <div className="py-1">
                            {/* view options. */}
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
                  {/* container for the suggestions. */}
                  <div className="h-auto px-4 py-2">
                    {sort === "All" && (
                      <div
                        className={`flex flex-col gap-2 ${
                          view === "grid" ? "grid grid-cols-3" : ""
                        }`}
                      >
                        {/* This is the container for the suggestions when "All" is selected in the sort dropdown. */}
                        {Object.keys(suggestions).map((key, keyIndex) => (
                          <React.Fragment key={keyIndex}>
                            {suggestions[key].map((content, contentIndex) => (
                              <div
                                key={`${key}-${contentIndex}`}
                                className={`overflow-auto rounded-lg border-2 px-1 py-2 ${
                                  view === "list"
                                    ? "card-class h-fit"
                                    : "h-auto"
                                }`}
                              >
                                {/* displays the suggestion's image and text. */}
                                {view !== "list" && (
                                  <img
                                    src={
                                      content.image ||
                                      "https://via.placeholder.com/150"
                                    }
                                    alt={content.text}
                                  />
                                )}
                                {content.text}
                              </div>
                            ))}
                          </React.Fragment>
                        ))}
                      </div>
                    )}

                    {sort !== "All" && suggestions[sort.toLowerCase()] && (
                      <div
                        className={`flex flex-col gap-2 ${
                          view === "grid" ? "grid grid-cols-3" : ""
                        }`}
                      >
                        {/* container for the suggestions when a specific option is selected in the sort dropdown. */}
                        {suggestions[sort.toLowerCase()].map(
                          (content, index) => (
                            <div
                              key={`${sort}-${index}`}
                              className={`overflow-auto rounded-lg border-2 px-1 py-2 ${
                                view === "list" ? "card-class h-fit" : "h-auto"
                              }`}
                            >
                              {/* displays the suggestion's image and text. */}
                              {view !== "list" && (
                                <img
                                  src={
                                    content.image ||
                                    "https://via.placeholder.com/150"
                                  }
                                  alt={content.text}
                                />
                              )}
                              {content.text}
                            </div>
                          ),
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* close button. */}
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
  );
};

export default Search;
