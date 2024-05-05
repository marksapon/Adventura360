import React, { useState, useEffect } from "react";
import { IoIosClose } from "react-icons/io";
import { PiCardsDuotone, PiGridNine, PiList } from "react-icons/pi";
import { IoIosArrowUp } from "react-icons/io";
import { GrCafeteria } from "react-icons/gr";
import { LuSchool } from "react-icons/lu";
import { PiBinocularsDuotone } from "react-icons/pi";
import { TbSchool } from "react-icons/tb";
import { TbSoccerField } from "react-icons/tb"; // Court Icon
import { FaHome, FaHotel } from "react-icons/fa";

import BuildingModal from "./BuildingModal";

const Search = ({ visible, onClose, infosDB }) => {
  /* Existing Buildings Item */
  class Item {
    constructor(id, name, acronym, tags, type) {
      this.id = id;
      this.name = name;
      this.acronym = acronym;
      this.tag = tags;
      this.type = type;
    }
  }

  // State variables
  const [view, setView] = useState("grid"); // Type of display view List/Grid/Cards

  const [sort, setSort] = useState("All"); // Selected Category to display value

  const [searchTerm, setSearchTerm] = useState(""); // Search Value

  const [selectedTag, setSelectedTag] = useState([]); // State for what tag is selected

  const [suggestions, setSuggestions] = useState(() => generateItinerary()); // DB of filtered suggestions

  // Function to generate items and push it to category list
  function generateItinerary() {
    // console.log("Generating Itinerary");

    const temp_categories = {
      all: [],
      school_building: [],
      college_building: [],
      cafeteria: [],
      attraction: [],
      court: [],
      venue: [],
    };

    if (infosDB) {
      for (const info in infosDB) {
        const item = new Item(
          infosDB[info].scene,
          infosDB[info].name,
          infosDB[info].acronym,
          infosDB[info].tags,
          infosDB[info].type,
        );

        Object.keys(temp_categories).map((category) => {
          if (infosDB[info].type === category) {
            temp_categories["all"].push(item);
            temp_categories[category].push(item);
          }
        });
      }
    }
    return temp_categories;
  }

  const categoriesDisplay = {
    school_building: "School Building",
    college_building: "College Building",
    cafeteria: "Cafeteria",
    attraction: "Attraction",
    court: "Court",
    venue: "Venue",
  };

  const [isOpen, setIsOpen] = useState(false); // Dropdown State: True = CLose / False = Open

  const [listDisplay, setListDisplay] = useState(false); // List of items to display

  const [selectedKey, setSelectedKey] = useState("All"); // State for what category is selected

  const [clicked, setClicked] = useState(false); // State for when a suggestion is clicked??

  /* Tags */
  const tags = [
    "ceit",
    "con",
    "cas",
    "cafenr",
    "ccj",
    "ced",
    "cemds",
    "cspear",
    "cvmbs",
    "com",
    "school",
    "historical",
    "laboratory",
    "leisure",
  ];

  // Close Modal
  const handleCloseAndReset = () => {
    onClose();
  };

  // Function to change Category Value and Change Dropdown State
  const handleSortChange = (key) => {
    setSort(key); // Set Sort State
    setIsOpen(true); // Set Dropdown State
  };

  // category icons and colors
  const keyIcons = {
    school_building: {
      icon: <LuSchool />,
      color: "bg-lime-600",
      display: "School Building",
    },
    college_building: {
      icon: <TbSchool />,
      color: "bg-orange-500",
      display: "College Building",
    },
    cafeteria: {
      icon: <GrCafeteria />,
      color: "bg-amber-400",
      display: "Cafeteria",
    },
    attraction: {
      icon: <PiBinocularsDuotone />,
      color: "bg-fuchsia-500",
      display: "Attraction",
    },
    court: { icon: <TbSoccerField />, color: "bg-cyan-700", display: "Court" },
    venue: { icon: <FaHotel />, color: "bg-rose-400", display: "Venue" },
    // add more keys as needed
  };

  // Tag Function
  const handleTagClick = (tag) => {
    setSelectedTag((prevTags) =>
      // If the tag is already selected, remove it from the selected tags
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : // If the tag is not selected, add it to the selected tags
          [...prevTags, tag],
    );
  };

  // Reset Function
  const handleReset = () => {
    setSearchTerm(""); // Resets the search value
    setSelectedTag([]); // Resets the selected tags array
  };

  // Effect to filter suggestions based on search term, sort, and selected tag
  useEffect(() => {
    // Get all keys from the suggestions object
    let keys = Object.keys(suggestions);

    // If a sort option other than "All" is selected, filter the keys to only include the ones that match the sort option
    if (sort !== "All") {
      keys = keys.filter((key) => key.toLowerCase() === sort.toLowerCase());
    }

    // Reduce the keys to a new object where each key's value is an array of content that matches the search term or selected tag
    const filteredSuggestions = keys.reduce((obj, key) => {
      // Filter the content of each key to only include the ones that match the search term or selected tag
      const filteredContents = suggestions[key].filter(
        (content) => {
          // Check if the content's name or acronym matches the search term
          const matchesSearchTerm =
            content.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
                <h1 className="p-4 text-2xl font-bold"></h1>
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
                        onClick={() => {
                          setIsOpen(!isOpen);
                          setListDisplay(!listDisplay);
                        }}
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
                              setListDisplay(true);
                            }}
                          >
                            <span className="flex items-center rounded-2xl bg-cyan-500 p-2 text-center text-white">
                              <FaHome />
                            </span>
                            All
                          </div>
                          <div className="mt-4 grid grid-cols-2 grid-rows-5 gap-2 sm:gap-4">
                            {/* Map over the keys of the contentMap object */}
                            {Object.keys(keyIcons).map((key, index) => (
                              <div
                                key={index}
                                className={`
      flex items-center gap-2 rounded-lg p-1 text-center transition-all duration-300 ease-in-out sm:p-3 
      ${selectedKey === key ? "border border-gray-200 bg-slate-50 shadow-lg" : "border border-transparent hover:border"} 
      hover:border-gray-200 hover:shadow-lg
    `}
                                onClick={() => {
                                  setSelectedKey(key);
                                  handleSortChange(key);
                                  setListDisplay(true);
                                }}
                              >
                                <span
                                  className={`flex items-center rounded-2xl ${keyIcons[key].color} p-2 text-center text-white`}
                                >
                                  {keyIcons[key].icon}
                                </span>
                                {keyIcons[key].display}
                              </div>
                            ))}
                          </div>
                        </div>
                        {/* Tags Selection */}
                        <h1 className="pb-2 text-sm font-semibold text-gray-500">
                          Select tags:
                        </h1>
                        <div className="mb-2 flex w-full flex-wrap gap-2 p-1">
                          {/* container for the tag buttons. */}
                          {tags.map((tag, index) => (
                            <button
                              key={index}
                              // Call handleTagClick with the tag when the button is clicked
                              onClick={() => handleTagClick(tag)}
                              className={`text-grey-600 flex h-auto justify-center gap-1 rounded-xl px-2 py-1 text-center text-xs font-bold ring-2 ring-green-500 hover:opacity-80 `}
                              style={{
                                ...(selectedTag.includes(tag)
                                  ? {
                                      backgroundColor: "#22c55e",
                                      opacity: 0.8,
                                    }
                                  : {}),
                              }}
                            >
                              {tag.toUpperCase()}
                            </button>
                          ))}
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

                    {/* Display Options Section */}
                    {listDisplay && (
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
                    )}
                  </div>

                  {/* Display Items Section */}
                  {listDisplay &&
                    (sort === "All"
                      ? Object.keys(suggestions).filter(
                          (key) => suggestions[key].length > 0,
                        )
                      : [sort.toLowerCase()]
                    ).map((key, keyIndex) => (
                      <div key={keyIndex}>
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
                      </div>
                    ))}
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
