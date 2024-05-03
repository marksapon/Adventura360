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
        setTimeout(() => {
          setIsLoaded(true);
        }, 3000);
      })
      .catch((err) => {
        console.log("ERROR OCCURED");
        console.log("Error:", err.message);
        setNodesDB(nodesLDB);
        setBuildingsDB(buildingsLDB);
        setExtrasDB(extrasLDB);
        setInfosDB(infosLDB);
        setTimeout(() => {
          setIsLoaded(true);
        }, 3000);
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
      {!isLoaded && (
        <div className="flex h-screen w-screen flex-col items-center justify-center">
          <div className="absolute bottom-96 z-50 flex h-auto w-full flex-col items-center justify-center md:bottom-72">
            <img
              className="absolute bottom-0 mx-auto w-3/12 animate-bounce object-contain md:w-2/12 lg:w-2/12"
              src="../public/assets/Login Module/adventura logo 2.webp"
              alt="Loading"
            />
            <div className="ripple mx-auto border-2 border-green-600"></div>
          </div>
          <div className="flex h-2/6 w-full flex-col items-center justify-end md:h-3/6">
            <h1 className="loading-dots flex text-base font-bold text-black md:text-2xl">
              Connecting to backend server
            </h1>
          </div>
        </div>
      )}
    </>
  );
}

export default Adventura360;
