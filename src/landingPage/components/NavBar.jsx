import React, { useState, useEffect } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Dock, DockIcon } from "@/components/magicui/dock";

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const [rotationValue, setRotationValue] = useState(0);
  const [rotation, setRotation] = useState("rotate-180");

  useEffect(() => {
    const handleScroll = (event) => {
      // console.log("Scrolling:", window.scrollY);
      if (window.scrollY > 0) {
        // console.log("Scrolling Values:", window.scrollY % 359);
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

  useEffect(() => {
    console.log("Rotating");
    const temp_val = Math.round(rotationValue);
    let rotation_string = temp_val.toString();
    rotation_string = "rotate-".concat(rotation_string);
    console.log("Rotation Value:", rotation_string);
    setRotation(rotation_string);
  }, [rotationValue]);

  return (
    <div className="fixed z-10 -mt-4 flex h-20 w-full items-center justify-center md:text-xs">
      <Dock
        direction="middle"
        className={`duration-250 transition-all ${
          isScrolled
            ? "flex h-full w-full items-center justify-center"
            : "flex w-full items-center justify-center md:w-[488px] md:rounded-2xl"
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

        <DockIcon className="rounded-full bg-white px-9 font-black text-green-800 shadow-lg">
          <ScrollLink
            to="OurTech"
            smooth={true}
            duration={500}
            className=" relative text-lg"
          >
            <div className="flex h-full w-full items-center justify-center">
              <span>360°</span>
              <span
                className={`absolute h-16 w-16 rounded-full border-l-2 border-t-2 border-orange-400 px-[9px] py-[17px]`}
                style={{ transform: `rotate(${rotationValue}deg)` }}
              />
            </div>
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

        <DockIcon>
          <ScrollLink
            to="Explore"
            smooth={true}
            duration={500}
            className="dock-icon"
          >
            <div className="bgorange rounded-lg px-2">Explore</div>
          </ScrollLink>
        </DockIcon>
      </Dock>
    </div>
  );
};

export default NavBar;
