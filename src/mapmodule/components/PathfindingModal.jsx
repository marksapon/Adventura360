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
        <div className="flex h-screen w-full flex-col items-center space-y-1 px-4">
          <div className="pointer-events-auto relative z-10 h-auto w-full gap-2 rounded-xl border-2 bg-white shadow-lg sm:w-3/4 md:w-2/3 lg:w-3/6 xl:w-1/3">
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
            <div className="flex flex-col gap-2 pt-8">
              <div className="flex w-full items-center justify-between">
                {/* Current Location Icon */}
                <div className="flex h-full items-end justify-end">
                  <div className="flex h-full w-10 items-center justify-center text-green-600">
                    <ImLocation2 size={25} />
                  </div>
                </div>
                {/* Current Location Icon */}
                {/* Current location Container */}
                <div className="flex h-full w-full items-center justify-center">
                  <div className="flex h-full w-full items-center justify-center rounded-full border-2 py-2 text-sm hover:border-green-600 hover:bg-slate-50">
                    Current location
                  </div>
                </div>
                {/* Current location Container */}
                {/* Walk State Button */}
                <div className="pointer-events-auto flex h-full items-center p-1">
                  <button
                    className={`flex h-full items-center justify-center rounded-full border-2 p-1 ${travelType === "walk" ? "bg-blue-500 text-white" : "text-blue-500"} border-blue-500`}
                    onClick={() => {
                      setTravelType("walk");
                    }}
                  >
                    <FaWalking size={25} />
                  </button>
                </div>
                {/* Walk State Button */}
              </div>

              <div className="flex w-full flex-col">
                <div className="flex w-full justify-between">
                  {/* Destination Icon */}
                  <div className="flex items-center justify-end">
                    <div className="flex h-full w-10 items-center justify-center text-orange-500">
                      <MdOutlineGpsFixed size={25} />
                    </div>
                  </div>
                  {/* Destination Icon */}
                  {/* Destination Container */}
                  <div className="flex w-full justify-center">
                    <input
                      className="flex h-full w-full items-center justify-center rounded-full border-2 px-4 text-center text-sm hover:border-green-600 hover:bg-slate-50"
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
                  <div className="flex items-center p-1">
                    <button
                      className={`flex h-full items-center justify-center rounded-full border-2 p-1 ${travelType === "vehicle" ? "bg-blue-500 text-white" : "text-blue-500"} border-blue-500`}
                      onClick={() => {
                        setTravelType("vehicle");
                      }}
                    >
                      <FaCarAlt size={25} />
                    </button>
                  </div>
                </div>
                {/* Vehicle State Button */}
                {/* DIrection Button */}
                <div className="flex items-baseline justify-center py-1 sm:py-2">
                  {directionState && (
                    <button
                      className="relative flex w-auto items-center justify-center rounded-full bg-green-500 px-2 text-white"
                      onClick={() => {
                        console.log("Directions Button Clicked");
                        pathfinding(finalDestination, travelType);
                      }}
                    >
                      Directions
                      <MdDirections className="my-1 ml-2" size={25} />
                    </button>
                  )}
                </div>
                {/* DIrection Button */}
              </div>
              {/* Buildings List Container */}
            </div>
          </div>

          {buildingsListState && buildingsList.length > 0 && (
            <div className="no-scrollbar pointer-events-auto flex max-h-[50vh] flex-shrink flex-col space-y-1 overflow-auto rounded-lg border-2 bg-white p-2 shadow-lg sm:w-3/4 md:w-2/3 lg:w-3/6 xl:w-1/3">
              {buildingsList.map((building, index) => (
                <button
                  className="flex justify-start rounded-lg border p-1 px-2 text-left text-sm hover:border-green-600 hover:bg-slate-50"
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
