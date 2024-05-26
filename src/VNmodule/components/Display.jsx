import React, { useEffect, useState } from "react";

/* Icons */
import { FaWindowClose } from "react-icons/fa";

function Display({ current_character, current_dialogue, setVNState }) {
  const [dialogue, setDialogue] = useState("Hmm?");

  function nextDialogue() {
    console.log("Next Dialogue");
    setDialogue("Hello!");
  }

  return (
    <div className="absolute bottom-0 z-20 h-full w-full">
      <div className="absolute h-screen w-screen bg-black bg-opacity-80" />

      {/* Content */}
      <div className="position-relative absolute flex h-full w-full items-end justify-center ">
        {/* Character */}
        <div className="absolute flex h-full w-full items-end md:w-1/2">
          <div className="animate-fade-in relative flex h-full w-full items-end justify-center overflow-hidden">
            <img
              className="absolute left-1/2 top-0 h-full -translate-x-1/2 transform object-contain md:object-contain"
              src="/assets/VN Module/character/greet.webp"
              alt="Character"
            />
          </div>
        </div>
        {/* Character */}

        {/* Dialogue */}
        <div className="absolute bottom-0 flex h-2/6 w-full justify-center p-5">
          <button
            className="animate-fade-in relative h-full w-full rounded-lg bg-white bg-opacity-100 p-5 md:w-3/5 md:bg-opacity-90"
            onClick={nextDialogue}
          >
            <div className="absolute -top-14 right-0   flex h-10 w-10 items-center justify-center bg-white md:-right-14 md:top-0">
              <button onClick={() => setVNState(false)}>
                <FaWindowClose size={50} className="text-green-500" />
              </button>
            </div>
            <p className="font-sans text-base font-semibold text-black md:text-xl">
              {dialogue}
            </p>
          </button>
        </div>
        {/* Dialogue */}
      </div>
    </div>
  );
}

export default Display;
