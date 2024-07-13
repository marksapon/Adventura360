import React, { useState } from "react";

const FilterList = ({
  setOverlays,

  icons,
}) => {
  /* Filter Buttons States */
  const [activeOverlay, setActiveOverlay] = useState("");

  const [hoverItem, setHoverItem] = useState("");

  const [hovering, setHovering] = useState(false);

  // Function that controls the filter list
  function filter(type) {
    if (type) {
      // If the state is true add the type to the filter list
      // setActiveOverlay(type);
      setOverlays(() => {
        const newFilterList = [type];
        return newFilterList;
      });
    } else {
      // Else remove the type from the filter list
      setOverlays(() => {
        const newFilterList = [];
        return newFilterList;
      });
    }
  }

  return (
    <div className="flex flex-row">
      {hovering && (
        <div className="absolute -left-52 flex w-48 items-center justify-center rounded-lg bg-black p-2 text-xs text-white">
          {hoverItem}
        </div>
      )}

      <div
        className={`no-scrollbar pointer-events-auto flex h-52 w-10 snap-y snap-mandatory flex-col items-center overflow-scroll rounded-2xl bg-gray-100 pb-1 pl-0 pr-0 pt-1 drop-shadow-xl sm:h-10 sm:w-56 sm:snap-x  sm:flex-row-reverse sm:pb-0 sm:pl-1 sm:pr-1 sm:pt-0 lg:h-56 lg:w-12 lg:snap-y lg:flex-col lg:pb-1 lg:pl-0 lg:pr-0 lg:pt-1 `}
      >
        {/* Div 1 */}
        <div className="flex snap-center flex-col items-center justify-between sm:flex-row-reverse lg:flex-col">
          {/* Restroom */}
          <button
            className={`flex h-10 w-10 items-center justify-center rounded-full`}
            onClick={() => {
              if (activeOverlay !== "restroom") {
                setActiveOverlay("restroom");
                filter("restroom");
              } else {
                setActiveOverlay();
                filter();
              }
            }}
            onMouseEnter={() => {
              setHovering(true);
              setHoverItem("Restroom");
            }}
            onMouseLeave={() => {
              setHovering(false);
              setHoverItem();
            }}
          >
            <icons.restroom.icon
              className={`${activeOverlay === "restroom" ? "text-green-500" : "text-gray-500 hover:text-green-500"} size-6 `}
            />
          </button>
          {/* Restroom */}
          {/* Washroom */}
          <button
            className={`flex h-10 w-10 flex-none items-center justify-center rounded-full`}
            onClick={() => {
              if (activeOverlay !== "washarea") {
                setActiveOverlay("washarea");
                filter("washarea");
              } else {
                setActiveOverlay();
                filter();
              }
            }}
            onMouseEnter={() => {
              setHovering(true);
              setHoverItem("Washroom");
            }}
            onMouseLeave={() => {
              setHovering(false);
              setHoverItem();
            }}
          >
            <icons.washarea.icon
              className={`${activeOverlay === "washarea" ? "text-green-500" : "text-gray-500 hover:text-green-500"} size-6 `}
            />
          </button>
          {/* Hand Wash */}
          {/* School Facilities */}
          <button
            className={`flex h-10 w-10 flex-none items-center justify-center rounded-full`}
            onClick={() => {
              if (activeOverlay !== "school_facilities") {
                setActiveOverlay("school_facilities");
                filter("school_facilities");
              } else {
                setActiveOverlay();
                filter();
              }
            }}
            onMouseEnter={() => {
              setHovering(true);
              setHoverItem("School Facilities");
            }}
            onMouseLeave={() => {
              setHovering(false);
              setHoverItem();
            }}
          >
            <icons.school_facilities.icon
              className={`${activeOverlay === "school_facilities" ? "text-green-500" : "text-gray-500 hover:text-green-500"} size-6 `}
            />
          </button>

          {/* School Facilities */}
          {/* College Buildings */}
          <button
            className={`flex h-10 w-10 flex-none items-center justify-center rounded-full`}
            onClick={() => {
              if (activeOverlay !== "college_buildings") {
                setActiveOverlay("college_buildings");
                filter("college_buildings");
              } else {
                setActiveOverlay();
                filter();
              }
            }}
            onMouseEnter={() => {
              setHovering(true);
              setHoverItem("College Buildings");
            }}
            onMouseLeave={() => {
              setHovering(false);
              setHoverItem();
            }}
          >
            <icons.college_buildings.icon
              className={`${activeOverlay === "college_buildings" ? "text-green-500" : "text-gray-500 hover:text-green-500"} size-6 `}
            />
          </button>
          {/* College Buildings */}
          {/* Cafeteria */}
          <button
            className={`flex h-10 w-10 flex-none items-center justify-center rounded-full`}
            onClick={() => {
              if (activeOverlay !== "cafeteria") {
                setActiveOverlay("cafeteria");
                filter("cafeteria");
              } else {
                setActiveOverlay();
                filter();
              }
            }}
            onMouseEnter={() => {
              setHovering(true);
              setHoverItem("Cafeteria");
            }}
            onMouseLeave={() => {
              setHovering(false);
              setHoverItem();
            }}
          >
            <icons.cafeteria.icon
              className={`${activeOverlay === "cafeteria" ? "text-green-500" : "text-gray-500 hover:text-green-500"} size-6 `}
            />
          </button>
          {/* Cafeteria */}
        </div>
        {/* Div 1 */}

        {/* Div 2 */}
        <div className="flex snap-center flex-col items-center justify-between sm:flex-row-reverse lg:flex-col ">
          {/* Batibot */}
          <button
            className={`flex h-10 w-10 items-center justify-center rounded-full`}
            onClick={() => {
              if (activeOverlay !== "batibot") {
                setActiveOverlay("batibot");
                filter("batibot");
              } else {
                setActiveOverlay();
                filter();
              }
            }}
            onMouseEnter={() => {
              setHovering(true);
              setHoverItem("Batibot");
            }}
            onMouseLeave={() => {
              setHovering(false);
              setHoverItem();
            }}
          >
            <icons.batibot.icon
              className={`${activeOverlay === "batibot" ? "text-green-500" : "text-gray-500 hover:text-green-500"} size-6 `}
            />
          </button>
          {/* Batibot */}
          {/* School Attraction */}
          <button
            className={`flex h-10 w-10 flex-none items-center justify-center rounded-full`}
            onClick={() => {
              if (activeOverlay !== "attractions") {
                setActiveOverlay("attractions");
                filter("attractions");
              } else {
                setActiveOverlay();
                filter();
              }
            }}
            onMouseEnter={() => {
              setHovering(true);
              setHoverItem("School Attraction");
            }}
            onMouseLeave={() => {
              setHovering(false);
              setHoverItem();
            }}
          >
            <icons.attractions.icon
              className={`${activeOverlay === "attractions" ? "text-green-500" : "text-gray-500 hover:text-green-500"} size-6 `}
            />
          </button>
          {/* School Attraction */}
          {/* Court */}
          <button
            className={`flex h-10 w-10 flex-none items-center justify-center rounded-full`}
            onClick={() => {
              if (activeOverlay !== "court") {
                setActiveOverlay("court");
                filter("court");
              } else {
                setActiveOverlay();
                filter();
              }
            }}
            onMouseEnter={() => {
              setHovering(true);
              setHoverItem("Court");
            }}
            onMouseLeave={() => {
              setHovering(false);
              setHoverItem();
            }}
          >
            <icons.court.icon
              className={`${activeOverlay === "court" ? "text-green-500" : "text-gray-500 hover:text-green-500"} size-6 `}
            />
          </button>
          {/* Court */}
          {/* Parking Lot */}
          <button
            className={`flex h-10 w-10 flex-none items-center justify-center rounded-full`}
            onClick={() => {
              if (activeOverlay !== "parking") {
                setActiveOverlay("parking");
                filter("parking");
              } else {
                setActiveOverlay();
                filter();
              }
            }}
            onMouseEnter={() => {
              setHovering(true);
              setHoverItem("Parking Lot");
            }}
            onMouseLeave={() => {
              setHovering(false);
              setHoverItem();
            }}
          >
            <icons.parking.icon
              className={`${activeOverlay === "parking" ? "text-green-500" : "text-gray-500 hover:text-green-500"} size-6 `}
            />
          </button>
          {/* Parking Lot */}
          {/* Venues */}
          <button
            className={`flex h-10 w-10 flex-none items-center justify-center rounded-full`}
            onClick={() => {
              if (activeOverlay !== "venue") {
                setActiveOverlay("venue");
                filter("venue");
              } else {
                setActiveOverlay();
                filter();
              }
            }}
            onMouseEnter={() => {
              setHovering(true);
              setHoverItem("Venues");
            }}
            onMouseLeave={() => {
              setHovering(false);
              setHoverItem();
            }}
          >
            <icons.venue.icon
              className={`${activeOverlay === "venue" ? "text-green-500" : "text-gray-500 hover:text-green-500"} size-6 `}
            />
          </button>
          {/* Venues */}
        </div>
        {/* Div 2 */}

        {/* Div 3 */}
        <div className="flex snap-center flex-col items-center justify-between sm:flex-row-reverse lg:flex-col ">
          {/* Farm */}
          <button
            className={`flex h-10 w-10 items-center justify-center rounded-full`}
            onClick={() => {
              if (activeOverlay !== "farm") {
                setActiveOverlay("farm");
                filter("farm");
              } else {
                setActiveOverlay();
                filter();
              }
            }}
            onMouseEnter={() => {
              setHovering(true);
              setHoverItem("Farms");
            }}
            onMouseLeave={() => {
              setHovering(false);
              setHoverItem();
            }}
          >
            <icons.farm.icon
              className={`${activeOverlay === "farm" ? "text-green-500" : "text-gray-500 hover:text-green-500"} size-6 `}
            />
          </button>
          {/* Farm */}
          {/* Construction */}
          <button
            className={`flex h-10 w-10 flex-none items-center justify-center rounded-full`}
            onClick={() => {
              if (activeOverlay !== "construction") {
                setActiveOverlay("construction");
                filter("construction");
              } else {
                setActiveOverlay();
                filter();
              }
            }}
            onMouseEnter={() => {
              setHovering(true);
              setHoverItem("Under Constructions");
            }}
            onMouseLeave={() => {
              setHovering(false);
              setHoverItem();
            }}
          >
            <icons.construction.icon
              className={`${activeOverlay === "construction" ? "text-green-500" : "text-gray-500 hover:text-green-500"} size-6 `}
            />
          </button>
          {/* School Attraction */}
        </div>
        {/* Div 3 */}
      </div>
    </div>
  );
};

export default FilterList;
