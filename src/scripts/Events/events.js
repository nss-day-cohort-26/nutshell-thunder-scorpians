
const $ = require("jquery");
const apiController = require("../apiController");
const loadEventArticle = require("./event-article");
const loadEvents = require("./event-load");

const events = () => {
  console.log("Events is running");
  loadEventArticle();
  loadEvents();

}

module.exports = events;

/*

MAKE EVENTS LOAD FOR ALL FRIENDS in event-load
When the active user is viewing the main view of the application
Then the other user's news articles, and event list should appear in the current user's corresponding components
And the other user's article and events should be styled with italicized font
And the other user's article and events should be styled with a cornsilk background color

ADD AN EDIT/DELETE BUTTON TO EACH EVENT in event-load
Given a user wants to change the details of an event
When the user performs a gesture to edit an event
Then the user should be presented with a form that has the event details pre-filled into the fields
And there should be an affordance to save the new details

GET USERID FROM SESSION STORAGE in event-submit

CLEAN UP event-form

*/