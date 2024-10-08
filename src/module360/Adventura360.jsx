import React, { useEffect, useState } from "react"; // React Hooks
import axios from "axios"; // Axios for API requests
import Module360 from "./Module360";

function Adventura360({ BACKEND_URL, loginType }) {
  /* Fetch DB */

  const [nodesDB, setNodesDB] = useState([]); // Nodes Database
  const [buildingsDB, setBuildingsDB] = useState([]); // Buildings Database
  const [extrasDB, setExtrasDB] = useState([]); // Extras Database
  const [infosDB, setInfosDB] = useState([]); // Infos Database
  const [internalDB, setInternalDB] = useState([]); // Internal DB
  const [eventsDB, setEventsDB] = useState([]); // Events Database
  const [charactersDB, setCharactersDB] = useState([]); // Characters Database

  const [isLoaded, setIsLoaded] = useState(false); // Data Loaded

  useEffect(() => {
    /* Backend Server (DO NOT DELETE)*/
    Promise.all([
      axios.get(`${BACKEND_URL}/getNodes`),
      axios.get(`${BACKEND_URL}/getBuildings`),
      axios.get(`${BACKEND_URL}/getExtras`),
      axios.get(`${BACKEND_URL}/getInfos`),
      axios.get(`${BACKEND_URL}/getInternalNodes`),
      axios.get(`${BACKEND_URL}/getCharacters`),
      axios.get(`${BACKEND_URL}/getEvents`),
    ])
      .then(
        ([
          nodes,
          buildings,
          extras,
          infos,
          internal_nodes,
          events,
          characters,
        ]) => {
          setNodesDB(nodes.data);
          setBuildingsDB(buildings.data);
          setExtrasDB(extras.data);
          setInfosDB(infos.data);
          setInternalDB(internal_nodes.data);
          setCharactersDB(events.data);
          setEventsDB(characters.data);
          console.log("Data Fetched");
          setTimeout(() => {
            setIsLoaded(true);
          }, 3000);
        },
      )
      .catch((err) => {
        console.log("ERROR OCCURED");
        console.log("Error:", err.message);
        alert("Error Occured. Loading Local Database...");
      });
  }, []);

  return (
    <div
      className="flex h-dvh w-screen items-center justify-center"
      style={{ cursor: "default" }}
      tabIndex="-1"
    >
      {isLoaded && (
        <Module360
          loginType={loginType}
          nodesDB={nodesDB}
          buildingsDB={buildingsDB}
          extrasDB={extrasDB}
          infosDB={infosDB}
          internalDB={internalDB}
          eventsDB={eventsDB}
          charactersDB={charactersDB}
        />
      )}

      {!isLoaded && (
        <div
          className="flex h-dvh w-screen flex-col items-center justify-center"
          style={{ cursor: "default" }}
        >
          <div className="absolute bottom-96 z-50 flex h-auto w-full flex-col items-center justify-center md:bottom-72">
            <img
              className="absolute bottom-0 mx-auto w-3/12 animate-bounce object-contain md:w-2/12 lg:w-2/12"
              src="/assets/Login Module/adventura logo 2.webp"
              alt="Loading"
            />
            <div className="ripple mx-auto border-2 border-green-600"></div>
          </div>
          <div className="flex h-2/6 w-full flex-col items-center justify-end md:h-3/6">
            <h1 className="loading-dots flex font-bebas text-base font-bold tracking-wider text-green-700 text-opacity-70 drop-shadow-sm md:text-4xl">
              Please wait
            </h1>
          </div>
        </div>
      )}
    </div>
  );
}

export default Adventura360;
