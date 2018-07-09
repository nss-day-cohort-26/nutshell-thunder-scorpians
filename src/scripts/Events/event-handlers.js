// This module adds an event handler to the events article on the main page that will trigger a different function depending on what button was clicked
// Author: Elliot Huck

const $ = require("jquery");
const addEvent = require("./event-form");
const deleteEvent = require("./event-delete");
const editEvent = require("./event-edit");
// Required by: events

const addHandlers = () => {
  console.log("Adding event handlers...")
  const $eventDiv = $(".events");
  $eventDiv.click(event => {
    console.log("Click event: ", event);
    const $buttonClicked = $(event.target);
    switch (true) {
      case ($buttonClicked.hasClass("event__button--new")):
        addEvent;
        break;
      case ($buttonClicked.text() === "Edit"):
        editEvent(event);
        break;
      case ($buttonClicked.hasClass("event__button--delete")):
        deleteEvent(event);
        break;
      default:
        break;
    }
  });
  console.log("Event handlers added")
}

module.exports = addHandlers;