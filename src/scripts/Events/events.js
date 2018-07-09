
const $ = require("jquery");
const loadEventArticle = require("./event-article");
const loadEvents = require("./event-load");
const eventHandlers = require("./event-handlers");

const events = () => {
  console.log("Events is running");
  loadEventArticle();
  eventHandlers();
  loadEvents();

}

module.exports = events;

/*

CLEAN UP event-form
ONLY EDIT YOUR OWN EVENTS in load-events
DON'T ADD PAST EVENTS
HIDE PAST EVENTS
SHOW WHO POSTED EACH EVENT
DESCRIPTIONS NEXT TO EACH FIELD ON EACH EVENT
PARSE DATES TO BE MORE READABLE

*/