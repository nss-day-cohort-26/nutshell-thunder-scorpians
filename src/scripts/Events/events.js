
const $ = require("jquery");
const apiController = require("../apiController");
const loadEvents = require("./event-load");
const createNewEvent = require("./event-form");

console.log("events page is working");



/* Page Has Loaded:
1. Add New Event Button
*/
const $eventsArticle = $("<article>").addClass("article--events");
loadEvents();

/*
Once the page has loaded, I need to add a button with an event listener that will run createNewEvent when clicked
*/

createNewEvent();

/*
After a new event is created, clicking the Submit button should reload all the events on the page
*/
