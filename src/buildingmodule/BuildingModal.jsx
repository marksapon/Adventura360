import React, { useState, useEffect, useRef } from "react";
import DOMPurify from "dompurify";

/* Components */
import BuildingGallery from "./components/BuildingGallery";

/* CSS */
import "./BuildingModal.css";

import { IoIosClose } from "react-icons/io"; // Close
import { FaQuestion } from "react-icons/fa"; // Unknown Icon
import { RiPhoneFindLine } from "react-icons/ri"; // Go inside
import { BiBuildings } from "react-icons/bi"; // Departments
import { GiBlackBook } from "react-icons/gi"; // Courses
import { MdDirections } from "react-icons/md"; // Go to
import { FiLink } from "react-icons/fi"; // Share
import { MdHistoryEdu } from "react-icons/md"; // History
import { FaPhone } from "react-icons/fa"; // Contact
import { ImLab } from "react-icons/im"; // Facilities
import { IoMdArrowRoundBack } from "react-icons/io"; //
import { MdHomeRepairService } from "react-icons/md"; // Services
import { MdLocalPostOffice } from "react-icons/md"; // Offices
import { FaInfo } from "react-icons/fa"; // More Info

import { MdExpandMore } from "react-icons/md"; // Expand More
import { MdExpandLess } from "react-icons/md"; // Expand Less

/* Contacts */
import { MdEmail } from "react-icons/md"; // Email
import { FaMobile } from "react-icons/fa6"; // Mobile
import { BsFillTelephoneInboundFill } from "react-icons/bs"; // Telephone
import { IoGlobeSharp } from "react-icons/io5"; // Website

