
const $ = require("jquery");
const apiController = require("../apiController");
const loadEvents = require("./event-load");
const createNewEvent = require("./event-form");

const events = () => {

console.log("events page is working");

/* Page Has Loaded:
1. Add New Event Button
*/

const $eventHeader = $("<h2>").attr("id", "event-header")
$eventHeader.text("Events");
$(".events").append($eventHeader);

const $newEventButton = $("<button>").attr("id", "add-event");
$newEventButton.text("Add Event").click(createNewEvent);
$(".events").append($newEventButton);

const $eventArticle = $("<article>").attr("id", "event-article");
$(".events").append($eventArticle);

loadEvents();

//createNewEvent();

}

events();

module.exports = events;

/*

ADD AN EDIT/DELETE BUTTON TO EACH EVENT
Given a user wants to change the details of an event
When the user performs a gesture to edit an event
Then the user should be presented with a form that has the event details pre-filled into the fields
And there should be an affordance to save the new details

*/