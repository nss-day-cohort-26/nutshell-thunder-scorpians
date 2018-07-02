
const $ = require("jquery");
const apiController = require("../apiController");
const loadEvents = require("./event-load");
const createNewEvent = require("./event-form");

console.log("events page is working");

/* Page Load:
1. Accept the current user's id number
2. Make the API call to get all events for the user and his friends, sorted by date and return the call
  .then(
    1. Build a DOM section element for each event in the response
    2. Put all DOM sections into an article and return the article
*/

/* Page Has Loaded:
1. Add New Event Button
*/

loadEvents();
createNewEvent();
