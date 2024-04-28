import React, { useState, useEffect } from "react";
import { IoIosClose } from "react-icons/io";
import { PiCardsDuotone, PiGridNine, PiList } from "react-icons/pi";
import contentMap from "../../database/contentMap.json";

const Search = ({ visible, onClose }) => {
  // State variables
  const [view, setView] = useState("list");
  const [sort, setSort] = useState("All");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState([]);
  const [suggestions, setSuggestions] = useState(contentMap);

  // Close search modal
  const handleCloseAndReset = () => {
    onClose();
  };

  // Handle sort change
  const handleSortChange = (event) => {
    setSort(event.target.value);
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
        <div className="flex h-full w-[732px] flex-col rounded-br-2xl rounded-tr-2xl bg-white transition-all duration-200 ease-in-out sm:max-w-[500px]">
          {/* container for the search box content. */}
          <div className="h-full w-full">
            {/* container for the search box header. */}
            <div className="h-full w-full rounded-tr-2xl bg-cover bg-center bg-no-repeat transition-all md:h-[200px]">
              {/* container for the search box header content. */}
              <div className="relative z-50 flex h-full w-full">
                {/* container for the search box header text and input fields. */}
                <div className="h-full w-full">
                  <h1 className="p-4 text-2xl font-bold">Search places</h1>
                  <div className="flex flex-col border-b px-4">
                    {/* container for the search input and sort dropdown. */}
                    <div className="flex pb-2">
                      {/* search input. */}
                      <input
                        type="text"
                        placeholder="I'm looking for..."
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-1 py-2 shadow-sm focus:border-green-600 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      {/* sort dropdown. */}
                      <div className="px-2">
                        <select
                          id="sort"
                          name="sort"
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-1 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          value={sort}
                          onChange={handleSortChange}
                        >
                          <option>All</option>
                          {Object.keys(contentMap).map((key, index) => (
                            <option key={index}>{key}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <h1 className="pb-2 text-sm text-gray-500">tags</h1>
                    {/* tag buttons. */}
                    <div className="flex gap-2 pb-2">
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
                            className={`h-fit rounded-xl bg-green-600 px-2 py-1 text-sm text-black ${
                              selectedTag.includes(tag) ? "bg-opacity-70" : ""
                            }`}
                          >
                            {tag}
                          </button>
                        ))}
                      {/* reset button. */}
                      <button
                        onClick={handleReset}
                        className="h-fit rounded-xl bg-gray-500 px-2 py-1 text-sm text-white"
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
                  <div
                    className="no-scrollbar h-max w-full overflow-auto px-4 py-2"
                    style={{
                      maxHeight: "calc(100vh - 190px)",
                      overflowY: "auto",
                    }}
                  >
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
    </div>
  );
};

export default Search;
