/* React Hooks */
import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
/* Map Module Libraries */
import OpenSeadragon from "openseadragon";
import Paper, { Point, Path, Size } from "paper";
/* Map Module Components */
import FilterList from "./components/FilterList"; // Overlay Filter Component
import PathfindingModal from "./components/PathfindingModal"; // Pathfinding Modal Component
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

const MapModule = ({ currLoc, nodes, buildings }) => {
  /* OpenSeadragon Viewer */
  const osdRef = useRef(); // Reference to the OSD element
  const [osdLoaded, setOsdLoaded] = useState(false); // If OSD is loaded
  const [viewer, setViewer] = useState(null); // OSD Viewer

  /* Current Location */
  const location = new OpenSeadragon.Point(currLoc.coords.x, currLoc.coords.y); // Current Point Location
  const [checkCenter, setCheckCenter] = useState(true); // Check if user view is in the current location

  /* Overlays */
  // function to generate Point of Interests
  function generatePOI() {
    const temp = []; // Temporary Array where modified parts of database will be stored

    // Generate a proper layout for the POI in Buildings
    buildings.buildings.map((building) => {
      temp.push({
        id: building.scene,
        name: building.location,
        x: building.coords.x,
        y: building.coords.y,
        type: building.coords.type,
      });
    });

    // Generate a proper layout for the POI in Buildings Extras
    buildings.extras.map((building) => {
      temp.push({
        id: building.scene,
        name: building.location,
        x: building.coords.x,
        y: building.coords.y,
        type: building.coords.type,
      });
    });
    return temp;
  }

  const poi = generatePOI(); // Points of Interests
  // console.log("POI:", poi);

  const [overlays, setOverlays] = useState(() => {
    // Adding data to the overlays
    // console.log("Loading overlay");

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
    poi.map((overlay, index) => {
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
    // console.log("Overlay Loaded");
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
    console.log("Map Refresh");
    Object.keys(overlays).map((type) => {
      overlays[type].map((overlay) => {
        viewer.removeOverlay(overlay.id);
      });
    });
    viewer.removeOverlay("current location");
    Object.keys(overlays).forEach((key) => {
      overlays[key].map((overlay) => {
        const div = document.getElementById(overlay.id);
        viewer.addOverlay({
          element: div,
          location: new OpenSeadragon.Point(overlay.x, overlay.y),
          placement: OpenSeadragon.Placement.BOTTOM,
          rotationMode: OpenSeadragon.OverlayRotationMode.NO_ROTATION,
        });
      });
    });

    viewer.addOverlay({
      id: "current location",
      x: currLoc.coords.x,
      y: currLoc.coords.y,
      placement: OpenSeadragon.Placement.BOTTOM,
      rotationMode: OpenSeadragon.OverlayRotationMode.NO_ROTATION,
    });
  }
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
          x: currLoc.coords.x,
          y: currLoc.coords.y,
          placement: OpenSeadragon.Placement.BOTTOM,
          rotationMode: OpenSeadragon.OverlayRotationMode.NO_ROTATION,
        },
      ],
    });

    setViewer(viewerInstance);

    /* OSD Events */
    // When OSD is loaded
    viewerInstance.addHandler("open", () => {
      setOsdLoaded(true); // Set state when OSD is loaded

      viewerInstance.viewport.panTo(location, true); // Starts from current location
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
        `Clicked at Viewport coordinates: ${viewportPoint.x.toFixed(
          3,
        )}, ${viewportPoint.y.toFixed(3)}`,
      );
      // // Image Coordinates
      // console.log(
      //   "Current Location in Image Coordinates: ",
      //   viewerInstance.viewport.viewportToImageCoordinates(viewportPoint),
      // );
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
            rotationMode: OpenSeadragon.OverlayRotationMode.NO_ROTATION,
          });
        });
      });
    }
  }, [current_overlays, osdLoaded]);

  /* PathFinding */

  const [path, setPath] = useState([]); // Path State

  // Node Class
  class Node {
    constructor(id, x, y, neighborsID = [], travelType = "both") {
      // Should have the values of:
      this.id = id; // Name of Scene
      this.x = x; // X coordinate Img Pixel
      this.y = y; // X coordinate Img Pixel
      this.neighborsID = neighborsID; // Initial Neighbor nodes
      this.neighbors = []; // Neighbor nodes
      this.travelType = travelType; // Type of path (walkable, vehicle, both)
    }

    // Method to add a neighboring node to current node
    addNeighbor(neighbor) {
      this.neighbors.push(neighbor);
    }
  }

  function generateNodes() {
    const temp = [];
    // buildings.buildings.map((building) => {
    nodes.nodes.map((nodes) => {
      const neighbors = [];
      nodes.hotspot.map((hotspot) => {
        if (hotspot.type === "move" || hotspot.type === "bldg") {
          neighbors.push(hotspot.target);
        }
      });
      temp.push(
        new Node(
          nodes.scene,
          nodes.coords.x,
          nodes.coords.y,
          neighbors,
          nodes.travelType,
        ),
      );
    });
    buildings.buildings.map((building) => {
      const neighbors = [];
      building.back.map((nodes) => {
        neighbors.push(nodes);
      });
      temp.push(
        new Node(
          building.scene,
          building.coords.x,
          building.coords.y,
          neighbors,
          building.travelType,
        ),
      );
    });
    buildings.extras.map((building) => {
      const neighbors = [];
      building.back.map((nodes) => {
        neighbors.push(nodes);
      });
      temp.push(
        new Node(
          building.scene,
          building.coords.x,
          building.coords.y,
          neighbors,
          building.travelType,
        ),
      );
    });

    temp.forEach((node) => {
      node.neighborsID.forEach((elem) => {
        const matchingNode = temp.find((obj) => obj.id === elem);
        if (matchingNode) {
          node.addNeighbor(matchingNode);
        }
      });
    });

    return temp;
  }

  const [pathFindingClicked, setPathFindingClicked] = useState(false); // State to track if pathfinding icon is clicked

  // /* Function to scale down the given size */
  function downScale(getContentSize, scale) {
    const size = getContentSize;
    for (const key in size) {
      if (size.hasOwnProperty(key)) {
        size[key] = size[key] / scale;
      }
    }
    return size;
  }

  // /* Main Pathfinding Function */
  function pathFinding(targetLocation, travelType = "both") {
    console.log("Pathfinding");
    // Points Generated in A Star Algorithm

    console.log("Travel Type:", travelType);
    const graph = generateNodes();
    // console.log("Test: ", graph);

    const current_location = () => {
      const current = graph.find((node) => {
        return node.id === currLoc.scene;
      });
      return current;
    };

    const target_location = () => {
      const target = graph.find((node) => {
        return node.id === targetLocation.id;
      });
      return target;
    };

    const generatedPath = pathFindingAlgorithm(
      graph,
      current_location(),
      target_location(),
      travelType,
    );

    if (typeof generatedPath === "string") {
      console.log(generatedPath);
      if (Paper.project) {
        Paper.project.clear(); // Clear the written paths in PaperJS
      }
    } else {
      // Convert generatedPath to Pixel Coordinates
      const pixelPaths = generatedPath.map((point) => {
        const pixelPoint = viewer.viewport.viewportToImageCoordinates(
          new OpenSeadragon.Point(point.x, point.y),
        );
        return pixelPoint;
      });

      displayPath(pixelPaths);
    }
  }

  // /* Function that creates a path using A* Algorithm */
  function pathFindingAlgorithm(graph, start, end, travelType) {
    // console.log("Graph: ", graph);
    // console.log("start: ", start);
    // console.log("end: ", end);
    // const testPointsData = [
    //   {
    //     x: start.x,
    //     y: start.y,
    //   },
    //   { x: 0.413, y: 1.271 },
    // ];

    // Heuristic Function for determining distance of two nodes
    function euclideanDistance(node1, node2) {
      const dx = node1.x - node2.x;
      const dy = node1.y - node2.y;
      return Math.sqrt(dx * dx + dy * dy);
    }

    // Function to reconstruct the path from start to goal
    function reconstructPath(cameFrom, current) {
      // cameFrom = Map of Paths, current = Goal Class Node
      const path = [current]; // path = [Goal Node,]

      // Looping through the map of paths until it reached the start node
      while (cameFrom.has(current)) {
        // cameFrom has a current(goal node)
        current = cameFrom.get(current); // the value of key current is the new current

        path.push(current); // push goal node to path
      }
      return path.reverse();
    }

    /* A* Algorithm */
    function astar(graph, start, goal) {
      const openSet = new Set(); // The set of nodes to be evaluated
      const cameFrom = new Map(); // The map of navigated nodes

      const gScore = new Map(); // Cost from start along best known path
      const fScore = new Map(); // Estimated total cost from start to goal through y

      // Initialize gScore and fScore for all nodes
      graph.forEach((node) => {
        gScore.set(node, Infinity);
        fScore.set(node, Infinity);
      });

      gScore.set(start, 0); // The cost of going from start to start is zero
      fScore.set(start, euclideanDistance(start, goal)); // For the first node, it is set by distance to target

      openSet.add(start); // Add the start node to the open set

      while (openSet.size > 0) {
        let current = null; // The node in openSet having the lowest fScore[] value
        let minFScore = Infinity; // Initialize to infinity

        // Find the node in openSet having the lowest fScore
        openSet.forEach((node) => {
          // Iterate through all nodes in openSet to find the one with the lowest fScore
          if (fScore.get(node) < minFScore) {
            minFScore = fScore.get(node);
            current = node;
          }
        });

        if (current === goal) {
          return reconstructPath(cameFrom, current);
        }

        openSet.delete(current);

        current.neighbors.forEach((neighbor) => {
          const tentativeGScore =
            gScore.get(current) + euclideanDistance(current, neighbor);
          if (tentativeGScore < gScore.get(neighbor)) {
            cameFrom.set(neighbor, current);
            gScore.set(neighbor, tentativeGScore);
            fScore.set(
              neighbor,
              gScore.get(neighbor) + euclideanDistance(neighbor, goal),
            );
            if (!openSet.has(neighbor)) {
              openSet.add(neighbor);
            }
          }
        });
      }

      return "No existing paths"; // No path foundhim
    }

    const generatedPath = astar(graph, start, end, travelType);
    // console.log("Generated Path: ", generatedPath);

    return generatedPath; // Set the generated path to the state
  }

  // /* Displays the Paths Generated by A* Algorithm */
  function displayPath(points) {
    if (Paper.project) {
      Paper.project.clear(); // Clear the written paths in PaperJS

      // Scale down the points to match the scale of PaperJS Canvas
      const pathData = points.map((point) => {
        const downscalePoint = downScale(point, 4);
        return new Point(downscalePoint.x, downscalePoint.y);
      });
      console.log("Path Data: ", pathData);

      // Create a new Path in PaperJS using the Paths that has been down scaled
      const path = new Path({
        segments: pathData,
        strokeColor: "#3b82f6",
        strokeWidth: 30,
        strokeCap: "round",
      });

      path.smooth(1); // Remove the sharp edges of the path
    } else {
      const paperJS = document.createElement("canvas"); // Create a canvas element for PaperJS

      paperJS.id = "myCanvas"; // Set an ID for reference when unmounting the canvas

      document.body.appendChild(paperJS); // Add the canvas to the body DOM

      Paper.setup(paperJS); // Setup PaperJS in the created canvas

      const viewSize = downScale(viewer.world.getItemAt(0).getContentSize(), 4); // Scale down the OSD Image Size

      Paper.view.viewSize = new Size(viewSize.x, viewSize.y); // Apply the scaled down size as a PaperJS Canvas Size

      // Scale down the points to match the scale of PaperJS Canvas
      const pathData = points.map((point) => {
        const downscalePoint = downScale(point, 4);
        return new Point(downscalePoint.x, downscalePoint.y);
      });
      console.log("Path Data: ", pathData);

      // Create a new Path in PaperJS using the Paths that has been down scaled
      const path = new Path({
        segments: pathData,
        strokeColor: "#3b82f6",
        strokeWidth: 30,
        strokeCap: "round",
      });

      path.smooth(1); // Remove the sharp edges of the path

      // Add the PaperJS canvas as an overlay
      viewer.addOverlay({
        element: paperJS,
        location: viewer.world.getItemAt(0).getBounds(),
      });
    }

    refresh(); // Refresh the existing overlays so they may appear on top
  }

  // /* Function for clearing traces of PaperJS */
  function removePath() {
    // Remove Path if there is a PaperJS instance
    if (Paper.project) {
      viewer.removeOverlay("myCanvas"); // Remove the PaperJS canvas overlay
      Paper.project.clear(); // Clear the written paths in PaperJS
      // Set a time out to give time for paperJS to clear the canvas
      setTimeout(() => {
        Paper.view.remove(); // Remove the PaperJS

        const canvasToRemove = document.getElementById("myCanvas"); // Get the canvas element

        canvasToRemove.parentNode.removeChild(canvasToRemove); // Remove the canvas from the DOM
      }, 2000);
    }
  }

  return (
    <div
      style={{
        position: "absolute",
        zIndex: 2,
        backgroundColor: "#f5f5f5",
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
      {/* POI Overlays */}
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
      {/* POI Overlays */}
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
              <PathfindingModal
                setPathModalState={setPathFindingClicked}
                removePath={removePath}
                pathfinding={pathFinding}
                generatePOI={generatePOI}
              />
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
