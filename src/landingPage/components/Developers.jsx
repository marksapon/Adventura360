import React from "react";
import { LuLink, LuExternalLink } from "react-icons/lu";

const developers = [
  {
    name: "John Joshua Sagpao",
    role: "Main developer of Adventura 360°",
    img: "../assets/Landing Page/developers/1111.jpg",
  },
  {
    name: "Kevin Roi Nuesca",
    role: "Main developer of Adventura 360°",
    img: "../assets/Landing Page/developers/1111.jpg",
  },
  {
    name: "Mark Darrel Sapon",
    role: "Main developer of Adventura 360°",
    img: "../assets/Landing Page/developers/1111.jpg",
  },
  {
    name: "Alex kalel buinviahje",
    role: "Main developer of Adventura 360°",
    img: "../assets/Landing Page/developers/1111.jpg",
  },
  // Add more developers as needed
];

const sections = [
  {
    title: "Important Links",
    links: ["Link1", "Link2", "Link3", "Link4"],
  },
  {
    title: "Socials",
    links: ["Link1", "Link2", "Link3", "Link4"],
  },
  {
    title: "Other",
    links: ["Link1", "Link2", "Link3", "Link4"],
  },
  // Add more sections as needed
];

const Developers = () => {
  return (
    <footer className="h-fit w-full">
      <div className="mt-16 flex h-fit w-full flex-col" id="Developers">
        <div className="flex w-full flex-col pb-8 lg:flex-row">
          <div className="z-40 h-auto w-full px-8 lg:w-1/2">
            <h1 className="relative w-full text-center text-5xl font-black leading-snug tracking-tight duration-300 md:text-6xl lg:text-left lg:text-7xl xl:text-8xl">
              Meet the <span className="text-green-600">developers</span>!
            </h1>
            <h2 className="mt-4 text-center text-base text-gray-500 lg:text-start">
              Meet the passionate team of Computer Science students at Cavite
              State University - Indang Campus, known as Sen'Py.
            </h2>
          </div>
          <div className="xl-grid-cols-1 z-40 grid h-fit w-full grid-cols-1 gap-4 p-4 text-center md:grid-cols-2 xl:w-1/2">
            {developers.map((developer) => (
              <div className="flex w-full flex-col rounded-2xl border bg-white shadow-xl duration-300 hover:bg-slate-200">
                <div
                  className="m-1 flex h-[220px] w-auto items-center justify-center rounded-t-lg"
                  style={{
                    backgroundImage: `url("${developer.img}")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <div className="flex flex-col px-4 py-1 text-start">
                  <div className="pb-1 text-xl font-bold text-black xl:text-2xl">
                    {developer.name}
                  </div>
                  <div className=" text-sm text-gray-500 xl:text-base">
                    {developer.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto border-t px-8 pb-8 pt-4">
        <div className="grid grid-cols-3 gap-4 md:grid-cols-6">
          <div className="col-span-3">
            <div className="flex items-center space-x-5">
              <p className="flex cursor-pointer items-center text-2xl font-semibold">
                Adventura 360°
              </p>
            </div>
            <p className="text-muted-foreground mt-3">sub heading for title</p>
          </div>
          {sections.map((section) => (
            <div className="col-span-1">
              <p className="text-secondary-foreground mt-3 font-semibold sm:mb-3 sm:mt-0 ">
                {section.title}
              </p>
              <div className="flex flex-col">
                {section.links.map((link) => (
                  <a href="">{link}</a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Developers;
