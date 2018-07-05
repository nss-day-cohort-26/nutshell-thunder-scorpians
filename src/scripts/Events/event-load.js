// This module loads all the events and prints them to the DOM
// Author: Elliot Huck

/* Page Load:
1. Accept the current user's id number
2. Make the API call to get all events for the user and his friends, sorted by date and return the call
  .then(
    1. Build a DOM section element for each event in the response
    2. Put all DOM sections into an article and return the article
*/

const $ = require("jquery");
const apiController = require("../apiController");
const Event = require("./event-class");
// Required by: events, event-submit
const currentUser = sessionStorage.getItem("activeUser");

// Needs to accept the parameter for the currentUserId and his friends
const loadEvents = (currentUser) => {
  console.log("Load events running")
  console.log("Current User: ", currentUser);
  // New function here to get all the users friends

  apiController.events.getAllEvents().then(sortedEvents => {
    console.log(sortedEvents);
    const $eventArticle = $("#event-article");
    $eventArticle.empty();
    sortedEvents.forEach(event => {
      console.log("for each running");
      const $eventSection = $("<section>");
      $("<h3>").text(event.name).appendTo($eventSection);

      if (parseInt(event.userId) === currentUser) {
        $eventSection.addClass("event event--yours");
        $("<p>").text("Posted by: You").appendTo($eventSection);
      } else {
        $eventSection.addClass("event event--others");
        $("<p>").text("Posted by: A friend").appendTo($eventSection);
      }

      $("<p>").text(event.date).appendTo($eventSection);
      $("<p>").text(event.location).appendTo($eventSection);

      $eventSection.appendTo($eventArticle);
    });
    $eventArticle.appendTo($(".events"));
  });
};

module.exports = loadEvents;