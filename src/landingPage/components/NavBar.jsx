import React, { useEffect, useState } from "react";
import { Link as ScrollLink } from "react-scroll";

import { Link as RouterLink, useNavigate } from "react-router-dom";
// react icons
import { FaXmark, FaBars } from "react-icons/fa6";
// import { MdDarkMode } from "react-icons/md";

const NavBar = () => {
  const loogoo = "/assets/Other/Loogoo.png";
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  //set toggle Menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (Window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.addEventListener("scroll", handleScroll);
    };
  });

  //navitems array

  const navitems = [
    { link: "Our tech", id: "OurTech" },
    { link: "Introduction", id: "Introduction" },
    { link: "Tech Stack", id: "TechStack" },
    { link: "Showcase", id: "Showcase" },
    { link: "Developers", id: "Developers" },
  ];

  return (
    <nav className="gap md-transparent fixed z-50 flex h-[65px] w-full border-b bg-white">
      <div className="flex h-full w-full min-w-[40px] items-center justify-between px-4 py-2">
        <div className="flex h-full w-full items-center justify-between md:w-auto">
          <a
            className="flex items-center justify-center gap-3 pr-4 text-2xl font-semibold"
            href="/"
          >
            <img
              src={"/assets/Module360/Icons/AdvenLogo.png"}
              alt="logo"
              className="w-8"
            />
            Adventura 360°
          </a>

          <div className="flex h-full items-center justify-center md:hidden ">
            <button
              onClick={toggleMenu}
              title={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <FaXmark className="h-6 w-6 items-center justify-center md:hidden" />
              ) : (
                <FaBars className="h-6 w-6 items-center justify-center md:hidden" />
              )}
            </button>
          </div>
        </div>

        {/* Nav Items for large devices */}
        <ul className="hidden justify-between gap-5 md:flex">
          {navitems.map(({ link, id }) => (
            <button key={id}>
              <ScrollLink
                to={id}
                spy={true}
                smooth={true}
                offset={-100}
                activeClass="text-green-600 border-b-2 border-green-600 shadow-glow"
                className="block text-base font-semibold text-gray-900 hover:text-green-600"
              >
                {link}
              </ScrollLink>
            </button>
          ))}
        </ul>
        <div className="flex h-full w-auto justify-end gap-4 lg:min-w-[205.41px]">
          {/* <button onClick={() => navigate("/login")}>App</button> */}
          {/* <button onClick={() => navigate("/map")}>Map</button> */}
        </div>
        {/* btn for large devices */}
        {/* <div className="hidden  items-center space-x-12 lg:flex "> */}
        {/* <a href='/' className='hidden lg:flex items-center text-green-600 hover:text-gray-900'>Adventura</a> */}
        {/* <button className='bg-black text-white py-2 px-4 transition-all duration-300 rounded hover:bg-green-600 '><MdDarkMode /></button> */}
        {/* <button className='bg-green-600 text-white py-2 px-6 transition-all duration-300 rounded hover:bg-lime-700 '>Log In</button> */}
        {/* </div> */}
        {/* Menu button for cp */}
      </div>

      {/* Nav items for mobile devives */}
      <div
        className={`mt-16 cursor-pointer space-y-4 border-x border-b border-t border-lime-600 bg-white px-4 py-7 md:hidden ${
          isMenuOpen ? "fixed left-0 right-0  top-0 block" : "hidden"
        }`}
      >
        <ul>
          {navitems.map(({ link, id }) => (
            <li key={id}>
              <ScrollLink
                to={id}
                spy={true}
                smooth={true}
                activeClass="text-green-600"
                offset={-100}
                className="block text-base text-gray-700 first:font-medium hover:text-green-600"
              >
                {link}
              </ScrollLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
