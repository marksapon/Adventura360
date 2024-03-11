import React, { useState, useEffect } from "react";
import Helpmodal from "./helpmodal";
import Sharelink from "./Sharelink";
import Bugmodal from "./Bugmodal";
import { VscFeedback } from "react-icons/vsc"; // Feedback Button
import { FiLink } from "react-icons/fi"; // Share Button
import { GrMap } from "react-icons/gr"; // Map Button
import { IoMdSearch } from "react-icons/io"; // Search Button
import { PiPlayCircleLight } from "react-icons/pi"; // Autoplay Button
import { TbMaximize, TbMaximizeOff } from "react-icons/tb"; // Fullscreen On/Off

const Navigationbar = ({ toggleAutoplay, location }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  /* Shareable Link Function */

  // function getURL() {
  //   const url = window.location.href;
  //   return url;
  // }
  const [Showmodal, setShowmodal] = useState(false);
  const handleclose = () => setShowmodal(false);
  const [Sharemodal, setShowSharemodal] = useState(false);
  const handlecloseShare = () => setShowSharemodal(false);
  const [Bugmdl, setShowBugmodal] = useState(false);
  const handlecloseBug = () => setShowBugmodal(false);

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
        handleFullscreenChange
      );
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "MSFullscreenChange",
        handleFullscreenChange
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
    <div className="flex flex-col justify-between h-screen w-full pr-4 ">
      <div className="bg-white h-max sticky w-full z-20 top-4 start-0 border-b border-gray-200 dark:border-gray-600 mx-2 rounded-xl">
        <div className="flex justify-between items-center text-base h-full">
          <div className="flex px-1 lg:px-4 w-auto md:w-full h-full items-center justify-between">
            <div>
              <button
                type="button"
                onClick={null}
                className="flex w-12 h-12 items-center justify-center text-sm text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Adventura Logo</span>
                <img
                  src="/assets/Module360/Icons/AdvenLogo.png"
                  alt="share button"
                  className="w-auto h-11"
                />
              </button>
            </div>

            <div className="hidden md:flex">
              <button
                type="button"
                onClick={null}
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
                className="inline-flex items-center w-14 h-14 justify-center text-sm text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Search</span>
                <IoMdSearch size={35} className="text-green-600" />
              </button>
            </div>

            <div className="hidden md:flex">
              <button
                type="button"
                onClick={() => setShowmodal(true)}
                className="inline-flex items-center w-14 h-14 justify-center text-sm text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Help</span>
                <img
                  className="object-scale-down h-8 w-8"
                  src="/assets/Module360/Icons/help_button.png"
                  alt=" "
                />
              </button>
            </div>
          </div>

          {/* LOCATION */}
          <div className="flex w-full h-full border-r-2 border-l-2 text-sm md:text-1xl px-1 items-center justify-center text-center md:min-w-[290px] font-roboto">
            {location !== undefined ? location : "Location"}
          </div>
          {/* LOCATION */}

          <div className="flex px-1 lg:px-4 w-auto md:w-full h-full items-center justify-between">
            <div className="hidden md:flex">
              <button
                type="button"
                onClick={() => setShowBugmodal(true)}
                className="inline-flex items-center w-14 h-14 justify-center text-sm text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Feedback</span>
                <VscFeedback size={35} className="text-green-600" />
              </button>
            </div>

            <div className="hidden md:flex">
              <button
                type="button"
                onClick={toggleAutoplay}
                className="inline-flex items-center w-14 h-14 justify-center text-sm text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Autoplay</span>
                <PiPlayCircleLight size={40} className="text-green-600" />
              </button>
            </div>

            <div className="hidden md:flex">
              <button
                type="button"
                onClick={() => setShowSharemodal(true)}
                className="inline-flex items-center w-14 h-14 justify-center text-sm text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Share</span>
                <FiLink size={30} className="text-green-600" />
              </button>
            </div>

            <div className="hidden md:flex">
              <button
                type="button"
                onClick={toggleFullscreen}
                className="inline-flex items-center w-14 h-14 justify-center text-sm text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:focus:ring-gray-600"
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
                className="flex items-center w-12 h-12  justify-center text-sm text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:focus:ring-gray-600"
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

      {/*FOOTER*/}
      <div className="md:hidden bg-white  sticky bottom-0 mb-4 w-full h-14 z-20 top-4 start-0 border-b border-gray-200 dark:border-gray-600 mx-2 rounded-xl">
        <div className="flex justify-between items-center text-base h-full px-2">
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={null}
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
              className="inline-flex items-center w-14 h-14 justify-center text-sm text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:focus:ring-gray-600"
            >
              <span className="sr-only">Search</span>
              <IoMdSearch size={35} className="text-green-600" />
            </button>
          </div>

          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setShowmodal(true)}
              className="inline-flex items-center w-14 h-14 justify-center text-sm text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:focus:ring-gray-600"
            >
              <span className="sr-only">Help</span>
              <img
                className="object-scale-down h-8 w-8"
                src="/assets/Module360/Icons/help_button.png"
                alt=" "
              />
            </button>
          </div>

          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setShowBugmodal(true)}
              className="inline-flex items-center w-14 h-14 justify-center text-sm text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:focus:ring-gray-600"
            >
              <span className="sr-only">Feedback</span>
              <VscFeedback size={35} className="text-green-600" />
            </button>
          </div>

          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setShowSharemodal(true)}
              className="inline-flex items-center w-14 h-14 justify-center text-sm text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:focus:ring-gray-600"
            >
              <span className="sr-only">Share</span>
              <FiLink size={30} className="text-green-600" />
            </button>
          </div>

          <div className="flex md:hidden">
            <button
              type="button"
              onClick={toggleFullscreen}
              className="inline-flex items-center w-14 h-14 justify-center text-sm text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:focus:ring-gray-600"
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
