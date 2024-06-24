import React, { useEffect } from "react";
import "./Minimap.css";
import OpenSeadragon from "openseadragon";

const Minimap = ({ x, y, onClick, previous_Scene, buildingsDB, extrasDB }) => {
  // Map Button mount
  useEffect(() => {
    /* Coordinates */
    const currentLoc = new OpenSeadragon.Point(x, y); // Current Point Location

    const prevLoc = new OpenSeadragon.Point(
      previous_Scene.coords.x,
      previous_Scene.coords.y,
    ); // Previous Point Location

    const overlayElement = document.createElement("div"); // Adding element for the overlay

    overlayElement.className = "dot"; // Associating CSS for a dot in MapButton.css

    const viewer = new OpenSeadragon({
      id: "viewer",
      prefixUrl: "/assets/images/",
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
      showNavigationControl: false, // Hides the navigation control
      defaultZoomLevel: 10, // The default zoom level
      minZoomLevel: 7, // The minimum zoom level
      maxZoomLevel: 7, // Max zoom level
      animationTime: 2.0, // Animation time when Panning
      mouseNavEnabled: true, // Enable mouse navigation
      gestureNavEnabled: true, // Enable gesture navigation
      visibilityRatio: 1.0, // The visibility ratio
      constrainDuringPan: true, // Whether to constrain during pan
    });

    // OSD event that triggers component mount
    viewer.addHandler("open", function () {
      viewer.viewport.panTo(prevLoc, true); // Starts from previous location
      viewer.viewport.panTo(currentLoc); // Pans to current location
    });

    // Adds the overlay in the current location of the user
    viewer.addOverlay({
      element: overlayElement, // The HTML element to use as the overlay
      location: currentLoc, // The location of the overlay, as a rectangle in normalized coordinates [x, y, width, height]
      placement: OpenSeadragon.Placement.CENTER, // The placement of the overlay, as a string
    });

    return () => {
      // Clean up OpenSeadragon viewer prevents multiple map button
      viewer.destroy();
    };
  }, [x, y, previous_Scene.coords.x, previous_Scene.coords.y]);

  return (
    <div className="opacity-0.5 opacity-0.9 flex h-20 w-36 md:h-20 md:w-40 lg:h-40 lg:w-80 overflow-hidden rounded-2xl border-black">
      <button
        className="h-20 w-36 md:h-20 md:w-40 lg:h-40 lg:w-80"
        id="viewer"
        onClick={onClick}
      />
    </div>
  );
};
export default Minimap;
