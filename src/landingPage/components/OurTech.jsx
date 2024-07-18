import React from "react";
import { useNavigate } from "react-router-dom";

const OurTech = () => {
  const navigate = useNavigate();
  return (
    <div
      className="h-full w-full"
      id="OurTech"
      style={{
        backgroundImage: `linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 30%), url('/assets/Landing Page/our tech/ourtech-bg.webp')`,
        backgroundSize: "580px",
        backgroundPosition: "right",
        backgroundRepeat: "no-repeat",
        userSelect: "none",
      }}
    >
      <div className="z-40 mx-auto h-screen min-h-screen max-w-screen-2xl">
        <div className="flex h-full w-full flex-col items-center justify-center gap-6 md:px-16 lg:w-2/3">
          <h1 className="relative w-full px-2 text-center text-3xl font-bold leading-snug tracking-tight duration-300 md:pl-8 md:text-left md:text-4xl lg:text-5xl xl:text-6xl">
            Explore the University in a <s />
            <span className="font-bold leading-snug tracking-tight text-orange-500 duration-300">
              360 degree
              <s />
            </span>
            view with <s />
            <span className="font-black leading-snug tracking-tight text-green-600 duration-300">
              Adventura{" "}
              <span className="font-bold leading-snug tracking-tight text-orange-500 duration-300">
                360°
              </span>
            </span>
            .
          </h1>
          <div className="flex w-full justify-center md:justify-start md:pl-8">
            <button
              className="hover:bg-green-00 rounded-lg border-2 bg-green-600 p-2 font-semibold text-white duration-300 hover:bg-green-500 md:px-6"
              onClick={() => navigate("/login")}
            >
              Explore Adventura 360°
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurTech;
