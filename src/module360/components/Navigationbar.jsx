/* React */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Navigation Function

/* Components */
import Helpmodal from "./helpmodal"; // Help Modal
import Sharelink from "./Sharelink"; // Share Modal
import Bugmodal from "./Bugmodal"; // Bug Modal
import MapModule from "../../mapmodule/Map.jsx"; // Map Module
import Search from "../../buildingmodule/Search"; // Search Modal
import BuildingModal from "../../buildingmodule/BuildingModal"; // Building Modal Component

/* Icons */
import { VscFeedback } from "react-icons/vsc"; // Feedback Button
import { GrMap } from "react-icons/gr"; // Map Button
import { IoMdSearch } from "react-icons/io"; // Search Button
import { PiPlayCircleLight } from "react-icons/pi"; // Autoplay Button
import { PiPlayCircleFill } from "react-icons/pi";
import { TbMaximize, TbMaximizeOff } from "react-icons/tb"; // Fullscreen On/Off
import { IoIosHelpCircleOutline } from "react-icons/io"; // Help Button
import { Tb360View } from "react-icons/tb"; // 360 Icon
import { TbLink } from "react-icons/tb"; // Share Link Icon
import { TbLinkOff } from "react-icons/tb"; // Share Link Icon OFF

import { TbMessageChatbot } from "react-icons/tb"; // Chatbot Icon

import { FaPersonWalkingArrowLoopLeft } from "react-icons/fa6"; // Exit Building Icon

