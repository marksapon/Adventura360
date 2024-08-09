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
      <div className="absolute inset-0 flex h-auto w-auto items-center justify-center p-4 md:items-start md:justify-start md:p-16">
        <div className="flex h-auto w-auto flex-col items-center justify-center px-10 text-center md:items-start  md:text-left">
          <h1 className="space-y-1 font-bebas text-5xl tracking-normal text-white drop-shadow-[0_3px_3px_rgba(0,0,0,0.4)] md:mt-24 lg:text-[4.7rem]">
            <span>Explore</span>
            <span className="block text-[#4FE137]">
              Cavite State University
            </span>
            <span className="block text-[#F7B73C]">Indang Campus</span>
          </h1>

          <h2 className="mt-8 font-bitter text-base text-white md:mt-16 md:text-xl">
            <b>A unique take of touring</b>{" "}
            <span className="font-light">in today's generation.</span> <br />
            <span className="font-light">
              An interactive virtual tour using
            </span>
            <b> Adventura 360°.</b>
          </h2>
          <button
            onClick={() => navigate("/login")}
            className="mt-4 flex items-center justify-center gap-4 text-nowrap rounded-xl bg-[#FFB155] px-4 py-2 font-bebas text-xl tracking-wide text-white shadow-md hover:bg-orange-300 md:px-6 md:py-4 md:text-4xl"
          >
            EXPLORE NOW
            <GrLinkNext />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OurTech;
