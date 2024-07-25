import React, { useState, useEffect } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Dock, DockIcon } from "@/components/magicui/dock";

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
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
    <div className="fixed z-10 flex w-full items-center justify-center md:text-xs">
      <Dock
        direction="middle"
        className={`transition-all duration-300 ${
          isScrolled
            ? "w-full items-center justify-center"
            : "w-full items-center justify-center md:w-[488px] md:rounded-2xl"
        }`}
      >
        <DockIcon>
          <ScrollLink
            to="OurTech"
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
          <div className="rounded-full border-l-2 border-t-2 border-orange-400 px-[9px] py-[17px] transition-transform duration-300 hover:rotate-180">
            <ScrollLink
              to="TechStack"
              smooth={true}
              duration={500}
              className="dock-icon text-lg"
            >
              360°
            </ScrollLink>
          </div>
        </DockIcon>
        <DockIcon className={"text-nowrap"}>
          <ScrollLink
            to="Showcase"
            smooth={true}
            duration={500}
            className="dock-icon"
          >
            Contact us
          </ScrollLink>
        </DockIcon>
        <DockIcon>
          <ScrollLink
            to="Developers"
            smooth={true}
            duration={500}
            className="dock-icon"
          >
            Explore
          </ScrollLink>
        </DockIcon>
      </Dock>
    </div>
  );
};

export default NavBar;
