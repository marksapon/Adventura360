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
    <header className="md-transparent fixed left-0 right-0 top-0 w-full border-b bg-white">
      <nav
        className={`px-4 py-4 lg:px-14 ${
          isSticky
            ? "sticky left-0 right-0 top-0 border-b bg-white duration-300"
            : ""
        }`}
      >
        <div className="flex items-center justify-between gap-8 text-base">
          <a
            href="/"
            className="flex items-center space-x-3 text-2xl font-semibold"
          >
            <img
              src={loogoo}
              alt=""
              className="inline-block w-10 items-center"
            />
            <span className="text-[#263238]">Adventura 360</span>
          </a>

          {/* Nav Items for large devices */}

          <ul className="hidden cursor-pointer space-x-12 md:flex">
            {navitems.map(({ link, id }) => (
              <ScrollLink
                to={id}
                spy={true}
                smooth={true}
                offset={-100}
                key={id} // Add unique key prop
                className="block text-base text-gray-900 first:font-medium hover:text-green-600"
              >
                {link}
              </ScrollLink>
            ))}
          </ul>
          <div className="flex-center flex-justify-between flex gap-8">
            <RouterLink to="/app">
              <button className="flex h-12 items-center justify-between gap-2 rounded-full bg-green-600 px-4 py-2 text-white transition-all duration-300 hover:bg-lime-700">
                Go to App
              </button>
            </RouterLink>

            <RouterLink to="/map">
              <button className="flex h-12 items-center justify-between gap-2 rounded-full bg-green-600 px-4 py-2 text-white transition-all duration-300 hover:bg-lime-700">
                Go to Map
              </button>
            </RouterLink>
          </div>
          {/* btn for large devices */}
          <div className="hidden  items-center space-x-12 lg:flex ">
            {/* <a href='/' className='hidden lg:flex items-center text-green-600 hover:text-gray-900'>Adventura</a> */}
            {/* <button className='bg-black text-white py-2 px-4 transition-all duration-300 rounded hover:bg-green-600 '><MdDarkMode /></button> */}
            {/* <button className='bg-green-600 text-white py-2 px-6 transition-all duration-300 rounded hover:bg-lime-700 '>Log In</button> */}
          </div>

          {/* Menu button for cp */}
          <div className="md:hidden ">
            <button
              onClick={toggleMenu}
              className="text-gray-700 focus:text-gray-500 focus:outline-none"
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
          className={`mt-16 cursor-pointer space-y-4 border-x border-b border-t border-lime-600 bg-white px-4 py-7 md:hidden ${
            isMenuOpen ? "fixed left-0 right-0  top-0 block" : "hidden"
          }`}
        >
          {navitems.map(({ link, id }) => (
            <ScrollLink
              to={id}
              spy={true}
              smooth={true}
              offset={-100}
              key={id} // Add unique key prop
              className="block text-base text-gray-700 first:font-medium hover:text-green-600"
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
