// This module adds an event handler to the events article on the main page that will trigger a different function depending on what type of button was clicked
// Author: Elliot Huck

const $ = require("jquery");
const addEvent = require("./event-form");
const submitEvent = require("./event-submit");
const editEvent = require("./event-edit");
const deleteEvent = require("./event-delete");
// Required by: events

const addHandlers = () => {
  console.log("Adding event handlers...")

  const $eventDiv = $(".events");
  $eventDiv.click(event => {
    const $buttonClicked = $(event.target);

    // This switch checks which button was clicked
    switch (true) {
      case ($buttonClicked.text() === "New Event"):
        addEvent();
        break;
      case ($buttonClicked.text().startsWith("Save")):
        submitEvent(event);
        break;
      case ($buttonClicked.text() === "Edit"):
        editEvent(event);
        break;
      case ($buttonClicked.text() === "Delete"):
        deleteEvent(event);
        break;
      default:
        break;
    }
  });

  console.log("Event handlers added")
}

module.exports = addHandlers;