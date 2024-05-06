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

/* Components */
import Navigationbar from "./components/Navigationbar";
import Minimap from "./components/Minimap";

function Module360({ nodesDB, buildingsDB, extrasDB, loginType, infosDB }) {
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
      return null;
    }
  };

  /* States */

  // Building Modal State
  const [mode, setMode] = useState("360");

  // Minimap State
  const [mapButtonVisible, setMapButtonVisibility] = useState(true);

  // Yaw and Pitch States
  const [initialYaw, setYaw] = useState(getParams("yaw"));
  const [initialPitch, setPitch] = useState(getParams("pitch"));

  // Previous Scene State
  const [previous_Scene, setPrevious_Scene] = useState(nodesDB[0]);

  // Autoplay State
  const [autoplay, setAutoplay] = useState(false);

  // Select Curent Scene State
  const [select_Scene, setSelect_Scene] = useState(() => getScene());

  // Current Extras Popup State
  const [curr_Extras, setCurr_Extras] = useState(generateExtras);

  // Function to get the current scene based on the URL queries
  function getScene() {
    let curr_scene;
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
          setYaw(scene.hotspot[0].yaw);
          setPitch(scene.hotspot[0].pitch);
          curr_scene = scene;
          return scene;
        }
      });
    } else {
      curr_scene = nodesDB[0];
    }
    return curr_scene;
  }

  // Function to get URL parameters and set it as initial yaw and pitch
  function getParams(type) {
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
  useEffect(() => {
    const newUrl = `/app/${select_Scene.scene}?yaw=${initialYaw}&pitch=${initialPitch}`;
    navigate(newUrl);
  }, [initialPitch, initialYaw, select_Scene, navigate]);

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

  // Event listener for detecting device orientation
  useEffect(() => {
    function handleOrientationChange() {
      setZoomSettings(detectDeviceOrientation());
    }

    window.addEventListener("resize", handleOrientationChange);

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
    bldg: {
      color: "bg-green-500",
      type: [{ bldg: <FaBuilding className={icons_display_settings} /> }],
    },
    info: {
      color: "bg-orange-500",
      type: [
        { info: <FaInfo className={icons_display_settings} /> },
        {
          attraction: <PiBinocularsFill className={icons_display_settings} />,
        },
        { cafeteria: <FaCoffee className={icons_display_settings} /> },
        { batibot: <FaPeopleRoof className={icons_display_settings} /> },
        { farm: <LuWheat className={icons_display_settings} /> },
        { court: <TbSoccerField className={icons_display_settings} /> },
        { venue: <FaHotel className={icons_display_settings} /> },
      ],
    },
    popup: {
      color: "bg-blue-500",
      type: [
        { restroom: <FaRestroom className={icons_display_settings} /> },
        { handwash: <FaHandsWash className={icons_display_settings} /> },
        {
          construction: <MdEngineering className={icons_display_settings} />,
        },
      ],
    },
  };

  const icons = {
    // Icons for each type of overlay
    undefined: { icon: FaCircle, color: "gray" }, // ??
    washarea: { icon: FaHandsWash, color: "#3b82f6" }, // Popup Info
    restroom: { icon: FaRestroom, color: "#3b82f6" }, // Popup Info
    school_facilities: { icon: LuSchool, color: "#65a30d" }, // Bldg
    college_buildings: { icon: TbSchool, color: "#f97316" }, // Bldg
    cafeteria: { icon: FaCoffee, color: "#fbbf24" }, // info
    batibot: { icon: FaPeopleRoof, color: "#1e3a8a" }, // popup info
    attractions: { icon: PiBinocularsFill, color: "#a21caf" }, // info
    court: { icon: TbSoccerField, color: "#0e7490" }, // info
    parking: { icon: FaSquareParking, color: "#3b82f6" }, // popup
    farm: { icon: LuWheat, color: "#15803d" }, // info
    venue: { icon: FaHotel, color: "#fb7185" }, // info
    construction: { icon: MdEngineering, color: "#facc15" }, // popup
  };

  function getIcon(hotspotType, hotspotClass) {
    if (colorMap.hasOwnProperty(hotspotType)) {
      for (const data of colorMap[hotspotType].type) {
        if (data.hasOwnProperty(hotspotClass)) {
          return data[hotspotClass];
        }
      }
    }
  }

  // Refresh the hotspots when the scene changes
  useEffect(() => {
    if (viewerRef.current) {
      viewerRef.current.hotspot.refresh();
      setCurr_Extras(generateExtras());
    }
  }, [select_Scene]);

  /* Hotspot Actions */

  // Function that performs action based on type of Hotspot
  function action(type, target, index) {
    console.log("Action");
    if (type === "move") {
      console.log(">Moving to another node");
      changeScene(nodesDB, target);
    } else if (type === "bldg") {
      console.log(">Moving to building");
      changeScene(buildingsDB, target);
    } else if (type === "info") {
      console.log("Building Target: ", target);
      openModal(target, "360");
    } else {
      console.log("Display Extra's Image");
      setExtrasState(index);
    }
  }

  // Function that changes scene based on the hotspot target
  function changeScene(type, target) {
    setPrevious_Scene(select_Scene);
    for (const data of type) {
      if (data.scene === target) {
        console.log("Scene Match");
        setSelect_Scene(data);
      }
    }
  }

  /* Extras Hotspot */

  // Function to generate Extras
  function generateExtras() {
    // console.log("Generating Extras");
    const temp_extras = [];
    select_Scene.hotspot.map((hotspot, index) => {
      if (hotspot.type === "popup") {
        extrasDB.map((extras) => {
          if (extras.scene === hotspot.target) {
            const extrasFormat = {};
            extrasFormat["id"] = index;
            extrasFormat["scene"] = extras.scene;
            extrasFormat["image"] = extras.image;
            extrasFormat["text"] = extras.location;
            extrasFormat["state"] = false;
            temp_extras.push(extrasFormat);
          }
        });
      }
    });

    return temp_extras;
  }

  function setExtrasState(index) {
    // console.log("Setting Extras State");
    const newExtras = curr_Extras.map((extras) => {
      if (extras.id === index) {
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
    setTargetScene(target);
    setMode(mode);
    setBldgModalState(true);
  }

  /* Module360 Component */
  return (
    <div className="relative flex h-svh w-full items-center justify-center">
      {/* View360 Component */}
      <View360
        autoplay={autoplay ? { delay: 1000, speed: 0.5 } : false}
        onViewChange={handleViewChange}
        initialPitch={initialPitch}
        initialYaw={initialYaw}
        key={zoomSettings.min + autoplay}
        ref={viewerRef}
        projection={projection}
        style={{ width: "100%", height: "100svh", overflow: "hidden" }}
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
                  className={` view360-hotspot h-7 w-7 rounded-full md:h-14 md:w-14 ${colorMap[hotspot.type]?.color || "defaultcolor"} pointer-events-auto flex cursor-pointer items-center justify-center `}
                  data-yaw={hotspot.yaw}
                  data-pitch={hotspot.pitch}
                  onClick={() => {
                    action(hotspot.type, hotspot.target, index);
                  }}
                >
                  {/* Hotspot Icon */}
                  {getIcon(hotspot.type, hotspot.class)}

                  {hotspot.type === "popup" &&
                    curr_Extras.map((extras, index2) => {
                      if (extras.state === true && extras.id === index) {
                        return (
                          /* Pop Up info container */
                          <div
                            style={{ fontSize: "12px" }}
                            className="absolute -bottom-11 flex h-28 w-28 flex-col items-center gap-3 rounded-md bg-white p-1 shadow-2xl md:-bottom-11 md:h-48 md:w-60 md:gap-7"
                            key={index}
                          >
                            <img
                              src={extras.image}
                              className="h-9/16 w-16/9 flex items-center justify-center rounded-sm bg-cover bg-center bg-no-repeat"
                            />

                            {/* Hotspot Icon: Keep bottom value the opposite of the container 
                            IE: bottom-11 in Icon -bottom-11 for container */}
                            <div
                              className={` absolute bottom-11 h-7 w-7 rounded-full md:h-14 md:w-14 ${colorMap[hotspot.type].color} pointer-events-auto flex cursor-pointer items-center justify-center`}
                            >
                              {getIcon(hotspot.type, hotspot.class)}
                            </div>
                            {/* Hotspot Icon */}

                            {/* Text */}
                            <div
                              className="flex h-full w-full items-center justify-center text-center"
                              // DI MALIITAN FUKKKKKKKKKKKKKKKKKKKKKK
                              style={{
                                fontSize:
                                  window.innerWidth >= 768 ? "1rem" : "10px",
                              }}
                            >
                              {extras.text}
                            </div>
                          </div>
                          /* Pop Up info */
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
        {/* Navigation bar */}
        <div className="flex h-full w-full">
          <Navigationbar
            toggleAutoplay={() => setAutoplay(!autoplay)}
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
          />
        </div>
        {/* Navigation bar */}

        {/* Minimap */}
        <div className="absolute left-0 top-0 p-1 text-white ">
          <div className="relative flex flex-row justify-between">
            <div className="pb-2 pl-2 pt-16 md:pt-20">
              {mapButtonVisible && (
                <Minimap
                  x={select_Scene.coords.x}
                  y={select_Scene.coords.y}
                  previous_Scene={previous_Scene}
                />
              )}
            </div>
          </div>
        </div>
        {/* Minimap */}
        {/* Toggle Minimap */}
        <div className="absolute bottom-0 right-0  flex items-center justify-center pb-20 pr-2 sm:pb-20 sm:pr-2 md:pb-2 md:pr-2 lg:pb-2 lg:pr-2">
          <button
            className="shadow-2xl-inner rounded-full bg-gray-100 p-2 text-white drop-shadow-md"
            onClick={() => {
              setMapButtonVisibility(!mapButtonVisible);
            }}
          >
            {mapButtonVisible ? (
              <TbMap className="md:h-9/12 h-6 w-6 text-gray-500 md:w-full lg:h-10 lg:w-10" /> // Icon for hiding the map button  h-6 w-6 md:h-10 md:w-10
            ) : (
              <TbMapOff
                size={25}
                className="md:h-9/12 h-6 w-6 text-gray-500 md:w-full lg:h-10 lg:w-10"
              /> // Icon for showing the map button
            )}
          </button>
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
/* DEBUG PURPOSE
<div>Location: {select_Scene.scene}</div>
<div>Source: {select_Scene.image}</div>



*/
