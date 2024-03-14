import React, { useEffect, useRef } from "react";
import OpenSeadragon from "openseadragon";

const MapButton = ({ currLoc, handleButtonClick }) => {
  const osdRef = useRef();
  let viewer;

  // Map Button mount
  useEffect(() => {
    viewer = new OpenSeadragon({
      element: osdRef.current,
      prefixUrl: "/assets/images/",
      tileSources: { type: "image", url: "/assets/Map/with nodes.svg" },
      defaultZoomLevel: 2,
      minZoomLevel: 2,
      animationTime: 2.0, // Animation time when Panning
      visibilityRatio: 1.0, // The visibility ratio
      constrainDuringPan: true, // Whether to constrain during pa
      showNavigationControl: false, // Hides the navigation control
    });

    return () => {
      // Clean up OpenSeadragon viewer prevents multiple map button
      viewer.destroy();
    };
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 2,
      }}
    >
      <div ref={osdRef} style={{ width: "100%", height: "100vh" }} />
    </div>
  );
};
export default MapButton;
