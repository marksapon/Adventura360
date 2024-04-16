import React, { useEffect, useRef } from "react";
import OpenSeadragon from "openseadragon";
import Paper, { Point, Path, Size } from "paper";

const OSD = () => {
  const viewerRef = useRef();
  const canvasRef = useRef();

  function scaleDownSize(getContentSize, scale) {
    const size = getContentSize;
    for (const key in size) {
      if (size.hasOwnProperty(key)) {
        size[key] = size[key] / scale;
      }
    }
    return size;
  }

  useEffect(() => {
    const viewer = new OpenSeadragon({
      element: viewerRef.current,
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
      maxZoomLevel: 7,
      minZoomLevel: 1,
    });

    viewer.addHandler("open", () => {
      Paper.setup(canvasRef.current);
      const viewSize = scaleDownSize(
        viewer.world.getItemAt(0).getContentSize(),
        4,
      );
      Paper.view.viewSize = new Size(viewSize.x, viewSize.y); //8000 , 11890.22556391
      const target = scaleDownSize(
        { x: 8659.987063961216, y: 27213.04982390368 },
        4,
      );
      const path = new Path();
      path.add(new Point(0, 0));
      path.add(new Point(target.x, target.y)); // 15074.73 26882.20
      path.strokeColor = "black";
      path.strokeWidth = 30;
      path.simplify(10);
      path.strokeCap = "round"; // Make the end of the path stroke rounded

      const bound = viewer.world.getItemAt(0).getBounds();

      viewer.addOverlay({
        element: canvasRef.current,
        location: bound,
      });

      viewer.addHandler("canvas-click", function (event) {
        var viewportPoint = viewer.viewport.pointFromPixel(event.position);
        var webPoint =
          viewer.viewport.viewportToImageCoordinates(viewportPoint);
        console.log(`Clicked at pixel: ${webPoint.x}, ${webPoint.y}`);
      });
    });

    return () => {
      viewer.destroy();
      // Also clear the Paper.js project when the component is unmounted
      canvasRef.current.clear();
    };
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        background: "gray",
      }}
    >
      <div ref={viewerRef} style={{ width: "100%", height: "100vh" }}></div>
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
        }}
      />
    </div>
  );
};

export default OSD;
