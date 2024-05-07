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

  // Sample Data
  const facilities = [
    { id: 1, name: "facilities 1", description: "This is facilities 1" },
    { id: 2, name: "facilities 2", description: "This is facilities 2" },
    { id: 3, name: "facilities 3", description: "This is facilities 3" },
  ];
  const courses = [
    { id: 1, name: "courses 1", description: "This is courses 1" },
    { id: 2, name: "courses 2", description: "This is courses 2" },
    { id: 3, name: "courses 3", description: "This is courses 3" },
  ];

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
        <div className="flex h-screen max-w-[350px] flex-col rounded-br-2xl rounded-tr-2xl bg-white transition-all duration-200 ease-in-out sm:max-w-[500px]">
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

                    {/* EXPLORE BUTTON */}
                    {current_info &&
                      (loginType === current_info.access ||
                        loginType === "account") && (
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
            <div className="flex flex-wrap items-center justify-between border-b px-16 py-4 text-white sm:px-24">
              {/* Facilities */}
              {current_info && current_info.info_type === "department" && (
                <div className="flex h-20 w-auto flex-col items-center justify-center">
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
                  <div className="flex h-auto w-auto flex-col items-center justify-center">
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
                <div className="flex h-auto w-auto flex-col items-center justify-center">
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
                  <div className="flex h-auto w-auto flex-col items-center justify-center">
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
                <div className="flex h-auto w-auto flex-col items-center justify-center">
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
                  <p className="pt-1 text-xs text-green-600">
                    College Mission/Vision/Goal
                  </p>
                </div>
              )}

              {/* COMMON BUTTONS */}

              {/* Contacts */}
              {current_info && current_info.info_type !== "attraction" && (
                <div className="flex h-auto w-auto flex-col items-center justify-center">
                  <button
                    className={`flex items-center justify-center rounded-full border border-green-600 p-2 ${shareModal ? "bg-green-600" : "bg-white"}`}
                    onClick={() => {
                      setActiveButton(resetActiveButton("contacts"));
                    }}
                  >
                    <FaPhone
                      className={`size-4 text-green-600 sm:size-6 ${shareModal ? "text-white" : "text-green-600"}`}
                    />
                  </button>
                  <p className="pt-1 text-xs text-green-600">Contacts</p>
                </div>
              )}

              {/* Share */}
              {current_info && mode === "360" && (
                <div className="flex h-auto w-auto flex-col items-center justify-center">
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
                <div className="flex h-auto w-auto flex-col items-center justify-center">
                  <button
                    className="flex items-center justify-center rounded-full bg-green-500 p-2"
                    onClick={() => {
                      setAccess("public");
                      setMapState(false);
                      changeScene("bldg", current_info.id);
                      handleCloseAndReset();
                    }}
                  >
                    <MdDirections className="size-4 sm:size-6" />
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
              {/* Facilities */}
              {current_info && activeButton === "facilities" && (
                <div className="w-full rounded-b-xl border-b-2 px-6 py-2">
                  <ul className="justify-start text-balance">
                    <h1 className="pb-5 text-2xl">Facilities</h1>
                    {facilities.map((facilities) => (
                      <li className="flex items-center" key={facilities.id}>
                        <h2 className="text-base font-semibold md:text-xl">
                          •&nbsp;{facilities.name}&nbsp;
                        </h2>
                        <span className="text-base">
                          -&nbsp;{facilities.description}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Courses */}
              {current_info && activeButton === "courses" && (
                <div className="w-full rounded-b-xl border-b-2 px-6 py-2">
                  <ul className="justify-start text-balance">
                    <h1 className="pb-5 text-2xl">Courses</h1>
                    {courses.map((Courses) => (
                      <li className="flex items-center" key={Courses.id}>
                        <h2 className="text-base font-semibold md:text-lg">
                          •&nbsp;{Courses.name} -&nbsp;
                        </h2>
                        <span className="text-base">{Courses.description}</span>
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
