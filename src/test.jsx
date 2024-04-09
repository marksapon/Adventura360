/* React Hooks */
import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
/* Map Module Components */
import FilterList from "./components/FilterList"; // Overlay Filter Component
import Pathfinding from "./components/Pathfinding"; // Pathfinding Component
import PathfindingModal from "./components/PathfindingModal"; // Pathfinding Modal Component
/* OSD Component */
import OpenSeadragon from "openseadragon";
/* OSD CSS */
import { BsFilterRight } from "react-icons/bs"; // Filter Button
import { RiAccountPinCircleLine } from "react-icons/ri"; // Current Location
import { GiPathDistance } from "react-icons/gi"; // Path finding Button
import { ImLocation } from "react-icons/im"; // Current Location Off Button
import { ImLocation2 } from "react-icons/im"; // Current Location On Button
/* Overlay Icons */
import { FaRestroom } from "react-icons/fa"; // Restroom Icon
import { FaHandsWash } from "react-icons/fa"; // Hand Wash Icon
import { LuSchool } from "react-icons/lu"; // School Facilities Icon
import { TbSchool } from "react-icons/tb"; // College Buildings Icon
import { GrCafeteria } from "react-icons/gr"; // Cafeteria Icon
import { FaPeopleRoof } from "react-icons/fa6"; // Batibot Icon
import { PiBinocularsDuotone } from "react-icons/pi"; // School Attraction Icon
import { GiAbstract068 } from "react-icons/gi"; // Court Icon
import { FaSquareParking } from "react-icons/fa6"; // Parking Lot Icon
import { FaHotel } from "react-icons/fa"; // Venue Icon
import { FaCircle } from "react-icons/fa6"; // Undefined Icon

