import React, { useState, useEffect } from "react";



/* Components */
import Display from "./components/Display";

function VN({ charactersDB, eventsDB, setVNState }) {
  const [current_character, setCurrentCharacter] = useState();
  const [current_event, setCurrentEvent] = useState();
  const [current_dialogue, setCurrentDialogue] = useState();

  // Generating Characters
  class Character {
    constructor(name, sprites) {
      this.name = name;
      this.sprites = sprites;
    }
  }

  const characters = generateCharacters();

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

  // Generating Events
  class Event {
    constructor(scene, dialogue, character) {
      this.scene = scene;
      this.dialogue = dialogue;
      this.character = character;
    }
  }

  const events = generateCharacters();

  function generateEvents() {
    const events = [];

    eventsDB.forEach((event) => {
      events.push(new Event(event.scene, event.dialogue, event.character));
    });

    return events;
  }

  console.log("Characters:", characters);
  console.log("Events:", events);

  return (
    <Display
      current_character={current_character}
      current_dialogue={current_dialogue}
      setVNState={setVNState}
    />
  );
}

export default VN;
