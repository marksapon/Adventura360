/* Library */
import React, { useMemo, useState, useEffect, useRef } from "react"; // React Hooks
import { useParams, useNavigate } from "react-router-dom"; // React Dom Hooks
import "./view360.css"; // View360 Default CSS
import View360, {
  EquirectProjection,
  ControlBar,
  LoadingSpinner,
} from "@egjs/react-view360"; //View360 Library

/* Icons */
import { FaBuilding } from "react-icons/fa"; // Building Icon (building)
import { FaInfo } from "react-icons/fa"; // Info Icon (info)
import { FaRestroom } from "react-icons/fa"; // Restroom Icon (comfort)
import { FaHandsWash } from "react-icons/fa"; // Hand Wash Icon (comfort)
import { PiBinocularsFill } from "react-icons/pi"; // Attraction Icon
import { FaHotel } from "react-icons/fa"; // Venue Icon
import { FaPeopleRoof } from "react-icons/fa6"; // Batibot Icon
import { LuWheat } from "react-icons/lu"; // Farm Icon
import { FaCoffee } from "react-icons/fa"; // Cafeteria
import { TbSoccerField } from "react-icons/tb"; // Court Icon
import { MdEngineering } from "react-icons/md"; // Construction Icon
import { LuSchool } from "react-icons/lu"; // School Facilities Icon
import { TbSchool } from "react-icons/tb"; // College Buildings Icon
import { FaSquareParking } from "react-icons/fa6"; // Parking Lot Icon
import { FaCircle } from "react-icons/fa6"; // Undefined Icon

import { TbMap } from "react-icons/tb"; // Minimap On Icon
import { TbMapOff } from "react-icons/tb"; // Minimap Off Icon

import { TbDoorExit } from "react-icons/tb"; // Exit inside the building Icon

/* Components */
import Navigationbar from "./components/Navigationbar";
import VN from "../VNmodule/VN"; // VN Module