const MapModule = ({ currLoc }) => {
  /* OpenSeadragon Viewer */
  const osdRef = useRef(); // Reference to the OSD element
  const [osdLoaded, setOsdLoaded] = useState(false); // If OSD is loaded
  const [viewer, setViewer] = useState(null); // OSD Viewer

  

  /* Current Location */
  const location = new OpenSeadragon.Point(currLoc.x, currLoc.y); // Current Point Location
  const [checkCenter, setCheckCenter] = useState(true); // Check if user view is in the current location

  /* Overlays */
  const data = [
    // Sample Data
    {
      x: 0.413,
      y: 1.271,
      type: "restroom",
    },
    {
      x: 0.215,
      y: 1.227,
      type: "restroom",
    },
    {
      x: 0.213,
      y: 1.271,
      type: "washarea",
    },
    {
      x: 0.415,
      y: 1.227,
      type: "washarea",
    },
  ];

  const [overlays, setOverlays] = useState(() => {
    // Adding data to the overlays
    console.log("Loading overlay");

    const temp_overlays = {
      // Overlay Types
      undefined: [],
      washarea: [],
      restroom: [],
      cafeteria: [],
      venue: [],
      parking: [],
      school_facilities: [],
      college_buildings: [],
      attractions: [],
      court: [],
      batibot: [],
    };

    // Mapping the data to the overlays
    data.map((overlay, index) => {
      overlay["id"] = `overlayId${index}`; // Generating ID per overlay

      if (temp_overlays.hasOwnProperty(overlay.type)) {
        for (const overlayType in temp_overlays) {
          if (overlay.type === overlayType) {
            temp_overlays[overlayType].push(overlay);
          }
        }
      } else {
        temp_overlays.undefined.push(overlay);
      }
    });
    console.log("Overlay Loaded");
    return temp_overlays;
  });

  const icons = {
    // Icons for each type of overlay
    undefined: { icon: FaCircle, color: "gray" },
    washarea: { icon: FaHandsWash, color: "blue" },
    restroom: { icon: FaRestroom, color: "orange" },
    school_facilities: { icon: LuSchool, color: "green" },
    college_buildings: { icon: TbSchool, color: "green" },
    cafeteria: { icon: GrCafeteria, color: "green" },
    batibot: { icon: FaPeopleRoof, color: "green" },
    attractions: { icon: PiBinocularsDuotone, color: "green" },
    court: { icon: GiAbstract068, color: "green" },
    parking: { icon: FaSquareParking, color: "green" },
    venue: { icon: FaHotel, color: "green" },
  };

  const [current_overlays, setCurrentOverlays] = useState(
    // Overlays that are going to be displayed
    Object.keys(overlays),
  );

  /* Overlay Filter */
  const [filterClicked, setFilterClicked] = useState(false); // Filter Button State

  // Refresh Overlays when filter is disconnected
  function refresh() {
    Object.keys(overlays).map((type) => {
      overlays[type].map((overlay) => {
        viewer.removeOverlay(overlay.id);
      });
    });
    Object.keys(overlays).forEach((key) => {
      overlays[key].map((overlay) => {
        const div = document.getElementById(overlay.id);
        viewer.addOverlay({
          element: div,
          location: new OpenSeadragon.Point(overlay.x, overlay.y),
          placement: OpenSeadragon.Placement.BOTTOM,
        });
      });
    });
  }

  /* PathFinding */
  const [pathFindingClicked, setPathFindingClicked] = useState(false); // State to track if pathfinding icon is clicked
  const [canvasSize, setCanvasSize] = useState(null); // Canvas Size
  const [pathfindingRef, setPathfindingRef] = useState(null); // Reference to the Pathfinding element
  const [paths, setPaths] = useState([]); // Paths

  /* Map Button Mount */
  useLayoutEffect(() => {
    const viewerInstance = new OpenSeadragon({
      element: osdRef.current,
      prefixUrl: "/assets/images/",
      tileSources: [
        {
          type: "zoomifytileservice",
          width: 21280,
          height: 31628,
          tilesUrl: "/assets/MapModule/Adventura_Map/",
          //optional
          tileSize: 256,
          fileFormat: "webp",
        },
      ],
      defaultZoomLevel: 4,
      maxZoomLevel: 7, // Modify this to limit the zoom level to the level which pixels are not blurred
      minZoomLevel: 1, //
      animationTime: 2.0, // Animation time when Panning
      visibilityRatio: 1.0, // The visibility ratio
      constrainDuringPan: false, // Whether to constrain during pan
      scrollToZoom: false, // scroll to zoom
      showNavigationControl: false, // Hides the navigation control
      zoomPerClick: 1, // Disables zoom per click
      overlays: [
        {
          id: "current location",
          x: currLoc.x,
          y: currLoc.y,
          placement: OpenSeadragon.Placement.BOTTOM,
          rotationMode: OpenSeadragon.OverlayRotationMode.NO_ROTATION,
          checkResize: false,
        },
      ],
    });

    setViewer(viewerInstance);

    /* OSD Events */
    // When OSD is loaded
    viewerInstance.addHandler("open", () => {
      setOsdLoaded(true); // Set state when OSD is loaded
      viewerInstance.viewport.panTo(location, true); // Starts from current location
      setCanvasSize(viewerInstance.world.getItemAt(0).getContentSize()); // Image Pixel Metric
    });

    // When OSD is panned
    viewerInstance.addHandler("pan", function (event) {
      // Change current location button state when location is on center
      if (event.center.equals(location)) {
        setCheckCenter(true);
      } else {
        setCheckCenter(false);
      }
    });

    // When OSD is clicked
    viewerInstance.addHandler("canvas-click", function (event) {
      // Gets the VIEWPORT coordinates of the click into the canvas
      const viewportPoint = viewerInstance.viewport.pointFromPixel(
        event.position,
      );
      console.log(
        `Clicked at viewport coordinates: ${viewportPoint.x.toFixed(
          3,
        )}, ${viewportPoint.y.toFixed(3)}`,
      );
    });

    /* OSD Touch Controls */
    viewerInstance.gestureSettingsByDeviceType("touch").pinchRotate = true;

    return () => {
      // Clean up OpenSeadragon viewer when unmounts prevents multiple OSD instances
      viewerInstance.destroy();
    };
  }, []);

  /* Dynamic Overlay Loader */
  useEffect(() => {
    // Add overlays to the OSD
    if (osdLoaded) {
      // Dynamic Overlay Loader
      current_overlays.map((overlayType) => {
        overlays[overlayType].map((overlay) => {
          const div = document.getElementById(overlay.id);
          viewer.addOverlay({
            element: div,
            location: new OpenSeadragon.Point(overlay.x, overlay.y),
            placement: OpenSeadragon.Placement.BOTTOM,
          });
        });
      });
      // Pathfinding Overlay Loader
      viewer.addOverlay({
        element: pathfindingRef,
        location: viewer.world.getItemAt(0).getBounds(),
      });
    }
  }, [current_overlays, osdLoaded, pathfindingRef]);

  return (
    <div
      style={{
        position: "absolute",
        zIndex: 2,
        backgroundColor: "#fff",
        width: "100vw",
        height: "100vh",
      }}
    >
      {/* OSD */}
      <div ref={osdRef} style={{ width: "100%", height: "100vh", zIndex: 3 }} />
      {/* OSD */}

      {/* Current Location CSS */}
      <div id="current location">
        <RiAccountPinCircleLine size={60} className="text-red-600" />
      </div>
      {/* Current Location CSS */}

      {/* Overlays */}
      {current_overlays.map((overlayType) => {
        let divs = [];
        for (const overlay of overlays[overlayType]) {
          const icon = icons[overlay.type].icon
            ? icons[overlay.type].icon
            : FaCircle;
          const color = icons[overlay.type].color
            ? icons[overlay.type].color
            : "gray";
          divs.push(
            <div key={overlay.id} id={overlay.id}>
              <div
                style={{
                  position: "relative",
                  width: "20px",
                  height: "40px",
                }}
              >
                <div>
                  <div
                    style={{
                      position: "absolute",
                      left: "50%",
                      bottom: "0%",
                      transform: "translateX(-50%)",
                      borderTop: `18px solid ${color}`,
                      borderLeft: "12px solid transparent",
                      borderRight: "12px solid transparent",
                    }}
                  />

                  <div
                    style={{
                      position: "absolute",
                      display: "flex",
                      bottom: "12px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      backgroundColor: color,
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                    }}
                  >
                    {icon()}
                  </div>
                </div>
              </div>
            </div>,
          );
        }
        return divs;
      })}
      {osdLoaded && (
        <Pathfinding
          setPathfindingRef={setPathfindingRef}
          viewer={viewer}
          canvasSize={canvasSize}
          currloc={canvasSize}
          targetLoc={{ x: 0.5, y: 0.5 }}
        />
      )}
      {/* Overlays */}

      {/* OSD CSS */}
      {osdLoaded && (
        <div
          className={`pointer-events-none absolute left-0 top-0 z-10 grid h-dvh w-screen grid-rows-[auto,1fr,auto]`}
        >
          {/* Header Space */}
          <div className="py-10" />
          {/* Header Space */}
          {/* Content Space */}
          <div className=" relative w-full">
            {/* Pathfinding Modal */}
            {pathFindingClicked ? (
              <PathfindingModal setPathModalState={setPathFindingClicked} />
            ) : null}

            {/* Filter Button */}
            <div className="group">
              <div className="absolute right-0 top-0 m-2 flex flex-col items-center sm:flex-row-reverse lg:flex-col">
                <button
                  className={`${filterClicked ? "bg-green-500" : "bg-white"} pointer-events-auto mb-1 ml-1 flex items-center justify-center rounded-full p-2 drop-shadow-xl`}
                  onClick={() => {
                    setFilterClicked((prev) => {
                      const newState = !prev;
                      if (!newState) {
                        refresh();
                      }
                      return newState;
                    });
                  }}
                >
                  <BsFilterRight
                    className={`${filterClicked ? "text-white" : "text-gray-500 group-hover:text-green-600"} md:h-9/12 h-6 w-6 md:w-full lg:h-10 lg:w-10 `}
                  />
                </button>
                {filterClicked ? (
                  <FilterList
                    icons={icons}
                    overlays={overlays}
                    OSDinstance={viewer}
                    OSD={OpenSeadragon}
                  />
                ) : null}
              </div>
            </div>

            {/* Bottom Right Buttons */}
            <div className="absolute bottom-0 right-0 p-2">
              <div className="flex flex-col-reverse space-y-2 space-y-reverse">
                {/* Current Location Button */}
                <div className="group">
                  <button
                    className="pointer-events-auto rounded-full bg-white p-2 text-white drop-shadow-xl"
                    onClick={() => {
                      viewer.viewport.panTo(location);
                      setCheckCenter(true);
                      // Add your logic here
                    }}
                  >
                    {checkCenter ? (
                      <ImLocation2 className="md:h-9/12 h-6 w-6 text-green-600 group-hover:text-green-600 md:w-full lg:h-10 lg:w-10" />
                    ) : (
                      <ImLocation className="md:h-9/12 h-6 w-6 text-gray-500 group-hover:text-green-600 md:w-full lg:h-10 lg:w-10" />
                    )}
                  </button>{" "}
                </div>
                {/* Current Location Button */}

                {/* Pathfinding Button */}
                <div className="group">
                  <button
                    className="pointer-events-auto rounded-full bg-white p-2 text-white drop-shadow-xl"
                    onClick={() => {
                      setPathFindingClicked(!pathFindingClicked);
                    }}
                  >
                    <GiPathDistance
                      className={`md:h-9/12 h-6 w-6 ${pathFindingClicked ? "text-green-600" : "text-gray-500"} group-hover:text-green-600 md:w-full lg:h-10 lg:w-10`}
                    />
                  </button>
                </div>
                {/* Pathfinding Button */}
              </div>
              {/* Current Location Button */}
            </div>
            {/* Bottom Right Buttons */}
          </div>
          {/* Content Space */}

          {/* Footer Space */}
          <div className="py-10 md:hidden"></div>
        </div>
      )}

      {/* Map Legend (Placeholder: Not responsive in mobile)*/}
      {/* <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: "20%",
          width: "15%",
          paddingBottom: 78,
          paddingLeft: 5,
        }}
      >
        <img src="/assets/MapModule/map_legend.png" alt="Map Legend" />
      </div> */}
    </div>
  );
};

export default MapModule;
