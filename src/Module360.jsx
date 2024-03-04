import "./components/view360.css";
import View360, {
  EquirectProjection,
  ControlBar,
  LoadingSpinner,
} from "@egjs/react-view360";
import React, { useMemo, useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import nodesData from "./database/Nodes.json";
import buildingsData from "./database/Buildings.json";
import Navigationbar from "./360components/Navigationbar";
import MapButton from "./360components/MapButton";
import clsx from "clsx";
import { MdMyLocation } from "react-icons/md";
import { MdLocationSearching } from "react-icons/md";

function Module360() {
  const navigate = useNavigate();
  const [mapButtonVisible, setMapButtonVisible] = useState(true);

  /* Dynamic URL Parameters */
  const url = new URLSearchParams(window.location.search); // Get URL

  const node = /\bnode\d+\b/; // Regex for filtering node

  const id = useParams(); // Get URL parameters

  const target = id["*"]; // Take the string after /app/ as target

  const isNode = node.test(target); // Check if the string passes the regex

  /* Building Data */

  function isBuilding(target) {
    for (const data of buildingsData.buildings) {
      if (data.scene === target) {
        return true;
      }
    }
    return false;
  }

  // Setting initial yaw and pitch based on URL parameters
  const [initialYaw, setYaw] = useState(getParams("yaw"));

  const [initialPitch, setPitch] = useState(getParams("pitch"));

  const [previous_Scene, setPrevious_Scene] = useState(nodesData.nodes[0]);

  console.log(previous_Scene.coords.x, previous_Scene.coords.y);

  // Setting scene based on URL parameters
  const [select_Scene, setSelect_Scene] = useState(() => {
    let curScene = {};
    // If the URL parameters are a node, set the scene to the target
    if (isNode) {
      for (const scene of nodesData.nodes) {
        if (scene.scene === target) {
          curScene = scene;
          return curScene;
        }
      }
      console.log("No Scene Found");
      return nodesData.nodes[0];
    } else if (isBuilding(target)) {
      for (const scene of buildingsData.buildings) {
        if (scene.scene === target) {
          setYaw(scene.hotspot[0].yaw);
          setPitch(scene.hotspot[0].pitch);
          curScene = scene;
          return curScene;
        }
      }
      console.log("No Scene Found");
      return nodesData.nodes[0];
    }
    return nodesData.nodes[0];
  });

  function action(type, target) {
    if (type === "move") {
      console.log(">Moving to another node");
      changeScene(nodesData.nodes, target);
    } else if (type === "bldg") {
      console.log(">Moving to building");
      changeScene(buildingsData.buildings, target);
    } else {
      console.log(">Displaying information");
    }
  }

  // Setting autoplay state, false as a default state
  const [autoplay, setAutoplay] = useState(false); // Define autoplay state

  // Function to get URL parameters and set it as initial yaw and pitch
  function getParams(type) {
    const yaw = url.get("yaw") === true ? url.get("yaw") : 0; // check if yaw is Undefined || null || NaN
    const pitch = url.get("pitch") === true ? url.get("pitch") : 0; // check if pitch is Undefined || null || NaN
    if (isNode || isBuilding(target)) {
      if (type === "yaw") {
        return yaw;
      } else if (type === "pitch") {
        return pitch;
      } else {
        return 0;
      }
    }
  }

  // Timeout reference during update for yaw and pitch
  const timeoutRef = useRef(null);

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

  /* Push State to URL */

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
    if (window.innerHeight > window.innerWidth) {
      console.log("Portrait mode");
    } else if (window.innerHeight < window.innerWidth) {
      console.log("Landscape mode");
    }

    function handleOrientationChange() {
      setZoomSettings(detectDeviceOrientation());
    }

    window.addEventListener("resize", handleOrientationChange);

    return () => {
      window.removeEventListener("resize", handleOrientationChange);
    };
  }, []);

  /* View360 component */

  // Ref for the viewer
  const viewerRef = useRef(null);

  // Create a new projection based on the selected scene
  const projection = useMemo(
    () =>
      new EquirectProjection({
        src: select_Scene.image,
      }),
    [select_Scene.image]
  );

  // Create plugins for the viewer
  const plugins = useMemo(
    () => [
      new ControlBar({
        className: "custom-controlbar",
        pieView: {
          resetCamera: { zoom: zoomSettings.min },
        },
        fullscreenButton: false,
        gyroButton: { position: ControlBar.POSITION.TOP_LEFT, order: 1 },
      }),
      new LoadingSpinner(),
    ],
    [zoomSettings.min]
  );

  // Function that changes scene based on the hotspot target
  function changeScene(type, target) {
    setPrevious_Scene(select_Scene);
    for (const data of type) {
      if (data.scene === target) {
        setSelect_Scene(data);
      }
    }
  }

  // Refresh the hotspots when the scene changes
  useEffect(() => {
    if (viewerRef.current) {
      viewerRef.current.hotspot.refresh();
    }
  }, [select_Scene]);

  /* Map Button */

  // Function for navigating to the map
  function changetoMap() {
    //navigate("/map");
  }

  /* Autoplay Toggle */
  function toggleAutoplay() {
    setAutoplay(!autoplay);
  }

  // Function for toggling the visibility of the map button
  function toggleMapButtonVisibility() {
    setMapButtonVisible(!mapButtonVisible);
  }

  /* Component Return */
  return (
    <div className="min-h-screen flex items-center justify-center relative w-full">
      <View360
        autoplay={autoplay ? { delay: 1000, speed: 0.5 } : false}
        onViewChange={handleViewChange}
        initialPitch={initialPitch}
        initialYaw={initialYaw}
        key={zoomSettings.min + autoplay}
        ref={viewerRef}
        projection={projection}
        style={{ width: "100%", height: "100vh", overflow: "hidden" }}
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
        <div className="view360-hotspots">
          {select_Scene.hotspot.map((hotspot) => (
            <div
              key={hotspot.id * 100}
              className={clsx("view360-hotspot", {
                move: hotspot.type === "move",
                bldg: hotspot.type === "bldg",
                info: hotspot.type === "info",
              })}
              data-yaw={hotspot.yaw}
              data-pitch={hotspot.pitch}
              style={{ width: "10%", paddingBottom: "10%" }}
              onClick={() => action(hotspot.type, hotspot.target)}
            ></div>
          ))}
        </div>
        <div className="flex w-full h-full">
          <Navigationbar
            toggleAutoplay={toggleAutoplay}
            location={select_Scene.location}
          />
        </div>

        <div className="absolute top-0 left-0 p-1 text-white ">
          <div className="relative flex flex-row justify-between">
            <div className="pt-20 pb-2 pl-2">
              {mapButtonVisible && (
                <MapButton
                  x={select_Scene.coords.x}
                  y={select_Scene.coords.y}
                  onClick={() => changetoMap()}
                  previous_Scene={previous_Scene}
                />
              )}
            </div>
          </div>
        </div>
        <div className="absolute flex items-center w-25 h-25  justify-center bottom-0 right-0 pr-2 pb-20 sm:pr-2 sm:pb-20 md:pr-2 md:pb-2 lg:pr-2 lg:pb-2">
          <button
            className="text-white bg-gray-100 rounded-full p-2 shadow-2xl-inner"
            onClick={toggleMapButtonVisibility}
          >
            {mapButtonVisible ? (
              <MdMyLocation size={25} className="text-gray-500" /> // Icon for hiding the map button
            ) : (
              <MdLocationSearching size={25} className="text-gray-500" /> // Icon for showing the map button
            )}
          </button>
        </div>
      </View360>
      {/* Button to toggle map button visibility */}

      <div className="absolute items-center justify-center flex text-white text-xl">
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
