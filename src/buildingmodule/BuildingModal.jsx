import React, { useState, useEffect, useRef } from "react";
import BuildingGallery from "./BuildingGallery";

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
import { TbTargetArrow } from "react-icons/tb"; // Mission Vision
import { IoMdArrowRoundBack } from "react-icons/io";

const BuildingModal = ({
  visible,
  onClose,
  loginType,
  infosDB,
  scene,
  iconSet,
  openShareModal,
  shareModal,
  mode,
  changeScene,
  setMapState,
  setAccess,
  buildingsDB,
}) => {
  class College {
    constructor(
      id,
      name,
      access,
      type,
      tags,
      description,
      bg,
      gallery = [],
      info_type,
      hasScene = false,

      history,
      dept = [],
      mission_vision = {},
      courses = [],
      contacts = {},
    ) {
      this.id = id;
      this.name = name;
      this.access = access;
      this.type = type;
      this.tags = tags;
      this.description = description;
      this.bg = bg;
      this.gallery = gallery;
      this.info_type = info_type;
      this.hasScene = hasScene;

      this.history = history;
      this.dept = dept;
      this.mission_vision = mission_vision;
      this.courses = courses; //
      this.contacts = contacts;
    }
  }

  class Department {
    constructor(
      id,
      name,
      access,
      type,
      tags,
      description,
      bg,
      gallery = [],
      info_type,
      hasScene = false,

      facilities = [],
      courses = [],
      contacts = {},
    ) {
      this.id = id;
      this.name = name;
      this.access = access;
      this.type = type;
      this.tags = tags;
      this.description = description;
      this.bg = bg;
      this.gallery = gallery;
      this.info_type = info_type;
      this.hasScene = hasScene;

      this.facilities = facilities;
      this.courses = courses;
      this.contacts = contacts;
    }
  }

  class Other_Facility {
    constructor(
      id,
      name,
      access,
      type,
      tags,
      description,
      bg,
      gallery = [],
      info_type,
      hasScene = false,

      facilities = [],
      contacts = {},
    ) {
      this.id = id;
      this.name = name;
      this.access = access;
      this.type = type;
      this.tags = tags;
      this.description = description;
      this.bg = bg;
      this.gallery = gallery;
      this.info_type = info_type;
      this.hasScene = hasScene;

      this.facilities = facilities;
      this.contacts = contacts;
    }
  }

  class Info {
    constructor(
      id,
      name,
      access,
      type,
      tags,
      description,
      bg,
      gallery = [],
      info_type,
      hasScene = false,

      contacts = {},
    ) {
      this.id = id;
      this.name = name;
      this.access = access;
      this.type = type;
      this.tags = tags;
      this.description = description;
      this.bg = bg;
      this.gallery = gallery;
      this.info_type = info_type;
      this.hasScene = hasScene;

      this.contacts = contacts;
    }
  }

  class Attraction {
    constructor(
      id,
      name,
      access,
      type,
      tags,
      description,
      bg,
      gallery = [],
      info_type,
      hasScene = false,

      history,
    ) {
      this.id = id;
      this.name = name;
      this.access = access;
      this.type = type;
      this.tags = tags;
      this.description = description;
      this.bg = bg;
      this.gallery = gallery;
      this.info_type = info_type;
      this.hasScene = hasScene;

      this.history = history;
    }
  }
  // Icon Set
  const icons = iconSet;

  const contentRef = useRef(null);

  /* States */
  const infos = generateInfo(); // Generate Infomation List
  const current_info = setTargetInfo(scene); // Current Information
  const [activeButton, setActiveButton] = useState(""); // Active Button

  // Generate Information
  function generateInfo() {
    // console.log("Generating Information");
    const info_temp = [];
    for (const info of infosDB) {
      const hasScene = hasSceneCheck(info.scene);
      if (info.info_type === "department") {
        info_temp.push(
          new Department(
            info.scene, // ID
            info.name, // name
            info.access, // access
            info.type, // type
            info.tags, // tags
            info.desc, // description
            info.image, // bg
            info.gallery, // gallery
            info.info_type,
            hasScene, // If there is a scene

            info.facilities, // facilities
            info.courses, // courses
            info.contacts, // contacts
          ),
        );
      } else if (info.info_type === "college") {
        info_temp.push(
          new College(
            info.scene, // ID
            info.name, // name
            info.access, // access
            info.type, // type
            info.tags, // tags
            info.desc, // description
            info.image, // bg
            info.gallery, // gallery
            info.info_type,
            hasScene, // If there is a scene

            info.history, // history
            info.dept, // dept
            info.mission_vision, // mission_vision
            info.courses, // courses
            info.contacts, // contacts
          ),
        );
      } else if (info.info_type === "other_facility") {
        info_temp.push(
          new Other_Facility(
            info.scene, // ID
            info.name, // name
            info.access, // access
            info.type, // type
            info.tags, // tags
            info.desc, // description
            info.image, // bg
            info.gallery, // gallery
            info.info_type,
            hasScene, // If there is a scene

            info.facilities, // facilities
            info.contacts, // contacts
          ),
        );
      } else if (info.info_type === "attraction") {
        info_temp.push(
          new Attraction(
            info.scene, // ID
            info.name, // name
            info.access, // access
            info.type, // type
            info.tags, // tags
            info.desc, // description
            info.image, // bg
            info.gallery, // gallery
            info.info_type,
            hasScene, // If there is a scene

            info.history, // history
          ),
        );
      } else {
        info_temp.push(
          new Info(
            info.scene, // ID
            info.name, // name
            info.access, // access
            info.type, // type
            info.tags, // tags
            info.desc, // description
            info.image, // bg
            info.gallery, // gallery
            info.info_type,
            hasScene, // If there is a scene

            info.contacts, // contacts
          ),
        );
      }
    }
    return info_temp;
  }

  function hasSceneCheck(scene) {
    let temp = false;
    for (const info of buildingsDB) {
      if (info.scene === scene) {
        console.log("Scene Found");
        temp = true;
      }
    }
    return temp;
  }

  function setTargetInfo(scene) {
    // console.log("Setting Current Information");
    let temp_info;
    for (const info of infos) {
      if (info.id === scene) {
        temp_info = info;
      }
    }
    return temp_info;
    // console.log("Target Not Found");
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

  useEffect(() => {
    scrollToContent();
  }, [activeButton]);

  // Component Did Mount
  // useEffect(() => {}, [current_info, scene]);

  // Return Null if it is not visible
  if (!visible) return null;

  console.log("Current Info:", current_info);

  return (
    <div
      id="container"
      className={`pointer-events-auto fixed inset-0 z-40 flex ${mode === "search" ? "" : "bg-black bg-opacity-25"}`}
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
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${current_info ? current_info.bg : "https://via.placeholder.com/150"}')`,
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
                            ? `bg-[${icons[icon].color}]`
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
                            <p
                              key={index}
                              className="flex w-fit items-center justify-center rounded-full bg-orange-500 px-2 text-xs font-bold md:text-sm"
                            >
                              {tag.toUpperCase()}
                            </p>
                          );
                        })
                      ) : (
                        <p className="flex w-fit items-center justify-center rounded-full bg-orange-500 px-2 text-xs font-bold md:text-sm">
                          Tag
                        </p>
                      )}
                    </div>

                    {/* EXPLORE BUTTON */}
                    {current_info &&
                      (loginType === current_info.access ||
                        loginType === "account") &&
                      loginType !== "guest" && (
                        <button
                          onClick={() => {
                            setAccess("private");
                            changeScene("inside", current_info.id);
                            setMapState(false);
                            handleCloseAndReset();
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
                <p className="mb-2 max-h-[150px] overflow-auto px-6 py-2 text-justify text-xs md:text-base">
                  {current_info.description}
                </p>
              ) : (
                <p className="mb-2 max-h-[150px] overflow-auto px-6 py-2 text-justify text-xs md:text-base">
                  Building's Description
                </p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 border-b p-4 text-white sm:px-8">
              {/* Facilities */}
              {current_info && current_info.info_type === "department" && (
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
                  <p className="pt-1 text-xs text-green-600">Facilities</p>
                </div>
              )}

              {/* History */}
              {current_info &&
                (current_info.info_type === "college" ||
                  current_info.info_type === "attraction") && (
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
                    <p className="pt-1 text-xs text-green-600">History</p>
                  </div>
                )}

              {/* Departments  */}
              {current_info && current_info.info_type === "college" && (
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
                  <p className="pt-1 text-xs text-green-600">Departments</p>
                </div>
              )}

              {/* Courses DEPT & COLLEGE */}
              {current_info &&
                (current_info.info_type === "college" ||
                  current_info.info_type === "department") && (
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
                    <p className="pt-1 text-xs text-green-600">Courses</p>
                  </div>
                )}

              {/* Mission Vision */}
              {current_info && current_info.info_type === "college" && (
                <div className="w-15 flex h-20 flex-col items-center justify-start">
                  <div>
                    <button
                      className={`flex items-center justify-center rounded-full border border-green-600 p-2 ${activeButton === "mission_vision" ? "bg-green-600" : "bg-white"}`}
                      onClick={() => {
                        setActiveButton(resetActiveButton("mission_vision"));
                      }}
                    >
                      <TbTargetArrow
                        className={`size-4 text-green-600 sm:size-6 ${activeButton === "mission_vision" ? "text-white" : "text-green-600"}`}
                      />
                    </button>
                  </div>
                  <div>
                    <p className="pt-1 text-center text-xs text-green-600">
                      Mission, Vision, <br /> and Goal
                    </p>
                  </div>
                </div>
              )}

              {/* COMMON BUTTONS */}

              {/* Contacts */}
              {current_info && current_info.info_type !== "attraction" && (
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
                    <p className="pt-1 text-center text-xs text-green-600">
                      Contacts
                    </p>
                  </div>
                </div>
              )}

              {/* Share */}
              {current_info && mode === "360" && (
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
                  <p className="pt-1 text-xs text-green-600">Share</p>
                </div>
              )}

              {/* Go to Button */}
              {current_info && current_info.hasScene && mode !== "360" && (
                <div className="flex h-20 w-auto flex-col items-center justify-start">
                  <button
                    className="flex items-center justify-center rounded-full bg-green-500 p-2"
                    onClick={() => {
                      setAccess("public");
                      setMapState(false);
                      changeScene("bldg", current_info.id);
                      handleCloseAndReset();
                    }}
                  >
                    <MdDirections className="size-5 sm:size-7" />
                  </button>
                  <p className="pt-1 text-xs text-green-600">Go to</p>
                </div>
              )}

              {/* Go to Button */}
            </div>

            {/* Gallery */}
            <div className="h-auto w-full sm:h-auto">
              {current_info ? (
                <BuildingGallery imageSet={current_info.gallery} />
              ) : (
                <BuildingGallery />
              )}
            </div>
            {/* Gallery */}

            {/* CONTENT SECTION */}
            <div ref={contentRef}>
              {/* History */}
              {current_info && activeButton === "history" && (
                <div className="w-full rounded-b-xl border-b-2 px-6 pb-8 pt-2">
                  <ul className="justify-start text-balance">
                    <h1 className="pb-5 text-2xl">History</h1>
                    <p className="text-justify text-xs sm:text-base">
                      {current_info.history}
                    </p>
                  </ul>
                </div>
              )}

              {/* Facilities */}
              {current_info && activeButton === "facilities" && (
                <div className="w-full rounded-b-xl border-b-2 px-6 pb-8 pt-2">
                  <ul className="justify-start text-balance">
                    <h1 className="pb-5 text-2xl">Facilities</h1>
                    {current_info.facilities.map((facilities) => (
                      <li className="flex items-center">
                        <h2 className="text-base font-semibold md:text-xl">
                          •&nbsp;{facilities.name}&nbsp;
                        </h2>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Departments */}
              {current_info && activeButton === "departments" && (
                <div className="w-full rounded-b-xl border-b-2 px-6 pb-8 pt-2">
                  <ul className="justify-start text-balance">
                    <h1 className="pb-5 text-2xl">Departments</h1>
                    {current_info.dept.map((dept, index) => (
                      <li key={index} className="flex flex-col gap-2">
                        <h2 className="text-base">•&nbsp;{dept}</h2>
                        <span className="text-xs sm:text-base">
                          {dept.description}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Courses */}
              {current_info && activeButton === "courses" && (
                <div className="w-full rounded-b-xl border-b-2 px-6 pb-8 pt-2">
                  <ul className="justify-start text-balance">
                    <h1 className="pb-3 text-2xl">Courses</h1>
                    {current_info.courses.map((Courses) => (
                      <li className="flex items-center" key={Courses.id}>
                        <h2 className="py-2 text-xs sm:text-base">
                          •&nbsp;{Courses.name}
                        </h2>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Mission Vision */}
              {current_info && activeButton === "mission_vision" && (
                <div className="w-full rounded-b-xl border-b-2 px-6 pb-8 pt-2">
                  <ul className="flex flex-col justify-start gap-4 text-xs sm:text-base">
                    <h1 className="text-2xl">Mission, Vision, and Goal</h1>
                    {current_info.mission_vision.mission && (
                      <p className="text-base">
                        <span className="font-bold">Mission: </span>{" "}
                        {current_info.mission_vision.mission}
                      </p>
                    )}
                    {current_info.mission_vision.vision && (
                      <p className="text-base">
                        <span className="font-bold">Vision: </span>{" "}
                        {current_info.mission_vision.vision}
                      </p>
                    )}
                    {current_info.mission_vision.goal && (
                      <p className="text-base">
                        <span className="font-bold">Goal: </span>
                        {current_info.mission_vision.goal}
                      </p>
                    )}
                  </ul>
                </div>
              )}

              {/* Contacts */}
              {current_info && activeButton === "contacts" && (
                <div className="w-full rounded-b-xl border-b-2 px-6 pb-8 pt-2">
                  <ul className="justify-start text-balance">
                    <h1 className="pb-5 text-2xl">Contacts</h1>
                    {Object.keys(current_info.contacts).map((key, index) => (
                      <li className="flex items-center" key={index}>
                        <h2 className="text-xs font-semibold sm:text-base">
                          {key} -&nbsp;
                        </h2>
                        <span className="text-xs sm:text-base">
                          {current_info.contacts[key]}
                        </span>
                      </li>
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
