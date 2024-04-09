import React, { useState } from "react";
import { initOSDFabricJS } from "openseadragon-fabric";

/* Components */
import Pathfinding from "./Pathfinding";

/* React Icons */
import { ImLocation2 } from "react-icons/im"; // Current Location On Button
import { FaWalking } from "react-icons/fa"; // Walk State
import { FaCarAlt } from "react-icons/fa"; // Drive State
import { MdOutlineGpsFixed } from "react-icons/md"; // Target Location Button
import { IoIosClose } from "react-icons/io"; // Close Button
import { MdDirections } from "react-icons/md"; // Directions Button
import { useEffect } from "react";

const PathfindingModal = ({ setPathModalState, currLoc, viewer }) => {
  /* UI States  */
  const [walkState, setWalkState] = useState(true); // Travel Modes: True = Walk / False = Vehicle
  const [buildingsListState, setBuildingsListState] = useState(false); // Buildings List State
  const [directionState, setDirectionState] = useState(false); // Direction Button State
  const [destination, setDestination] = useState(""); // Destination Variable

  /* Buildings Search */

  // Buildings List
  const buildings = [
    "Building 1",
    "Building 2",
    "Building 3",
    "Building 4",
    "Building 5",
  ];

  const [buildingsList, setBuildingsList] = useState(buildings); // Pass Buildings List

  // Search Function Event that triggers everytime the search value changes
  const search = (event) => {
    // If Search Bar is empty Set Buildings List to Default and Hide Directions Button
    if (event.target.value === "") {
      setBuildingsList(buildings);
      setBuildingsListState(false);
      setDestination("");
      return;
    }

    setDestination(event.target.value); // Set Destination to Search Value

    // Filter the building list return the items that match the search value
    const buildingsListFiltered = buildings.filter((building) => {
      setBuildingsListState(true);
      return (
        building.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1
      );
    });

    // Set the filtered list to the buildings list
    setBuildingsList(buildingsListFiltered);
  };

  /* Path Display */

  const [pathFabric, setPathFabric] = useState(); // Stores Fabric Path
  const [fabricCanvas, setFabricCanvas] = useState(); // Fabric Canvas
  const [fabricLoaded, setFabricLoaded] = useState(false); // Fabric Loaded State

  // useEffect kicks in when fabric path from Pathfinding component changes
  useEffect(() => {
    console.log("useEffect Pathfinding Modal");
    /* Path FabricJS */
    initOSDFabricJS(); // Initialize FabricJS

    // Create a Fabric Overlay Instance
    const fabricOverlay = viewer.fabricOverlay({
      fabricCanvasOptions: { selection: false },
    });

    setFabricCanvas(fabricOverlay); // Set Fabric Canvas
    setFabricLoaded(true); // Set Fabric is Loaded State
  }, [pathFabric]);

  return (
    <div className="z-50 ml-2 mr-2 flex h-full w-auto items-baseline justify-center">
      {/* Pathfinding Component */}
      <Pathfinding
        viewer={viewer}
        currloc={currLoc}
        targetLoc={destination}
        pathFabric={setPathFabric}
      />
      {/* Pathfinding Component */}
      <div className="justify-baselign w-30 flex flex-col items-center space-y-1">
        <div className="pointer-events-auto relative z-10 grid h-auto grid-cols-4 grid-rows-3 gap-2 rounded-xl border-2 border-gray-300 bg-slate-50 shadow-lg sm:w-full lg:w-full">
          {/* Close Button */}
          <button
            className="absolute right-0 z-20 m-1"
            onClick={() => {
              setPathModalState(false);
              fabricCanvas.fabricCanvas().clear();
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
              className={`flex h-full w-10 items-center justify-center rounded-2xl border-2 ${walkState ? "bg-blue-500 text-white" : "text-blue-500"} border-blue-500`}
              onClick={() => {
                setWalkState(true);
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
              className={`flex h-full w-10 items-center justify-center rounded-2xl border-2 ${!walkState ? "bg-blue-500 text-white" : "text-blue-500"} border-blue-500`}
              onClick={() => {
                setWalkState(false);
              }}
            >
              <FaCarAlt size={25} />
            </button>
          </div>
          {/* Vehicle State Button */}
          {/* Directions Button */}
          <div className="col-span-2 col-start-2 flex items-baseline justify-center ">
            {directionState && (
              <button
                className=" relative flex h-8 w-32 items-center justify-center rounded-md bg-green-500 text-white"
                onClick={() => {
                  if (fabricLoaded) {
                    fabricCanvas.fabricCanvas().add(pathFabric);
                  }
                }}
              >
                Directions
                <MdDirections className="absolute right-0 p-0.5" size={25} />
              </button>
            )}
          </div>
          {/* Directions Button */}
        </div>
        {/* Buildings List Container */}
        {buildingsListState && (
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
        )}
        {/* Buildings List Container */}
      </div>
    </div>
  );
};

export default PathfindingModal;
