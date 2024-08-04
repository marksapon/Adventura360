import React, { useEffect, useState } from "react";
import DOMPurify from "dompurify";

/* Icons */
import { FaWindowClose } from "react-icons/fa";

function Display({
  characters,

  eventLoad,

  setVNState,

  setEventList,

  setEventsAvailable,

  setTourState,

  setEventDone,
}) {
  const [displayEventList, setDisplayEventList] = useState(eventLoad);

  const [current_event, setCurrentEvent] = useState(displayEventList[0]);
  const [dialogue, setDialogue] = useState(displayEventList[0].dialogue[0]);

  const [character, setCharacter] = useState(getCharacter());

  const [dialogueCounter, setDialogueCounter] = useState(0);

  function finishedEvents(removeAll) {
    if (removeAll) {
      for (const event of eventLoad) {
        setEventsAvailable((prev) =>
          prev.filter((e) => e.scene !== event.scene),
        );
        if (current_event.scene !== "default") {
          setEventDone((prev) => Array.from(new Set([...prev, event.scene])));
        }
      }
    } else {
      setEventsAvailable((prev) =>
        prev.filter((e) => e.scene !== current_event.scene),
      );
      if (current_event.scene !== "default") {
        setEventDone((prev) =>
          Array.from(new Set([...prev, current_event.scene])),
        );
      }
    }
  }

  function nextDialogue() {
    // Execute this as long as there is an event in EventLoad
    if (displayEventList.length !== 0) {
      if (dialogueCounter < current_event.dialogue.length - 1) {
        // console.log("Next Dialogue");
        setDialogue(current_event.dialogue[dialogueCounter + 1]);
        setDialogueCounter(dialogueCounter + 1);
      } else if (dialogueCounter === current_event.dialogue.length - 1) {
        // console.log("Next Event");
        setDialogueCounter(0);
        setDisplayEventList((prev) => prev.slice(1));

        if (displayEventList.length > 1) {
          // Check if there's another event after the current one
          setCurrentEvent(displayEventList[1]); // Set the next event
          setDialogue(displayEventList[1].dialogue[0]); // Set the dialogue of the next event
        } else {
          setTourState(false);
          setEventList([]); // If there's no more event, set the event list to empty
          finishedEvents(); // Remove the event from the available events
          setVNState(false); // Close the VN
        }
      }
    }
  }

  // Get Characters
  function getCharacter(name, sprite) {
    let temp = { name: "", image: "" };

    if (name && sprite) {
      characters.forEach((character) => {
        if (character.name === name) {
          temp["name"] = character.name;
          character.sprites.forEach((charSprite) => {
            if (charSprite.sprite === sprite) {
              temp["image"] = charSprite.image;
            }
          });
        }
      });
    } else {
      temp["name"] = characters[0].name;
      temp["image"] = characters[0].sprites[0].image;
    }

    return temp;
  }

  // Check for Event Load
  // useEffect(() => {
  //   console.log("VN Event Load:", displayEventList); // Events that needed to be executed
  // }, [displayEventList]);

  // Check for Current Character
  // useEffect(() => {
  //   console.log("VN Current Character:", character); // Current Event
  // }, [character]);

  // Check for Current Dialogue
  useEffect(() => {
    // console.log("VN Dialogue:", dialogue); // Current Dialogue
    if (dialogue.character && dialogue.sprite) {
      setCharacter(getCharacter(dialogue.character, dialogue.sprite));
    } else {
      setCharacter(getCharacter());
    }
  }, [dialogue]);

  // Purify the Dialogues
  function purifyText(text) {
    const sanitizedHTML = DOMPurify.sanitize(text);
    return <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />;
  }

  return (
    <div className=" absolute bottom-0 z-20 h-full w-full ">
      <div className="absolute h-screen w-screen bg-black bg-opacity-80" />

      {/* Content */}
      <div className="position-relative animate-fade-in absolute flex h-full w-full items-end justify-center ">
        {/* Character */}
        <div className="absolute flex h-5/6 w-full items-end  md:w-1/2">
          <div className="animate-fade-in relative flex h-full w-full items-end justify-center overflow-hidden ">
            <img
              className="absolute left-1/2 top-0 h-full -translate-x-1/2 transform  object-contain md:object-contain"
              src={
                character.image
                  ? character.image
                  : "https://via.placeholder.com/150"
              }
              alt="Character"
            />
          </div>
        </div>
        {/* Character */}

        {/* Dialogue */}
        <div className="absolute bottom-0 flex h-2/6 w-full justify-center p-2 md:p-0">
          <div className="flex w-full items-start justify-center px-5 md:w-1/2">
            <div className="absolute -top-12 z-10 flex h-auto w-full items-center px-8 md:-top-14 md:w-1/2 md:px-6">
              <div className="flex w-auto items-start justify-start">
                <div className="text-bold font-montserrat text-5xl font-extrabold text-green-500">
                  {character.name}
                </div>
              </div>

              <div className="flex h-auto w-full justify-end">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-white ">
                  <button
                    onClick={() => {
                      setEventList([]);
                      finishedEvents(true);
                      setVNState(false);
                    }}
                  >
                    <FaWindowClose size={50} className="text-green-500" />
                  </button>
                </div>
              </div>
            </div>

            <button
              className=" relative h-full w-full rounded-xl bg-white bg-opacity-100 p-5 md:bg-opacity-100"
              onClick={() => {
                nextDialogue();
              }}
            >
              <div className="font-quicksand text-base font-semibold text-black md:text-xl">
                {purifyText(dialogue.text)}
              </div>
            </button>
          </div>
        </div>
        {/* Dialogue */}
      </div>
    </div>
  );
}

export default Display;

// Check for Every Character Class
// useEffect(() => {
//   console.log("VN Characters:", characters);
// }, []);
