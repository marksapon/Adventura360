import React, { useEffect, useRef } from "react";
import OpenSeadragon from "openseadragon";
/* eslint-disable */
import paper, { Point } from "paper";
/* eslint-enable */

const Pathfinding = ({ viewer, ref }) => {
  const canvasRef = useRef();

  // const size = viewer.world.getItemAt(0).getContentSize(); // Image Pixel Metric
  // console.log("Image Bounds: ", viewer.world.getItemAt(0).getBounds()); // Viewport Metric
  // console.log("Image Size:", size.x, size.y);
  // const canvas = canvasRef.current;

  // projectRef.current = new paper.Project(canvas); // Create a new paper project
  // projectRef.current.view.viewSize = new paper.Size(size.x, size.y); // Set the canvas dimensions to match the image size dimensions

  // // Define a set of points
  // const points = [
  //   new paper.Point(832.4519483368409, 2753.1338717669646),
  //   new paper.Point(884.9346235521599, 2738.8144472981171),
  //   new paper.Point(988.0039205462929, 2711.2296279081056),
  //   new paper.Point(1037.0642155577823, 2695.5967377278116),
  //   new paper.Point(1085.0933278575899, 2682.6743707887326),
  // ];

  // // PaperJS Path Settings
  // /* eslint-disable */
  // const path = new paper.Path({
  //   segments: points,
  //   strokeColor: "green",
  //   strokeWidth: 13,
  // });
  // /* eslint-enable */

  // // OpenSeadragon Add Overlay
  // viewer.addOverlay({
  //   // Adding PaperJS canvas to OpenSeadragon
  //   element: canvas,
  //   location: viewer.world.getItemAt(0).getBounds(),
  // });

  // // Add a 'canvas-click' event handler to the viewer
  // viewer.addHandler("canvas-click", function (event) {
  //   var viewportPoint = viewer.viewport.pointFromPixel(event.position);
  //   var webPoint = viewer.viewport.viewportToImageCoordinates(viewportPoint);
  //   console.log(`Clicked at pixel: ${webPoint.x}, ${webPoint.y}`);
  // });

  return <canvas ref={canvasRef} className="absolute left-0 top-0" />;
};

export default Pathfinding;
