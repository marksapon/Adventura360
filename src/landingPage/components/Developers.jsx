import React from "react";
import { LuLink, LuExternalLink } from "react-icons/lu";

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
          <div className="xl-grid-cols-1 z-40 grid h-fit w-full grid-cols-1 gap-4 p-4 text-center md:grid-cols-2 lg:w-1/2">
            <div className="flex w-full flex-col rounded-2xl border bg-white p-1 shadow-xl duration-300 hover:bg-slate-200">
              <div className="flex items-center justify-center rounded-2xl p-2">
                <img
                  src="https://tailwind-generator.b-cdn.net/images/card-generator/tailwind-card-generator-card-preview.png"
                  alt="Card Preview"
                  className="rounded-xl"
                  width={720}
                  height={480}
                />
              </div>
              <div className="flex flex-col px-4 py-1 text-start">
                <div className="pb-1 text-2xl font-bold text-black">
                  Mark Dharel Sapon
                </div>
                <div className="text-lg text-gray-500">
                  Main developer of Adventura 360°.
                </div>
              </div>
            </div>
            <div className="flex w-full flex-col rounded-2xl border bg-white p-1 shadow-xl duration-300 hover:bg-slate-200">
              <div className="flex items-center justify-center rounded-2xl p-2">
                <img
                  src="https://tailwind-generator.b-cdn.net/images/card-generator/tailwind-card-generator-card-preview.png"
                  alt="Card Preview"
                  className="rounded-xl"
                  width={720}
                  height={480}
                />
              </div>
              <div className="flex flex-col px-4 py-1 text-start">
                <div className="pb-1 text-2xl font-bold text-black">
                  Kevin Roi Nuesca
                </div>
                <div className="text-lg text-gray-500">
                  Main developer of Adventura 360°.
                </div>
              </div>
            </div>
            <div className="flex w-full flex-col rounded-2xl border bg-white p-1 shadow-xl duration-300 hover:bg-slate-200">
              <div className="flex items-center justify-center rounded-2xl p-2">
                <img
                  src="https://tailwind-generator.b-cdn.net/images/card-generator/tailwind-card-generator-card-preview.png"
                  alt="Card Preview"
                  className="rounded-xl"
                  width={720}
                  height={480}
                />
              </div>
              <div className="flex flex-col px-4 py-1 text-start">
                <div className="pb-1 text-2xl font-bold text-black">
                  John Joshua Sagpao
                </div>
                <div className="text-lg text-gray-500">
                  Main developer of Adventura 360°.
                </div>
              </div>
            </div>
            <div className="flex w-full flex-col rounded-2xl border bg-white p-1 shadow-xl duration-300 hover:bg-slate-200">
              <div className="flex items-center justify-center rounded-2xl p-2">
                <img
                  src="https://tailwind-generator.b-cdn.net/images/card-generator/tailwind-card-generator-card-preview.png"
                  alt="Card Preview"
                  className="rounded-xl"
                  width={720}
                  height={480}
                />
              </div>
              <div className="flex flex-col px-4 py-1 text-start">
                <div className="pb-1 text-2xl font-bold text-black">
                  Alex Kal-el Buenviaje
                </div>
                <div className="text-lg text-gray-500">
                  Main developer of Adventura 360°.
                </div>
              </div>
            </div>
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
            <a
              className="focus-visible:ring-ring text-muted-foreground mt-4 inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md p-0 text-sm font-medium underline-offset-4 transition-colors hover:underline focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50"
              href="https://github.com/MilkSource/Adventura360"
              target="_blank"
              rel="noopener noreferrer"
            >
              Source Code{" "}
              <LuExternalLink className="flex size-5 items-center pl-1" />
            </a>
          </div>
          <div className="col-span-1">
            <p className="text-secondary-foreground mt-3 font-semibold sm:mb-3 sm:mt-0 ">
              Important Links
            </p>
            <div className="flex flex-col">
              <a href="">Links</a>
              <a href="">Links</a>
              <a href="">Links</a>
              <a href="">Links</a>
            </div>
          </div>
          <div className="col-span-1">
            <p className="text-secondary-foreground mt-3 font-semibold sm:mb-3 sm:mt-0 ">
              Socials
            </p>
            <div className="flex flex-col">
              <a href="">Links</a>
              <a href="">Links</a>
              <a href="">Links</a>
              <a href="">Links</a>
            </div>
          </div>
          <div className="col-span-1">
            <p className="text-secondary-foreground mt-3 font-semibold sm:mb-3 sm:mt-0 ">
              Other
            </p>
            <div className="flex flex-col">
              <a href="">Links</a>
              <a href="">Links</a>
              <a href="">Links</a>
              <a href="">Links</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Developers;
