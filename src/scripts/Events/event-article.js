// This module loads the header, add event button, and event article that the other elements will interact with
// Author: Elliot Huck

const $ = require("jquery");
// Required by: events

const loadEventArticle = () => {
  console.log("Loading event article...")
  // This section loads an h2 with the text "Events"
  const $eventHeader = $("<h2>").attr("id", "event-header")
  $eventHeader.text("Events");
  $(".events").append($eventHeader);

  // This section loads the button to add new events
  const $newEventButton = $("<button>").attr("id", "add-event");
  $newEventButton.text("New Event");
  $(".events").append($newEventButton);

  // This section loads the event article that all the events will be written into
  const $eventArticle = $("<article>").attr("id", "event-article");
  $(".events").append($eventArticle);

  console.log("Event article loaded")
}

module.exports = loadEventArticle;