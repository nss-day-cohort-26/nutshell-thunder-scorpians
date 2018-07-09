// Author: Elliot Huck
/* Click New Event Button:
Make a form
  Form Submit:
  1. Check that all inputs have been filled
  2. Read the input fields
  3. Call the API and Post
    .then(
      1. Reload all the events (run page load)
*/

const $ = require("jquery");
const Event = require("./event-class");
const apiController = require("../apiController");
const loadEvents = require("./event-load");
// Required by: event-handlers


const submitEvent = (event) => {

  const buttonId = event.target.id;
  const editId = parseInt(buttonId);
  const $allInputs = $(`#${editId}event input`);
  const allValues = [];

  $allInputs.each((i, element) => {
    allValues.push(element.value);
  });

  if (allValues.includes("")) {
    alert("You must fill all input fields to submit/save an event");
  } else {
    // Creates a new object of the Event class that will be passed to the apiController
    const currentUser = parseInt(sessionStorage.getItem("activeUser"));
    const date = allValues[0];
    const name = allValues[1];
    const location = allValues[2];
    const newEvent = new Event(currentUser, name, date, location);

    // Checks if the user is creating a new event or editing an existing one
    if (editId === 0) {
      // Creates a new event
      apiController.events.addNewEvent(newEvent).then(response => {
        $("#add-event").show();
        loadEvents();
      });
    } else {
      // Edits existing event with id of eventId
      apiController.events.editEvent(newEvent, editId).then(response => {
        loadEvents();
      });
    }
  }

};

module.exports = submitEvent;