import React, { useEffect, useRef, useState } from "react";
import OpenSeadragon from "openseadragon";
import { BsFilterRight } from "react-icons/bs";
import { RiAccountPinCircleLine } from "react-icons/ri";
import FilterList from "./components/FilterList"; // FilterList Component
import { GiPathDistance } from "react-icons/gi"; // Path finding
import { ImLocation } from "react-icons/im"; // Current Location Off
import { ImLocation2 } from "react-icons/im"; // Current Location On

const MapModule = ({ currLoc }) => {
  /* OpenSeadragon Viewer */
  const osdRef = useRef(); // Reference to the OSD element
  const [osdLoaded, setOsdLoaded] = useState(false); // If OSD is loaded
  const [viewer, setViewer] = useState(null); // OSD Viewer

  /* Location */
  const location = new OpenSeadragon.Point(currLoc.x, currLoc.y); // Current Point Location

  /* Filter Button */
  const [filterClicked, setFilterClicked] = useState(false); // State to track if filter icon is clicked

  /* Current Location Button */
  const [checkCenter, setCheckCenter] = useState(true); // State to track if current location button is clicked

  /* PathFinding Button */
  const [pathFindingClicked, setPathFindingClicked] = useState(false); // State to track if pathfinding icon is clicked

  // Map Button mount
  useEffect(() => {
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
      defaultZoomLevel: 5,
      maxZoomLevel: 7, // Modify this to limit the zoom level to the level which pixels are not blurred
      minZoomLevel: 1, //
      animationTime: 2.0, // Animation time when Panning
      visibilityRatio: 1.0, // The visibility ratio
      constrainDuringPan: false, // Whether to constrain during pan
      scrollToZoom: false, // scroll to zoom
      showNavigationControl: false, // Hides the navigation control
      overlays: [
        {
          id: "right-arrow-overlay",
          x: currLoc.x,
          y: currLoc.y,
          placement: OpenSeadragon.Placement.BOTTOM,
          rotationMode: OpenSeadragon.OverlayRotationMode.NO_ROTATION,
          checkResize: false,
        },
      ],
    });

    setViewer(viewerInstance);

    /* OSD EVENTS */

    /* When OSD is loaded */
    viewerInstance.addHandler("open", () => {
      setOsdLoaded(true);
      viewerInstance.viewport.panTo(location, true); // Starts from previous location
    });

    /* When OSD is panned */
    viewerInstance.addHandler("pan", function (event) {
      // Check if the current center of the viewport is the same as the initial location
      if (event.center.equals(location)) {
        setCheckCenter(true); // Show "on" icon
      } else {
        setCheckCenter(false); // Show "off" icon
      }
    });

    // OSD event that triggers when the canva was clicked
    viewerInstance.addHandler("canvas-click", function (event) {
      const viewportPoint = viewerInstance.viewport.pointFromPixel(
        event.position,
      ); // The position of the click in viewport coordinates
      console.log(
        `Clicked at viewport coordinates: ${viewportPoint.x.toFixed(
          3,
        )}, ${viewportPoint.y.toFixed(3)}`,
      );
    });

    /* OSD Touch Controls */
    viewerInstance.gestureSettingsByDeviceType("touch").pinchRotate = true;

    return () => {
      // Clean up OpenSeadragon viewer prevents multiple map button
      viewerInstance.destroy();
    };
  }, []);

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

      {/* Current Location CSS */}
      <div id="right-arrow-overlay">
        <RiAccountPinCircleLine size={60} className="text-red-600" />
      </div>

      {/* Layers on top of OSD */}
      {osdLoaded && (
        <div
          className={`pointer-events-none absolute left-0 top-0 z-10 grid h-dvh w-screen grid-rows-[auto,1fr,auto]`}
        >
          {/* Header Space */}
          <div className="py-10" />
          {/* Content Space */}
          <div className=" relative">
            {/* Filter Button */}
            <div className="group">
              <div className="absolute right-0 top-0 m-2 flex flex-col items-center sm:flex-row-reverse lg:flex-col">
                <button
                  className={`${filterClicked ? "bg-green-500" : "bg-white"} pointer-events-auto mb-1 ml-1 flex items-center justify-center rounded-full p-2 drop-shadow-xl`}
                  onClick={() => {
                    console.log("Filter Button clicked");
                    setFilterClicked(!filterClicked);
                  }}
                >
                  <BsFilterRight
                    className={`${filterClicked ? "text-white" : "text-gray-500 group-hover:text-green-600"} md:h-9/12 h-6 w-6 md:w-full lg:h-10 lg:w-10  `}
                  />
                </button>
                {filterClicked ? <FilterList /> : null}
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
                      console.log("Current Location Button clicked");
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
                      console.log("Pathfinding Button clicked");
                      setPathFindingClicked(!pathFindingClicked);
                    }}
                  >
                    <GiPathDistance
                      className={`md:h-9/12 h-6 w-6 text-gray-500 group-hover:text-green-600 md:w-full lg:h-10 lg:w-10`} // ${pathFindingClicked ? "text-green-600" : "text-gray-500"}
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
