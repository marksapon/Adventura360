import React, { useState } from "react";

/* Components */
// import PathFindingModalSearch from "./PathfindingModalSearch"; // Pathfinding Modal Search

/* React Icons */
import { ImLocation2 } from "react-icons/im"; // Current Location On Button
import { FaWalking } from "react-icons/fa"; // Walk State
import { FaCarAlt } from "react-icons/fa"; // Drive State
import { MdOutlineGpsFixed } from "react-icons/md"; // Target Location Button
import { IoIosClose } from "react-icons/io"; // Close Button
import { MdDirections } from "react-icons/md"; // Directions Button

const PathfindingModal = ({ ref, setPathModalState }) => {
  console.log("Pathfinding Modal");

  /* States */
  const [walkState, setWalkState] = useState(true); // Walk State
  const [buildingsListState, setBuildingsListState] = useState(false); // Buildings List State
  const [destination, setDestination] = useState(""); // Destination Holder
  const [directionState, setDirectionState] = useState(false); // Direction State

  /* Building Search */
  const buildings = [
    "Building 1",
    "Building 2",
    "Building 3",
    "Building 4",
    "Building 5",
  ];

  const [buildingsList, setBuildingsList] = useState(buildings);

  const search = (event) => {
    if (event.target.value === "") {
      setBuildingsList(buildings);
      setBuildingsListState(false);
      setDestination("");
      return;
    }

    setDestination(event.target.value);

    const buildingsListFiltered = buildings.filter((building) => {
      setBuildingsListState(true);
      return (
        building.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1
      );
    });

    setBuildingsList(buildingsListFiltered);
  };

  return (
    <div className="z-50 ml-2 mr-2 flex h-full w-auto items-baseline justify-center">
      <div className="justify-baselign w-30 flex flex-col items-center space-y-1">
        <div className="pointer-events-auto relative z-10 grid h-auto grid-cols-4 grid-rows-3 gap-2 rounded-xl border-2 border-gray-300 bg-slate-50 shadow-lg sm:w-full lg:w-full">
          <button
            className="absolute right-0 z-20 m-1"
            onClick={() => {
              setPathModalState(false);
            }}
          >
            <IoIosClose size={30} />
          </button>
          <div className=" mt-3 flex items-end justify-end">
            <div className="flex h-full w-10 items-center justify-center text-green-600">
              <ImLocation2 size={25} />
            </div>
          </div>
          <div className="col-span-2 mt-3 flex items-center justify-center">
            <div className="flex h-full w-full items-center justify-center rounded-md border-2 border-gray-500 bg-gray-400 text-white">
              Current location
            </div>
          </div>
          <div className="pointer-events-auto mt-3 flex items-center">
            <button
              className={`flex h-full w-10 items-center justify-center rounded-2xl border-2 ${walkState ? "bg-blue-500 text-white" : "text-blue-500"} border-blue-500`}
              onClick={() => {
                setWalkState(true);
              }}
            >
              <FaWalking size={25} />
            </button>
          </div>
          <div className=" mb-2 flex items-center justify-end">
            <div className="flex h-full w-10 items-center justify-center text-orange-500">
              <MdOutlineGpsFixed size={25} />
            </div>
          </div>
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
          <div className="mb-2 flex items-center">
            <button
              className={`flex h-full w-10 items-center justify-center rounded-2xl border-2 ${!walkState ? "bg-blue-500 text-white" : "text-blue-500"} border-blue-500`}
              onClick={() => {
                setWalkState(false);
              }}
            >
              <FaCarAlt size={25} />
            </button>
          </div>
          <div className="col-span-2 col-start-2 flex items-baseline justify-center ">
            {directionState ? (
              <button
                className=" relative flex h-8 w-32 items-center justify-center rounded-md bg-green-500 text-white"
                onClick={() => {
                  console.log("Show Path");
                }}
              >
                Directions
                <MdDirections className="absolute right-0 p-0.5" size={25} />
              </button>
            ) : null}
          </div>
        </div>
        {buildingsListState ? (
          <div className="justify-baseline pointer-events-auto flex w-full flex-col space-y-1 overflow-scroll rounded-lg border-2 border-gray-300 bg-white p-2 shadow-lg sm:h-20 lg:h-1/2">
            {buildingsList.map((building, index) => (
              <button
                className="flex justify-start"
                onClick={() => {
                  setBuildingsListState(false);
                  setDirectionState(true);
                  setDestination(building);
                }}
                key={index}
              >
                {building}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default PathfindingModal;
