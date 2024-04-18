import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div
      className="h-full w-full"
      id="home"
      style={{
        backgroundImage: `linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 30%), url(./assets/Other/bg.png)`,

        backgroundSize: "580px",
        backgroundPosition: "right",
        backgroundRepeat: "no-repeat",
        userSelect: "none",
      }}
    >
      <div className="z-40 mx-auto h-screen min-h-screen max-w-screen-2xl">
        <div className="flex h-full w-full flex-col items-center justify-center gap-6 leading-snug tracking-tight duration-300 md:px-16 lg:w-2/3">
          <h1 className="relative w-full px-2 text-center text-3xl font-bold leading-snug tracking-tight duration-300 md:pl-8 md:text-left md:text-4xl lg:text-5xl xl:text-6xl">
            Explore the University in a{" "}
            <span className="font-bold leading-snug tracking-tight text-orange-500 duration-300">
              360 degree{" "}
            </span>
            view with{" "}
            <span className="font-black leading-snug tracking-tight text-green-600 duration-300">
              Adventura 360°
            </span>
            .
          </h1>
          <div className="w-full text-center md:pl-8 md:text-left">
            <button
              className="flex rounded-lg border-2 p-2 px-6 font-semibold duration-300 hover:bg-gray-800 hover:text-white"
              onClick={() => navigate("/login")}
            >
              Explore Now{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