const Navigationbar = ({
  toggleAutoplay,
  autoplay,
  location,

  infosDB,
  iconSet,
  loginType,
  openModal,
  bldgModalState,
  targetScene,
  onBldgModalClose,
  mode,
  changeScene,

  access,
  setAccess,

  mapState,
  setMapState,

  buildingsDB,
  internalDB,
  nodesDB,
  extrasDB,

  status,

  setPrevious_Scene,

  eventHandler,
  setTourState,
  select_Scene,

  exitFunction,
}) => {
  /* States */
  const [isFullscreen, setIsFullscreen] = useState(false); // Fullscreen State
  const [Showmodal, setShowmodal] = useState(getHelpState()); // Help Modal State
  const [Sharemodal, setShowSharemodal] = useState(false); // Share Modal State
  const [Bugmdl, setShowBugmodal] = useState(false); // Bug Modal State
  const [searchModal, setSearchModal] = useState(false); // Search Modal State

  function isAndroid() {
    return /Android/.test(navigator.userAgent);
  }

  const navigate = useNavigate(); // Navigation Function for Logo

  /* Fullscreen Function */
  useEffect(() => {
    // Fullscreen Change Event
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange,
      );
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullscreenChange,
      );
      document.removeEventListener(
        "MSFullscreenChange",
        handleFullscreenChange,
      );
    };
  }, []);

  function getHelpState() {
    // console.log("Help Function");
    const help = sessionStorage.getItem("helpState");
    // console.log("Help State: ", help);
    if (help === null) {
      // console.log("Displaying Help");
      return false;
    } else {
      // console.log("Not Displaying Help");
      return false;
    }
  }

  const toggleFullscreen = () => {
    // Toggle Fullscreen
    if (!isFullscreen) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        /* Safari */
        document.documentElement.webkitRequestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        /* IE11 */
        document.documentElement.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        /* Safari */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        /* IE11 */
        document.msExitFullscreen();
      }
    }
  };

  const [showTooltip, setShowTooltip] = useState({});

  const handleMouseEnter = (name) => {
    setShowTooltip({ ...showTooltip, [name]: true });
  };

  const handleMouseLeave = (name) => {
    setShowTooltip({ ...showTooltip, [name]: false });
  };

  return (
    <div className="flex h-dvh w-full flex-col justify-between">
      <div className=" sticky top-0 z-10  p-4">
        <div className=" h-max w-full rounded-xl border-b border-gray-200 bg-white dark:border-gray-600">
          <div className="flex h-full items-center justify-between text-base">
            <div className="flex h-full w-auto items-center justify-between px-1 md:w-full lg:px-4">
              <button
                onClick={() => navigate("/")}
                className="flex h-14 w-14 items-center justify-center"
                onMouseEnter={() => handleMouseEnter("button1")}
                onMouseLeave={() => handleMouseLeave("button1")}
              >
                {showTooltip["button1"] && (
                  <div className="tooltip absolute top-full mt-2 w-fit rounded-full border-2 border-green-600 bg-slate-50 px-2 py-1 text-center text-xs font-semibold">
                    Go to homepage
                  </div>
                )}
                <span className="sr-only">Adventura Logo</span>
                <img
                  src="/assets/Navigation Bar/adventura 360 logo.webp"
                  alt="share button"
                  className="h-12 w-auto transition-all duration-200 hover:scale-110"
                />
              </button>

              <div className="hidden md:flex">
                <button
                  type="button"
                  onClick={() => setMapState("mini")}
                  className="inline-flex h-14 w-14 items-center justify-center"
                  onMouseEnter={() => handleMouseEnter("button2")}
                  onMouseLeave={() => handleMouseLeave("button2")}
                >
                  {showTooltip["button2"] && (
                    <div className="tooltip absolute top-full mt-2 w-fit rounded-full border-2 border-green-600 bg-slate-50 px-2 py-1 text-center text-xs font-semibold">
                      360 view
                    </div>
                  )}
                  <span className="sr-only">360</span>
                  <Tb360View
                    className={`h-12 w-12 text-green-600 transition-all duration-200 hover:h-14 hover:w-14 ${
                      mapState !== "full" &&
                      !Showmodal &&
                      !Bugmdl &&
                      !Sharemodal
                        ? "h-14 w-14 rounded-lg ring-2 ring-gray-600"
                        : ""
                    }`}
                  />
                </button>
              </div>

              <div className="hidden md:flex">
                <button
                  type="button"
                  onClick={() => setMapState("full")}
                  className="inline-flex h-14 w-14 items-center justify-center"
                  onMouseEnter={() => handleMouseEnter("button3")}
                  onMouseLeave={() => handleMouseLeave("button3")}
                >
                  {showTooltip["button3"] && (
                    <div className="tooltip absolute top-full mt-2 w-fit rounded-full border-2 border-green-600 bg-slate-50 px-2 py-1 text-center text-xs font-semibold">
                      Map
                    </div>
                  )}
                  <span className="sr-only">Map</span>
                  <GrMap
                    className={`h-12 w-12 text-green-600 transition-all duration-200 hover:h-14 hover:w-14 ${mapState === "full" && "h-14 w-14 rounded-lg ring-2 ring-gray-600"}`}
                  />
                </button>
              </div>

              <div className="hidden md:flex">
                <button
                  type="button"
                  onClick={() => setSearchModal(true)}
                  className="inline-flex h-14 w-14 items-center justify-center"
                  onMouseEnter={() => handleMouseEnter("button4")}
                  onMouseLeave={() => handleMouseLeave("button4")}
                >
                  {showTooltip["button4"] && (
                    <div className="tooltip absolute top-full mt-2 w-fit rounded-full border-2 border-green-600 bg-slate-50 px-2 py-1 text-center text-xs font-semibold">
                      Search
                    </div>
                  )}
                  <span className="sr-only">Search</span>
                  <IoMdSearch className="h-12 w-12 text-green-600 transition-all duration-200 hover:h-14 hover:w-14" />
                </button>
              </div>

              <div className="hidden md:flex">
                <button
                  type="button"
                  onClick={() => {
                    setShowmodal(true);
                  }}
                  className="inline-flex h-14 w-14 items-center justify-center"
                  onMouseEnter={() => handleMouseEnter("button5")}
                  onMouseLeave={() => handleMouseLeave("button5")}
                >
                  {showTooltip["button5"] && (
                    <div className="tooltip absolute top-full mt-2 w-fit rounded-full border-2 border-green-600 bg-slate-50 px-2 py-1 text-center text-xs font-semibold">
                      Help
                    </div>
                  )}
                  <span className="sr-only">Help</span>
                  <IoIosHelpCircleOutline
                    className={`h-12 w-12 text-green-600 transition-all duration-200 hover:h-14 hover:w-14 ${Showmodal ? "h-14 w-14 rounded-lg ring-2 ring-gray-600" : ""}`}
                  />
                </button>
              </div>
            </div>

            <div className="md:text-1xl flex h-full w-full items-center justify-center border-l-2 border-r-2 px-1 text-center font-roboto text-sm">
              {location.location !== undefined
                ? location.location
                : "Cavite State University Main Campus"}
            </div>

            <div className="flex h-full w-auto items-center justify-between px-1 md:w-full lg:px-4">
              <div className="hidden md:flex">
                <button
                  type="button"
                  onClick={() => {
                    setShowBugmodal(true);
                    setMapState(false);
                  }}
                  className="inline-flex h-14 w-14 items-center justify-center"
                  onMouseEnter={() => handleMouseEnter("button6")}
                  onMouseLeave={() => handleMouseLeave("button6")}
                >
                  {showTooltip["button6"] && (
                    <div className="tooltip absolute top-full mt-2 w-fit rounded-full border-2 border-green-600 bg-slate-50 px-2 py-1 text-center text-xs font-semibold">
                      Feedback
                    </div>
                  )}
                  <span className="sr-only">Feedback</span>
                  <VscFeedback
                    className={`h-11 w-11 text-green-600 transition-all duration-200 hover:h-14 hover:w-14 ${Bugmdl ? "h-14 w-14 rounded-lg ring-2 ring-gray-600" : ""}`}
                  />
                </button>
              </div>

              <div className="hidden md:flex">
                <button
                  type="button"
                  onClick={() => {
                    sessionStorage.setItem("helpState", "false");
                    toggleAutoplay();
                  }}
                  className="inline-flex h-14 w-14 items-center justify-center"
                  onMouseEnter={() => handleMouseEnter("button7")}
                  onMouseLeave={() => handleMouseLeave("button7")}
                >
                  {showTooltip["button7"] && (
                    <div className="tooltip absolute top-full mt-2 w-fit rounded-full border-2 border-green-600 bg-slate-50 px-2 py-1 text-center text-xs font-semibold">
                      Autoplay
                    </div>
                  )}
                  <span className="sr-only">Autoplay</span>
                  {autoplay ? (
                    <PiPlayCircleFill className="h-12 w-12 text-green-600 transition-all duration-200 hover:h-14 hover:w-14" />
                  ) : (
                    <PiPlayCircleLight className="h-12 w-12 text-green-600 transition-all duration-200 hover:h-14 hover:w-14" />
                  )}
                </button>
              </div>

              <div className="hidden md:flex">
                <button
                  type="button"
                  onClick={() => {
                    if (access !== "private") {
                      setShowSharemodal(true);
                      setMapState(false);
                    } else {
                      alert("You are not allowed to share this view.");
                    }
                  }}
                  className="inline-flex h-14 w-14 items-center justify-center"
                  onMouseEnter={() => handleMouseEnter("button8")}
                  onMouseLeave={() => handleMouseLeave("button8")}
                >
                  {showTooltip["button8"] && (
                    <div className="tooltip absolute top-full mt-2 w-fit rounded-full border-2 border-green-600 bg-slate-50 px-2 py-1 text-center text-xs font-semibold">
                      Share
                    </div>
                  )}
                  <span className="sr-only">Share</span>
                  {access !== "private" ? (
                    <TbLink
                      className={`h-10 w-10 text-green-600 transition-all duration-200 hover:h-14 hover:w-14 ${Sharemodal ? "h-14 w-14 rounded-lg ring-2 ring-gray-600" : ""}`}
                    />
                  ) : (
                    <TbLinkOff
                      className={`h-10 w-10 text-green-600 transition-all duration-200 hover:h-14 hover:w-14 ${Sharemodal ? "h-14 w-14 rounded-lg ring-2 ring-gray-600" : ""}`}
                    />
                  )}
                </button>
              </div>

              <div className="hidden md:flex">
                <button
                  type="button"
                  onClick={toggleFullscreen}
                  className="inline-flex h-14 w-14 items-center justify-center"
                  onMouseEnter={() => handleMouseEnter("button9")}
                  onMouseLeave={() => handleMouseLeave("button9")}
                >
                  {showTooltip["button9"] && (
                    <div className="tooltip absolute top-full mt-2 w-fit rounded-full border-2 border-green-600 bg-slate-50 px-2 py-1 text-center text-xs font-semibold">
                      Fullscreen
                    </div>
                  )}
                  <span className="sr-only">Fullscreen</span>
                  {isFullscreen ? (
                    <TbMaximizeOff className="h-10 w-10 text-green-600 transition-all duration-200 hover:size-12" />
                  ) : (
                    <TbMaximize className="h-10 w-10 text-green-600 transition-all duration-200 hover:size-12" />
                  )}
                </button>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => window.open("https://www.cvsu.edu.ph/")} // Redirect to CVSU website
                  className="flex h-12 w-12 items-center justify-center"
                  onMouseEnter={() => handleMouseEnter("button10")}
                  onMouseLeave={() => handleMouseLeave("button10")}
                >
                  {showTooltip["button10"] && (
                    <div className="tooltip absolute top-full mt-2 w-fit rounded-full border-2 border-green-600 bg-slate-50 px-2 py-1 text-center text-xs font-semibold">
                      Visit CvSU Website
                    </div>
                  )}
                  <img
                    className="transition-all duration-200 hover:scale-110"
                    src="/assets/Navigation Bar/CvSU logo.webp"
                    alt="cvsu logo"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*FOOTER*/}
      <div className="sticky bottom-0 start-0 z-10 mb-4 flex h-14 w-full items-center justify-center  p-4 md:hidden">
        <div className="w-full rounded-xl border-b bg-white p-2 ">
          <div className="flex h-full items-center justify-between text-base">
            <div className="flex md:hidden">
              <button
                type="button"
                onClick={() => setMapState("mini")}
                className="inline-flex h-10 w-10 items-center justify-center"
              >
                <span className="sr-only">360</span>
                <Tb360View
                  className={`h-8 w-8 text-green-600 transition-all duration-200 hover:h-14 hover:w-14 ${
                    mapState !== "full" &&
                    !Showmodal &&
                    !Bugmdl &&
                    !Sharemodal &&
                    "h-10 w-10 rounded-lg ring-2 ring-gray-600"
                  }`}
                />
              </button>
            </div>

            <div className="flex md:hidden">
              <button
                type="button"
                onClick={() => setMapState("full")}
                className="inline-flex h-10 w-10 items-center justify-center"
              >
                <span className="sr-only">Map</span>
                <GrMap
                  className={`h-8 w-8 text-green-600 transition-all duration-200 hover:h-14 hover:w-14 ${mapState === "full" && "h-14 w-14 rounded-lg ring-2 ring-gray-600"}`}
                />
              </button>
            </div>

            <div className="flex md:hidden">
              <button
                type="button"
                onClick={() => setSearchModal(true)}
                className="inline-flex h-10 w-10 items-center justify-center"
              >
                <span className="sr-only">Search</span>
                <IoMdSearch className="h-8 w-8 text-green-600 transition-all duration-200" />
              </button>
            </div>

            <div className="flex md:hidden">
              <button
                type="button"
                onClick={() => {
                  setShowmodal(true);
                }}
                className="inline-flex h-10 w-10 items-center justify-center"
              >
                <span className="sr-only">Help</span>
                <IoIosHelpCircleOutline
                  className={`h-8 w-8 text-green-600 transition-all duration-200 hover:h-14 hover:w-14 ${Showmodal ? "h-14 w-14 rounded-lg ring-2 ring-gray-600" : ""}`}
                />
              </button>
            </div>

            <div className="flex md:hidden">
              <button
                type="button"
                onClick={() => {
                  setShowBugmodal(true);
                  setMapState(false);
                }}
                className="inline-flex h-10 w-10 items-center justify-center"
              >
                <span className="sr-only">Feedback</span>
                <VscFeedback
                  className={`h-8 w-8 text-green-600 transition-all duration-200 hover:h-14 hover:w-14 ${Bugmdl ? "h-14 w-14 rounded-lg ring-2 ring-gray-600" : ""}`}
                />
              </button>
            </div>

            <div className="flex md:hidden">
              <button
                type="button"
                onClick={() => {
                  sessionStorage.setItem("helpState", "false");
                  toggleAutoplay();
                }}
                className="inline-flex h-10 w-10 items-center justify-center"
              >
                <span className="sr-only">Autoplay</span>
                {autoplay ? (
                  <PiPlayCircleFill className="h-8 w-8 text-green-600 transition-all duration-200 hover:h-14 hover:w-14" />
                ) : (
                  <PiPlayCircleLight className="h-8 w-8 text-green-600 transition-all duration-200 hover:h-14 hover:w-14" />
                )}
              </button>
            </div>

            <div className="flex md:hidden">
              <button
                type="button"
                onClick={() => {
                  if (access !== "private") {
                    setShowSharemodal(true);
                    setMapState(false);
                  } else {
                    alert("You are not allowed to share this link.");
                  }
                }}
                className="inline-flex h-10 w-10 items-center justify-center"
              >
                <span className="sr-only">Share</span>
                {access !== "private" ? (
                  <TbLink
                    className={`h-8 w-8 text-green-600 transition-all duration-200 hover:h-14 hover:w-14 ${Sharemodal ? "h-14 w-14 rounded-lg ring-2 ring-gray-600" : ""}`}
                  />
                ) : (
                  <TbLinkOff
                    className={`h-8 w-8 text-green-600 transition-all duration-200 hover:h-14 hover:w-14 ${Sharemodal ? "h-14 w-14 rounded-lg ring-2 ring-gray-600" : ""}`}
                  />
                )}
              </button>
            </div>

            {isAndroid() && (
              <div className="flex md:hidden">
                <button
                  type="button"
                  onClick={toggleFullscreen}
                  className="inline-flex h-10 w-10 items-center justify-center"
                >
                  <span className="sr-only">Fullscreen</span>
                  {isFullscreen ? (
                    <TbMaximizeOff className="h-8 w-auto text-green-600" />
                  ) : (
                    <TbMaximize className="h-8 w-auto text-green-600" />
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/*MAP MODULE*/}

      <div
        className={`${mapState === "full" ? "absolute h-dvh w-full flex-col justify-between" : "pointer-events-auto absolute left-0 top-20 text-white"}`}
      >
        <div
          className={`${mapState !== "full" && "relative flex flex-col justify-between pl-5"}`}
        >
          <div
            className={`${mapState === "full" && "flex items-center gap-10"}`}
          >
            <div className={`${mapState === "fulll" && "relative"}`}>
              <MapModule
                currLoc={location}
                nodesDB={nodesDB}
                buildingsDB={buildingsDB}
                extrasDB={extrasDB}
                infosDB={infosDB}
                iconsSet={iconSet}
                openBldgModal={openModal}
                status={status}
                mapState={mapState}
              />

              <div className="group inline-block">
                {/* Adjusted for inline positioning */}
                <button
                  className="relative flex h-12 w-12 transform flex-row items-center  justify-center rounded-full border-2 border-transparent bg-white p-2 transition-transform duration-500 ease-in-out hover:scale-110 hover:border-green-500"
                  onClick={() => {
                    setTourState(true);
                    eventHandler(select_Scene.scene, true);
                  }}
                >
                  <TbMessageChatbot
                    size={50}
                    style={{ stroke: "green", fill: "white" }}
                  />
                  <div className="pointer-events-none absolute left-12 z-10 w-32 transform items-center justify-center rounded-lg bg-white p-2 text-center font-sans text-sm font-semibold text-gray-500 opacity-0 shadow-xl transition duration-200 ease-in-out group-hover:opacity-100">
                    Tour Guide
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Exit Building */}
          {status === "outside" && (
            <div className="group pointer-events-auto relative flex h-12 w-12">
              <button
                className="flex h-12 w-12 transform items-center justify-center rounded-full border-2 border-transparent bg-orange-400 p-2 transition-transform duration-500 ease-in-out hover:scale-110 hover:border-white"
                onClick={() => {
                  exitFunction();
                }}
              >
                <FaPersonWalkingArrowLoopLeft size={30} />
              </button>
              <div className=" absolute left-full top-1/2 ml-2 flex w-32 -translate-y-1/2 transform items-center justify-center rounded-lg bg-orange-400 p-2 text-center font-sans text-sm font-semibold text-white opacity-0 shadow-xl transition duration-200 ease-in-out group-hover:opacity-100">
                Exit
              </div>
            </div>
          )}
        </div>
      </div>

      {Showmodal && (
        <Helpmodal
          onClose={() => {
            setShowmodal(false);
          }}
          visible={Showmodal}
        />
      )}

      {Sharemodal && (
        <Sharelink
          onClose={() => {
            setShowSharemodal(false);
          }}
          visible={Sharemodal}
        />
      )}

      {Bugmdl && (
        <Bugmodal onClose={() => setShowBugmodal(false)} visible={Bugmdl} />
      )}

      {searchModal && (
        <Search
          onClose={() => {
            setSearchModal(false);
          }}
          visible={searchModal}
          infosDB={infosDB}
          openBldgModal={openModal}
        />
      )}

      {bldgModalState && (
        <BuildingModal
          visible={bldgModalState}
          onClose={onBldgModalClose}
          loginType={loginType}
          infosDB={infosDB}
          internalDB={internalDB}
          scene={targetScene}
          iconSet={iconSet}
          openShareModal={() => setShowSharemodal(true)}
          shareModal={Sharemodal}
          mode={mode}
          changeScene={changeScene}
          setMapState={setMapState}
          setAccess={setAccess}
          closeSearch={() => {
            setSearchModal(false);
          }}
          setSearchModal={setSearchModal}
          searchModal={searchModal}
          status={status}
          buildingsDB={buildingsDB}
          setPrevious_Scene={setPrevious_Scene}
        />
      )}
    </div>
  );
};

export default Navigationbar;
