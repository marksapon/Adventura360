import React, { useState, useEffect } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Dock, DockIcon } from "@/components/magicui/dock";

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [rotationValue, setRotationValue] = useState(0);

  useEffect(() => {
    const handleScroll = (event) => {
      if (window.scrollY > 0) {
        setRotationValue(window.scrollY % 359);
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="fixed z-10 -mt-4 flex h-20 w-full items-center justify-center md:text-xs">
      <Dock
        direction="middle"
        className={`duration-250 transition-all ${
          isScrolled
            ? "text-gray_black flex h-full w-full items-center justify-center font-quicksand text-base font-semibold"
            : "text-gray_black flex w-full items-center justify-center font-quicksand text-base font-semibold md:w-[488px] md:rounded-2xl"
        }`}
      >
        <DockIcon>
          <ScrollLink
            to="Showcase"
            smooth={true}
            duration={500}
            className="dock-icon"
          >
            About
          </ScrollLink>
        </DockIcon>
        <DockIcon>
          <ScrollLink
            to="Introduction"
            smooth={true}
            duration={500}
            className="dock-icon"
          >
            Features
          </ScrollLink>
        </DockIcon>

        <DockIcon className="rounded-full bg-white px-9 font-black text-[#5D8552] shadow-lg">
          <ScrollLink
            to="OurTech"
            smooth={true}
            duration={500}
            className=" relative text-lg"
          >
            <div className="flex h-full w-full items-center justify-center">
              <span className="font-montserrat font-bold">360°</span>
              <span
                className={`absolute h-16 w-16 rounded-full border-l-2 border-t-2 border-orange-400 px-[9px] py-[17px]`}
                style={{ transform: `rotate(${rotationValue}deg)` }}
              />
            </div>
          </ScrollLink>
        </DockIcon>

        <DockIcon>
          <ScrollLink
            to="Adventura"
            smooth={true}
            duration={500}
            className="dock-icon"
          >
            <div className="bgorange rounded-lg">Adventura</div>
          </ScrollLink>
        </DockIcon>

        <DockIcon className={"text-nowrap"}>
          <ScrollLink
            to="Developers"
            smooth={true}
            duration={500}
            className="dock-icon"
          >
            Contact us
          </ScrollLink>
        </DockIcon>
      </Dock>
    </div>
  );
};

export default NavBar;
