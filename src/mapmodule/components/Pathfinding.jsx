import React, { useEffect, useRef, forwardRef } from "react";
import { initOSDFabricJS } from "openseadragon-fabric";
import { fabric } from "fabric";

const Pathfinding = ({ viewer, currloc, targetLoc, pathFabric }) => {
  /* FabricJS Path Generation */
  useEffect(() => {
    console.log("useEffect Pathfinding");
    const edge = viewer.world.getItemAt(0).getBounds(); // Get the edge of the image (To be removed in final)

    // Points Data
    const points = [
      { x: 0, y: 0 },
      { x: edge.width, y: edge.height },
    ];

    // Convert points to Image Coordinates
    const pointsToImage = points.map((point) => {
      let value = viewer.viewport.viewportToImageCoordinates(point.x, point.y);
      console.log("Value:", value);
      return (value = { x: value.x.toFixed(3), y: value.y.toFixed(3) });
    });

    // Generate the path string
    const pathData = pointsToImage
      .map((point, index) => {
        const command = index === 0 ? "M" : "L"; // 'M' for Move To, 'L' for Line To
        return `${command} ${point.x} ${point.y}`;
      })
      .join(" ");

    // Create a new path with the path string
    const path = new fabric.Path(pathData, {
      fill: "none",
      stroke: "#000000",
      strokeWidth: 100,
    });

    pathFabric(path); // Pass the Fabric Path to parent component
  }, []);
};

export default Pathfinding;
