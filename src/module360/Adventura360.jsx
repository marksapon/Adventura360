import React, { useEffect, useState } from "react"; // React Hooks
import axios from "axios"; // Axios for API requests
import Module360 from "./Module360";

/* Local DB */
import nodesLDB from "../database/Nodes.json";
import buildingsLDB from "../database/Buildings.json";
import extrasLDB from "../database/Extras.json";
import infosLDB from "../database/Infos.json";

function Adventura360({ BACKEND_URL, loginType }) {
  /* Fetch DB */

  const [nodesDB, setNodesDB] = useState([]); // Nodes Database
  const [buildingsDB, setBuildingsDB] = useState([]); // Buildings Database
  const [extrasDB, setExtrasDB] = useState([]); // Extras Database
  const [infosDB, setInfosDB] = useState([]); // Infos Database
  const [isLoaded, setIsLoaded] = useState(false); // Data Loaded

  useEffect(() => {
    Promise.all([
      axios.get(`${BACKEND_URL}/getNodes`),
      axios.get(`${BACKEND_URL}/getBuildings`),
      axios.get(`${BACKEND_URL}/getExtras`),
      axios.get(`${BACKEND_URL}/getInfos`),
    ])
      .then(([nodes, buildings, extras, infos]) => {
        setNodesDB(nodes.data);
        setBuildingsDB(buildings.data);
        setExtrasDB(extras.data);
        setInfosDB(infos.data);
        setIsLoaded(true);
      })
      .catch((err) => {
        console.log("ERROR OCCURED");
        console.log("Error:", err.message);
        setNodesDB(nodesLDB);
        setBuildingsDB(buildingsLDB);
        setExtrasDB(extrasLDB);
        setInfosDB(infosLDB);
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
          infosDB={infosDB}
        />
      )}
      {!isLoaded && <div>Loading...</div>}
    </>
  );
}

export default Adventura360;
