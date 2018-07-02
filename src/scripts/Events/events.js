
const $ = require("jquery");
const apiController = require("../apiController");
const currentUser = 1;

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

/* Click New Event Button:
Make a form
  Form Submit:
  1. Check that all inputs have been filled
  2. Read the input fields
  3. Call the API and Post
    .then(
      1. Reload all the events (run page load)
*/

class Event {
  constructor(userId, name, date, location) {
    this.userId = userId;
    this.name = name;
    this.date = date;
    this.location = location;
  }
}

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

  } else {
    alert("You must fill all input fields to submit a new event");
  }
};

const createNewEvent = () => {
  const newEventForm = $("<article>").attr("id", "event-form");

  const nameSection = $("<section>");
  const nameLabel = $("<label>").attr("for", "event-name").text("Event name:");
  const nameInput = $("<input>").attr("type", "text").attr("id", "event-name");
  nameLabel.appendTo(nameSection);
  nameInput.appendTo(nameSection);
  nameSection.appendTo(newEventForm);

  const dateSection = $("<section>");
  const dateLabel = $("<label>").attr("for", "event-date").text("Event date:");
  const dateInput = $("<input>").attr("type", "date").attr("id", "event-date");
  dateLabel.appendTo(dateSection);
  dateInput.appendTo(dateSection);
  dateSection.appendTo(newEventForm);

  const locationSection = $("<section>");
  const locationLabel = $("<label>").attr("for", "event-location").text("Event location:");
  const locationInput = $("<input>").attr("type", "text").attr("id", "event-location");
  locationLabel.appendTo(locationSection);
  locationInput.appendTo(locationSection);
  locationSection.appendTo(newEventForm);

  const submitSection = $("<section>");
  const submitButton = $("<button>").text("Submit").on("click", submitEvent);
  submitButton.appendTo(submitSection);
  submitSection.appendTo(newEventForm);

  newEventForm.prependTo($("body"));
};

createNewEvent();