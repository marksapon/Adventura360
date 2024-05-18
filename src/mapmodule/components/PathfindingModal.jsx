import React, { useState, useEffect } from "react";

/* React Icons */
import { ImLocation2 } from "react-icons/im"; // Current Location On Button
import { FaWalking } from "react-icons/fa"; // Walk State
import { FaCarAlt } from "react-icons/fa"; // Drive State
import { MdOutlineGpsFixed } from "react-icons/md"; // Target Location Button
import { IoIosClose } from "react-icons/io"; // Close Button
import { MdDirections } from "react-icons/md"; // Directions Button
import { IoIosArrowBack } from "react-icons/io"; // Minimize Button

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

  const [minimized, setMinimized] = useState(false); // Minimized State

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

  const isLandscape =
    window.matchMedia("(min-width: 640px)").matches &&
    window.matchMedia("(max-width: 767px)").matches
      ? window.matchMedia("(orientation: landscape)").matches
      : false;

  return (
    <>
      {minimized ? (
        <>
          {/* Minimize Button */}
          <div className="pointer-events-auto absolute -left-12 top-0 flex h-full items-center justify-end">
            <div className="z-40 flex h-full w-20 items-center justify-end rounded-lg bg-gray-200">
              <button
                onClick={() => {
                  console.log("Minimize Button Clicked");
                  setMinimized(!minimized);
                }}
              >
                <IoIosArrowBack
                  size={30}
                  className="rotate-180 text-gray-600"
                />
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="pointer-events-none absolute -top-20 left-0 z-10 h-screen w-screen bg-black bg-opacity-70" />
          <div className="pointer-events-auto absolute -left-2 z-50 grid h-full w-72 grid-rows-6 gap-2 rounded-lg bg-white p-2 shadow-md sm:flex sm:flex-col">
            {/* Current location */}
            <div className="grid h-16 grid-cols-6 gap-y-0 sm:h-20">
              {/* Current Location ICON */}
              <div className="flex h-full w-full items-end justify-center">
                <div className="flex h-11 w-full items-center justify-center text-green-600">
                  <ImLocation2 size={25} />
                </div>
              </div>

              {/* Current Location Text Bar */}
              <div className="col-span-4 flex h-full w-full items-end ">
                <div className="flex h-10 w-full items-center justify-center ">
                  <div className="flex h-full w-full items-end justify-center rounded-full border-2 py-2 text-sm hover:border-green-600 hover:bg-slate-50">
                    Current location
                  </div>
                </div>
              </div>

              {/* Walk Button */}
              <div className="flex items-end justify-center  ">
                <div className="flex h-10 w-10 items-center justify-center">
                  <button
                    className={`flex h-9 rounded-full border-2 p-1 ${travelType === "walk" ? "bg-blue-500 text-white" : "text-blue-500"} border-blue-500`}
                    onClick={() => {
                      setTravelType("walk");
                    }}
                  >
                    <FaWalking size={25} />
                  </button>
                </div>
              </div>
            </div>

            {/* Direction */}
            <div className="grid grid-cols-6 grid-rows-2  ">
              {/* Direction ICON */}
              <div className="flex h-full w-full items-start justify-center ">
                <div className="flex h-10 w-10 items-center justify-center">
                  <div className="flex h-full w-10 items-center justify-center text-orange-500">
                    <MdOutlineGpsFixed size={25} />
                  </div>
                </div>
              </div>

              {/* Direction Text Bar */}
              <div className="col-span-4 flex h-full w-full items-center justify-center  ">
                <div className="flex h-10 w-full items-center justify-center">
                  <input
                    className="flex h-full w-full rounded-full border-2 px-1 text-center text-sm hover:border-green-600 hover:bg-slate-50"
                    placeholder="Destination"
                    type="text"
                    onChange={search}
                    onClick={() => {
                      setBuildingsListState(true);
                    }}
                    value={destination}
                  />
                </div>
              </div>

              {/* Vehicle Button */}
              <div className=" flex items-center justify-center">
                {/* <button
            className={`flex h-9 items-center justify-center rounded-full border-2 p-1 ${travelType === "vehicle" ? "bg-blue-500 text-white" : "text-blue-500"} border-blue-500`}
            onClick={() => {
              setTravelType("vehicle");
            }}
          >
            <FaCarAlt size={25} />
          </button> */}
              </div>

              {/* Direction Button */}
              {directionState && (
                <div className="col-span-6 m-1 flex h-full w-full items-center justify-center">
                  <button
                    className="relative flex w-auto items-center justify-center rounded-full bg-green-500 px-2 text-white"
                    onClick={() => {
                      console.log("Directions Button Clicked");
                      pathfinding(finalDestination, travelType);
                      setMinimized(true);
                    }}
                  >
                    Directions
                    <MdDirections className="my-1 ml-2" size={25} />
                  </button>
                </div>
              )}
            </div>

            {/* List */}
            {isLandscape ? (
              buildingsListState &&
              buildingsList.length > 0 && (
                <div className="absolute left-2 top-0 z-50 flex h-full w-screen items-center justify-center bg-white">
                  <div
                    className={`no-scrollbar relative flex h-full w-full flex-col gap-1 overflow-auto rounded-lg border-2 bg-white p-2 shadow-lg `}
                  >
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
                </div>
              )
            ) : (
              <div className={`row-span-4 h-80 w-full md:h-96`}>
                {buildingsListState && buildingsList.length > 0 && (
                  <div
                    className={`no-scrollbar relative flex h-full flex-col gap-1 overflow-auto rounded-lg border-2 bg-white p-2 shadow-lg `}
                  >
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
              </div>
            )}

            {/* Close Button */}
            <div className=" absolute right-0 flex h-10 w-10 items-center justify-center">
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
            </div>
          </div>
          {/* Minimize Button */}
          <div className="pointer-events-auto absolute left-5 top-0 flex h-full w-72 items-center justify-end">
            <div className="z-40 flex h-full w-20 items-center justify-end rounded-lg bg-gray-200">
              <button
                onClick={() => {
                  console.log("Minimize Button Clicked");
                  setMinimized(!minimized);
                }}
              >
                <IoIosArrowBack size={30} className="text-gray-600" />
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default PathfindingModal;
