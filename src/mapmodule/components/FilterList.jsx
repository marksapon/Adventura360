import React, { useState } from "react";
import { FaRestroom } from "react-icons/fa"; // Restroom Icon
import { FaHandsWash } from "react-icons/fa"; // Hand Wash Icon
import { LuSchool } from "react-icons/lu"; // School Facilities Icon
import { TbSchool } from "react-icons/tb"; // College Buildings Icon
import { GrCafeteria } from "react-icons/gr"; // Cafeteria Icon
import { FaPeopleRoof } from "react-icons/fa6"; // Batibot Icon
import { PiBinocularsDuotone } from "react-icons/pi"; // School Attraction Icon
import { GiAbstract068 } from "react-icons/gi"; // Court Icon
import { FaSquareParking } from "react-icons/fa6"; // Parking Lot Icon

const FilterList = () => {
  /* Restroom */
  const [restroomState, setRestroomState] = useState(false); // Restroom State

  /* Hand Wash */
  const [handWashState, setHandWashState] = useState(false); // Hand Wash State

  /* School Facilities */
  const [schoolFacilitiesState, setSchoolFacilitiesState] = useState(false); // School Facilities State

  /* College Buildings */
  const [collegeBuildingsState, setCollegeBuildingsState] = useState(false); // College Buildings State

  /* Cafeteria */
  const [cafeteriaState, setCafeteriaState] = useState(false); // Cafeteria State

  /* School Attraction */
  const [schoolAttractionState, setSchoolAttractionState] = useState(false); // School Attraction State

  /* Court */
  const [courtState, setCourtState] = useState(false); // Court State

  /* Parking Lot */
  const [parkingLotState, setParkingLotState] = useState(false); // Parking Lot State

  /* Batibot */
  const [batibotState, setBatibotState] = useState(false); // Batibot State

  return (
    <div
      className={`bg-gray-100 h-52 w-10 sm:h-10 lg:h-52 sm:w-52 lg:w-12 flex flex-col sm:flex-row-reverse lg:flex-col rounded-2xl pointer-events-auto overflow-scroll no-scrollbar items-center snap-mandatory snap-y sm:snap-x lg:snap-y  drop-shadow-xl pl-0 pr-0 sm:pl-1 sm:pr-1 lg:pl-0 lg:pr-0 pt-1 pb-1 sm:pt-0 sm:pb-0 lg:pt-1 lg:pb-1 `}
    >
      {/* Div 1 */}
      <div className="flex flex-col sm:flex-row-reverse lg:flex-col justify-between items-center snap-center">
        {/* Restroom */}
        <button
          className={`h-10 w-10 rounded-full flex justify-center items-center`}
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
          className={`h-10 w-10 rounded-full flex justify-center items-center flex-none`}
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
          className={`h-10 w-10 rounded-full flex justify-center items-center flex-none`}
          onClick={() => {
            setSchoolFacilitiesState(!schoolFacilitiesState);
            console.log("School Facilities Button: ", schoolFacilitiesState);
          }}
        >
          <LuSchool
            className={`${schoolFacilitiesState ? "text-green-500" : "text-gray-500 hover:text-green-500"} size-6 `}
          />
        </button>
        {/* School Facilities */}
        {/* College Buildings */}
        <button
          className={`h-10 w-10 rounded-full flex justify-center items-center flex-none`}
          onClick={() => {
            setCollegeBuildingsState(!collegeBuildingsState);
            console.log("School Facilities Button: ", collegeBuildingsState);
          }}
        >
          <TbSchool
            className={`${collegeBuildingsState ? "text-green-500" : "text-gray-500 hover:text-green-500"} size-6 `}
          />
        </button>
        {/* College Buildings */}
        {/* Cafeteria */}
        <button
          className={`h-10 w-10 rounded-full flex justify-center items-center flex-none`}
          onClick={() => {
            setCafeteriaState(!cafeteriaState);
            console.log("School Facilities Button: ", cafeteriaState);
          }}
        >
          <GrCafeteria
            className={`${cafeteriaState ? "text-green-500" : "text-gray-500 hover:text-green-500"} size-6 `}
          />
        </button>
        {/* Cafeteria */}
      </div>
      {/* Div 1 */}

      {/* Div 2 */}
      <div className="flex flex-col sm:flex-row-reverse lg:flex-col justify-between items-center snap-center ">
        {/* Batibot */}
        <button
          className={`h-10 w-10 rounded-full flex justify-center items-center`}
          onClick={() => {
            setBatibotState(!batibotState);
            console.log("Restroom Button: ", batibotState);
          }}
        >
          <FaPeopleRoof
            className={`${batibotState ? "text-green-500" : "text-gray-500 hover:text-green-500"} size-6 `}
          />
        </button>
        {/* Batibot */}
        {/* School Attraction */}
        <button
          className={`h-10 w-10 rounded-full flex justify-center items-center flex-none`}
          onClick={() => {
            setSchoolAttractionState(!schoolAttractionState);
            console.log("HandWash Button: ", schoolAttractionState);
          }}
        >
          <PiBinocularsDuotone
            className={`${schoolAttractionState ? "text-green-500" : "text-gray-500 hover:text-green-500"} size-6 `}
          />
        </button>
        {/* School Attraction */}
        {/* Court */}
        <button
          className={`h-10 w-10 rounded-full flex justify-center items-center flex-none`}
          onClick={() => {
            setCourtState(!courtState);
            console.log("School Facilities Button: ", courtState);
          }}
        >
          <GiAbstract068
            className={`${courtState ? "text-green-500" : "text-gray-500 hover:text-green-500"} size-6 `}
          />
        </button>
        {/* Court */}
        {/* Parking Lot */}
        <button
          className={`h-10 w-10 rounded-full flex justify-center items-center flex-none`}
          onClick={() => {
            setParkingLotState(!parkingLotState);
            console.log("School Facilities Button: ", parkingLotState);
          }}
        >
          <FaSquareParking
            className={`${parkingLotState ? "text-green-500" : "text-gray-500 hover:text-green-500"} size-6 `}
          />
        </button>
        {/* Parking Lot */}
      </div>
      {/* Div 2 */}
    </div>
  );
};

export default FilterList;
