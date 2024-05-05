import React, { useState, useEffect } from "react";
import BuildingGallery from "./BuildingGallery";
import Sharelink from "../module360/components/Sharelink";

import { IoIosClose } from "react-icons/io";
import { LuGraduationCap } from "react-icons/lu";
import { RiPhoneFindLine } from "react-icons/ri";
import { BiBuildings } from "react-icons/bi";
import { GiBlackBook } from "react-icons/gi";
import { MdDirections } from "react-icons/md";
import { FiLink } from "react-icons/fi";

const BuildingModal = ({
  visible,
  onClose,
  loginType,
  infosDB,
  scene,
  iconSet,
}) => {
  class Info {
    constructor(
      id,
      name,
      type,
      tags,
      description,
      bg,
      facilities = [],
      courses = [],
      gallery = [],
    ) {
      this.id = id;
      this.name = name;
      this.type = type;
      this.tags = tags;
      this.description = description;
      this.bg = bg;
      this.facilities = facilities;
      this.courses = courses;
      this.gallery = gallery;
    }
  }

  // Information Container
  const infos = [];

  // Icon Set
  const icons = iconSet;

  // Icon Pack

  /* States */
  const [FacilitiesisClicked, setFacilitiesIsClicked] = useState(false);
  const [CoursesisClicked, setCoursesIsClicked] = useState(false);
  const [shareLinkisCLicked, setShareLinkIsClicked] = useState(false);
  const [showFacilities, setShowFacilities] = useState(false);
  const [showCourses, setShowCourses] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const current_info = generateInfo();

  // Generate Information
  function generateInfo() {
    // console.log("Generating Information");
    for (const info of infosDB) {
      infos.push(
        new Info(
          info.scene,
          info.name,
          info.type,
          info.tags,
          info.desc,
          info.image,
          info.facilities,
          info.courses,
          info.gallery,
        ),
      );
    }
    return setTargetInfo(scene);
  }

  function setTargetInfo(scene) {
    // console.log("Getting Information");
    for (const info of infos) {
      if (info.id === scene) {
        return info;
      }
    }
    // console.log("Target Not Found");
  }

  // Close Function
  const handleCloseAndReset = () => {
    onClose();
  };

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

  // console.log("Current Info:", current_info);
  // console.log("Tags:", current_info.tags);
  // current_info.tags.map((tag) => {
  //   console.log(tag);
  // });

  return (
    <div
      id="container"
      className="pointer-events-auto fixed inset-0 z-50 flex bg-black bg-opacity-25"
    >
      <div className="z-50 flex h-full w-full items-start pr-2">
        <div className="flex h-screen max-w-[350px] flex-col rounded-br-2xl rounded-tr-2xl bg-white transition-all duration-200 ease-in-out sm:max-w-[500px]">
          <div className="w-full">
            <div
              className="h-[150px] w-full rounded-tr-2xl bg-cover bg-center bg-no-repeat transition-all md:h-[200px]"
              style={{
                opacity: 1,
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/assets/Modals/building modal/placeholder.png')`,
              }}
            >
              <div className="relative z-50 flex w-full text-white">
                <button
                  className="absolute right-0 items-center justify-center"
                  onClick={() => handleCloseAndReset()}
                >
                  <IoIosClose className="h-12 w-12" />
                </button>
              </div>

              <div className="flex h-full w-full flex-row items-end shadow-md shadow-gray-500">
                <div className="p-2">
                  {/* <div className="flex items-center justify-center rounded-full bg-green-700 p-2 text-white">
                    <LuGraduationCap className="h-10 w-10" />
                  </div> */}

                  <div className="flex items-center justify-center rounded-full bg-green-700 p-2 text-white">
                    <LuGraduationCap className="h-10 w-10" />
                  </div>
                </div>

                <div className="flex w-full flex-col pb-2">
                  <h1
                    className="overflow-y-auto pb-2 pr-2 text-lg font-bold text-white transition-all duration-500 ease-in-out md:text-2xl lg:text-3xl"
                    style={{ textShadow: "1px px #000" }}
                  >
                    {current_info ? current_info.name : "Building Name"}
                  </h1>

                  <div className="flex w-full flex-row justify-between pr-4">
                    {current_info ? (
                      current_info.tags.map((tag) => {
                        return (
                          <p className="flex w-fit items-center justify-center rounded-full bg-orange-500 px-2 text-xs font-bold md:text-sm">
                            {tag.toUpperCase()}
                          </p>
                        );
                      })
                    ) : (
                      <p className="flex w-fit items-center justify-center rounded-full bg-orange-500 px-2 text-xs font-bold md:text-sm">
                        Tag
                      </p>
                    )}

                    {loginType === "account" && (
                      <button className="flex w-fit items-center justify-center rounded-full bg-green-600 px-4 py-1 text-xs font-bold text-white md:text-base">
                        Go inside <RiPhoneFindLine className="h-6 w-6 pl-1" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="no-scrollbar h-full overflow-auto">
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
            <div className="flex flex-wrap items-center justify-between border-b px-16 py-4 text-white sm:px-24">
              <div className="flex h-20 w-auto flex-col items-center justify-center">
                <button
                  className={`flex items-center justify-center rounded-full border border-green-600 p-2 ${FacilitiesisClicked ? "bg-green-600" : "bg-white"}`}
                  onClick={() => {
                    setShowFacilities(!showFacilities);
                    setFacilitiesIsClicked(!FacilitiesisClicked);
                  }}
                >
                  <BiBuildings
                    className={`size-4 text-green-600 sm:size-6 ${FacilitiesisClicked ? "text-white" : "text-green-600"}`}
                  />
                </button>
                <p className="pt-1 text-xs text-green-600">Facilities</p>
              </div>
              <div className="flex h-auto w-auto flex-col items-center justify-center">
                <button
                  className={`flex items-center justify-center rounded-full border border-green-600 p-2 ${CoursesisClicked ? "bg-green-600" : "bg-white"}`}
                  onClick={() => {
                    setShowCourses(!showCourses);
                    setCoursesIsClicked(!CoursesisClicked);
                  }}
                >
                  <GiBlackBook
                    className={`size-4 text-green-600 sm:size-6 ${CoursesisClicked ? "text-white" : "text-green-600"}`}
                  />
                </button>
                <p className="pt-1 text-xs text-green-600">Courses</p>
              </div>

              <div className="flex h-auto w-auto flex-col items-center justify-center">
                <button
                  className={`flex items-center justify-center rounded-full border border-green-600 p-2 ${shareLinkisCLicked ? "bg-green-600" : "bg-white"}`}
                  onClick={() => {
                    setIsModalOpen(true);
                    setShareLinkIsClicked(!shareLinkisCLicked);
                  }}
                >
                  <FiLink
                    className={`size-4 text-green-600 sm:size-6 ${shareLinkisCLicked ? "text-white" : "text-green-600"}`}
                  />
                </button>
                <p className="pt-1 text-xs text-green-600">Share</p>

                <Sharelink
                  visible={isModalOpen}
                  onClose={() => {
                    setIsModalOpen(false);
                    setShareLinkIsClicked(!shareLinkisCLicked);
                  }}
                />
              </div>

              <div className="flex h-auto w-auto flex-col items-center justify-center">
                <button
                  className="flex items-center justify-center rounded-full bg-green-500 p-2"
                  onClick={null}
                >
                  <MdDirections className="size-4 sm:size-6" />
                </button>
                <p className="pt-1 text-xs text-green-600">Go to</p>
              </div>
            </div>
            <div className="h-auto w-full sm:h-auto">
              <BuildingGallery />
            </div>
            {showFacilities && (
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
            {showCourses && (
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
    </div>
  );
};

export default BuildingModal;
