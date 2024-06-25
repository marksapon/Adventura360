/* React Hooks */
import React, { useEffect, useRef, useState, useLayoutEffect } from "react";

/* Map Module Libraries */
import OpenSeadragon from "openseadragon";
import Paper, { Point, Path, Size } from "paper";

/* Map Module Components */
import FilterList from "./components/FilterList"; // Overlay Filter Component
import PathfindingModal from "./components/PathfindingModal"; // Pathfinding Modal Component
import MapLegend from "./components/MapLegend";

/* OSD CSS */
import { BsFilterRight } from "react-icons/bs"; // Filter Button
import { GiPathDistance } from "react-icons/gi"; // Path finding Button
import { ImLocation } from "react-icons/im"; // Current Location Off Button
import { ImLocation2 } from "react-icons/im"; // Current Location On Button
import { IoIosClose } from "react-icons/io"; // Close Button

import { RiMapPinRangeLine } from "react-icons/ri";
import { RiMapPinRangeFill } from "react-icons/ri";

/* Overlay Icons */
import { FaCircle } from "react-icons/fa6"; // Undefined Icon

const MapModule = ({
  currLoc,
  nodesDB,
  buildingsDB,
  extrasDB,
  infosDB,
  iconsSet,
  openBldgModal,
  status,
  mapState,
}) => {
  /* Device Check */
  // Check if User on Mobile
  function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    );
  }

  // Check if Landscape or Portrait
  function checkOrientation() {
    if (window.innerWidth > window.innerHeight) {
      return "landscape";
    } else {
      return "portrait";
    }
  }

  const [selected_extra, setSelectedExtra] = useState(); // Selected Extra State
  const [extraCheck, setExtraCheck] = useState(false); // Extra Check State

  const [mapLegendState, setMapLegendState] = useState(
    isMobile() ? false : true,
  );

  /* Zoom Level */
  // Max Zoom Level based on Device
  const maxZoom = () => {
    if (checkOrientation() === "landscape") {
      return 10;
    } else {
      return isMobile() ? 10 : 4; // 28 for mobile
    }
  };
  const [zoomLevel, setZoomLevel] = useState(maxZoom());
  const [poiNameStates, setPoiNameStates] = useState(true); // POI Name State

  /* OpenSeadragon Viewer */
  const osdRef = useRef(); // Reference to the OSD element
  const [osdLoaded, setOsdLoaded] = useState(false); // If OSD is loaded
  const [viewer, setViewer] = useState(null); // OSD Viewer

  /* Current Location */
  const location = new OpenSeadragon.Point(currLoc.coords.x, currLoc.coords.y); // Current Point Location
  const [checkCenter, setCheckCenter] = useState(false); // Check if user view is in the current location

  /* Building Modal State */
  const [bldgModalState, setBldgModalState] = useState(false); // Building Modal State
  const [targetScene, setTargetScene] = useState(""); // Target Scene for Building Modal

  /* Pathfinding Modal */
  const [pathFindingClicked, setPathFindingClicked] = useState(false); // State to track if pathfinding icon is clicked
  const [minimized, setMinimized] = useState(false); // Pathfinding Modal Minimized State

  const [targetLocation, setTargetLocation] = useState(); // Target Location for Pathfinding
  const [travelMode, setTravelMode] = useState("walk"); // Travel Mode for Pathfinding
  const [pathGraph, setPathGraph] = useState();

  // useEffect(() => {
  //   console.log("TargetLocation:", targetLocation);
  // }, [targetLocation]);

  /* Overlays */

  // function to generate Point of Interests
  function generatePOI() {
    const temp = []; // Temporary Array where modified parts of database will be stored

    // Generate a proper layout for the POI in Buildings
    buildingsDB.map((building) => {
      temp.push({
        scene: building.scene,
        name: building.location,
        x: building.coords.x,
        y: building.coords.y,
        type: building.coords.type,
      });
    });
    // Generate a proper layout for the POI in Buildings Extras
    extrasDB.map((building) => {
      temp.push({
        scene: building.scene,
        name: building.location,
        x: building.coords.x,
        y: building.coords.y,
        type: building.coords.type,
        state: false,
      });
    });
    return temp;
  }

  const poi = generatePOI(); // Points of Interests

  const [overlays, setOverlays] = useState(generateOverlays());

  function generateOverlays() {
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
      farm: [],
      construction: [],
    };

    // Mapping the data to the overlays
    poi.map((overlay, index) => {
      // overlay["id"] = `overlayId${index}`; // Generating ID per overlay
      overlay["id"] = overlay.scene; // Generating ID per overlay

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
  }

  const icons = iconsSet; // Icons Set

  const [current_overlays, setCurrentOverlays] = useState([]);

  // Create a ref for current_overlays
  const currentOverlaysRef = useRef(current_overlays);

  /* Overlay Filter */
  const [filterClicked, setFilterClicked] = useState(true); // Filter Button State

  function removeOverlays(target_loc = null) {
    Object.keys(overlays).map((type) => {
      overlays[type].map((overlay) => {
        if (target_loc && overlay.scene === target_loc.scene) {
        } else {
          viewer.removeOverlay(overlay.id);
          removeOverlaysName();
        }
      });
    });
  }

  /* Map Button Mount */
  useLayoutEffect(() => {
    const viewerInstance = new OpenSeadragon({
      element: osdRef.current,
      tileSources: [
        {
          type: "zoomifytileservice",
          width: 21280,
          height: 31628,
          tilesUrl: "/assets/Map Module/adventura tiled map/",
          //optional
          tileSize: 256,
          fileFormat: "webp",
        },
      ],
      defaultZoomLevel: maxZoom(),
      maxZoomLevel: maxZoom(),
      minZoomLevel: 1, //
      animationTime: 2.0, // Animation time when Panning
      visibilityRatio: 1.0, // The visibility ratio
      constrainDuringPan: false, // Whether to constrain during pan
      scrollToZoom: false, // scroll to zoom
      showNavigationControl: false, // Hides the navigation control
      zoomPerClick: 1, // Disables zoom per click
      gestureSettingsTouch: {
        scrollToZoom: false, // disable scroll to zoom
        clickToZoom: false, // disable click to zoom
        dblClickToZoom: false, // enable double click to zoom
        pinchToZoom: true, // enable pinch to zoom
        flickEnabled: false, // enable flick
        pinchRotate: false, // disable pinch to rotate
      },
    });

    setViewer(viewerInstance);

    /* OSD Events */
    // When OSD is loaded
    viewerInstance.addHandler("open", () => {
      setOsdLoaded(true); // Set state when OSD is loaded

      viewerInstance.viewport.panTo(location, true); // Starts from current location

      viewerInstance.addOverlay({
        id: "current location",
        x: currLoc.coords.x,
        y: currLoc.coords.y,
        placement: OpenSeadragon.Placement.BOTTOM,
        rotationMode: OpenSeadragon.OverlayRotationMode.NO_ROTATION,
      });
    });

    viewerInstance.addHandler("zoom", function (event) {
      // Get the current zoom level
      const currentZoomLevel = viewerInstance.viewport.getZoom();

      if (currentZoomLevel >= zoomLevel) {
        setPoiNameStates(true);
      } else {
        setPoiNameStates(false);
      }
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

    return () => {
      viewerInstance.destroy();
    };
  }, []);

  useEffect(() => {
    if (osdLoaded) {
      if (!mapState) {
        viewer.viewport.zoomTo(10, currLoc.coords);
        viewer.forceRedraw();
      }
    }
  }, [mapState]);

  useEffect(() => {
    if (osdLoaded) {
      if (current_overlays.length === 0) {
        viewer.forceRedraw();
        removeOverlays(targetLocation);
      } else if (current_overlays.length > 0) {
        viewer.forceRedraw();
        removeOverlays(targetLocation);

        // console.log("Adding Overlay");
        current_overlays.map((type) => {
          overlays[type].map((overlay) => {
            const div = document.getElementById(overlay.id);
            if (
              currLoc.coords.x !== overlay.x &&
              currLoc.coords.y !== overlay.y
            ) {
              viewer.addOverlay({
                element: div,
                location: new OpenSeadragon.Point(overlay.x, overlay.y),
                placement: OpenSeadragon.Placement.BOTTOM,
                rotationMode: OpenSeadragon.OverlayRotationMode.NO_ROTATION,
              });
              viewer.forceRedraw();
            }
          });
        });
      }
    }
  }, [current_overlays, osdLoaded]);

  useEffect(() => {
    if (osdLoaded) {
      viewer.forceRedraw();
      viewer.removeOverlay("current location");
      viewer.addOverlay({
        id: "current location",
        x: currLoc.coords.x,
        y: currLoc.coords.y,
        placement: OpenSeadragon.Placement.BOTTOM,
        rotationMode: OpenSeadragon.OverlayRotationMode.NO_ROTATION,
      });
      // Pan to the new location
      viewer.viewport.panTo(
        new OpenSeadragon.Point(currLoc.coords.x, currLoc.coords.y),
        false,
      );
      viewer.forceRedraw();
    }
  }, [currLoc, osdLoaded]); // Add osdLoaded to the dependency array if its changes should also trigger the effect

  function removeOverlaysName() {
    Object.keys(overlays).map((type) => {
      overlays[type].map((overlay) => {
        const div = document.getElementById(overlay.id + "name");
        viewer.removeOverlay(div);
      });
    });
  }

  useEffect(() => {
    if (osdLoaded) {
      if (poiNameStates) {
        removeOverlaysName();

        current_overlays.map((type) => {
          overlays[type].map((overlay) => {
            const div = document.getElementById(overlay.id + "name");
            viewer.addOverlay({
              element: div,
              location: new OpenSeadragon.Point(overlay.x, overlay.y),
              placement: OpenSeadragon.Placement.TOP,
              rotationMode: OpenSeadragon.OverlayRotationMode.NO_ROTATION,
            });
          });
        });

        // Add target location overlay name
        if (targetLocation) {
          console.log("Adding Target Location Name");
          const targetOverlay = targetLocation;
          const name = document.getElementById(targetOverlay.scene + "name");
          viewer.addOverlay({
            element: name,
            location: new OpenSeadragon.Point(targetOverlay.x, targetOverlay.y),
            placement: OpenSeadragon.Placement.TOP,
            rotationMode: OpenSeadragon.OverlayRotationMode.NO_ROTATION,
          });
        }
      } else {
        Object.keys(overlays).map((type) => {
          overlays[type].map((overlay) => {
            const div = document.getElementById(overlay.id + "name");
            viewer.removeOverlay(div);
          });
        });
      }

      viewer.forceRedraw();
    }
  }, [poiNameStates, current_overlays, targetLocation]); // Add target_location to the dependency array

  // OSD Click Event Handler
  useEffect(() => {
    currentOverlaysRef.current = current_overlays;

    if (osdLoaded) {
      viewer.addHandler("canvas-click", function (event) {
        const viewportPoint = viewer.viewport.pointFromPixel(event.position);

        Object.keys(overlays).map((overlayType) => {
          overlays[overlayType].map((overlay, index) => {
            if (
              currLoc.coords.x !== overlay.x &&
              currLoc.coords.y !== overlay.y
            ) {
              const clickedOverlay = viewer.getOverlayById(overlay.id); // Get the overlay by ID

              if (clickedOverlay) {
                // Get the bounds of the overlay
                const overlayBounds = clickedOverlay.getBounds(viewer.viewport);

                // Check if the clicked point is inside the overlay bounds
                if (overlayBounds.containsPoint(viewportPoint)) {
                  console.log("Overlay Found:", overlay.scene);
                  let found = false;

                  buildingsDB.find((buildings) => {
                    if (buildings.scene === overlay.scene) {
                      openBldgModal(overlay.scene, "map");
                      found = true;
                    }
                  });

                  if (!found) {
                    extrasDB.find((extras) => {
                      if (extras.scene === overlay.scene) {
                        // console.log("Found Extras");

                        const extraState = !overlay.state;

                        setExtraCheck(extraState);

                        setSelectedExtra(extras);

                        // console.log("Overlay Extra State:", overlay.state);
                      }
                    });
                  }
                }
              } else {
                // console.log("No Overlay Found");
              }
            }
          });
        });

        // Viewport Coordinates when clicking
        console.log(
          `Clicked at Viewport coordinates: ${viewportPoint.x.toFixed(
            3,
          )}, ${viewportPoint.y.toFixed(3)}`,
        );
      });
    }
  }, [osdLoaded, current_overlays]);

  /* PathFinding */

  // Node Class
  class Node {
    constructor(id, x, y, neighborsID = [], travelType = "both", weight = 0) {
      // Should have the values of:
      this.id = id; // Name of Scene
      this.x = x; // X coordinate Img Pixel
      this.y = y; // X coordinate Img Pixel
      this.neighborsID = neighborsID; // Initial Neighbor nodes
      this.neighbors = []; // Neighbor nodes
      this.travelType = travelType; // Type of path (walkable, vehicle, both)
      this.weight = weight;
    }

    // Method to add a neighboring node to current node
    addNeighbor(neighbor) {
      this.neighbors.push(neighbor);
    }
  }

  function generateNodes(travelType = "both") {
    const temp = [];

    nodesDB.map((nodes) => {
      let neighbors = [];

      if (travelType === "vehicle") {
        if (nodes.oneway_directions) {
          neighbors = nodes.oneway_directions;

          nodes.hotspot.map((hotspot) => {
            if (
              hotspot.type === "bldg" ||
              hotspot.type === "popup" ||
              hotspot.type === "info"
            ) {
              neighbors.push(hotspot.target);
            }
          });
        } else {
          nodes.hotspot.map((hotspot) => {
            if (
              hotspot.type === "move" ||
              hotspot.type === "bldg" ||
              hotspot.type === "popup" ||
              hotspot.type === "info"
            ) {
              neighbors.push(hotspot.target);
            }
          });
        }
      } else {
        nodes.hotspot.map((hotspot) => {
          if (
            hotspot.type === "move" ||
            hotspot.type === "bldg" ||
            hotspot.type === "popup" ||
            hotspot.type === "info"
          ) {
            neighbors.push(hotspot.target);
          }
        });
      }

      const neighborsSet = new Set(neighbors);
      const uniqueNeighbors = Array.from(neighborsSet);

      temp.push(
        new Node(
          nodes.scene,
          nodes.coords.x,
          nodes.coords.y,
          uniqueNeighbors,
          nodes.travelType,
        ),
      );
    });

    buildingsDB.map((building) => {
      const neighbors = [];

      if (building.back) {
        building.back.map((nodes) => {
          neighbors.push(nodes);
        });
      }

      temp.push(
        new Node(
          building.scene,
          building.coords.x,
          building.coords.y,
          neighbors,
          building.travelType,
          10,
        ),
      );
    });

    extrasDB.map((building) => {
      const neighbors = [];

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

  // /* Function to scale down the given size */
  function downScale(getContentSize) {
    const scale = isMobile() ? 20 : 4;
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
    setTravelMode(travelType);
    // Points Generated in A Star Algorithm

    // console.log("Travel Type:", travelType);
    const graph = generateNodes(travelType);
    // console.log("Test: ", graph);

    const current_location = () => {
      const current = graph.find((node) => {
        return node.id === currLoc.scene;
      });
      return current;
    };

    const target_location = () => {
      const target = graph.find((node) => {
        // console.log("Node: ", node);
        // console.log("Target: ", targetLocation);

        return node.id === targetLocation.scene;
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
      if (Paper.project) {
        Paper.project.clear(); // Clear the written paths in PaperJS
        setTargetLocation(); // Clear the target location
        alert("No existing paths"); // No path found
      }
    } else {
      // Convert generatedPath to Pixel Coordinates
      const pixelPaths = generatedPath.map((point) => {
        const pixelPoint = viewer.viewport.viewportToImageCoordinates(
          new OpenSeadragon.Point(point.x, point.y),
        );
        return pixelPoint;
      });

      displayPath(pixelPaths, targetLocation, travelType);
    }
  }

  // /* Function that creates a path using A* Algorithm */
  function pathFindingAlgorithm(graph, start, end, travelType) {
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
      setPathGraph(path); // Set the path to the state
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
      // console.log("Goal: ", goal);
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

        function roadAccess(neighbor_travelType, travelType) {
          if (
            travelType === "walk" &&
            (neighbor_travelType === "walk" || neighbor_travelType === "both")
          ) {
            return true;
          } else if (
            travelType === "vehicle" &&
            (neighbor_travelType === "vehicle" ||
              neighbor_travelType === "both")
          ) {
            return true;
          } else {
            return false;
          }
        }

        current.neighbors.forEach((neighbor) => {
          if (roadAccess(neighbor.travelType, travelType)) {
            const tentativeGScore =
              gScore.get(current) +
              euclideanDistance(current, neighbor) +
              neighbor.weight;
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
          }
        });
      }

      return "No existing paths"; // No path foundhim
    }

    const generatedPath = astar(graph, start, end, travelType);
    // console.log("Generated Path: ", generatedPath);

    return generatedPath; // Set the generated path to the state
  }

  function displayPath(points, target_location, travelType) {
    // Remove the old canvas if it exists
    const oldCanvas = document.getElementById("myCanvas");
    if (oldCanvas) {
      viewer.removeOverlay("myCanvas");
      removeOverlays(target_location);

      // removeOverlaysName();

      oldCanvas.remove();
    }

    // Always create a new canvas and setup Paper.js on it
    const paperJS = document.createElement("canvas");
    paperJS.id = "myCanvas";
    document.body.appendChild(paperJS);
    Paper.setup(paperJS);

    const viewSize = downScale(viewer.world.getItemAt(0).getContentSize());
    Paper.view.viewSize = new Size(viewSize.x, viewSize.y);

    const pathData = points.map((point) => {
      const downscalePoint = downScale(point);
      return new Point(downscalePoint.x, downscalePoint.y);
    });

    const strokeWidth = isMobile() ? 5 : 15;

    const space = isMobile() ? [1, 15] : [1, 30];

    const pathType = () => {
      let path;

      if (travelType === "walk") {
        path = new Path({
          segments: pathData,
          strokeColor: "#49f770", //70e000 for green #66ff00 #dc2626 #49f770 #ff3155
          strokeWidth: strokeWidth,
          strokeCap: "round",
          dashArray: space, // This will create a dashed line with dashes 10 units long and gaps 12 units long
        });
      } else {
        path = new Path({
          segments: pathData,
          strokeColor: "#ffa500", //70e000 for green
          strokeWidth: strokeWidth,
          strokeCap: "round",
        });
      }
    };

    const path = pathType();

    viewer.addOverlay({
      element: paperJS,
      location: viewer.world.getItemAt(0).getBounds(),
    });

    setFilterClicked(true);

    viewer.removeOverlay("current location");

    viewer.addOverlay({
      id: "current location",
      x: currLoc.coords.x,
      y: currLoc.coords.y,
      placement: OpenSeadragon.Placement.BOTTOM,
      rotationMode: OpenSeadragon.OverlayRotationMode.NO_ROTATION,
    });

    // console.log("Target Location:", target_location);

    Object.keys(overlays).forEach((key) => {
      overlays[key].map((overlay) => {
        if (overlay.scene === target_location.scene) {
          // console.log("Overlay Found");
          const div = document.getElementById(overlay.id);
          const name = document.getElementById(overlay.id + "name");
          if (
            currLoc.coords.x !== overlay.x &&
            currLoc.coords.y !== overlay.y
          ) {
            viewer.addOverlay({
              element: div,
              location: new OpenSeadragon.Point(overlay.x, overlay.y),
              placement: OpenSeadragon.Placement.BOTTOM,
              rotationMode: OpenSeadragon.OverlayRotationMode.NO_ROTATION,
            });
          }
        }
      });
    });
  }

  function removePath() {
    // Remove Path if there is a PaperJS instance
    if (Paper.project) {
      if (viewer) {
        viewer.removeOverlay("myCanvas"); // Remove the PaperJS canvas overlay
      }
      Paper.project.clear(); // Clear the written paths in PaperJS
      // Set a time out to give time for paperJS to clear the canvas
      setTimeout(() => {
        Paper.view.remove(); // Remove the PaperJS

        const canvasToRemove = document.getElementById("myCanvas"); // Get the canvas element

        if (canvasToRemove && canvasToRemove.parentNode) {
          canvasToRemove.parentNode.removeChild(canvasToRemove); // Remove the canvas from the DOM
        }
      }, 2000);
    }
  }

  useEffect(() => {
    if (targetLocation) {
      // console.log("Calculating new path");

      let continuePath;

      if (
        targetLocation.x === currLoc.coords.x &&
        targetLocation.y === currLoc.coords.y
      ) {
        continuePath = false;
      } else if (
        pathGraph[pathGraph.length - 2].x === currLoc.coords.x &&
        pathGraph[pathGraph.length - 2].y === currLoc.coords.y
      ) {
        continuePath = false;
      } else {
        continuePath = true;
      }

      if (pathGraph) {
        // console.log("Path Graph:", pathGraph);
        // console.log("Coord Match:", continuePath);
        if (continuePath) {
          pathFinding(targetLocation, travelMode);
        } else {
          removePath();
          setTargetLocation();
          alert("You have reached your destination");
        }
      }
    }
  }, [targetLocation, currLoc]);

  return (
    <div
      className={` ${mapState ? "absolute h-full w-screen bg-green-500" : "opacity-0.5 opacity-0.9 z-20 mb-2 flex h-20 w-36 overflow-hidden rounded-2xl border-black md:h-20 md:w-40 lg:h-40 lg:w-80"} `}
    >
      {!mapState && (
        <div className="pointer-events-none absolute z-10 flex h-full w-full items-end justify-end pb-10">
          {/* Current Location Button */}
          <div className="group relative inline-block">
            <div className="absolute right-full top-1/2 mr-2 w-32 -translate-y-1/2 transform rounded-lg bg-black px-3 py-2 text-center text-xs text-white opacity-0 transition duration-200 ease-in-out group-hover:opacity-100">
              Current Location
            </div>
            <button
              className="pointer-events-auto transform rounded-full border-2 bg-white p-2 text-white drop-shadow-xl transition-transform duration-500 ease-in-out hover:scale-110 hover:border-green-500"
              onClick={() => {
                viewer.viewport.panTo(location);
                setCheckCenter(true);
              }}
            >
              {checkCenter ? (
                <ImLocation2 className="h-6 w-6 text-green-600 group-hover:text-green-600 md:w-full lg:h-7 lg:w-7" />
              ) : (
                <ImLocation className="h-6 w-6 text-gray-500 group-hover:text-green-600 md:w-full lg:h-7 lg:w-7" />
              )}
            </button>
          </div>
        </div>
      )}

      {/* OSD */}
      <div
        ref={osdRef}
        style={{
          width: "100%",
          height: "100%",
          zIndex: 3,
          backgroundColor: "#fefefe",
        }}
      />
      {/* OSD */}

      {/* Overlays */}

      {/* POI Overlays */}
      {Object.keys(overlays).map((overlayType, index) => {
        let divs = [];
        for (const overlay of overlays[overlayType]) {
          const icon = icons[overlay.type].icon
            ? icons[overlay.type].icon
            : FaCircle;
          const color = icons[overlay.type].color
            ? icons[overlay.type].color
            : "gray";
          divs.push(
            <div className="display-hidden" key={overlay.id} id={overlay.id}>
              <button
                style={{
                  pointerEvents: "auto",
                  zIndex: 5,
                  display: "none",
                }}
                tabIndex="-1"
              >
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
                        bottom: "2%",
                        transform: "translateX(-50%)",
                        borderTop: `18px solid ${color}`,
                        borderLeft: "13px solid transparent",
                        borderRight: "13px solid transparent",
                      }}
                    />

                    <div
                      className="rounded-full"
                      style={{
                        position: "absolute",
                        display: "flex",
                        bottom: "12px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        backgroundColor: "#fcfcfc",
                        alignItems: "center",
                        justifyContent: "center",
                        color: color,
                        pointerEvents: "auto",
                        border: `4px solid ${color}`,
                      }}
                    >
                      {icon()}
                    </div>
                  </div>
                </div>
              </button>
            </div>,
          );
        }
        return divs;
      })}

      {Object.keys(overlays).map((overlayType) => {
        return overlays[overlayType].map((overlay) => {
          const color = icons[overlay.type].color
            ? icons[overlay.type].color
            : "gray";
          return (
            <div
              className="display-hidden"
              key={overlay.id + "name"}
              id={overlay.id + "name"}
            >
              <div
                className={`flex h-auto w-60 items-center justify-center rounded-md border-2 border-gray-300 bg-white text-center text-sm shadow-lg`}
                style={{
                  color: color,
                  fontWeight: "bold",
                  display: "none",
                }}
                tabIndex="-1"
              >
                {overlay.name}
              </div>
            </div>
          );
        });
      })}

      {/* POI Overlays */}

      {/* Current Location CSS */}

      <div className="hidden"></div>
      <div
        id="current location"
        className="flex h-auto w-36 flex-col items-center justify-end space-y-2"
      >
        <img
          src="/assets/Login Module/adventura logo 2.webp"
          alt="Adventura 360 logo"
          className=" mx-auto block h-12 w-12 items-center justify-center object-contain"
        />
      </div>

      {/* Current Location CSS */}

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
          <div className={`relative h-full w-full `}>
            {/* Pathfinding Modal */}
            {pathFindingClicked && (
              <div className={`${!mapState && "hidden"}`}>
                <PathfindingModal
                  setMinimized={setMinimized}
                  minimized={minimized}
                  setPathModalState={setPathFindingClicked}
                  removePath={removePath}
                  pathfinding={pathFinding}
                  generatePOI={generatePOI}
                  removeOverlays={removeOverlays}
                  setTargetLocation={setTargetLocation}
                />
              </div>
            )}

            {/* Extras Display Modal */}
            {mapState && selected_extra && extraCheck ? (
              <>
                <div className="absolute -top-20 z-20 h-screen w-screen bg-black bg-opacity-70" />
                <div className="pointer-events-none relative z-20 flex h-full items-center justify-center p-4">
                  <div
                    style={{ fontSize: "12px" }}
                    className="relative bottom-11 flex max-h-fit max-w-96 flex-col items-center rounded-md border-2 bg-slate-50 p-1 shadow-2xl"
                  >
                    {/* Close Button */}
                    <button
                      className="pointer-events-auto absolute right-0 pr-1"
                      onClick={() => {
                        setSelectedExtra();
                        setExtraCheck(!extraCheck);
                      }}
                    >
                      <IoIosClose size={30} />
                    </button>
                    <div className="p3 flex h-3/4 flex-col items-center justify-center overflow-hidden pt-8 shadow-lg">
                      <img
                        src={
                          selected_extra.image
                            ? selected_extra.image
                            : "https://via.placeholder.com/150"
                        }
                        className="border-2 object-contain shadow-md"
                      />
                    </div>
                    <div className="m-2 flex flex-col items-center justify-center gap-2">
                      <div className="full h-auto w-auto rounded-3xl border-2 bg-white p-1 shadow-lg">
                        <div className="px-2 text-center font-roboto text-base font-semibold text-green-500 sm:text-lg">
                          {selected_extra.location}
                        </div>
                      </div>

                      <div className="px-2 text-center font-roboto text-xs text-black">
                        {selected_extra.desc
                          ? `(${selected_extra.desc})`
                          : null}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : null}

            {mapState && mapLegendState && (
              <MapLegend setMapLegendState={setMapLegendState} />
            )}

            {/* Filter Button */}
            <div className={`${mapState ? "group" : "hidden"}`}>
              <div className="absolute right-0 top-0 m-2 flex flex-col items-center justify-center sm:flex-row-reverse lg:flex-col">
                <div className="relative flex items-center justify-center ">
                  <div className=" absolute right-full top-1/2 mr-2 w-32 -translate-y-1/2 transform rounded-lg bg-black px-3 py-2 text-center text-xs text-white opacity-0 transition duration-200 ease-in-out group-hover:opacity-100">
                    Filter Overlays
                  </div>
                  <button
                    className={`${filterClicked ? "bg-green-500" : "bg-white"} pointer-events-auto mb-1 ml-1 flex transform items-center  justify-center rounded-full border-2 p-2 drop-shadow-xl transition-transform duration-500 ease-in-out hover:scale-110`}
                    onClick={() => {
                      if (filterClicked) {
                        removeOverlays(targetLocation);
                        setCurrentOverlays([]);
                      }

                      setFilterClicked(!filterClicked);
                    }}
                  >
                    <BsFilterRight
                      className={`${filterClicked ? "text-white" : "text-gray-500 group-hover:text-green-600"} md:h-9/12 h-6 w-6 md:w-full lg:h-10 lg:w-10 `}
                    />
                  </button>
                </div>

                {filterClicked ? (
                  <FilterList
                    setOverlays={setCurrentOverlays}
                    current_overlays={current_overlays}
                    removeOverlays={removeOverlays}
                    icons={icons}
                  />
                ) : null}
              </div>
            </div>

            {/* Bottom Right Buttons */}

            <div
              className={`${mapState ? "absolute bottom-0 right-0 p-2" : "hidden"}`}
            >
              <div className="flex flex-col-reverse space-y-2 space-y-reverse">
                {/* Current Location Button */}
                <div className="group relative inline-block">
                  <div className="absolute right-full top-1/2 mr-2 w-32 -translate-y-1/2 transform rounded-lg bg-black px-3 py-2 text-center text-xs text-white opacity-0 transition duration-200 ease-in-out group-hover:opacity-100">
                    Current Location
                  </div>
                  <button
                    className="pointer-events-auto transform rounded-full border-2 bg-white p-2 text-white drop-shadow-xl transition-transform duration-500 ease-in-out hover:scale-110 hover:border-green-500"
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
                  </button>
                </div>
                {/* Current Location Button */}

                {/* Map Legend Button */}
                <div className="group relative inline-block">
                  <div className="absolute right-full top-1/2 mr-2 w-32 -translate-y-1/2 transform rounded-lg bg-black px-3 py-2 text-center text-xs text-white opacity-0 transition duration-200 ease-in-out group-hover:opacity-100">
                    Toggle Map Legend
                  </div>
                  <button
                    className="pointer-events-auto transform rounded-full border-2 bg-white p-2 text-white drop-shadow-xl transition-transform duration-500 ease-in-out hover:scale-110 hover:border-green-500"
                    onClick={() => {
                      setMapLegendState(!mapLegendState);
                    }}
                  >
                    {mapLegendState ? (
                      <RiMapPinRangeFill className="md:h-9/12 h-6 w-6 p-1 text-green-500 md:w-full lg:h-10 lg:w-10" />
                    ) : (
                      <RiMapPinRangeLine className="md:h-9/12 h-6 w-6 p-1 text-gray-500 group-hover:text-green-600 md:w-full lg:h-10 lg:w-10" />
                    )}
                  </button>
                </div>

                {/* Pathfinding Button */}
                <div className="group relative inline-block">
                  <div className="absolute right-full top-1/2 mr-2 w-32 -translate-y-1/2 transform rounded-lg bg-black px-3 py-2 text-center text-xs text-white opacity-0 transition duration-200 ease-in-out group-hover:opacity-100">
                    {status !== "inside"
                      ? "Directions"
                      : "Directions is disabled inside the building"}
                  </div>
                  <button
                    className={`pointer-events-auto transform rounded-full border-2 ${status !== "inside" ? "bg-white transition-transform duration-500 ease-in-out hover:scale-110 hover:border-green-500" : "bg-gray-400"} p-2 text-white drop-shadow-xl `}
                    onClick={() => {
                      if (status !== "inside") {
                        setPathFindingClicked(true);

                        if (minimized) {
                          setMinimized(false);
                        }
                      } else {
                        null;
                      }
                    }}
                  >
                    <GiPathDistance
                      className={`md:h-9/12 h-6 w-6 ${pathFindingClicked ? "text-green-600" : "text-gray-500"} ${status !== "inside" && "group-hover:text-green-600"}  md:w-full lg:h-10 lg:w-10`}
                    />
                  </button>
                </div>
                {/* Pathfinding Button */}
              </div>
              {/* Current Location Button */}
            </div>
            {/* Bottom Right Buttons */}
          </div>
          {mapState && bldgModalState ? (
            <BuildingModal
              visible={bldgModalState}
              onClose={() => setBldgModalState(false)}
              infosDB={infosDB}
              scene={targetScene}
            />
          ) : null}

          {/* Content Space */}

          {/* Footer Space */}
          <div className="py-10 md:hidden" />
        </div>
      )}
    </div>
  );

  // }
};

export default MapModule;
