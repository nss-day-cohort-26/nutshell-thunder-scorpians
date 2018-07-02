// This module loads all the events and prints them to the DOM
// Author: Elliot Huck

const $ = require("jquery");
const apiController = require("../apiController");
const Event = require("./event-class");
// Required by: events, event-submit
const currentUser = 1;

const loadEvents = () => {
  console.log("load events running")

  const newThing = new Event();
  newThing.name = "this";
  console.log(newThing);
  console.log("load events running")

  apiController.events.getAllEvents().then(sortedEvents => {
    console.log(sortedEvents);
    const $eventsArticle = $("<article>");
    sortedEvents.forEach(event => {
      console.log("for each running");
      const $eventSection = $("<section>");
      $("<h3>").text(event.name).appendTo($eventSection);

      if (parseInt(event.userId) === currentUser) {
        $eventSection.addClass("event--yours");
        $("<p>").text("Posted by: You").appendTo($eventSection);
      } else {
        $eventSection.addClass("event--others");
        $("<p>").text("Posted by: A friend").appendTo($eventSection);
      }

      $("<p>").text(event.date).appendTo($eventSection);
      $("<p>").text(event.location).appendTo($eventSection);

      $eventSection.appendTo($eventsArticle);
    });
    $eventsArticle.prependTo($("body"));
  });
};

module.exports = loadEvents;