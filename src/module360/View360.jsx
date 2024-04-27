import React, { useEffect, useState } from "react"; // React Hooks
import axios from "axios"; // Axios for API requests
import Module360 from "./Module360";

/* Local DB */
import nodesLDB from "../database/Nodes.json";
import buildingsLDB from "../database/Buildings.json";
import extrasLDB from "../database/Extras.json";

function View360({ BACKEND_URL, loginType }) {
  /* Fetch DB */

  const [nodesDB, setNodesDB] = useState([]); // Nodes Database
  const [buildingsDB, setBuildingsDB] = useState([]); // Buildings Database
  const [extrasDB, setExtrasDB] = useState([]); // Extras Database
  const [isLoaded, setIsLoaded] = useState(false); // Data Loaded

  useEffect(() => {
    Promise.all([
      axios.get(`${BACKEND_URL}/getNodes`),
      axios.get(`${BACKEND_URL}/getBuildings`),
      axios.get(`${BACKEND_URL}/getExtras`),
    ])
      .then(([nodes, buildings, extras]) => {
        setNodesDB(nodes.data);
        setBuildingsDB(buildings.data);
        setExtrasDB(extras.data);
        setIsLoaded(true);
      })
      .catch((err) => {
        console.log("Login Error:", err.message);
        setNodesDB(nodesLDB);
        setBuildingsDB(buildingsLDB);
        setExtrasDB(extrasLDB);
        setIsLoaded(true);
      });
  }, []);

  return (
    <>
      {isLoaded && (
        <Module360
          nodesDB={nodesDB}
          buildingsDB={buildingsDB}
          extrasDB={extrasDB}
          loginType={loginType}
        />
      )}
    </>
  );
}

export default View360;
