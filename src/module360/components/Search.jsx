import React, { useState, useEffect } from "react";
import { IoIosClose } from "react-icons/io";
import { PiCardsDuotone, PiGridNine, PiList } from "react-icons/pi";
import { IoIosArrowUp } from "react-icons/io";
import { FaPeopleRoof } from "react-icons/fa6";
import { FaSquareParking } from "react-icons/fa6";
import { GrCafeteria } from "react-icons/gr";
import { LuSchool } from "react-icons/lu";
import { PiBinocularsDuotone } from "react-icons/pi";
import { TbSchool } from "react-icons/tb";
import { GiAbstract068 } from "react-icons/gi";
import { FaHome, FaBuilding, FaRestroom, FaHotel } from "react-icons/fa";

import contentMap from "../../database/contentMap.json";

const Search = ({ visible, onClose }) => {
  // State variables
  const [view, setView] = useState("list");
  const [sort, setSort] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState([]);
  const [suggestions, setSuggestions] = useState(contentMap);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedKey, setSelectedKey] = useState("All");
  const [clicked, setClicked] = useState(false);

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
    CEIT: { color: "orange" },
    CON: { color: "#20a7db" },
    CAS: { color: "#E9C229" },
    CAFENR: { color: "#078423" },
    CCJ: { color: "purple" },
    CED: { color: "#4D547A" },
    CEMDS: { color: "#C42329" },
    CSPEAR: { color: "#EABDA8" },
    CVMBS: { color: "#E9CA71" },
    COM: { color: "red" },
    SCHOOL: { color: "yellow" },
    HISTORICAL: { color: "indigo" },
    LABORATORY: { color: "pink" },
    LEISURE: { color: "orange" },
  };

  // category icons and colors
  const keyIcons = {
    All: <FaHome />,
    restroom: <FaRestroom />,
    handwash: <FaBuilding />,
    "school facilities": <LuSchool />,
    "college buildings": <TbSchool />,
    cafeteria: <GrCafeteria />,
    "school attraction": <PiBinocularsDuotone />,
    court: <GiAbstract068 />,
    parking: <FaSquareParking />,
    kiosk: <FaPeopleRoof />,
    venue: <FaHotel />,
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
                <div className="flex px-4 pb-2">
                  {/* search input. */}
                  <input
                    type="text"
                    placeholder="I'm looking for..."
                    className="mt-1 block w-full rounded-md border bg-white px-2 py-4 text-base shadow-md focus:border-green-600 focus:outline-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {/* Filter Section */}
                <div className="no-scrollbar h-full overflow-auto">
                  <div className="flex flex-col border-b px-4">
                    {/* sort dropdown. */}
                    <div className="h-auto pb-2">
                      <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex items-center text-xl font-bold text-gray-700"
                      >
                        Filter by &nbsp;
                        <IoIosArrowUp
                          className={`transform ${isOpen ? "rotate-180" : ""}`}
                        />
                      </button>

                      {/*FILTER DROPDOWN */}
                      <div
                        className={`origin-top transform overflow-hidden text-sm transition-all duration-300 ease-in-out sm:text-base ${isOpen ? "max-h-0 scale-y-0 opacity-0" : "max-h-full scale-y-100 opacity-100"}`}
                      >
                        <div className="m-2">
                          <div
                            className={`flex items-center justify-center gap-2 rounded-lg p-1 text-center transition-all duration-300 ease-in-out sm:p-3 ${selectedKey === "All" ? "border border-gray-200 bg-slate-50 shadow-lg" : "border border-transparent hover:border"} hover:border-gray-200 hover:shadow-lg`}
                            onClick={() => {
                              setSelectedKey("All");
                              handleSortChange("All");
                            }}
                          >
                            <span className="flex items-center rounded-2xl bg-green-600 p-2 text-center text-white">
                              {keyIcons["All"]}
                            </span>
                            All
                          </div>
                          <div className="mt-4 grid grid-cols-2 grid-rows-5 gap-2 sm:gap-4">
                            {/* Map over the keys of the contentMap object */}
                            {Object.keys(contentMap).map((key, index) => (
                              <div
                                key={index}
                                className={`
        flex items-center gap-2 rounded-lg p-1 text-center transition-all duration-300 ease-in-out sm:p-3 
        ${selectedKey === key ? "border border-gray-200 bg-slate-50 shadow-lg" : "border border-transparent hover:border"} 
        hover:border-gray-200 hover:shadow-lg
      `}
                                onClick={() => {
                                  // Set the selected key to the key of the clicked item
                                  setSelectedKey(key);
                                  // Perform sorting operation based on the key of the clicked item
                                  handleSortChange(key);
                                }}
                              >
                                {/* Display the icon associated with the key */}
                                <span className="flex items-center rounded-2xl bg-green-600 p-2 text-center text-white">
                                  {keyIcons[key]}
                                </span>
                                {/* Display the key with the first letter capitalized and the rest in lowercase */}
                                {key.charAt(0).toUpperCase() +
                                  key.slice(1).toLowerCase()}
                              </div>
                            ))}
                          </div>
                        </div>
                        <h1 className="pb-2 text-sm font-semibold text-gray-500">
                          Select tags:
                        </h1>
                        <div className="mb-2 flex w-full flex-wrap gap-1">
                          {/* container for the tag buttons. */}
                          {
                            // all items and their tags into a single array
                            Object.values(contentMap)
                              .flatMap((items) => items)
                              .flatMap((item) => item.tags || [])
                              // Remove duplicate tags
                              .filter(
                                (tag, index, self) =>
                                  self.indexOf(tag) === index,
                              )
                              // Map over each unique tag
                              .map((tag, index) => (
                                <button
                                  key={index}
                                  // Call handleTagClick with the tag when the button is clicked
                                  onClick={() => handleTagClick(tag)}
                                  className={`flex h-auto justify-center gap-1 rounded-xl px-2 py-1 text-center text-xs text-white hover:opacity-80 ${
                                    // styles based on whether the tag is selected
                                    selectedTag.includes(tag)
                                      ? "bg-green-500 opacity-80 ring-2 ring-green-500"
                                      : ""
                                  }`}
                                  style={{
                                    backgroundColor: tagStyles[tag]?.color,
                                  }}
                                >
                                  {/* Display the icon tag */}
                                  {tagStyles[tag]?.icon}
                                  {/* Display the tag */}
                                  {tag}
                                </button>
                              ))
                          }
                          {/* reset button. */}
                          <button
                            onClick={handleReset}
                            className="h-fit rounded-xl bg-gray-500 px-2 py-1 text-xs text-white"
                          >
                            RESET
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* container for the view button and dropdown. */}
                    <div className="flex w-full items-center justify-between py-2">
                      <h1 className="text-sm font-semibold text-gray-500">
                        Change view:
                      </h1>
                      {/* view options. */}
                      <div className="flex gap-2 rounded-lg border p-1">
                        <button
                          onClick={() => {
                            setView("list");
                          }}
                          className={`flex w-auto items-center rounded-md border px-1 text-sm hover:bg-slate-200 ${view === "list" ? "bg-slate-200 text-black" : ""}`}
                        >
                          List
                          <PiList className="size-6 pl-1" />
                        </button>
                        <button
                          onClick={() => {
                            setView("cards");
                          }}
                          className={`flex w-auto items-center rounded-md border px-1 text-sm hover:bg-slate-200 ${view === "cards" ? "bg-slate-200 text-black" : ""}`}
                        >
                          Cards
                          <PiCardsDuotone className="size-6 pl-1" />
                        </button>
                        <button
                          onClick={() => {
                            setView("grid");
                          }}
                          className={`flex w-auto items-center rounded-md border px-1 text-sm hover:bg-slate-200 ${view === "grid" ? "bg-slate-200 text-black" : ""}`}
                        >
                          Grid
                          <PiGridNine className="size-6 pl-1" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* container for the suggestion contents. */}
                  <div className="h-auto px-4 py-2">
                    <div
                      className={`flex flex-col gap-2 ${view === "grid" ? "grid grid-cols-2" : ""}`}
                    >
                      {/* Determine the data to be mapped over */}
                      {(sort === "All"
                        ? Object.keys(suggestions)
                        : [sort.toLowerCase()]
                      ).map((key, keyIndex) => (
                        <React.Fragment key={keyIndex}>
                          {/* Check if the suggestions for the key exist */}
                          {suggestions[key] &&
                            suggestions[key].map((content, contentIndex) => (
                              <div
                                key={`${key}-${contentIndex}`}
                                className={`flex flex-col overflow-hidden rounded-lg border-2 px-1 py-1 shadow-lg ${view === "list" ? "h-fit" : "h-auto"} relative border ${clicked ? "bg-slate-100" : "hover:bg-slate-50"}`}
                                onClick={() => {
                                  // Log the content when clicked
                                  console.log(content);
                                }}
                              >
                                {/* Conditionally render an img element if view is not "list" */}
                                {view !== "list" && (
                                  <div className="h-1/2">
                                    <img
                                      src={
                                        content.image ||
                                        "https://via.placeholder.com/150"
                                      }
                                      alt={content.text}
                                      className={
                                        view === "cards"
                                          ? "h-max w-full object-cover"
                                          : "h-full w-full object-cover"
                                      }
                                    />
                                  </div>
                                )}
                                <div
                                  className={`${view === "list" ? "flex w-auto items-center px-4" : "flex h-1/2 flex-col items-center justify-center font-semibold"} gap-2 ${view === "cards" ? "absolute bottom-0 left-0 right-0" : ""}`}
                                >
                                  <div
                                    className={
                                      view === "list"
                                        ? "flex h-auto items-center justify-center gap-2 text-center text-base"
                                        : "flex w-auto flex-col items-center justify-center gap-2 text-center text-sm"
                                    }
                                  >
                                    <div className="rounded-full border-2 border-white bg-green-600 p-2 text-xl text-white">
                                      {/* Display the icon associated with the key */}
                                      {keyIcons[key]}
                                    </div>
                                    <div className="w-full overflow-auto rounded-full border-2 border-green-600 bg-white px-2 text-sm">
                                      {/* Display the text of the content */}
                                      {content.text}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </React.Fragment>
                      ))}
                    </div>
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
