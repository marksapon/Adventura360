import React from "react";
import { useNavigate } from "react-router-dom";

export default function adventuravn() {
  const navigate = useNavigate();
  return (
    <div className="mx-auto w-full px-4 md:w-3/4 xl:w-1/2">
      <div className="">
        <div className="relative mx-auto aspect-video w-80">
          <button
            onClick={() => navigate("/")}
            className="mx-auto flex py-4 transition-all duration-300 hover:scale-110"
          >
            <img
              src="/assets/Navigation Bar/adventura 360 logo.webp"
              className="aspect-auto h-12"
              alt=""
            />
          </button>
          <a
            href="https://placide.itch.io/adventura"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/assets/Landing Page/adventura-logo-dark.png"
              alt=""
              className="pointer-events-none select-none object-contain"
            />
          </a>
        </div>
        <iframe
          src="https://itch.io/embed-upload/7325386?color=4ad946"
          allowFullScreen
          className="aspect-video size-full"
        />
      </div>

      <div className="flex flex-col gap-4 py-8 text-center ">
        <h1 className="text-3xl font-bold text-green-600">
          WELCOME TO ADVENTURA VN
        </h1>
        <p className="text-balance">
          Adventura is a Visual Novel game that allows the users to navigate
          inside the actual place of Cavite State University Indang Campus.
        </p>

        <h1 className="text-xl font-semibold text-green-600">About the Game</h1>
        <p className="text-balance">
          You play as a curious Visitor or a Student of the campus. Navigating
          different places of the campus and learning its history and their
          purpose. Using the Itinerary as list of places the campus has, the
          Street View as a way to navigate on foot, and lastly the Map as a way
          to quickly travel to places inside the campus.
        </p>

        <h5 className="text-center text-xl font-semibold text-green-600">
          Meet the Creators
        </h5>
        <div className="relative mx-auto flex">
          <img
            src="/assets/Landing Page/adventura-devs.png"
            alt="Adventura creators"
            className="pointer-events-none select-none object-contain"
            draggable={false}
          />
        </div>

        <p className="text-balance text-center">
          This game is developed by the Team Sen'Py, consisting of three people
          which are students from Cavite State University Indang Campus.
        </p>
        <p className="text-balance text-center text-xs">
          For more information about the game, please visit the game&apos;s
          itch.io page.
        </p>
        <iframe src="https://itch.io/embed/1879915" className="w-full">
          <a href="https://placide.itch.io/adventura">
            Adventura: An Online Interactive Campus Tour by Team Sen'Py
          </a>
        </iframe>
      </div>
    </div>
  );
}
