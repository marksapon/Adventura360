import React, { useState, useEffect } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Dock, DockIcon } from "@/components/magicui/dock";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { RxHamburgerMenu } from "react-icons/rx";

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
    <div className="fixed z-10 w-full">
      <div className="hidden md:block">
        <Dock
          direction="middle"
          className={`duration-250 transition-all ${
            isScrolled
              ? "flex h-full w-auto items-center justify-center gap-16 font-quicksand text-base font-semibold text-gray_black"
              : "mt-8 flex w-auto items-center justify-between px-8 font-quicksand text-base font-semibold text-gray_black md:w-[600px] md:rounded-2xl"
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

      <div className="z-10 flex w-full items-center justify-between border-b bg-background px-4 py-2 shadow-lg md:hidden">
        <div className="flex items-center justify-center gap-2">
          <a href="/" className="flex items-center gap-4">
            <img
              src="/assets/Navigation Bar/adventura 360 logo.webp"
              alt="logo"
              className="h-10 w-8"
            />
            <h1 className="text-lg font-semibold">Adventura 360°</h1>
          </a>
        </div>
        <Sheet>
          <SheetTrigger className="flex items-center">
            <RxHamburgerMenu className="text-bold size-8 p-1" />
          </SheetTrigger>

          <SheetContent side="right" className="flex flex-col gap-2">
            <SheetHeader>
              <SheetTitle>
                <SheetClose asChild>
                  <ScrollLink
                    to="OurTech"
                    smooth={true}
                    duration={500}
                    className="flex items-center gap-4 px-6 pt-6"
                  >
                    <img
                      src="/assets/Navigation Bar/adventura 360 logo.webp"
                      alt="logo"
                      className="h-10 w-8"
                    />
                    <h1 className="text-lg font-semibold">Adventura 360°</h1>
                  </ScrollLink>
                </SheetClose>
              </SheetTitle>
              <SheetDescription className="px-6 pb-2 text-muted-foreground">
                Navigation links
              </SheetDescription>
            </SheetHeader>

            <SheetClose asChild>
              <ScrollLink
                to="Showcase"
                smooth={true}
                duration={500}
                className="px-8 py-2 font-semibold hover:bg-accent hover:text-accent-foreground"
              >
                About
              </ScrollLink>
            </SheetClose>

            <SheetClose asChild>
              <ScrollLink
                to="Introduction"
                smooth={true}
                duration={500}
                className="px-8 py-2 font-semibold hover:bg-accent hover:text-accent-foreground"
              >
                Features
              </ScrollLink>
            </SheetClose>

            <SheetClose asChild>
              <ScrollLink
                to="Adventura"
                smooth={true}
                duration={500}
                className="px-8 py-2 font-semibold hover:bg-accent hover:text-accent-foreground"
              >
                Adventura
              </ScrollLink>
            </SheetClose>

            <SheetClose asChild>
              <ScrollLink
                to="Developers"
                smooth={true}
                duration={500}
                className="px-8 py-2 font-semibold hover:bg-accent hover:text-accent-foreground"
              >
                Contact us
              </ScrollLink>
            </SheetClose>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default NavBar;
