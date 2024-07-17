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
  minimized,
  setMinimized,

  setPathModalState,
  pathfinding,
  removePath,
  generatePOI,

  removeOverlays,

  setTargetLocation,
}) => {
  const poi = generatePOI(); // Generate Points of Interest

  /* UI States  */
  const [travelType, setTravelType] = useState("walk"); // Travel Modes: Walk || Vehicle
  const [buildingsListState, setBuildingsListState] = useState(false); // Buildings List State
  const [directionState, setDirectionState] = useState(false); // Direction Button State
  const [destination, setDestination] = useState(""); // Destination Variable
  const [finalDestination, setFinalDestination] = useState(); // Final Destination Variable

  // const [minimized, setMinimized] = useState(false); // Minimized State

  /* Buildings Search */
  // Buildings List
  const sortPOI = (poi) => {
    return [...poi].sort((a, b) => a.name.localeCompare(b.name));
  };

  const [buildingsList, setBuildingsList] = useState(sortPOI(poi));

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
    if (!state) {
      setFinalDestination();
    }
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
            <button
              className="z-40 flex h-fit w-20 items-center justify-end rounded-lg bg-slate-50 bg-opacity-50 py-8 hover:bg-opacity-100"
              onClick={() => {
                console.log("Minimize Button Clicked");
                setMinimized(!minimized);
              }}
            >
              <div>
                <IoIosArrowBack
                  size={30}
                  className="rotate-180 text-gray-600"
                />
              </div>
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="pointer-events-auto absolute -top-20 left-0 z-10 h-screen w-screen bg-black bg-opacity-70" />
          <div className="pointer-events-auto absolute -left-2 -top-20 z-50 flex h-screen w-5/6 flex-col gap-2 rounded-lg shadow-md sm:w-7/12 lg:w-2/6">
            {/* Current location */}
            <div className="flex h-full w-full">
              <div className="flex w-full flex-col gap-2 rounded-br-lg rounded-tr-lg bg-slate-50 px-2 pb-2">
                {/* Close Button */}
                <div className="mt-2 flex h-auto flex-col">
                  <div className="flex w-full justify-end pb-2">
                    <button
                      onClick={() => {
                        setPathModalState(false);
                        console.log("Path Modal Closed");
                        removePath();
                        removeOverlays();
                        setTargetLocation();
                      }}
                    >
                      <IoIosClose size={30} />
                    </button>
                  </div>
                  <div className="flex gap-2">
                    {/* Current Location ICON */}
                    <div className="flex h-full">
                      <div className="flex h-full w-10 items-center justify-center text-green-600">
                        <ImLocation2 size={25} />
                      </div>
                    </div>

                    {/* Current Location Text Bar */}
                    <div className="flex h-full w-full flex-grow items-end ">
                      <div className="flex h-10 w-full items-center justify-center ">
                        <div className="flex h-full w-full justify-center rounded-full border-2 bg-white py-2 text-sm hover:border-green-600 hover:bg-slate-50">
                          Current location
                        </div>
                      </div>
                    </div>

                    {/* Walk Button */}
                    <div className="flex">
                      <div className="flex h-10 w-full items-center justify-center ">
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
                </div>

                {/* Direction */}
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col border-b-2 pb-2">
                    <div className="flex gap-2 pb-2">
                      {/* Direction ICON */}
                      <div className="flex h-full w-10 items-start">
                        <div className="flex h-10 w-10 items-center justify-center">
                          <div className="flex h-full w-10 items-center justify-center text-orange-500">
                            <MdOutlineGpsFixed size={25} />
                          </div>
                        </div>
                      </div>

                      {/* Direction Text Bar */}
                      <div className="flex h-full w-full flex-grow items-center justify-center  ">
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
                      <div className="flex items-end justify-center  ">
                        <div className="flex h-10 w-10 items-center justify-center">
                          <button
                            className={`flex h-9 rounded-full border-2 p-1 ${travelType === "vehicle" ? "bg-blue-500 text-white" : "text-blue-500"} border-blue-500`}
                            onClick={() => {
                              setTravelType("vehicle");
                            }}
                          >
                            <FaCarAlt size={25} />
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* Direction Button */}
                    {directionState && (
                      <div className="flex h-full w-full items-center justify-center p-1">
                        <button
                          className="relative flex w-auto items-center justify-center rounded-full bg-green-500 px-2 text-white"
                          onClick={() => {
                            console.log("Directions Button Clicked");
                            setTargetLocation(finalDestination);
                            pathfinding(finalDestination, travelType);
                            setMinimized(true);
                          }}
                        >
                          Directions
                          <MdDirections className="" size={25} />
                        </button>
                      </div>
                    )}
                    <div className="flex w-full gap-2 overflow-auto text-nowrap p-4">
                      <button className="text-grey-600 flex h-auto justify-center gap-1 rounded-xl px-2 py-1 text-center text-xs font-bold ring-2 ring-green-500 hover:opacity-80">
                        Restroom
                      </button>
                      <button className="text-grey-600 flex h-auto justify-center gap-1 rounded-xl px-2 py-1 text-center text-xs font-bold ring-2 ring-green-500 hover:opacity-80">
                        Wash area
                      </button>
                      <button className="text-grey-600 flex h-auto justify-center gap-1 rounded-xl px-2 py-1 text-center text-xs font-bold ring-2 ring-green-500 hover:opacity-80">
                        Parking lot
                      </button>
                    </div>
                  </div>
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
                  <div className="flex-grow overflow-auto pl-2">
                    {buildingsListState && buildingsList.length > 0 && (
                      <div
                        className={`no-scrollbar relative flex h-full flex-col gap-1 overflow-auto bg-slate-50 p-2 shadow-lg `}
                      >
                        {buildingsList.map((building, index) => (
                          <button
                            className="flex justify-start border bg-white p-2 text-left text-sm hover:border-green-600 hover:bg-slate-100"
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
              </div>
              <div className="flex h-full flex-col justify-center">
                <button
                  className="z-40 flex h-fit w-auto items-center justify-end rounded-br-lg rounded-tr-lg bg-slate-50 bg-opacity-50 py-8 hover:bg-opacity-100"
                  onClick={() => {
                    console.log("Minimize Button Clicked");
                    setMinimized(!minimized);
                  }}
                >
                  <IoIosArrowBack size={30} className="text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default PathfindingModal;
