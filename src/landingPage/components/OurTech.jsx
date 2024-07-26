import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { GrLinkNext } from "react-icons/gr";

const OurTech = () => {
  const imgRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (imgRef.current) {
        const scrollPosition = window.scrollY;
        imgRef.current.style.transform = `translateY(${scrollPosition * -0.5}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navigate = useNavigate();

  return (
    <div id="OurTech" className="relative h-auto w-full">
      <img
        ref={imgRef}
        src="/assets/Landing Page/bg.png"
        alt="bg"
        className="h-screen w-full object-cover md:h-full md:object-contain"
      />
      <div className="absolute inset-0 flex items-center justify-center p-4 md:items-start md:justify-start md:p-16">
        <div className="flex flex-col items-center justify-center text-center md:items-start md:text-left">
          <h1 className="text-shadow-lg text-4xl font-black md:mt-24 md:text-5xl lg:text-6xl">
            Explore
            <span className="block text-green-500">
              Cavite State University
            </span>
            <span className="block text-orange-400">Indang Campus</span>
          </h1>
          <h2 className="mt-8 text-base text-white md:mt-16 md:text-xl">
            <b>A unique take of touring</b> in today's generation. <br />
            An interactive virtual tour using <b>Adventura 360°.</b>
          </h2>
          <button
            onClick={() => navigate("/login")}
            className="mt-4 flex gap-4 rounded-xl bg-orange-300 px-6 py-4 text-xl font-bold text-white shadow-md hover:bg-opacity-80 md:text-4xl"
          >
            EXPLORE NOW <GrLinkNext />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OurTech;
