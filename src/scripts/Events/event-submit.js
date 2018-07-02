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
const apiController = require("../apiController");
const Event = require("./event-class");
// Required by: event-form

const currentUser = 1;

const submitEvent = () => {
  const allInputs = $("#event-form input");
  console.log(allInputs);
  const allValues = []
  allInputs.each((i, element) => {
    allValues.push(element.value);
  });
  console.log(allValues);
  if (!allValues.includes("")) {
    console.log("Creating new event...");
    const name = allValues[0];
    const date = allValues[1];
    const location = allValues[2];
    const newEvent = new Event(currentUser, name, date, location);
    console.log(newEvent);

// Make an api call here with the new event I just made
    apiController.events.addNewEvent(newEvent).then(
      allInputs.each((i, element) => {element.value = ""})
    );

  } else {
    alert("You must fill all input fields to submit a new event");
  }
};

module.exports = submitEvent;