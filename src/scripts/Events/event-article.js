// This module loads the header, add event button, and event article that the other elements will interact with
// Author: Elliot Huck

const $ = require("jquery");
const createNewEvent = require("./event-form");
// Required by: events

const loadEventArticle = () => {
  const $eventHeader = $("<h2>").attr("id", "event-header")
  $eventHeader.text("Events");
  $(".events").append($eventHeader);

  const $newEventButton = $("<button>").attr("id", "add-event");
  $newEventButton.text("Add Event").click(createNewEvent);
  $(".events").append($newEventButton);

  const $eventArticle = $("<article>").attr("id", "event-article");
  $(".events").append($eventArticle);
}

module.exports = loadEventArticle;