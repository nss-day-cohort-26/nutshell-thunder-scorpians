// This module loads all the events and prints them to the DOM

const $ = require("jquery");
const apiController = require("../apiController");


class Event {
  constructor(userId, name, date, location) {
    this.userId = userId;
    this.name = name;
    this.date = date;
    this.location = location;
  }
}


const loadEvents = () => {
  console.log("load events running")

  const newThing = new Event();
  newThing.name = "this";
  console.log(newThing);
  console.log("load events running")
};

module.exports = loadEvents;