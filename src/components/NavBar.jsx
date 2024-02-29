import React, { useEffect, useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink } from "react-router-dom";
// react icons
import { FaXmark, FaBars } from "react-icons/fa6";
// import { MdDarkMode } from "react-icons/md";

const NavBar = () => {
  const loogoo = "/assets/Other/Loogoo.png";

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
    { link: "Home", id: "home" },
    { link: "Service", id: "service" },
    { link: "About", id: "about" },
    { link: "Product", id: "product" },
    { link: "Testimonial", id: "testimonial" },
    { link: "Blog", id: "blog" },
  ];

  return (
    <header className="w-full bg-white md-transparent fixed top-0 left-0 right-0 border-b">
      <nav
        className={`py-4 lg:px-14 px-4 ${
          isSticky
            ? "sticky top-0 left-0 right-0 border-b bg-white duration-300"
            : ""
        }`}
      >
        <div className="flex justify-between items-center text-base gap-8">
          <a
            href="/"
            className="text-2xl font-semibold flex items-center space-x-3"
          >
            <img
              src={loogoo}
              alt=""
              className="w-10 inline-block items-center"
            />
            <span className="text-[#263238]">Adventura 360</span>
          </a>

          {/* Nav Items for large devices */}

          <ul className="md:flex space-x-12 hidden cursor-pointer">
            {navitems.map(({ link, id }) => (
              <ScrollLink
                to={id}
                spy={true}
                smooth={true}
                offset={-100}
                key={id} // Add unique key prop
                className="block text-base text-gray900 hover:text-brandPrimary first:font-medium"
              >
                {link}
              </ScrollLink>
            ))}
          </ul>
          <div className="flex flex-center flex-justify-between gap-8">
            <RouterLink to="/app">
              <button className="bg-brandPrimary text-white px-4 py-2 transition-all duration-300 rounded-full h-12 hover:bg-lime-700 items-center justify-between flex gap-2">
                Go to App
              </button>
            </RouterLink>

            <RouterLink to="/map">
              <button className="bg-brandPrimary text-white px-4 py-2 transition-all duration-300 rounded-full h-12 hover:bg-lime-700 items-center justify-between flex gap-2">
                Go to Map
              </button>
            </RouterLink>
          </div>
          {/* btn for large devices */}
          <div className="space-x-12  hidden lg:flex items-center ">
            {/* <a href='/' className='hidden lg:flex items-center text-brandPrimary hover:text-gray900'>Adventura</a> */}
            {/* <button className='bg-black text-white py-2 px-4 transition-all duration-300 rounded hover:bg-brandPrimary '><MdDarkMode /></button> */}
            {/* <button className='bg-brandPrimary text-white py-2 px-6 transition-all duration-300 rounded hover:bg-lime-700 '>Log In</button> */}
          </div>

          {/* Menu button for cp */}
          <div className="md:hidden ">
            <button
              onClick={toggleMenu}
              className="text-neutralDGrey focus:outline-none focus:text-gray-500"
            >
              {isMenuOpen ? (
                <FaXmark className="h-6 w-6 " />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Nav items for mobile devives */}
        <div
          className={`space-y-4 px-4 mt-16 py-7 md:hidden bg-white border-b border-x border-lime-600 border-t cursor-pointer ${
            isMenuOpen ? "block fixed top-0  right-0 left-0" : "hidden"
          }`}
        >
          {navitems.map(({ link, id }) => (
            <ScrollLink
              to={id}
              spy={true}
              smooth={true}
              offset={-100}
              key={id} // Add unique key prop
              className="block text-base text-neutralDGrey hover:text-brandPrimary first:font-medium"
            >
              {link}
            </ScrollLink>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
