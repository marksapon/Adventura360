import React, { useEffect } from "react";
import "./MapButton.css";
import OpenSeadragon from "openseadragon";

const MapButton = ({ x, y, onClick, previous_Scene }) => {
  // Map Button mount
  useEffect(() => {
    /* Coordinates */
    const currentLoc = new OpenSeadragon.Point(x, y); // Current Point Location

    const prevLoc = new OpenSeadragon.Point(
      previous_Scene.coords.x,
      previous_Scene.coords.y
    ); // Previous Point Location

    const overlayElement = document.createElement("div"); // Adding element for the overlay

    overlayElement.className = "dot"; // Associating CSS for a dot in MapButton.css

    const viewer = new OpenSeadragon({
      id: "viewer",
      prefixUrl: "/assets/images/",
      tileSources: { type: "image", url: "/assets/Map/with nodes.svg" },
      showNavigationControl: false, // Hides the navigation control
      defaultZoomLevel: 10, // The default zoom level
      minZoomLevel: 10, // The minimum zoom level
      maxZoomLevel: 10, // Max zoom level
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

    // OSD event that triggers when the canva was clicked
    viewer.addHandler("canvas-click", function (event) {
      const viewportPoint = viewer.viewport.pointFromPixel(event.position); // The position of the click in viewport coordinates
      console.log(
        `Clicked at viewport coordinates: ${viewportPoint.x.toFixed(
          3
        )}, ${viewportPoint.y.toFixed(3)}`
      );
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
    <div className="overflow-hidden rounded-xl flex border border-black w-fit opacity-[0.90]">
      <button
        className="w-[172px] h-[90px] sm:w-[264px] sm:h-[152px] md:w-[336px] md:h-[172px] lg:w-[336px] lg:h-[172px]"
        id="viewer"
        onClick={onClick}
      />
    </div>
  );
};
export default MapButton;

/*A  

<button
        className="w-[172px] h-[90px] sm:w-[264px] sm:h-[152px] md:w-[336px] md:h-[172px] lg:w-[336px] lg:h-[172px]"
        id="viewer"
        onClick={onClick}
      />


const overlay = viewer.paperjsOverlay();

    // Create a new Paper.js path
    const path = new overlay.paper.Path();
    path.strokeColor = "black";

    // Add points to the path
    const point1 = new overlay.paper.Point(30, 75);
    const point2 = new overlay.paper.Point(30, 25);
    const point3 = new overlay.paper.Point(80, 25);

    path.add(point1);
    path.add(point2);
    path.add(point3);

    // Redraw the overlay
    overlay.paper.view.draw();
*/
