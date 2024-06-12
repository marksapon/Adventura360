import { FaRestroom } from "react-icons/fa"; // Restroom Icon (comfort)
import { FaHandsWash } from "react-icons/fa"; // Hand Wash Icon (comfort)
import { PiBinocularsFill } from "react-icons/pi"; // Attraction Icon
import { FaHotel } from "react-icons/fa"; // Venue Icon
import { FaPeopleRoof } from "react-icons/fa6"; // Batibot Icon
import { LuWheat } from "react-icons/lu"; // Farm Icon
import { FaCoffee } from "react-icons/fa"; // Cafeteria
import { TbSoccerField } from "react-icons/tb"; // Court Icon
import { MdEngineering } from "react-icons/md"; // Construction Icon
import { LuSchool } from "react-icons/lu"; // School Facilities Icon
import { TbSchool } from "react-icons/tb"; // College Buildings Icon
import { FaSquareParking } from "react-icons/fa6"; // Parking Lot Icon

import { IoIosClose } from "react-icons/io"; // Close Button

function MapLegend({ setMapLegendState }) {
  return (
    <>
      <div className="absolute -top-20 h-screen w-screen bg-black bg-opacity-70 md:hidden" />
      <div className="absolute left-0 top-0 z-10 h-full w-screen px-2 md:mx-4 md:my-2">
        <div className="pointer-events-auto z-10 h-full w-full rounded-lg border-2 border-gray-500 border-opacity-50 shadow-xl md:h-auto md:w-80">
          <div className="flex h-full w-full flex-col rounded-lg bg-slate-50 md:bg-opacity-80 md:hover:bg-opacity-100">
            <div
              className="m-5 text-center font-serif text-2xl font-medium text-lime-600"
              style={{ textShadow: "1px 1px black" }}
            >
              Map Legend
            </div>

            <div className="flex flex-wrap p-2 md:flex-row md:bg-opacity-50">
              <div className="absolute right-0 top-0 flex h-12 w-12 items-center justify-center p-2 md:hidden">
                <IoIosClose
                  className="h-10 w-10"
                  onClick={() => setMapLegendState(false)}
                />
              </div>
              <div className="flex w-1/2 flex-shrink flex-row items-center gap-2  p-2 text-left font-roboto text-sm  ">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white shadow-md">
                  <LuSchool className="h-5 w-5" style={{ stroke: "#65a30d" }} />
                </div>
                School Buildings
              </div>
              <div className="flex w-1/2 flex-shrink flex-row items-center gap-2  p-2 text-left font-roboto text-sm ">
                <div
                  className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white shadow-md"
                  style={{ color: "#f97316" }}
                >
                  <TbSchool className="h-5 w-5" />
                </div>
                College Buildings
              </div>
              <div className="flex w-1/2 flex-shrink flex-row items-center gap-2  p-2 text-left font-roboto text-sm ">
                <div
                  className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white shadow-md"
                  style={{ color: "#fbbf24" }}
                >
                  <FaCoffee className="h-5 w-5" />
                </div>
                Cafeteria
              </div>
              <div className="flex w-1/2 flex-shrink flex-row items-center gap-2  p-2 text-left font-roboto text-sm ">
                <div
                  className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white shadow-md"
                  style={{ color: "#fb7185" }}
                >
                  <FaHotel className="h-5 w-5" />
                </div>
                Venue
              </div>
              <div className="flex w-1/2 flex-shrink flex-row items-center gap-2  p-2 text-left font-roboto text-sm ">
                <div
                  className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white shadow-md"
                  style={{ color: "#a21caf" }}
                >
                  <PiBinocularsFill className="h-5 w-5" />
                </div>
                Attractions
              </div>
              <div className="flex w-1/2 flex-shrink flex-row items-center gap-2  p-2 text-left font-roboto text-sm ">
                <div
                  className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white shadow-md"
                  style={{ color: "#0e7490" }}
                >
                  <TbSoccerField className="h-5 w-5" />
                </div>
                Courts
              </div>
              <div className="flex w-1/2 flex-shrink flex-row items-center gap-2  p-2 text-left font-roboto text-sm ">
                <div
                  className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white shadow-md"
                  style={{ color: "#3b82f6" }}
                >
                  <FaRestroom className="h-5 w-5" />
                </div>
                Restrooms
              </div>
              <div className="flex w-1/2 flex-shrink flex-row items-center gap-2  p-2 text-left font-roboto text-sm ">
                <div
                  className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white shadow-md"
                  style={{ color: "#3b82f6" }}
                >
                  <FaHandsWash className="h-5 w-5" />
                </div>
                Wash Area
              </div>
              <div className="flex w-1/2 flex-shrink flex-row items-center gap-2  p-2 text-left font-roboto text-sm ">
                <div
                  className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white shadow-md"
                  style={{ color: "#1e3a8a" }}
                >
                  <FaPeopleRoof className="h-5 w-5" />
                </div>
                Batibot
              </div>
              <div className="flex w-1/2 flex-shrink flex-row items-center gap-2  p-2 text-left font-roboto text-sm ">
                <div
                  className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white shadow-md"
                  style={{ color: "#15803d" }}
                >
                  <LuWheat className="h-5 w-5" />
                </div>
                Farm
              </div>
              <div className="flex w-1/2 flex-shrink flex-row items-center gap-2  p-2 text-left font-roboto text-sm ">
                <div
                  className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white shadow-md"
                  style={{ color: "#3b82f6" }}
                >
                  <FaSquareParking className="h-5 w-5" />
                </div>
                Parking Lot
              </div>
              <div className="flex w-1/2 flex-shrink flex-row items-center gap-2  p-2 text-left font-roboto text-sm ">
                <div
                  className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white shadow-md"
                  style={{ color: "#f97316" }}
                >
                  <MdEngineering className="h-5 w-5" />
                </div>
                Under Construction
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default MapLegend;