function Module360({
  nodesDB,
  buildingsDB,
  extrasDB,
  loginType,
  infosDB,
  internalDB,
  eventsDB,
  charactersDB,
}) {
  /* Event */
  class Event {
    constructor(scene, dialogue, character) {
      this.scene = scene;
      this.dialogue = dialogue;
      this.character = character;
    }
  }

  // Generate All Events Class
  function generateEvents() {
    const events = [];

    eventsDB.forEach((event) => {
      events.push(new Event(event.scene, event.dialogue, event.character));
    });

    return events;
  }

  const events = generateEvents(); // Generate Events Classes

  const [events_available, setEventsAvailable] = useState(events); // Available Events

  const [event_done, setEventDone] = useState([]); // Events Done

  const [tourState, setTourState] = useState(false); // Tour State

  const events_copy = events_available; // Copy of Events Available

  function checkEvent(scene, tour = false) {
    // console.log("Checking Event:", scene);

    let result = false;

    if (tour) {
      // console.log("Checking Event TOUR STATE");
      // console.log("Events Done:", event_done);
      for (const event of event_done) {
        if (event === scene) {
          // console.log("EVENT FOUND:", scene);
          result = true;
        }
      }
    } else {
      // console.log("Checking Event NORMAL STATE");
      for (const event of events_available) {
        if (event.scene === scene) {
          // console.log("EVENT FOUND:", scene);
          result = true;
        }
      }
    }

    return result;
  }

  class Extras {
    constructor(index, scene, image, location, desc) {
      this.id = index;
      this.scene = scene;
      this.image = image;
      this.location = location;
      this.desc = desc;
      this.state = false;
    }
  }

  class Internal {
    constructor(scene, location, image, coords, hotspot) {
      this.scene = scene;
      this.location = location;
      this.image = image;
      this.coords = coords;
      this.hotspot = hotspot;
    }
  }

  /* Getting URL Queries */

  const url = new URLSearchParams(window.location.search); // Get URL
  const target = useParams()["*"]; // Take the target query from URL

  // Function to identify if the target query is a node or building
  const targetType = (target) => {
    const node = /\bnode\d+\b/; // Regex for filtering node

    // Check if the target is a node or building
    if (node.test(target)) {
      return "node";
    } else {
      for (const data of buildingsDB) {
        if (data.scene === target) {
          return "building";
        }
      }
      for (const data of internalDB) {
        if (data.hasOwnProperty(target)) {
          return "inside";
        }
      }
      return null;
    }
  };

  /* States */

  // Access State
  const [access, setAccess] = useState("public"); // Access for Internal Nodes

  // Building Modal State
  const [mode, setMode] = useState("360");

  // Back Button State
  const [backButton, setBackButton] = useState(false);

  // Yaw and Pitch States
  const [initialYaw, setYaw] = useState(getParams("yaw"));
  const [initialPitch, setPitch] = useState(getParams("pitch"));

  // Previous Scene State
  const [previous_Scene, setPrevious_Scene] = useState(); // Remove the default previous scene

  // Autoplay State
  const [autoplay, setAutoplay] = useState(false);

  // Inside State
  const [status, setStatus] = useState(""); // Status State

  // Select Curent Scene State
  const [select_Scene, setSelect_Scene] = useState(() => getScene());

  // Current Internal Type Active
  const [curr_Internal, setCurr_Internal] = useState([]);
  const [curr_InternalExtras, setCurr_InternalExtras] = useState([]);

  // Last Building State
  const [insideBuilding, setInsideBuilding] = useState("");

  // Current Extras Popup State
  const [curr_Extras, setCurr_Extras] = useState(generateExtras);

  // Map State
  const [mapState, setMapState] = useState("mini"); // Map State

  // VN State
  const [firstTime, setFirstTime] = useState(isFirstTime()); // First Time State
  const [eventList, setEventList] = useState([]); // Event List State
  const [vnState, setVNState] = useState(false); // VN State

  useEffect(() => {
    console.log("Map State:", mapState);
  }, [mapState]);

  function findDefaultNode() {
    const default_node = nodesDB.find((node) => {
      return node.scene === "node1";
    });
    return default_node;
  }

  // Function to get the current scene based on the URL queries
  function getScene() {
    let curr_scene;
    if (access !== "private") {
      // If the URL parameters are a node, set the scene to the target
      if (targetType(target) === "node") {
        nodesDB.filter((scene) => {
          if (scene.scene === target) {
            curr_scene = scene;
            return curr_scene;
          }
        });
      } else if (targetType(target) === "building") {
        buildingsDB.filter((scene) => {
          if (scene.scene === target) {
            setBackButton(true);
            setStatus("outside");

            setYaw(scene.hotspot[0].yaw);
            setPitch(scene.hotspot[0].pitch);
            curr_scene = scene;
          }
        });
      } else {
        curr_scene = findDefaultNode();
      }
      return curr_scene;
    } else {
      curr_scene = findDefaultNode();
    }
    return curr_scene;
  }

  // Function to get URL parameters and set it as initial yaw and pitch
  function getParams(type) {
    if (access !== "private") {
      const yawValue = Number(url.get("yaw"));
      const yaw = isNaN(yawValue) ? 0 : yawValue; // check if yaw is Undefined || null || NaN
      const pitchValue = Number(url.get("pitch"));
      const pitch = isNaN(pitchValue) ? 0 : pitchValue; // check if pitch is Undefined || null || NaN
      if (targetType(target)) {
        if (type === "yaw") {
          return yaw;
        } else if (type === "pitch") {
          return pitch;
        } else {
          return 0;
        }
      }
    }
  }

  /* Dynamic URL */

  // Timeout reference during update for yaw and pitch
  const navigate = useNavigate(); // Navigate Hook
  const timeoutRef = useRef(null); // Timeout Ref

  // Function that triggers when the view changes and updates the yaw and pitch
  const handleViewChange = (e) => {
    const { yaw, pitch } = e;

    // Clear the timeout if it exists
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set the timeout to update the yaw and pitch
    timeoutRef.current = setTimeout(() => {
      setYaw(yaw.toFixed(2));
      setPitch(pitch.toFixed(2));
    }, 200);
  };

  // Update the URL based on the initial yaw and pitch
  // need to remove private after testing
  useEffect(() => {
    if (access !== "public" || access !== "private") {
      const newUrl = `/app/${select_Scene.scene}?yaw=${initialYaw}&pitch=${initialPitch}`;
      navigate(newUrl);
    }
  }, [initialPitch, initialYaw, select_Scene, navigate, curr_Internal, access]);

  /* Zoom Settings */

  // Set zoom settings based on the device orientation
  const [zoomSettings, setZoomSettings] = useState(detectDeviceOrientation());

  // Function for setting zoom settings
  function detectDeviceOrientation() {
    if (window.innerHeight > window.innerWidth) {
      return { min: 1.5, max: 3 };
    } else if (window.innerHeight < window.innerWidth) {
      return { min: 1, max: 3 };
    } else {
      return { min: 1, max: 3 }; // default return value
    }
  }

  function isFirstTime() {
    if (sessionStorage.getItem("isFirst") === null) {
      return true;
    } else {
      return false;
    }
  }

  // Event listener for detecting device orientation
  useEffect(() => {
    function handleOrientationChange() {
      setZoomSettings(detectDeviceOrientation());
    }

    window.addEventListener("resize", handleOrientationChange);

    sessionStorage.setItem("isFirst", "false");

    setFirstTime(false);

    return () => {
      window.removeEventListener("resize", handleOrientationChange);
    };
  }, []);

  /* View360 Core Functionality */

  const viewerRef = useRef(null); // View360 Ref

  // View360 Projection based on the selected scene
  const projection = useMemo(
    () =>
      new EquirectProjection({
        src: select_Scene.image,
      }),
    [select_Scene.image],
  );

  // View360 Plugins
  const plugins = useMemo(
    () => [
      new ControlBar({
        className: "custom-controlbar",
        pieView: {
          resetCamera: { zoom: zoomSettings.min },
          order: 1,
          position: ControlBar.POSITION.TOP_RIGHT,
        },
        fullscreenButton: false,
        gyroButton: {
          order: 2,
          position: ControlBar.POSITION.TOP_RIGHT,
        },
        vrButton: {
          position: ControlBar.POSITION.TOP_RIGHT,
          order: 3,
        },
      }),
      new LoadingSpinner(),
    ],
    [zoomSettings.min],
  );

  /* Hotspot Settings */

  const icons_display_settings = "text-white md:h-7 md:w-7"; // Icon size and color settings

  const colorMap = {
    bldg: "bg-green-500",
    info: "bg-orange-500",
    popup: "bg-blue-500",
  };

  const icons = {
    undefined: { icon: FaCircle, color: "gray", color_tailwind: "bg-gray-500" },
    washarea: {
      icon: FaHandsWash,
      color: "#3b82f6",
      color_tailwind: "bg-blue-600",
    },
    restroom: {
      icon: FaRestroom,
      color: "#3b82f6",
      color_tailwind: "bg-blue-600",
    },
    school_facilities: {
      icon: LuSchool,
      color: "#65a30d",
      color_tailwind: "bg-lime-600",
    },
    college_buildings: {
      icon: TbSchool,
      color: "#f97316",
      color_tailwind: "bg-orange-600",
    },
    cafeteria: {
      icon: FaCoffee,
      color: "#fbbf24",
      color_tailwind: "bg-yellow-500",
    },
    batibot: {
      icon: FaPeopleRoof,
      color: "#1e3a8a",
      color_tailwind: "bg-blue-900",
    },
    attractions: {
      icon: PiBinocularsFill,
      color: "#a21caf",
      color_tailwind: "bg-purple-600",
    },
    court: {
      icon: TbSoccerField,
      color: "#0e7490",
      color_tailwind: "bg-teal-600",
    },
    parking: {
      icon: FaSquareParking,
      color: "#3b82f6",
      color_tailwind: "bg-red-600",
    },
    farm: { icon: LuWheat, color: "#15803d", color_tailwind: "bg-green-700" },
    venue: { icon: FaHotel, color: "#fb7185", color_tailwind: "bg-pink-500" },
    construction: {
      icon: MdEngineering,
      color: "#facc15",
      color_tailwind: "bg-yellow-400",
    },
    bldg: {
      icon: FaBuilding,
      color: "#10b981",
      color_tailwind: "bg-green-500",
    },
    info: { icon: FaInfo, color: "#f97316", color_tailwind: "bg-orange-500" },
  };

  function getIcon(hotspotClass) {
    if (icons.hasOwnProperty(hotspotClass)) {
      const Icon = icons[hotspotClass].icon;
      return <Icon className={icons_display_settings} />;
    }
  }

  // Refresh the hotspots when the scene changes
  useEffect(() => {
    if (viewerRef.current) {
      viewerRef.current.hotspot.refresh();

      setCurr_Extras(generateExtras());
    }
  }, [select_Scene, curr_Internal]);

  useEffect(() => {
    if (firstTime) {
      eventHandler(select_Scene.scene);
    } else if (checkEvent(select_Scene.scene)) {
      eventHandler(select_Scene.scene);
    }
  }, [select_Scene]);

  /* Hotspot Actions */

  // Function that performs action based on type of Hotspot
  function action(type, target, index) {
    // console.log("Action");
    // console.log("Access Type:", access);

    if (type === "move") {
      // console.log(">Moving to another node");
      if (access === "private") {
        // console.log("Moving to Internal Node");

        changeScene(curr_Internal, target); // Change Scene inside when access is private
      } else {
        changeScene(nodesDB, target); // Default Change Scene
      }
    } else if (type === "bldg") {
      // console.log(">Moving to building"); // Move to Building

      setBackButton(true);

      setStatus("outside"); // Can be merged into one

      changeScene(buildingsDB, target); // Change Scene
    } else if (type === "info") {
      // console.log("Building Target: ", target);

      openModal(target, "360");
    } else if (type === "popup") {
      // console.log("Display Extra's Image");

      setExtrasState(index);
    } else if (type === "inside") {
      // console.log("Inside Building");

      internalDB.map((internal) => {
        // console.log("Internal:", internal);

        if (internal.hasOwnProperty(target)) {
          // console.log("Moving to Internal Node");

          setInsideBuilding(target);

          restructureInternalNodes(internal[target], target);

          // console.log("Internal Extras:", internal[`${target}_extras`]);

          if (internal[`${target}_extras`]) {
            setCurr_InternalExtras(internal[`${target}_extras`]);
          }
        }
      });
    }
  }

  function restructureInternalNodes(array) {
    const temp = [];

    array.map((data) => {
      const temp_internal = new Internal(
        data.scene,
        data.location,
        data.image,
        data.coords ? data.coords : select_Scene.coords,
        data.hotspot,
      );
      temp.push(temp_internal);
    });

    setStatus("inside");
    setCurr_Internal(temp);
    setBackButton(true);
    changeScene(temp, temp[0].scene);
  }

  // Function that changes scene based on the hotspot target
  function changeScene(type, target) {
    // console.log("Changing Scene");
    // console.log("Type:", type, "Target:", target);

    if (access !== "private" && status !== "outside") {
      // Can be used to check only if the access is
      // console.log("Setting Previous Scene:", isOutside);
      setPrevious_Scene(select_Scene);
    }

    // console.log("Previous Scene:", previous_Scene);

    for (const data of type) {
      if (data.scene === target) {
        // console.log("Scene Match");
        setSelect_Scene(data);
      }
    }
  }

  useEffect(() => {
    console.log("Access Type:", access);
    console.log("Status:", status);
  }, [status, access]);

  useEffect(() => {
    console.log("Previous Scene:", previous_Scene);
  }, [previous_Scene]);

  /* Extras Hotspot */

  // Function to generate Extras
  function generateExtras() {
    // console.log("Generating Extras");

    const temp_extras = [];

    if (select_Scene && select_Scene.hotspot) {
      select_Scene.hotspot.forEach((hotspot, index) => {
        if (hotspot.type === "popup") {
          if (status === "inside") {
            curr_InternalExtras.forEach((extras) => {
              if (extras.scene === hotspot.target) {
                const extrasFormat = {
                  id: index,
                  scene: extras.scene,
                  location: extras.location,
                  image: extras.image ? extras.image : null,
                  desc: extras.desc,
                  state: false,
                };
                temp_extras.push(extrasFormat);
              }
            });
          } else {
            extrasDB.forEach((extras) => {
              if (extras.scene === hotspot.target) {
                const extrasFormat = new Extras(
                  index,
                  extras.scene,
                  extras.image,
                  extras.location,
                  extras.desc,
                );
                temp_extras.push(extrasFormat);
              }
            });
          }
        }
      });
    }

    return temp_extras;
  }

  function setExtrasState(index) {
    // console.log("Setting Extras State");
    const newExtras = curr_Extras.map((extras) => {
      if (extras.id === index) {
        eventHandler(extras.scene);

        return {
          ...extras,
          state: !extras.state,
        };
      }
      return extras;
    });

    setCurr_Extras(newExtras);
  }

  /* Building Modal State */
  const [bldgModalState, setBldgModalState] = useState(false); // Building Modal State
  const [targetScene, setTargetScene] = useState(""); // Target Scene for Building Modal

  // Trigger Building Modal Function
  function openModal(target, mode) {
    // console.log("Opening Modal", target);
    setTargetScene(target);
    setMode(mode);
    setBldgModalState(true);
  }

  /* Event List */

  useEffect(() => {
    console.log("Map State:", mapState);
  }, [mapState]);

  // useEffect(() => {
  //   console.log("Event List:", eventList);
  // }, [eventList]);

  /* VN Component */
  function eventHandler(scene, tour = false) {
    // console.log("Event Handler");

    function getEvent(scene) {
      // console.log("Getting Event");

      if (tour) {
        console.log("Getting Event TOUR STATE");
        console.log("Event Done:", event_done);
        for (const event of event_done) {
          if (event === scene) {
            console.log("Event Found Completed:", scene);
            setEventList((prev) => Array.from(new Set([...prev, scene])));
          }
        }
      } else {
        // console.log("Normal State");
        for (const event of events_available) {
          if (event.scene === scene) {
            setEventList((prev) => Array.from(new Set([...prev, scene])));
          }
        }
      }
    }

    if (firstTime) {
      // console.log("First Time Event");
      setEventList((prev) => [...prev, "intro"]);

      if (checkEvent(scene, tour)) {
        getEvent(scene);
      }

      // console.log("Displaying VN");

      setVNState(true);
    } else {
      // console.log("Normal Event");
      if (checkEvent(scene, tour)) {
        getEvent(scene);
      }

      // console.log("Displaying VN");
      setVNState(true);
    }
  }

  function returnFunction() {
    // console.log("Going Back");

    // if inside the building set the access back to public and change the scene back to the scene of building.
    setStatus("outside");

    setAccess("public");

    let temp = false;

    for (const data of buildingsDB) {
      if (data.scene === insideBuilding) {
        temp = true;
      }
    }

    if (temp) {
      changeScene(buildingsDB, insideBuilding);
    } else {
      setSelect_Scene(previous_Scene);
      setStatus();
      setAccess("public");
      setBackButton(false);
    }
  }

  function exitFunction() {
    // console.log("Current Scene:", select_Scene);
    if (previous_Scene) {
      setSelect_Scene(previous_Scene);
    } else {
      changeScene(nodesDB, select_Scene.back[0]);
    }

    setStatus();
    setAccess("public");
    setBackButton(false);
  }

  /* Module360 Component */
  return (
    <div className="relative flex h-dvh w-screen items-center justify-center">
      {/* View360 Component */}
      <View360
        autoplay={autoplay ? { delay: 1000, speed: 0.5 } : false}
        onViewChange={handleViewChange}
        initialPitch={initialPitch}
        initialYaw={initialYaw}
        key={zoomSettings.min + autoplay}
        ref={viewerRef}
        projection={projection}
        style={{
          height: "100%",
          width: "100%",
          overflow: "hidden",
        }}
        plugins={plugins}
        pitchRange={{ min: -40, max: 40 }}
        initialZoom={zoomSettings.min}
        zoomRange={zoomSettings}
        hotspot={{ zoom: true }}
        scrollable={false}
        rotate={{
          duration: 1000,
          pointerScale: [2, 1],
          keyboardScale: [2, 1],
        }}
        zoom={{
          duration: 1000,
        }}
      >
        {/* Hotspots */}
        <div className="view360-hotspots">
          {select_Scene.hotspot.map((hotspot, index) => {
            if (hotspot.type === "move") {
              return (
                <div
                  key={index}
                  className={`view360-hotspot pointer-events-auto cursor-pointer bg-contain bg-center bg-no-repeat opacity-80 transition-opacity duration-200`}
                  data-yaw={hotspot.yaw}
                  data-pitch={hotspot.pitch}
                  style={{
                    backgroundImage:
                      'url("/assets/360 Module/buttons/move.png")',
                    width: "10%",
                    paddingBottom: "10%",
                  }}
                  onClick={() => action(hotspot.type, hotspot.target)}
                />
              );
            } else {
              return (
                // Add the key prop here
                <div
                  key={index}
                  className={` view360-hotspot h-7 w-7 rounded-full md:h-14 md:w-14 ${colorMap[hotspot.type] || "defaultcolor"} pointer-events-auto flex cursor-pointer items-center justify-center `}
                  data-yaw={hotspot.yaw}
                  data-pitch={hotspot.pitch}
                  onClick={() => {
                    action(hotspot.type, hotspot.target, index);
                  }}
                >
                  {/* Hotspot Icon */}
                  {getIcon(hotspot.class)}

                  {hotspot.type === "popup" &&
                    curr_Extras.map((extras, index2) => {
                      if (extras.state === true && extras.id === index) {
                        // console.log("Extras:", extras.image);
                        return (
                          <div
                            className="absolute flex h-fit w-40 items-center justify-center rounded-md bg-white md:w-72"
                            key={index2}
                          >
                            <div className="grid h-fit w-full grid-rows-2">
                              {/* IMAGE */}
                              {extras.image && (
                                <div className="flex  w-full flex-col items-center justify-center">
                                  <img
                                    src={extras.image}
                                    className="flex h-32 w-full items-center justify-center rounded-t-md object-cover shadow-md"
                                  />
                                </div>
                              )}
                              {/* Content */}
                              <div
                                className="= relative mt-3 flex h-full w-full flex-col items-center overflow-hidden"
                                key={index2}
                              >
                                {/* TEXT */}
                                <div className="flex-shrink-1 font-roboto flex h-auto w-full items-center justify-center px-4 text-center text-xs font-semibold text-green-500 md:h-16 md:text-lg">
                                  {extras.location}
                                </div>
                                <div
                                  className={`flex-shrink-1 font-roboto text-2xs w-full flex-wrap items-start justify-center px-2 text-center font-thin md:text-xs`}
                                >
                                  {extras.desc}
                                </div>
                              </div>
                            </div>
                            {/* ICON */}
                            <div
                              className={`absolute z-10 flex h-full w-full ${extras.image ? "items-center" : "items-end p-2"} justify-center`}
                            >
                              <div
                                className={`h-7 w-7 rounded-full border-2 md:h-14 md:w-14 ${colorMap[hotspot.type] || "defaultcolor"} pointer-events-auto flex cursor-pointer items-center justify-center`}
                              >
                                {getIcon(hotspot.class)}
                              </div>
                            </div>
                          </div>
                        );
                      }
                      return null; // return null when extras.state is not true
                    })}
                </div>
              );
            }
          })}
        </div>
        {/* Hotspots */}

        {/* UI */}
        <div className="flex h-full w-full">
          <Navigationbar
            toggleAutoplay={() => setAutoplay(!autoplay)}
            autoplay={autoplay}
            location={select_Scene}
            buildingsDB={buildingsDB}
            nodesDB={nodesDB}
            extrasDB={extrasDB}
            infosDB={infosDB}
            loginType={loginType}
            openModal={openModal}
            bldgModalState={bldgModalState}
            targetScene={targetScene}
            onBldgModalClose={() => setBldgModalState(false)}
            iconSet={icons}
            mode={mode}
            changeScene={action}
            access={access}
            setAccess={setAccess}
            internalDB={internalDB}
            mapState={mapState}
            setMapState={setMapState}
            status={status}
            setPrevious_Scene={setPrevious_Scene}
            eventHandler={eventHandler}
            setTourState={setTourState}
            select_Scene={select_Scene}
            exitFunction={exitFunction}
          />
        </div>

        {/* Go Back Button */}
        {status === "inside" && (
          <div className=" relative z-0 flex items-center justify-center">
            <button
              type="button"
              onClick={() => returnFunction()}
              className={`absolute mb-48 flex w-auto items-center justify-center gap-x-2 rounded-2xl bg-orange-400 px-5 py-2 text-sm text-white drop-shadow-md transition-colors duration-200 hover:bg-orange-300 sm:mb-48 md:mb-20 lg:mb-16 `}
            >
              <TbDoorExit className="flex h-5 w-5 items-center justify-center md:h-8 md:w-8" />
              <div className="flex items-center justify-center">
                <span className="flex items-center justify-center text-center font-sans text-base font-semibold md:text-xl">
                  Exit Place
                </span>
              </div>
            </button>
          </div>
        )}

        {/* Visual Novel */}
        {vnState && (
          <VN
            charactersDB={charactersDB}
            eventsDB={eventsDB}
            setVNState={setVNState}
            eventList={eventList}
            setEventList={setEventList}
            setEventsAvailable={setEventsAvailable}
            events_available={events_copy}
            event_done={event_done}
            setEventDone={setEventDone}
            setTourState={setTourState}
            tourState={tourState}
          />
        )}

        {/* <div className="absolute bottom-0 left-0 z-20 m-2 text-white">
          <div>Location: {select_Scene.scene}</div>
          <div>Source: {select_Scene.image}</div>
        </div> */}

        {/* Minimap */}
        {/* Toggle Minimap */}
        <div className="pointer-events-auto absolute bottom-0  right-0 flex items-center justify-center pb-32 pr-2 sm:pb-20 sm:pr-2 md:pb-2 md:pr-2 lg:pb-2 lg:pr-2">
          <div className="group relative inline-block">
            <div className="absolute right-full top-1/2 mr-2 w-32 -translate-y-1/2 transform rounded-lg bg-white px-3 py-2 text-center font-sans text-sm font-semibold text-gray-500 opacity-0 transition duration-200 ease-in-out group-hover:opacity-100">
              Toggle Minimap
            </div>
            <button
              className={`flex h-12 w-12 transform items-center justify-center rounded-full border-2 border-transparent ${mapState === "mini" ? "bg-green-500" : "bg-white"} p-2 transition-transform duration-500 ease-in-out hover:scale-110 ${mapState === "mini" ? "hover:border-white" : "hover:border-green-500"}`}
              onClick={() => {
                mapState === "mini" ? setMapState("hide") : setMapState("mini");
              }}
            >
              {mapState === "mini" ? (
                <TbMap className="md:h-9/12 h-6 w-6 text-white md:w-full lg:h-10 lg:w-10" /> // Icon for hiding the map button  h-6 w-6 md:h-10 md:w-10
              ) : (
                <TbMapOff
                  size={25}
                  className="md:h-9/12 h-6 w-6 text-gray-500 md:w-full lg:h-10 lg:w-10"
                /> // Icon for showing the map button
              )}
            </button>
          </div>
        </div>

        {/* Toggle Minimap */}
        {/* UI */}
      </View360>
      {/* View360 Component */}

      <div className="absolute flex items-center justify-center text-xl text-white">
        +
      </div>
    </div>
  );
}

export default Module360;
