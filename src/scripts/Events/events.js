
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
This
BUG WHERE IF YOU TRY TO EDIT AN EVENT WHILE CREATING A NEW ONE, THE ADD NEW EVENT BUTTON WILL NEVER RETURN
CLEAN UP event-form
SUBMIT AND SAVE BUTTON BOTH SAY SAVE
CANCEL BUTTON WHEN ADDING NEW EVENT
CANCEL BUTTON WHEN EDITING EVENT
ONLY EDIT YOUR OWN EVENTS in load-events
DON'T ADD PAST EVENTS
HIDE PAST EVENTS
SHOW WHO POSTED EACH EVENT
DESCRIPTIONS NEXT TO EACH FIELD ON EACH EVENT
PARSE DATES TO BE MORE READABLE

*/