import React, { useState, useEffect } from "react";

/* Components */
import Display from "./components/Display";

function VN({
  charactersDB,
  eventsDB,
  setVNState,

  eventList,
  setEventList,
}) {
  // Character Class
  class Character {
    constructor(name, sprites) {
      this.name = name;
      this.sprites = sprites;
    }
  }

  // Event Class
  class Event {
    constructor(scene, dialogue, character) {
      this.scene = scene;
      this.dialogue = dialogue;
      this.character = character;
    }
  }

  // Generate All Characters Class
  function generateCharacters() {
    const characters = [];

    charactersDB.forEach((character) => {
      const sprites = [];
      character.sprites.forEach((sprite) => {
        sprites.push(sprite);
      });
      characters.push(new Character(character.name, sprites));
    });

    return characters;
  }

  // Generate All Events Class
  function generateEvents() {
    const events = [];

    eventsDB.forEach((event) => {
      events.push(new Event(event.scene, event.dialogue, event.character));
    });

    return events;
  }

  const characters = generateCharacters(); // Generate Characters Classes

  const events = generateEvents(); // Generate Events Classes

  // Store target Events in Event Load
  function getEvents() {
    const temp = [];

    eventList.forEach((eventTarget, index) => {
      events.forEach((event) => {
        if (event.scene === eventTarget) {
          temp.push(event);
          // If it's not the last event in the list, add a transition event
          if (index < eventList.length - 1) {
            temp.push(addTransitionEvent()[0]);
          }
        }
      });
    });

    return temp;
  }

  const [eventLoad, setEventLoad] = useState(getEvents()); // Events that needed to be executed

  // Set Default Event
  function defaultEvent() {
    const temp = [
      {
        scene: "default",
        dialogue: [{ text: "Hmm?" }],
      },
    ];

    return temp;
  }

  // Add Transition Event Between Events
  function addTransitionEvent() {
    const temp = [
      {
        scene: "transition",
        dialogue: [{ text: "Anyway" }],
      },
    ];

    return temp;
  }

  useEffect(() => {
    // console.log("VN Event List:", events);
    // console.log("Event List:", eventList);
    console.log("Event Load:", eventLoad);

    // getEvents();
  }, [eventList]);

  useEffect(() => {
    if (eventLoad.length === 0) {
      console.log("Default Event");
      setEventLoad(defaultEvent());
    }
  }, [eventLoad]);

  return (
    <>
      {eventLoad &&
        eventLoad.length > 0 &&
        characters &&
        characters.length !== 0 && (
          <Display
            eventLoad={eventLoad}
            setVNState={setVNState}
            characters={characters}
            setEventList={setEventList}
          />
        )}
    </>
  );
}

export default VN;
