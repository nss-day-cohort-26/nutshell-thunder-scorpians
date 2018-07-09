// This module runs all the event functions: loads the event article, adds the event handlers, and then loads all the events
// Author: Elliot Huck

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
Stretch goals:
CLEAN UP & REFACTOR event-form
CANCEL BUTTON WHEN ADDING NEW EVENT
CANCEL BUTTON WHEN EDITING EVENT
DON'T ADD PAST EVENTS
HIDE PAST EVENTS
SHOW NAMES FOR WHO POSTED EACH EVENT
DESCRIPTIONS NEXT TO EACH FIELD ON EACH EVENT
PARSE DATES TO BE MORE READABLE
*/