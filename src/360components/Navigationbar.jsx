import React, { useState, useEffect } from "react";
import Helpmodal from "./helpmodal";
import Sharelink from "./Sharelink";
import Bugmodal from "./Bugmodal";

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
      <div className="bg-white h-max dark:bg-gray-900 sticky w-full z-20 top-4 start-0 border-b border-gray-200 dark:border-gray-600 mx-2 rounded-xl">
     
        <div className="flex justify-between items-center text-base h-full">
          <div className="flex px-1 lg:px-4 w-auto md:w-full h-full items-center justify-between">
            <div>
              <button
                type="button"
                onClick={toggleFullscreen}
                className="flex w-12 h-12 items-center justify-center text-sm text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Toggle Fullscreen</span>
                <img
                  src={
                    isFullscreen
                      ? "/assets/Module360/Icons/fullscreen_exit_button.png"
                      : "/assets/Module360/Icons/fullscreen_button.png"
                  }
                  alt=" "
                />
              </button>
            </div>
            <div className="hidden md:flex">
              <button
                type="button"
                onClick={() => setShowSharemodal(true)}
                className="p-2 w-14 h-14 text-sm text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Toggle Autoplay</span>
                <img
                  src="/assets/Module360/Icons/share_button.png"
                  alt="share button"
                />
              </button>
            </div>
            <div className="hidden md:flex">
              <button
                type="button"
                onClick={() => setShowmodal(true)}
                className="inline-flex items-center p-2 w-14 h-14 justify-center text-sm text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Toggle Autoplay</span>
                <img src="/assets/Module360/Icons/help_button.png" alt=" " />
              </button>
            </div>
            <div className="hidden md:flex">
              <button
                type="button"
                onClick={() => setShowBugmodal(true)}
                className="inline-flex items-center p-2 w-14 h-14 justify-center text-sm text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Toggle Autoplay</span>
                <img src="/assets/Module360/Icons/bug_button.png" alt=" " />
              </button>
            </div>
          </div>
          {/* LOCATION */}
          <div className="flex w-full h-full border-r-2 border-l-2 text-sm md:text-1xl px-1 items-center justify-center text-center md:min-w-[290px]">
            {location !== undefined
              ? location
              : "College of Agriculture, Food, Environment, and Natural Resources"}
          </div>
          {/* LOCATION */}
          <div className="flex px-1 lg:px-4 w-auto md:w-full h-full items-center justify-between">
            <div className="hidden md:flex">
              <button
                type="button"
                onClick={toggleAutoplay}
                className="w-12 h-12 items-center justify-center text-sm text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Toggle Autoplay</span>
                <img
                  src="/assets/Module360/Icons/autoplay_button.png"
                  alt=" "
                />
              </button>
            </div>
            <div className="hidden md:flex">
              <button
                type="button"
                onClick={toggleAutoplay}
                className="items-center w-12 h-12 justify-center text-sm text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Toggle Autoplay</span>
                <img
                  src="/assets/Module360/Icons/autoplay_button.png"
                  alt=" "
                />
              </button>
            </div>
            <div className="hidden md:flex">
              <button
                type="button"
                onClick={toggleFullscreen}
                className="items-center w-12 h-12 justify-center text-sm text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Toggle Fullscreen</span>
                <img
                  src={
                    isFullscreen
                      ? "/assets/Module360/Icons/fullscreen_exit_button.png"
                      : "/assets/Module360/Icons/fullscreen_button.png"
                  }
                  alt=" "
                />
              </button>
            </div>
            <div>
              <button
                type="button"
                onClick={toggleFullscreen}
                className="flex items-center w-12 h-12  justify-center text-sm text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Toggle Fullscreen</span>
                <img
                  src={
                    isFullscreen
                      ? "/assets/Module360/Icons/fullscreen_exit_button.png"
                      : "/assets/Module360/Icons/fullscreen_button.png"
                  }
                  alt=" "
                />
              </button>
            </div>
          </div>
        </div>
        <Helpmodal onClose={handleclose} visible={Showmodal} />
        <Sharelink  onClose={handlecloseShare} visible={Sharemodal}/>
        <Bugmodal onClose={handlecloseBug} visible={Bugmdl}/>
      </div>
      
      {/*FOOTER*/}
      <div className="md:hidden bg-white dark:bg-gray-900 sticky bottom-0 mb-4 w-full h-14 z-20 top-4 start-0 border-b border-gray-200 dark:border-gray-600 mx-2 rounded-xl">
        <div className="flex justify-between items-center text-base h-full px-2">
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setShowSharemodal(true)}
              className="p-2 w-14 h-14 text-sm text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:focus:ring-gray-600"
            >
              <span className="sr-only">Toggle Autoplay</span>
              <img
                src="/assets/Module360/Icons/share_button.png"
                alt="share button"
              />
            </button>
          </div>
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setShowmodal(true)}
              className="inline-flex items-center p-2 w-14 h-14 justify-center text-sm text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:focus:ring-gray-600"
            >
              <span className="sr-only">Toggle Autoplay</span>
              <img src="/assets/Module360/Icons/help_button.png" alt=" " />
            </button>
          </div>
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setShowBugmodal(true)}
              className="inline-flex items-center p-2 w-14 h-14 justify-center text-sm text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:focus:ring-gray-600"
            >
              <span className="sr-only">Toggle Autoplay</span>
              <img src="/assets/Module360/Icons/bug_button.png" alt=" " />
            </button>
          </div>

          <div className="flex md:hidden">
            <button
              type="button"
              onClick={toggleAutoplay}
              className="items-center w-11 h-11 justify-center text-sm text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:focus:ring-gray-600"
            >
              <span className="sr-only">Toggle Autoplay</span>
              <img src="/assets/Module360/Icons/autoplay_button.png" alt=" " />
            </button>
          </div>
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={toggleAutoplay}
              className="items-center w-11 h-11 justify-center text-sm text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:focus:ring-gray-600"
            >
              <span className="sr-only">Toggle Autoplay</span>
              <img src="/assets/Module360/Icons/autoplay_button.png" alt=" " />
            </button>
          </div>
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={toggleFullscreen}
              className="items-center justify-center w-11 h-11 text-sm text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:focus:ring-gray-600"
            >
              <span className="sr-only">Toggle Fullscreen</span>
              <img
                src={
                  isFullscreen
                    ? "/assets/Module360/Icons/fullscreen_exit_button.png"
                    : "/assets/Module360/Icons/fullscreen_button.png"
                }
                alt=" "
                className="w-full h-full"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default Navigationbar;
