import React, { useState, useEffect } from "react";

/* Components */
import Display from "./components/Display";

function VN({
  charactersDB,
  eventsDB,
  setVNState,

  eventList,
  setEventList,

  events_available,
  setEventsAvailable,

  setEventDone,

  tourState,
  setTourState,
}) {
  // const events = events_available;

  const characters = charactersDB; // Generate Characters Classes

  // Store target Events in Event Load
  function getEvents() {
    const temp = [];

    eventList.forEach((eventTarget, index) => {
      eventsDB.forEach((event) => {
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

  useEffect(() => {
    console.log("Event Load:", eventLoad);
  }, []);

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
        dialogue: [{ text: "Anyway..." }],
      },
    ];

    return temp;
  }

  // useEffect(() => {
  //   console.log("VN Module");
  // }, []);

  useEffect(() => {
    // console.log("VN Event List:", events);
    // console.log("Event List:", eventList);
    // console.log("Event Load:", eventLoad);
    // console.log("Events Available:", events_available);
    // getEvents();
  }, [eventList]);

  // useEffect(() => {
  //   console.log("Event List:", eventList);
  //   console.log("Tour State:", tourState);
  // }, [tourState]);

  useEffect(() => {
    if (eventLoad.length === 0 && tourState) {
      setEventLoad(defaultEvent());
    } else if (events_available.length === 0) {
      console.log("No more events");
    }
  }, [eventLoad, tourState]);

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
            setEventsAvailable={setEventsAvailable}
            setTourState={setTourState}
            setEventDone={setEventDone}
          />
        )}
    </>
  );
}

export default VN;
