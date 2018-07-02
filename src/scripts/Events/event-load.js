// This module loads all the events and prints them to the DOM

const $ = require("jquery");
const apiController = require("../apiController");
const Event = require("./event-class");

const loadEvents = () => {
  console.log("load events running")

  const newThing = new Event();
  newThing.name = "this";
  console.log(newThing);
  console.log("load events running")

  apiController.events.getAllEvents().then(response => console.log(response));
};

module.exports = loadEvents;