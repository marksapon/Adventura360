import React, { useState, useEffect, useRef } from "react";
import Paper, { Point, Path, Size } from "paper";

/* React Icons */
import { ImLocation2 } from "react-icons/im"; // Current Location On Button
import { FaWalking } from "react-icons/fa"; // Walk State
import { FaCarAlt } from "react-icons/fa"; // Drive State
import { MdOutlineGpsFixed } from "react-icons/md"; // Target Location Button
import { IoIosClose } from "react-icons/io"; // Close Button
import { MdDirections } from "react-icons/md"; // Directions Button
import { view } from "paper/dist/paper-core";
import { check } from "prettier";

const PathfindingModal = ({
  setPathModalState,
  pathfinding,
  removePath,
  generatePOI,
}) => {
  const poi = generatePOI(); // Generate Points of Interest

  /* UI States  */
  const [travelType, setTravelType] = useState("walk"); // Travel Modes: Walk || Vehicle
  const [buildingsListState, setBuildingsListState] = useState(false); // Buildings List State
  const [directionState, setDirectionState] = useState(false); // Direction Button State
  const [destination, setDestination] = useState(""); // Destination Variable
  const [finalDestination, setFinalDestination] = useState(); // Final Destination Variable

  /* Buildings Search */
  // Buildings List
  const [buildingsList, setBuildingsList] = useState(poi); // Buildings List

  // /* Search Function Event that triggers everytime the search value changes */
  const search = (event) => {
    // If Search Bar is empty Set Buildings List to Default and Hide Directions Button
    if (event.target.value === "") {
      setBuildingsList(poi); // Set Buildings List to Default

      setBuildingsListState(false); // Set Buildings List State to False

      setDestination("");

      setDirectionState(false);

      return;
    } else {
      setDestination(event.target.value); // Set Destination to Search Value

      // Filter the building list return the items that match the search value
      const buildingsListFiltered = poi.filter((building) => {
        setBuildingsListState(true);

        if (
          building.name.toLowerCase().includes(event.target.value.toLowerCase())
        ) {
          return building;
        }
      });

      // Set the filtered list to the buildings list
      setBuildingsList(buildingsListFiltered);

      checkDestination(event.target.value);
    }
  };

  // /* Check Destination Function */
  function checkDestination(targetDestination = destination) {
    // Check if the target destination is in the Points of Interest
    let state = false;
    poi.forEach((building) => {
      // If the target destination is in the Points of Interest set the final destination to the target destination and show the directions button
      if (building.name.toLowerCase() === targetDestination.toLowerCase()) {
        setFinalDestination(building); // Set Final Destination to the target destination

        state = true;
      }
    });
    setDirectionState(state); // Hide the Directions Button
  }

  return (
    <div>
      <div className="z-50 ml-2 mr-2 flex h-full w-auto items-baseline justify-center">
        <div className="justify-baselign w-30 flex flex-col items-center space-y-1">
          <div className="pointer-events-auto relative z-10 grid h-auto grid-cols-4 grid-rows-3 gap-2 rounded-xl border-2 border-gray-300 bg-slate-50 shadow-lg sm:w-full lg:w-full">
            {/* Close Button */}
            <button
              className="absolute right-0 z-20 m-1"
              onClick={() => {
                setPathModalState(false);
                console.log("Path Modal Closed");
                removePath();
              }}
            >
              <IoIosClose size={30} />
            </button>
            {/* Close Button */}
            {/* Current Location Icon */}
            <div className=" mt-3 flex items-end justify-end">
              <div className="flex h-full w-10 items-center justify-center text-green-600">
                <ImLocation2 size={25} />
              </div>
            </div>
            {/* Current Location Icon */}
            {/* Current location Container */}
            <div className="col-span-2 mt-3 flex items-center justify-center">
              <div className="flex h-full w-full items-center justify-center rounded-md border-2 border-gray-500 bg-gray-400 text-white">
                Current location
              </div>
            </div>
            {/* Current location Container */}
            {/* Walk State Button */}
            <div className="pointer-events-auto mt-3 flex items-center">
              <button
                className={`flex h-full w-10 items-center justify-center rounded-2xl border-2 ${travelType === "walk" ? "bg-blue-500 text-white" : "text-blue-500"} border-blue-500`}
                onClick={() => {
                  setTravelType("walk");
                }}
              >
                <FaWalking size={25} />
              </button>
            </div>
            {/* Walk State Button */}
            {/* Destination Icon */}
            <div className=" mb-2 flex items-center justify-end">
              <div className="flex h-full w-10 items-center justify-center text-orange-500">
                <MdOutlineGpsFixed size={25} />
              </div>
            </div>
            {/* Destination Icon */}
            {/* Destination Container */}
            <div className="col-span-2 mb-2 flex justify-center">
              <input
                className="flex h-full w-full items-center justify-center rounded-md border-2 border-gray-500 bg-white text-center"
                placeholder="Destination"
                type="text"
                onChange={search}
                onClick={() => {
                  setBuildingsListState(true);
                }}
                value={destination}
              />
            </div>
            {/* Destination Container */}
            {/* Vehicle State Button */}
            <div className="mb-2 flex items-center">
              <button
                className={`flex h-full w-10 items-center justify-center rounded-2xl border-2 ${travelType === "vehicle" ? "bg-blue-500 text-white" : "text-blue-500"} border-blue-500`}
                onClick={() => {
                  setTravelType("vehicle");
                }}
              >
                <FaCarAlt size={25} />
              </button>
            </div>
            {/* Vehicle State Button */}
            {/* DIrection Button */}
            <div className="col-span-2 col-start-2 flex items-baseline justify-center ">
              {directionState && (
                <button
                  className=" relative flex h-8 w-32 items-center justify-center rounded-md bg-green-500 text-white"
                  onClick={() => {
                    console.log("Directions Button Clicked");
                    pathfinding(finalDestination, travelType);
                  }}
                >
                  Directions
                  <MdDirections className="absolute right-0 p-0.5" size={25} />
                </button>
              )}
            </div>
            {/* DIrection Button */}
          </div>
          {/* Buildings List Container */}
          {buildingsListState && (
            <div className="justify-baseline pointer-events-auto flex w-full flex-col space-y-1 overflow-scroll rounded-lg border-2 border-gray-300 bg-white p-2 shadow-lg sm:h-20 lg:h-1/2">
              {buildingsList.map((building, index) => (
                <button
                  className="flex justify-start"
                  onClick={() => {
                    setBuildingsListState(false);
                    setDestination(building.name);
                    checkDestination(building.name);
                  }}
                  key={index}
                >
                  {building.name}
                </button>
              ))}
            </div>
          )}
          {/* Buildings List Container */}
        </div>
      </div>
    </div>
  );
};

export default PathfindingModal;
