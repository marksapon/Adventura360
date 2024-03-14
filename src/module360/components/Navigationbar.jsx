import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Helpmodal from "./helpmodal";
import Sharelink from "./Sharelink";
import Bugmodal from "./Bugmodal";
import { VscFeedback } from "react-icons/vsc"; // Feedback Button
import { FiLink } from "react-icons/fi"; // Share Button
import { GrMap } from "react-icons/gr"; // Map Button
import { IoMdSearch } from "react-icons/io"; // Search Button
import { PiPlayCircleLight } from "react-icons/pi"; // Autoplay Button
import { TbMaximize, TbMaximizeOff } from "react-icons/tb"; // Fullscreen On/Off
import Map from "../../mapmodule/Map";

const Navigationbar = ({ toggleAutoplay, location }) => {

  /* Custom button to control OSD */
  // const handleButtonClick = (viewer) => {
  //   // Pan to a specific location
  //   viewer.viewport.panTo(new OpenSeadragon.Point(1, 1));
  // };

  const [showMap, setShowMap] = useState(false);

  const [isFullscreen, setIsFullscreen] = useState(false);

  const [Showmodal, setShowmodal] = useState(false);
  const handleclose = () => setShowmodal(false);
  const [Sharemodal, setShowSharemodal] = useState(false);
  const handlecloseShare = () => setShowSharemodal(false);
  const [Bugmdl, setShowBugmodal] = useState(false);
  const handlecloseBug = () => setShowBugmodal(false);
  const navigate = useNavigate();

  useEffect(() => {
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
                className="flex h-12 w-12 items-center justify-center rounded-lg text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Adventura Logo</span>
                <img
                  src="/assets/Module360/Icons/AdvenLogo.png"
                  alt="share button"
                  className="h-11 w-auto"
                />
              </button>
            </div>

            <div className="hidden md:flex">
              <button
                type="button"
                onClick={() => setShowMap(!showMap)}
                className="inline-flex items-center w-14 h-14 justify-center text-sm text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Map</span>
                <GrMap size={35} className="text-green-600" />
              </button>
            </div>

            <div className="hidden md:flex">
              <button
                type="button"
                onClick={null}
                className="inline-flex h-14 w-14 items-center justify-center rounded-lg text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Search</span>
                <IoMdSearch size={35} className="text-green-600" />
              </button>
            </div>

            <div className="hidden md:flex">
              <button
                type="button"
                onClick={() => setShowmodal(true)}
                className="inline-flex h-14 w-14 items-center justify-center rounded-lg text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Help</span>
                <img
                  className="h-8 w-8 object-scale-down"
                  src="/assets/Module360/Icons/help_button.png"
                  alt=" "
                />
              </button>
            </div>
          </div>

          {/* LOCATION */}
          <div className="flex w-full h-full border-r-2 border-l-2 text-sm md:text-1xl px-1 items-center justify-center text-center md:min-w-[290px] font-roboto">
            {location.location !== undefined ? location.location : "Location"}
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
                <VscFeedback size={35} className="text-green-600" />
              </button>
            </div>

            <div className="hidden md:flex">
              <button
                type="button"
                onClick={toggleAutoplay}
                className="inline-flex h-14 w-14 items-center justify-center rounded-lg text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Autoplay</span>
                <PiPlayCircleLight size={40} className="text-green-600" />
              </button>
            </div>

            <div className="hidden md:flex">
              <button
                type="button"
                onClick={() => setShowSharemodal(true)}
                className="inline-flex h-14 w-14 items-center justify-center rounded-lg text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Share</span>
                <FiLink size={30} className="text-green-600" />
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
                  <TbMaximizeOff size={35} className="text-green-600" />
                ) : (
                  <TbMaximize size={35} className="text-green-600" />
                )}
              </button>
            </div>

            <div>
              <button
                type="button"
                onClick={null}
                className="flex h-12 w-12 items-center  justify-center rounded-lg text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Toggle Fullscreen</span>
                <img src="/assets/Module360/Icons/CvSULogo2.png" alt=" " />
              </button>
            </div>
          </div>
        </div>
        <Helpmodal onClose={handleclose} visible={Showmodal} />
        <Sharelink onClose={handlecloseShare} visible={Sharemodal} />
        <Bugmodal onClose={handlecloseBug} visible={Bugmdl} />
      </div>

      {/*MAP MODULE*/}
      {showMap && <Map handleButtonClick={handleButtonClick} />}

      {/*FOOTER*/}
      <div className="sticky bottom-0  start-0 top-4 z-20 mx-2 mb-4 h-14 w-full rounded-xl border-b border-gray-200 bg-white md:hidden dark:border-gray-600">
        <div className="flex h-full items-center justify-between px-2 text-base">
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setShowMap(!showMap)}
              className="inline-flex items-center w-14 h-14 justify-center text-sm text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:focus:ring-gray-600"
            >
              <span className="sr-only">Map</span>
              <GrMap size={35} className="text-green-600" />
            </button>
          </div>

          <div className="flex md:hidden">
            <button
              type="button"
              onClick={null}
              className="inline-flex h-14 w-14 items-center justify-center rounded-lg text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:focus:ring-gray-600"
            >
              <span className="sr-only">Search</span>
              <IoMdSearch size={35} className="text-green-600" />
            </button>
          </div>

          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setShowmodal(true)}
              className="inline-flex h-14 w-14 items-center justify-center rounded-lg text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:focus:ring-gray-600"
            >
              <span className="sr-only">Help</span>
              <img
                className="h-8 w-8 object-scale-down"
                src="/assets/Module360/Icons/help_button.png"
                alt=" "
              />
            </button>
          </div>

          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setShowBugmodal(true)}
              className="inline-flex h-14 w-14 items-center justify-center rounded-lg text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:focus:ring-gray-600"
            >
              <span className="sr-only">Feedback</span>
              <VscFeedback size={35} className="text-green-600" />
            </button>
          </div>

          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setShowSharemodal(true)}
              className="inline-flex h-14 w-14 items-center justify-center rounded-lg text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:focus:ring-gray-600"
            >
              <span className="sr-only">Share</span>
              <FiLink size={30} className="text-green-600" />
            </button>
          </div>

          <div className="flex md:hidden">
            <button
              type="button"
              onClick={toggleFullscreen}
              className="inline-flex h-14 w-14 items-center justify-center rounded-lg text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:focus:ring-gray-600"
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
      <Helpmodal onClose={handleclose} visible={Showmodal} />
      <Sharelink onClose={handlecloseShare} visible={Sharemodal} />
      <Bugmodal onClose={handlecloseBug} visible={Bugmdl} />
    </div>
  );
};

export default Navigationbar;
