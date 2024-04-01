/* React */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Navigation Function

/* Components */
import Helpmodal from "./helpmodal"; // Help Modal
import Sharelink from "./Sharelink"; // Share Modal
import Bugmodal from "./Bugmodal"; // Bug Modal
import MapModule from "../../mapmodule/Map.jsx"; // Map Module

/* Icons */
import { VscFeedback } from "react-icons/vsc"; // Feedback Button
import { FiLink } from "react-icons/fi"; // Share Button
import { GrMap } from "react-icons/gr"; // Map Button
import { IoMdSearch } from "react-icons/io"; // Search Button
import { PiPlayCircleLight } from "react-icons/pi"; // Autoplay Button
import { TbMaximize, TbMaximizeOff } from "react-icons/tb"; // Fullscreen On/Off
import { IoIosHelpCircleOutline } from "react-icons/io"; // Help Button
import { Tb360View } from "react-icons/tb"; // 360 Icon

const Navigationbar = ({ toggleAutoplay, location }) => {
  /* States */
  const [mapState, setMapState] = useState(false); // Map State
  const [isFullscreen, setIsFullscreen] = useState(false); // Fullscreen State
  const [Showmodal, setShowmodal] = useState(false); // Help Modal State
  const handleclose = () => setShowmodal(false); // Function to change Help Modal
  const [Sharemodal, setShowSharemodal] = useState(false); // Share Modal State
  const handlecloseShare = () => setShowSharemodal(false); // Function to change Share Modal
  const [Bugmdl, setShowBugmodal] = useState(false); // Bug Modal State
  const handlecloseBug = () => setShowBugmodal(false); // Function to change Bug Modal

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

  return (
    <div className="flex h-screen w-full flex-col justify-between pr-4">
      <div className="sticky start-0 top-4 z-20 mx-2 h-max w-full rounded-xl border-b border-gray-200 bg-white dark:border-gray-600">
        <div className="flex h-full items-center justify-between text-base">
          <div className="flex h-full w-auto items-center justify-between px-1 md:w-full lg:px-4">
            <div>
              <button
                type="button"
                onClick={() => navigate("/")}
                className="justify-cente flex h-12 w-12 items-center"
              >
                <span className="sr-only">Adventura Logo</span>
                <img
                  src="/assets/Module360/Icons/AdvenLogo.png"
                  alt="share button"
                  className="h-11 w-auto transition-all duration-200 hover:scale-110"
                />
              </button>
            </div>

            <div className="hidden md:flex">
              <button
                type="button"
                onClick={() => setMapState(false)}
                className="inline-flex h-14 w-14 items-center justify-center"
              >
                <span className="sr-only">360</span>
                <Tb360View
                  className={`size-12 text-green-600 transition-all duration-200 hover:size-14 ${!mapState ? "size-14 rounded-lg ring-2 ring-gray-600" : ""}`}
                />
              </button>
            </div>

            <div className="hidden md:flex">
              <button
                type="button"
                onClick={() => setMapState(true)}
                className="inline-flex h-14 w-14 items-center justify-center rounded-lg text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Map</span>
                <GrMap
                  size={35}
                  className="text-green-600 transition-all duration-200 hover:size-11"
                />
              </button>
            </div>

            <div className="hidden md:flex">
              <button
                type="button"
                onClick={null}
                className="inline-flex h-14 w-14 items-center justify-center rounded-lg text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Search</span>
                <IoMdSearch
                  size={35}
                  className="text-green-600 transition-all duration-200 hover:size-11"
                />
              </button>
            </div>

            <div className="hidden md:flex">
              <button
                type="button"
                onClick={() => setShowmodal(true)}
                className="inline-flex h-14 w-14 items-center justify-center rounded-lg text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Help</span>
                <IoIosHelpCircleOutline
                  size={37}
                  className="text-green-600 transition-all duration-200 hover:size-11"
                />
              </button>
            </div>
          </div>

          {/* LOCATION */}
          <div className="md:text-1xl flex h-full w-full items-center justify-center border-l-2 border-r-2 px-1 text-center font-roboto text-sm">
            {location.location !== undefined
              ? location.location
              : "Cavite State University Main Campus"}
          </div>
          {/* LOCATION */}

          <div className="flex h-full w-auto items-center justify-between px-1 md:w-full lg:px-4">
            <div className="hidden md:flex">
              <button
                type="button"
                onClick={() => setShowBugmodal(true)}
                className="inline-flex h-14 w-14 items-center justify-center rounded-lg text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Feedback</span>
                <VscFeedback
                  size={35}
                  className="text-green-600 transition-all duration-200 hover:size-10"
                />
              </button>
            </div>

            <div className="hidden md:flex">
              <button
                type="button"
                onClick={toggleAutoplay}
                className="inline-flex h-14 w-14 items-center justify-center rounded-lg text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Autoplay</span>
                <PiPlayCircleLight
                  size={40}
                  className="text-green-600 transition-all duration-200 hover:size-11"
                />
              </button>
            </div>

            <div className="hidden md:flex">
              <button
                type="button"
                onClick={() => setShowSharemodal(true)}
                className="inline-flex h-14 w-14 items-center justify-center rounded-lg text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Share</span>
                <FiLink
                  size={30}
                  className="text-green-600 transition-all duration-200 hover:size-9"
                />
              </button>
            </div>

            <div className="hidden md:flex">
              <button
                type="button"
                onClick={toggleFullscreen}
                className="inline-flex h-14 w-14 items-center justify-center rounded-lg text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Fullscreen</span>
                {isFullscreen ? (
                  <TbMaximizeOff
                    size={35}
                    className="text-green-600 transition-all duration-200 hover:size-11"
                  />
                ) : (
                  <TbMaximize
                    size={35}
                    className="text-green-600 transition-all duration-200 hover:size-11"
                  />
                )}
              </button>
            </div>

            <div>
              <button
                type="button"
                onClick={() => window.open("https://www.cvsu.edu.ph/")} // Redirect to CVSU website
                className="flex h-12 w-12 items-center  justify-center rounded-lg text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:focus:ring-gray-600"
              >
                <span className="sr-only">CVSU</span>
                <img
                  className="transition-all duration-200 hover:scale-110"
                  src="/assets/Module360/Icons/CvSULogo2.png"
                  alt="cvsu logo"
                />
              </button>
            </div>
          </div>
        </div>
        <Helpmodal onClose={handleclose} visible={Showmodal} />
        <Sharelink onClose={handlecloseShare} visible={Sharemodal} />
        <Bugmodal onClose={handlecloseBug} visible={Bugmdl} />
      </div>

      {/*MAP MODULE*/}
      {mapState && <MapModule currLoc={location.coords} />}

      {/*FOOTER*/}
      <div className="sticky bottom-0  start-0 top-4 z-20 mx-2 mb-4 h-14 w-full rounded-xl border-b md:hidden">
        <div className="flex h-full items-center justify-between px-2 text-base">
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setMapState(false)}
              className="inline-flex h-14 w-auto items-center justify-center"
            >
              <span className="sr-only">360</span>
              <Tb360View size={35} className="text-green-600" />
            </button>
          </div>

          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setMapState(true)}
              className="inline-flex h-14 w-auto items-center justify-center rounded-lg text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:focus:ring-gray-600"
            >
              <span className="sr-only">Map</span>
              <GrMap size={35} className="text-green-600" />
            </button>
          </div>

          <div className="flex md:hidden">
            <button
              type="button"
              onClick={null}
              className=" inline-flex h-14 w-auto items-center justify-center rounded-lg text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:focus:ring-gray-600"
            >
              <span className="sr-only">Search</span>
              <IoMdSearch size={35} className="text-green-600" />
            </button>
          </div>

          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setShowmodal(true)}
              className="inline-flex h-14 w-auto items-center justify-center rounded-lg text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:focus:ring-gray-600"
            >
              <span className="sr-only">Help</span>
              <IoIosHelpCircleOutline size={37} className="text-green-600" />
            </button>
          </div>

          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setShowBugmodal(true)}
              className="inline-flex h-14 w-auto items-center justify-center rounded-lg text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:focus:ring-gray-600"
            >
              <span className="sr-only">Feedback</span>
              <VscFeedback size={35} className="text-green-600" />
            </button>
          </div>

          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setShowSharemodal(true)}
              className="inline-flex h-14 w-auto items-center justify-center rounded-lg text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:focus:ring-gray-600"
            >
              <span className="sr-only">Share</span>
              <FiLink size={30} className="text-green-600" />
            </button>
          </div>

          <div className="flex md:hidden">
            <button
              type="button"
              onClick={toggleFullscreen}
              className="inline-flex h-14 w-auto items-center justify-center rounded-lg text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:focus:ring-gray-600"
            >
              <span className="sr-only">Fullscreen</span>
              {isFullscreen ? (
                <TbMaximizeOff size={35} className="text-green-600" />
              ) : (
                <TbMaximize size={35} className="text-green-600" />
              )}
            </button>
          </div>
        </div>
      </div>
      <Helpmodal
        onClose={() => {
          setShowmodal(false);
        }}
        visible={Showmodal}
      />
      <Sharelink
        onClose={() => {
          setShowSharemodal(false);
        }}
        visible={Sharemodal}
      />
      <Bugmodal
        onClose={() => {
          setShowBugmodal(false);
        }}
        visible={Bugmdl}
      />
    </div>
  );
};

export default Navigationbar;
