import React, { useState, useEffect } from "react";

/* Components */
import Display from "./components/Display";

function VN({
  charactersDB,
  eventsDB,
  setVNState,
  eventList,
  overallEvents,
  setOverallEvents,
}) {
  const [eventLoad, setEventLoad] = useState([]);

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

  const characters = generateCharacters(); // Generate Characters

  const events = generateEvents(); // Generate Events that are still

  // Generate Characters Function
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

  function generateEvents() {
    const events = [];

    overallEvents.forEach((event) => {
      events.push(new Event(event.scene, event.dialogue, event.character));
    });

    return events;
  }

  function getEvents() {
    eventList.map((eventTarget) => {
      console.log("Event:", eventTarget);
      events.map((event) => {
        console.log("Event:", event);
        if (event.scene === eventTarget) {
          console.log("Event found!");
          setEventLoad([...eventLoad, event]);
        } else {
          console.log("Event not found!");
        }
      });
    });
  }

  useEffect(() => {
    // console.log("Event List:", eventList);
    // console.log("Characters:", characters);
    // console.log("Events:", events);
    getEvents();
  }, []);

  useEffect(() => {
    console.log("Event Load:", eventLoad);
  }, [eventLoad]);

  return (
    <>
      {eventLoad && eventLoad.length > 0 && (
        <Display
          eventLoad={eventLoad}
          setVNState={setVNState}
          characters={characters}
        />
      )}
    </>
  );
}

export default VN;
