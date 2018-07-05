
const $ = require("jquery");
const apiController = require("../apiController");
const loadEvents = require("./event-load");
const createNewEvent = require("./event-form");

const events = () => {

console.log("events page is working");

/* Page Has Loaded:
1. Add New Event Button
*/
loadEvents();

/*
Once the page has loaded, I need to add a button with an event listener that will run createNewEvent when clicked
*/

createNewEvent();

}

events();

module.exports = events;

/*
NEW EVENT FORM NEEDS TO LOAD FROM A BUTTON
Given a user wants to keep track on a future event
When the user clicks an affordance to enter a new event in the application
Then a form should be presented to the user in which the following properties of the event can be provided

Name of event
Date of event
Location of event

SAVE EVENT NEEDS TO RELOAD ALL EVENTS
Given a user has entered in all details of an event
When the user performs a gesture to save the event
Then the event should be displayed in the application in the Events component

CREATE EVENTS.CSS
Given a user has entered in 1, or more, events
When the event component is updated
Then the next event on the agenda should have bold text
And it should be slightly larger in size
And it should have a non-white, and non-offensive background color

ADD AN EDIT/DELETE BUTTON TO EACH EVENT
Given a user wants to change the details of an event
When the user performs a gesture to edit an event
Then the user should be presented with a form that has the event details pre-filled into the fields
And there should be an affordance to save the new details

*/