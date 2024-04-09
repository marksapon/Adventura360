import React, { useEffect, useState, useRef } from "react";
import OpenSeadragon from "openseadragon";
import { initOSDFabricJS } from "openseadragon-fabric";
import { fabric } from "fabric";

const SvgOverlay = ({}) => {
  const [viewer, setViewer] = useState();
  const osdRef = useRef();

  useEffect(() => {
    initOSDFabricJS();

    const viewerInstance = new OpenSeadragon({
      element: osdRef.current,
      prefixUrl: "/assets/images/",
      tileSources: [
        {
          type: "zoomifytileservice",
          width: 21280,
          height: 31628,
          tilesUrl: "/assets/MapModule/Adventura_Map/",
          tileSize: 256,
          fileFormat: "webp",
        },
      ],
      defaultZoomLevel: 1,
      maxZoomLevel: 7, // Modify this to limit the zoom level to the level which pixels are not blurred
      minZoomLevel: 1,
    });

    const fabricOverlay = viewerInstance.fabricOverlay({
      fabricCanvasOptions: { selection: false },
    });

    // Define points for the path
    const points = [
      { x: 0, y: 0 },
      { x: 21280, y: 31628 }, // Closing the path
    ];

    // Convert points to SVG path string
    const pathData = points
      .map((point, index) => {
        const command = index === 0 ? "M" : "L"; // 'M' for Move To, 'L' for Line To
        return `${command} ${point.x} ${point.y}`;
      })
      .join(" ");

    console.log(pathData);

    // Create a new path with the path string
    const path = new fabric.Path(pathData, {
      fill: "none",
      stroke: "#000000",
      strokeWidth: 100,
    });

    // Add the path to the canvas
    fabricOverlay.fabricCanvas().add(path);

    // Create a new circle
    const circle = new fabric.Circle({
      radius: 50,
      fill: "red",
      left: points[0].x,
      top: points[0].y,
    });

    // Add the circle to the canvas
    fabricOverlay.fabricCanvas().add(circle);

    fabricOverlay.fabricCanvas().remove(circle);

    setViewer(viewerInstance);
  }, []);

  return (
    <div className="h-screen w-screen bg-black">
      <div ref={osdRef} style={{ width: "100%", height: "100vh", zIndex: 3 }} />
    </div>
  );
};

export default SvgOverlay;
