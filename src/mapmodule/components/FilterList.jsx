import React, { useState } from "react";
import { FaRestroom } from "react-icons/fa"; // Restroom Icon
import { FaHandsWash } from "react-icons/fa"; // Hand Wash Icon
import { LuSchool } from "react-icons/lu";

const FilterList = () => {
  /* Restroom */
  const [restroomState, setRestroomState] = useState(false); // Restroom State

  /* Hand Wash */
  const [handWashState, setHandWashState] = useState(false); // Hand Wash State

  /* School Facilities */
  const [schoolFacilitiesState, setSchoolFacilitiesState] = useState(false); // School Facilities State

  /* College Buildings */
  const [collegeBuildingsState, setCollegeBuildingsState] = useState(false); // College Buildings State

  return (
    <div className="bg-gray-100 rounded-full flex flex-col space-y-1 space-y-col h-auto w-auto justify-center items-center pointer-events-auto lg:p-1">
      {/* Restroom */}
      <button
        className={`h-10 w-10 rounded-full flex justify-center items-center `}
        onClick={() => {
          setRestroomState(!restroomState);
          console.log("Restroom Button: ", restroomState);
        }}
      >
        <FaRestroom
          className={`${restroomState ? "text-green-500" : "text-gray-500 hover:text-green-500"} size-6 `}
        />
      </button>
      {/* Restroom */}
      {/* Hand Wash */}
      <button
        className={`h-10 w-10 rounded-full flex justify-center items-center`}
        onClick={() => {
          setHandWashState(!handWashState);
          console.log("HandWash Button: ", handWashState);
        }}
      >
        <FaHandsWash
          className={`${handWashState ? "text-green-500" : "text-gray-500 hover:text-green-500"} size-6 `}
        />
      </button>
      {/* Hand Wash */}
      {/* School Facilities */}
      <button
        className={`h-10 w-10 rounded-full flex justify-center items-center `}
        onClick={() => {
          setSchoolFacilitiesState(!schoolFacilitiesState);
          console.log("School Facilities Button: ", schoolFacilitiesState);
        }}
      >
        <LuSchool
          className={`${schoolFacilitiesState ? "text-green-500" : "text-gray-500 hover:text-green-500"} size-6 `}
        />
      </button>
      {/* Hand Wash */}
    </div>
  );
};

export default FilterList;