const BuildingModal = ({
  visible,
  onClose,
  loginType,
  infosDB,
  buildingsDB,
  scene,
  iconSet,
  openShareModal,
  shareModal,
  mode,
  changeScene,
  setMapState,
  setAccess,
  internalDB,
  closeSearch,
  setSearchModal,
  searchModal,
  status,
}) => {
  // Icon Set
  const icons = iconSet;

  const contentRef = useRef(null);

  /* States */
  const infos = generateInfo(); // Generate Infomation List
  const current_info = setTargetInfo(scene); // Current Information
  const [activeButton, setActiveButton] = useState(""); // Active Button
  const [isOpen, setIsOpen] = useState({});

  const handleClick = (key) => {
    setIsOpen((prevState) => ({ ...prevState, [key]: !prevState[key] }));
  };

  // Generate Information
  function generateInfo() {
    const temp = [];
    for (const info of infosDB) {
      if (hasSceneCheck(info.scene)) {
        info.hasScene = true;
        temp.push(info);
      } else {
        info.hasScene = false;
        temp.push(info);
      }
    }
    return temp;
  }

  function hasSceneCheck(scene) {
    let temp = false;
    for (const info of internalDB) {
      if (info.hasOwnProperty(scene)) {
        temp = true;
      }
    }
    return temp;
  }

  function has360Check() {
    let temp = false;
    buildingsDB.map((building) => {
      if (building.scene === current_info.scene) {
        if (building.image) {
          temp = true;
        }
      }
    });

    return temp;
  }

  function setTargetInfo(scene) {
    let temp_info;
    for (const info of infos) {
      if (info.scene === scene) {
        temp_info = info;
      }
    }
    return temp_info;
  }

  function resetActiveButton(target) {
    if (activeButton === target) {
      return "";
    } else {
      return target;
    }
  }

  // Close Function
  function handleCloseAndReset() {
    onClose();
  }

  const scrollToContent = () => {
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Purify Text
  const purifyText = (text) => {
    const sanitizedHTML = DOMPurify.sanitize(text);
    return <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />;
  };

  useEffect(() => {
    scrollToContent();
  }, [activeButton]);

  // Return Null if it is not visible
  if (!visible) return null;

  return (
    <div
      id="container"
      className={`pointer-events-auto fixed inset-0 z-40 flex ${mode === "search" ? "" : "bg-black bg-opacity-25"} h-full w-full`}
    >
      {/* Screen Container */}
      <div className="z-50 flex h-full w-full items-start pr-2">
        {/* Main Container */}
        <div className="flex h-screen w-[500px] flex-col rounded-br-2xl rounded-tr-2xl bg-white transition-all duration-200 ease-in-out">
          {/* Header Section */}
          <div className="w-full">
            {/* BG Image */}
            <div
              className="h-[150px] w-full rounded-tr-2xl bg-cover bg-center bg-no-repeat transition-all md:h-[200px]"
              style={{
                opacity: 1,
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${current_info ? current_info.image : "https://via.placeholder.com/150"}')`,
              }}
            >
              {/* Close Button */}
              {mode !== "search" && (
                <div className="relative z-50 flex w-full text-white">
                  <button
                    className="absolute right-0 items-center justify-center"
                    onClick={() => handleCloseAndReset()}
                  >
                    <IoIosClose className="h-12 w-12" />
                  </button>
                </div>
              )}

              {/* Back Button */}
              {mode === "search" && (
                <div className="relative z-50 flex w-full text-white">
                  <button
                    className="absolute right-0 items-center justify-center"
                    onClick={onClose}
                  >
                    <IoMdArrowRoundBack className="h-12 w-12 p-2" />
                  </button>
                </div>
              )}

              {/* Building Info */}
              <div className="flex h-full w-full flex-row items-end shadow-md shadow-gray-500">
                {/* Icon */}
                <div className="p-2">
                  {current_info ? (
                    Object.keys(icons).map((icon, index) => {
                      if (icon === current_info.type) {
                        const Icon = icons[icon].icon;
                        const color =
                          icons[icon] && icons[icon].color
                            ? `${icons[icon].color_tailwind}`
                            : "bg-default";
                        return (
                          <div
                            key={index}
                            className={`flex items-center justify-center rounded-full ${color} p-2 text-white`}
                          >
                            <Icon className="h-8 w-8" />
                          </div>
                        );
                      }
                    })
                  ) : (
                    <div className="flex items-center justify-center rounded-full bg-green-700 p-2 text-white">
                      <FaQuestion className="h-8 w-8" />
                    </div>
                  )}
                </div>

                {/* Building Name Section */}
                <div className="flex w-full flex-col pb-2">
                  {/* Building Name */}
                  <h1
                    className="overflow-y-auto pb-2 pr-2 text-lg font-bold text-white transition-all duration-500 ease-in-out md:text-2xl lg:text-3xl"
                    style={{ textShadow: "1px px #000" }}
                  >
                    {current_info ? current_info.name : "Building Name"}
                  </h1>

                  {/* Building Tags */}
                  <div className="flex w-full flex-row justify-between pr-4">
                    <div className="flex w-full gap-2">
                      {current_info ? (
                        current_info.tags.map((tag, index) => {
                          return (
                            <div
                              key={index}
                              className="flex w-fit items-center justify-center rounded-full bg-orange-500 px-2 text-xs font-bold md:text-sm"
                            >
                              {tag.toUpperCase()}
                            </div>
                          );
                        })
                      ) : (
                        <div className="flex w-fit items-center justify-center rounded-full bg-orange-500 px-2 text-xs font-bold md:text-sm">
                          Tag
                        </div>
                      )}
                    </div>

                    {/* EXPLORE BUTTON */}
                    {current_info &&
                      (loginType === current_info.access ||
                        loginType === "account" ||
                        loginType === "guest") &&
                      current_info.hasScene && (
                        <button
                          onClick={() => {
                            setAccess("private");
                            changeScene("inside", current_info.scene);
                            setMapState(false);
                            handleCloseAndReset();
                            if (searchModal) {
                              setSearchModal(false);
                            }
                          }}
                          className="flex w-fit items-center justify-center rounded-full bg-green-600 px-4 py-1 text-xs font-bold text-white md:text-base"
                        >
                          Explore <RiPhoneFindLine className="h-6 w-6 pl-1" />
                        </button>
                      )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="no-scrollbar h-full overflow-auto">
            {/* Description */}
            <div className="border-b pt-2">
              {current_info ? (
                <div className="mb-2 max-h-[150px] overflow-auto px-6 py-2 text-justify text-xs md:text-base">
                  {purifyText(current_info.desc)}
                </div>
              ) : (
                <div className="mb-2 max-h-[150px] overflow-auto px-6 py-2 text-justify text-xs md:text-base">
                  Building's Description
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 border-b p-4 text-white sm:px-8">
              {/* Facilities */}
              {current_info && current_info.facilities && (
                <div className="flex h-20 w-auto flex-col items-center justify-start">
                  <button
                    className={`flex items-center justify-center rounded-full border border-green-600 p-2 ${activeButton === "facilities" ? "bg-green-600" : "bg-white"}`}
                    onClick={() => {
                      setActiveButton(resetActiveButton("facilities"));
                    }}
                  >
                    <ImLab
                      className={`size-4 text-green-600 sm:size-6 ${activeButton === "facilities" ? "text-white" : "text-green-600"}`}
                    />
                  </button>
                  <div className="pt-1 text-xs text-green-600">Facilities</div>
                </div>
              )}

              {/* History */}
              {current_info && current_info.history && (
                <div className="flex h-20 w-auto flex-col items-center justify-start">
                  <button
                    className={`flex items-center justify-center rounded-full border border-green-600 p-2 ${activeButton === "history" ? "bg-green-600" : "bg-white"}`}
                    onClick={() => {
                      setActiveButton(resetActiveButton("history"));
                    }}
                  >
                    <MdHistoryEdu
                      className={`size-4 text-green-600 sm:size-6 ${activeButton === "history" ? "text-white" : "text-green-600"}`}
                    />
                  </button>
                  <div className="pt-1 text-xs text-green-600">History</div>
                </div>
              )}

              {/* Services  */}
              {current_info && current_info.services && (
                <div className="flex h-20 w-auto flex-col items-center justify-start">
                  <button
                    className={`flex items-center justify-center rounded-full border border-green-600 p-2 ${activeButton === "services" ? "bg-green-600" : "bg-white"}`}
                    onClick={() => {
                      setActiveButton(resetActiveButton("services"));
                    }}
                  >
                    <MdHomeRepairService
                      className={`size-4 text-green-600 sm:size-6 ${activeButton === "services" ? "text-white" : "text-green-600"}`}
                    />
                  </button>
                  <div className="pt-1 text-xs text-green-600">Services</div>
                </div>
              )}

              {/* Offices  */}
              {current_info && current_info.offices && (
                <div className="flex h-20 w-auto flex-col items-center justify-start">
                  <button
                    className={`flex items-center justify-center rounded-full border border-green-600 p-2 ${activeButton === "offices" ? "bg-green-600" : "bg-white"}`}
                    onClick={() => {
                      setActiveButton(resetActiveButton("offices"));
                    }}
                  >
                    <MdLocalPostOffice
                      className={`size-4 text-green-600 sm:size-6 ${activeButton === "offices" ? "text-white" : "text-green-600"}`}
                    />
                  </button>
                  <div className="pt-1 text-xs text-green-600">Offices</div>
                </div>
              )}

              {/* Departments  */}
              {current_info && current_info.dept && (
                <div className="flex h-20 w-auto flex-col items-center justify-start">
                  <button
                    className={`flex items-center justify-center rounded-full border border-green-600 p-2 ${activeButton === "departments" ? "bg-green-600" : "bg-white"}`}
                    onClick={() => {
                      setActiveButton(resetActiveButton("departments"));
                    }}
                  >
                    <BiBuildings
                      className={`size-4 text-green-600 sm:size-6 ${activeButton === "departments" ? "text-white" : "text-green-600"}`}
                    />
                  </button>
                  <div className="pt-1 text-xs text-green-600">Departments</div>
                </div>
              )}

              {/* Courses DEPT & COLLEGE */}
              {current_info && current_info.courses && (
                <div className="flex h-20 w-auto flex-col items-center justify-start">
                  <button
                    className={`flex items-center justify-center rounded-full border border-green-600 p-2 ${activeButton === "courses" ? "bg-green-600" : "bg-white"}`}
                    onClick={() => {
                      setActiveButton(resetActiveButton("courses"));
                    }}
                  >
                    <GiBlackBook
                      className={`size-4 text-green-600 sm:size-6 ${activeButton === "courses" ? "text-white" : "text-green-600"}`}
                    />
                  </button>
                  <div className="pt-1 text-xs text-green-600">Courses</div>
                </div>
              )}

              {/* COMMON BUTTONS */}

              {/* Contacts */}
              {current_info && current_info.contacts && (
                <div className="w-15 flex h-20 flex-col items-center justify-start">
                  <div>
                    <button
                      className={`flex items-center justify-center rounded-full border border-green-600 p-2 ${activeButton === "contacts" ? "bg-green-600" : "bg-white"}`}
                      onClick={() => {
                        setActiveButton(resetActiveButton("contacts"));
                      }}
                    >
                      <FaPhone
                        className={`size-4 text-green-600 sm:size-6 ${activeButton === "contacts" ? "text-white" : "text-green-600"}`}
                      />
                    </button>
                  </div>
                  <div>
                    <div className="pt-1 text-center text-xs text-green-600">
                      Contacts
                    </div>
                  </div>
                </div>
              )}

              {/* Share */}
              {mode === "360" && status !== "inside" && (
                <div className="flex h-20 w-auto flex-col items-center justify-start">
                  <button
                    className={`flex items-center justify-center rounded-full border border-green-600 p-2 ${shareModal ? "bg-green-600" : "bg-white"}`}
                    onClick={() => {
                      openShareModal();
                    }}
                  >
                    <FiLink
                      className={`size-4 text-green-600 sm:size-6 ${shareModal ? "text-white" : "text-green-600"}`}
                    />
                  </button>
                  <div className="pt-1 text-xs text-green-600">Share</div>
                </div>
              )}

              {/* Go to Button */}
              {current_info && mode !== "360" && has360Check() && (
                <div className="flex h-20 w-auto flex-col items-center justify-start">
                  <button
                    className="flex items-center justify-center rounded-full bg-green-500 p-2"
                    onClick={() => {
                      setAccess("public");
                      setMapState(false);
                      changeScene("bldg", current_info.scene);
                      closeSearch();
                      handleCloseAndReset();
                    }}
                  >
                    <MdDirections className="size-5 sm:size-7" />
                  </button>
                  <div className="pt-1 text-xs text-green-600">Go to</div>
                </div>
              )}
              {/* Go to Button */}

              {/* More info */}
              {current_info && current_info.more_info && (
                <div className="flex h-20 w-auto flex-col items-center justify-start">
                  <button
                    className={`flex items-center justify-center rounded-full border border-orange-600 bg-orange-600 p-2`}
                    onClick={() => {
                      window.open(current_info.more_info);
                    }}
                  >
                    <FaInfo className={`size-4 text-white sm:size-6`} />
                  </button>
                  <div className="pt-1 text-xs text-green-600">Learn more</div>
                </div>
              )}
            </div>

            {/* Gallery */}

            {current_info && current_info.gallery && (
              <div className="h-auto w-full sm:h-auto">
                {current_info ? (
                  <BuildingGallery imageSet={current_info.gallery} />
                ) : (
                  <BuildingGallery />
                )}
              </div>
            )}

            {/* Gallery */}

            {/* CONTENT SECTION */}
            <div ref={contentRef} className="pb-20">
              {/* History */}
              {current_info && activeButton === "history" && (
                <div className="w-full rounded-b-xl border-b-2 px-6 pb-8 pt-2">
                  <ul className="justify-start text-balance">
                    <h1 className="pb-5 text-2xl">History</h1>
                    <div className="text-justify text-xs sm:text-base">
                      {purifyText(current_info.history)}
                    </div>
                  </ul>
                </div>
              )}

              {/* Facilities */}
              {current_info && activeButton === "facilities" && (
                <div className="w-full rounded-b-xl border-b-2 px-6 pb-8 pt-2">
                  <div className="justify-start text-balance">
                    <h1 className="flex flex-row items-center gap-3 pb-5 font-roboto text-2xl font-medium text-green-500">
                      <ImLab className={`size-4 text-green-600 sm:size-6`} />{" "}
                      Facilities
                    </h1>
                    <ul className="flex list-inside flex-col gap-1">
                      {Object.keys(current_info.facilities).map(
                        (key, index) => (
                          <div className="flex flex-col gap-1" key={index}>
                            <button
                              onClick={() => handleClick(key)}
                              className="flex items-center justify-between rounded-lg border-2 border-green-600 bg-white p-2"
                            >
                              <div className="single-content-bullet text-left font-roboto text-base font-medium">
                                {key}
                              </div>

                              {current_info.facilities[key] &&
                                (isOpen[key] ? (
                                  <MdExpandLess />
                                ) : (
                                  <MdExpandMore />
                                ))}
                            </button>
                            {isOpen[key] && current_info.facilities[key] && (
                              <div className="mb-2 flex w-full flex-auto rounded-md border-2 border-gray-500 border-opacity-60">
                                <div className="p-2 text-sm text-gray-800">
                                  {purifyText(current_info.facilities[key])}
                                </div>
                              </div>
                            )}
                          </div>
                        ),
                      )}
                    </ul>
                  </div>
                </div>
              )}

              {/* Departments */}
              {current_info && activeButton === "departments" && (
                <div className="w-full rounded-b-xl border-b-2 px-6 pb-8 pt-2">
                  <div className="justify-start text-balance">
                    <h1 className="flex flex-row items-center gap-3 pb-5 font-roboto text-2xl font-medium text-green-500">
                      <BiBuildings
                        className={`size-4 text-green-600 sm:size-6`}
                      />
                      Departments
                    </h1>
                    <ul className="flex list-inside flex-col gap-1">
                      {current_info.dept.map((dept, index) => (
                        <div className="flex rounded-lg border-2 border-green-600 bg-white p-2">
                          <li
                            key={index}
                            className="single-content-bullet font-roboto text-base font-medium"
                          >
                            {dept}
                          </li>
                        </div>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Courses */}
              {current_info && activeButton === "courses" && (
                <div className="w-full rounded-b-xl border-b-2 px-6 pb-8 pt-2">
                  <div className="justify-start text-balance">
                    <h1 className="flex flex-row items-center gap-3 pb-5 font-roboto text-2xl font-medium text-green-500">
                      <GiBlackBook
                        className={`size-4 text-green-600 sm:size-6`}
                      />
                      Courses Offered
                    </h1>

                    <ul className="flex list-inside flex-col gap-1">
                      {Object.keys(current_info.courses).map((key, index) => (
                        <div className="flex flex-col gap-1" key={index}>
                          <button
                            onClick={() => handleClick(key)}
                            className="flex items-center justify-between rounded-lg border-2 border-green-600 bg-white p-2"
                          >
                            <div className="single-content-bullet text-left font-roboto text-base font-medium">
                              {key}
                            </div>

                            {current_info.courses[key] &&
                              (isOpen[key] ? (
                                <MdExpandLess />
                              ) : (
                                <MdExpandMore />
                              ))}
                          </button>
                          {isOpen[key] && current_info.courses[key] && (
                            <div className="mb-2 flex w-full flex-auto rounded-md border-2 border-gray-500 border-opacity-60">
                              <div className="p-2 text-sm ">
                                {purifyText(current_info.courses[key])}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Contacts */}
              {current_info && activeButton === "contacts" && (
                <div className="flex w-full flex-col gap-10 rounded-b-xl border-b-2 px-6 pb-8 pt-2">
                  <ul className="flex flex-col justify-start text-balance">
                    <div className="m-2 flex flex-col">
                      <h1 className="flex flex-row items-center gap-3 pb-5 font-roboto text-2xl font-medium text-green-500">
                        <FaPhone
                          className={`size-4 text-green-600 sm:size-6`}
                        />
                        Contacts
                      </h1>
                      <div className="flex flex-col justify-center gap-4 rounded-md p-2">
                        {Object.keys(current_info.contacts).map(
                          (key, index) => (
                            <div key={index}>
                              <li className="flex flex-row items-center gap-2 ">
                                {key === "Email" && (
                                  <MdEmail
                                    size={23}
                                    className="h-auto w-auto text-green-500"
                                  />
                                )}

                                {key === "Mobile" && (
                                  <FaMobile
                                    size={23}
                                    className="h-auto w-auto text-green-500"
                                  />
                                )}

                                {key === "Telephone" && (
                                  <BsFillTelephoneInboundFill
                                    size={23}
                                    className="h-auto w-auto text-green-500"
                                  />
                                )}

                                {key !== "additional" && (
                                  <span className="font-roboto text-xs font-thin sm:text-base">
                                    {current_info.contacts[key]}
                                  </span>
                                )}
                              </li>
                            </div>
                          ),
                        )}
                      </div>
                    </div>

                    <div className="m-2 flex flex-col">
                      <h2 className=" flex flex-row items-center gap-2 pb-2 font-roboto text-xl font-medium text-green-500">
                        <IoGlobeSharp
                          className={`size-4 text-green-600 sm:size-6`}
                        />
                        Additional Information:
                      </h2>
                      <div className="flex flex-col items-center justify-start gap-2 ">
                        {Object.keys(current_info.contacts).map(
                          (key, index) =>
                            key === "additional" &&
                            Object.keys(current_info.contacts[key]).map(
                              (subKey, subIndex) => {
                                return (
                                  <button
                                    className="flex w-full flex-row items-center justify-start gap-x-4 "
                                    key={subIndex}
                                  >
                                    <div className="flex h-10 w-10 justify-center ">
                                      <IoGlobeSharp className="h-10 w-10 p-2 text-green-500" />
                                    </div>

                                    <span
                                      className="flex w-full text-left font-roboto text-xs font-thin hover:text-green-500 sm:text-base"
                                      onClick={() =>
                                        window.open(
                                          current_info.contacts[key][subKey],
                                        )
                                      }
                                    >
                                      {subKey}
                                    </span>
                                  </button>
                                );
                              },
                            ),
                        )}
                      </div>
                    </div>
                  </ul>
                </div>
              )}

              {/* Services */}
              {current_info && activeButton === "services" && (
                <div className="w-full rounded-b-xl border-b-2 px-6 pb-8 pt-2">
                  <h1 className="flex flex-row items-center gap-3 pb-5 font-roboto text-2xl font-medium text-green-500">
                    <MdHomeRepairService
                      className={`size-4 text-green-600 sm:size-6`}
                    />
                    Services
                  </h1>

                  <ul className="flex list-inside flex-col gap-1">
                    {Object.keys(current_info.services).map((key, index) => (
                      <div className="flex flex-col gap-1">
                        <button
                          onClick={() => handleClick(key)}
                          className="flex items-center justify-between rounded-lg border-2 border-green-600 bg-white p-2"
                        >
                          <div
                            key={index}
                            className="single-content-bullet font-roboto text-base font-medium"
                          >
                            {key}
                          </div>
                          {current_info.services[key] &&
                            (isOpen[key] ? <MdExpandLess /> : <MdExpandMore />)}
                        </button>
                        {isOpen[key] && current_info.services[key] && (
                          <div className="mb-2 flex w-full flex-auto rounded-md border-2 border-gray-500 border-opacity-60">
                            <div className="p-2 text-sm ">
                              {purifyText(current_info.services[key])}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </ul>
                </div>
              )}

              {/* Offices */}
              {current_info && activeButton === "offices" && (
                <div className="w-full rounded-b-xl border-b-2 px-6 pb-8 pt-2">
                  <h1 className="flex flex-row items-center gap-3 pb-5 font-roboto text-2xl font-medium text-green-500">
                    <MdHomeRepairService
                      className={`size-4 text-green-600 sm:size-6`}
                    />
                    Offices
                  </h1>

                  <ul className="flex list-inside flex-col gap-1">
                    {Object.keys(current_info.offices).map((key, index) => (
                      <div className="flex flex-col gap-1">
                        <button
                          onClick={() => handleClick(key)}
                          className="flex items-center justify-between rounded-lg border-2 border-green-600 bg-white p-2"
                        >
                          <div
                            key={index}
                            className="single-content-bullet font-roboto text-base font-medium"
                          >
                            {key}
                          </div>
                          {current_info.offices[key] &&
                            (isOpen[key] ? <MdExpandLess /> : <MdExpandMore />)}
                        </button>
                        {isOpen[key] && current_info.offices[key] && (
                          <div className="mb-2 flex w-full flex-auto rounded-md border-2 border-gray-500 border-opacity-60">
                            <div className="p-2 text-sm ">
                              {purifyText(current_info.offices[key])}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Main Container */}
      </div>
      {/* Screen Container */}
    </div>
  );
};

export default BuildingModal;
