import React, { useState } from "react";
import { useEffect } from "react";

const FilterList = ({
  current_overlays,
  setOverlays,

  icons,

  removeOverlays,
  addOverlays,
}) => {
  /* Filter Buttons States */
  const [restroomState, setRestroomState] = useState(false); // Restroom State
  const [washareaState, setwashareaState] = useState(false); // Hand Wash State
  const [schoolFacilitiesState, setSchoolFacilitiesState] = useState(false); // School Facilities State
  const [collegeBuildingsState, setCollegeBuildingsState] = useState(false); // College Buildings State
  const [cafeteriaState, setCafeteriaState] = useState(false); // Cafeteria State
  const [attractionState, setAttractionState] = useState(false); // School Attraction State
  const [courtState, setCourtState] = useState(false); // Court State
  const [parkingState, setParkingState] = useState(false); // Parking Lot State
  const [batibotState, setBatibotState] = useState(false); // Batibot State
  const [farmState, setFarmState] = useState(false); // Farm State
  const [constructionState, setConstructionState] = useState(false); // Construction State
  const [venueState, setVenueState] = useState(false); // Venue State

  // Function that controls the filter list
  function filter(type, state) {
    // console.log("Filter:", type, state);
    if (state) {
      // If the state is true add the type to the filter list
      setOverlays((prevState) => {
        const newFilterList = [...prevState, type];
        return newFilterList;
      });
    } else {
      // Else remove the type from the filter list
      setOverlays((prevState) => {
        const newFilterList = prevState.filter((item) => item !== type);
        return newFilterList;
      });
    }
  }

  return (
    <div
      className={`no-scrollbar pointer-events-auto flex h-52 w-10 snap-y snap-mandatory flex-col items-center overflow-scroll rounded-2xl bg-gray-100 pb-1 pl-0 pr-0 pt-1 drop-shadow-xl sm:h-10 sm:w-56 sm:snap-x  sm:flex-row-reverse sm:pb-0 sm:pl-1 sm:pr-1 sm:pt-0 lg:h-56 lg:w-12 lg:snap-y lg:flex-col lg:pb-1 lg:pl-0 lg:pr-0 lg:pt-1 `}
    >
      {/* Div 1 */}
      <div className="flex snap-center flex-col items-center justify-between sm:flex-row-reverse lg:flex-col">
        {/* Restroom */}
        <button
          className={`flex h-10 w-10 items-center justify-center rounded-full`}
          onClick={() => {
            setRestroomState((prevState) => {
              const newState = !prevState;
              filter("restroom", newState);
              return newState;
            });
          }}
        >
          <icons.restroom.icon
            className={`${restroomState ? "text-green-500" : "text-gray-500 hover:text-green-500"} size-6 `}
          />
        </button>
        {/* Restroom */}
        {/* Washroom */}
        <button
          className={`flex h-10 w-10 flex-none items-center justify-center rounded-full`}
          onClick={() => {
            setwashareaState((prevState) => {
              const newState = !prevState;
              filter("washarea", newState);
              return newState;
            });
          }}
        >
          <icons.washarea.icon
            className={`${washareaState ? "text-green-500" : "text-gray-500 hover:text-green-500"} size-6 `}
          />
        </button>
        {/* Hand Wash */}
        {/* School Facilities */}
        <button
          className={`flex h-10 w-10 flex-none items-center justify-center rounded-full`}
          onClick={() => {
            setSchoolFacilitiesState((prevState) => {
              const newState = !prevState;
              filter("school_facilities", newState);
              return newState;
            });
          }}
        >
          <icons.school_facilities.icon
            className={`${schoolFacilitiesState ? "text-green-500" : "text-gray-500 hover:text-green-500"} size-6 `}
          />
        </button>
        {/* School Facilities */}
        {/* College Buildings */}
        <button
          className={`flex h-10 w-10 flex-none items-center justify-center rounded-full`}
          onClick={() => {
            setCollegeBuildingsState((prevState) => {
              const newState = !prevState;
              filter("college_buildings", newState);
              return newState;
            });
          }}
        >
          <icons.college_buildings.icon
            className={`${collegeBuildingsState ? "text-green-500" : "text-gray-500 hover:text-green-500"} size-6 `}
          />
        </button>
        {/* College Buildings */}
        {/* Cafeteria */}
        <button
          className={`flex h-10 w-10 flex-none items-center justify-center rounded-full`}
          onClick={() => {
            setCafeteriaState((prevState) => {
              const newState = !prevState;
              filter("cafeteria", newState);
              return newState;
            });
          }}
        >
          <icons.cafeteria.icon
            className={`${cafeteriaState ? "text-green-500" : "text-gray-500 hover:text-green-500"} size-6 `}
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
            setBatibotState((prevState) => {
              const newState = !prevState;
              filter("batibot", newState);
              return newState;
            });
          }}
        >
          <icons.batibot.icon
            className={`${batibotState ? "text-green-500" : "text-gray-500 hover:text-green-500"} size-6 `}
          />
        </button>
        {/* Batibot */}
        {/* School Attraction */}
        <button
          className={`flex h-10 w-10 flex-none items-center justify-center rounded-full`}
          onClick={() => {
            setAttractionState((prevState) => {
              const newState = !prevState;
              filter("attractions", newState);
              return newState;
            });
          }}
        >
          <icons.attractions.icon
            className={`${attractionState ? "text-green-500" : "text-gray-500 hover:text-green-500"} size-6 `}
          />
        </button>
        {/* School Attraction */}
        {/* Court */}
        <button
          className={`flex h-10 w-10 flex-none items-center justify-center rounded-full`}
          onClick={() => {
            setCourtState((prevState) => {
              const newState = !prevState;
              filter("court", newState);
              return newState;
            });
          }}
        >
          <icons.court.icon
            className={`${courtState ? "text-green-500" : "text-gray-500 hover:text-green-500"} size-6 `}
          />
        </button>
        {/* Court */}
        {/* Parking Lot */}
        <button
          className={`flex h-10 w-10 flex-none items-center justify-center rounded-full`}
          onClick={() => {
            setParkingState((prevState) => {
              const newState = !prevState;
              filter("parking", newState);
              return newState;
            });
          }}
        >
          <icons.parking.icon
            className={`${parkingState ? "text-green-500" : "text-gray-500 hover:text-green-500"} size-6 `}
          />
        </button>
        {/* Parking Lot */}
        {/* Venues */}
        <button
          className={`flex h-10 w-10 flex-none items-center justify-center rounded-full`}
          onClick={() => {
            setVenueState((prevState) => {
              const newState = !prevState;
              filter("venue", newState);
              return newState;
            });
          }}
        >
          <icons.venue.icon
            className={`${venueState ? "text-green-500" : "text-gray-500 hover:text-green-500"} size-6 `}
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
            setFarmState((prevState) => {
              const newState = !prevState;
              filter("farm", newState);
              return newState;
            });
          }}
        >
          <icons.farm.icon
            className={`${farmState ? "text-green-500" : "text-gray-500 hover:text-green-500"} size-6 `}
          />
        </button>
        {/* Farm */}
        {/* Construction */}
        <button
          className={`flex h-10 w-10 flex-none items-center justify-center rounded-full`}
          onClick={() => {
            setConstructionState((prevState) => {
              const newState = !prevState;
              filter("construction", newState);
              return newState;
            });
          }}
        >
          <icons.construction.icon
            className={`${constructionState ? "text-green-500" : "text-gray-500 hover:text-green-500"} size-6 `}
          />
        </button>
        {/* School Attraction */}
      </div>
      {/* Div 3 */}
    </div>
  );
};

export default FilterList;
