import React, { useEffect, useState } from "react";
import DOMPurify from "dompurify";

/* Icons */
import { FaWindowClose } from "react-icons/fa";

function Display({ characters, eventLoad, setVNState }) {
  const [eventList, setEventList] = useState(eventLoad);

  const [current_event, setCurrentEvent] = useState(eventList[0]);
  const [dialogue, setDialogue] = useState(eventList[0].dialogue[0]);
  const [character, setCharacter] = useState(eventList[0].character);

  const [dialogueCounter, setDialogueCounter] = useState(0);

  function nextDialogue() {
    console.log("Next Dialogue");
    if (current_event) {
      if (dialogueCounter < current_event.dialogue.length - 1) {
        setDialogue(current_event.dialogue[dialogueCounter + 1]);
      } else if (dialogueCounter === current_event.dialogue.length - 1) {
        setDialogueCounter(0);
        setEventList((prev) => prev.slice(1));
        if (eventList.length > 1) {
          // Check if there's another event after the current one
          setCurrentEvent(eventList[1]); // Set the next event
          setDialogue(eventList[1].dialogue[0]); // Set the dialogue of the next event
        } else {
          setVNState(false);
        }
      }
    }
  }

  useEffect(() => {
    console.log("Dialogue Counter:", dialogueCounter);
  }, [dialogueCounter]);

  function purifyText(text) {
    const sanitizedHTML = DOMPurify.sanitize(text);
    return <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />;
  }

  useEffect(() => {
    console.log("Event Load:", eventLoad);
  }, []);

  return (
    <div className=" absolute bottom-0 z-20 h-full w-full">
      <div className="absolute h-screen w-screen bg-black bg-opacity-80" />

      {/* Content */}
      <div className="animate-fade-in position-relative absolute flex h-full w-full items-end justify-center ">
        {/* Character */}
        <div className="absolute flex h-full w-full items-end md:w-1/2">
          <div className="animate-fade-in relative flex h-full w-full items-end justify-center overflow-hidden">
            <img
              className="absolute left-1/2 top-0 h-full -translate-x-1/2 transform object-contain md:object-contain"
              src="/assets/VN Module/character/me.png"
              alt="Character"
            />
          </div>
        </div>
        {/* Character */}

        {/* Dialogue */}
        <div className="absolute bottom-0 flex h-2/6 w-full justify-center p-5">
          <div className=" relative flex h-full w-full items-center justify-center rounded-lg border-2 border-green-600 md:w-3/5">
            <button
              className=" relative h-full w-full rounded-lg bg-white bg-opacity-100 p-5 md:bg-opacity-100"
              onClick={() => {
                setDialogueCounter(dialogueCounter + 1);
                nextDialogue();
              }}
            >
              <div className="font-sans text-base font-semibold text-black md:text-xl">
                {purifyText(dialogue.text)}
              </div>
            </button>
            <div className="absolute -top-12 right-0 flex h-10 w-10 items-center justify-center rounded-md bg-white md:-right-14 md:top-0 ">
              <button onClick={() => setVNState(false)}>
                <FaWindowClose size={50} className="text-green-500" />
              </button>
            </div>
          </div>
        </div>
        {/* Dialogue */}
      </div>
    </div>
  );
}

export default Display;
