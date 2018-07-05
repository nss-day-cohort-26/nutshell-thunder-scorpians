// This module creates the form for submitting a new event
// Author: Elliot Huck

const $ = require("jquery");
const apiController = require("../apiController");

const submitEvent = require("./event-submit");
// Required by: events

const createNewEvent = () => {
  $("#")
  const $newEventForm = $("<article>").attr("id", "event-form");

  const $nameSection = $("<section>");
  const $nameLabel = $("<label>").attr("for", "event-name").text("Event name:");
  const $nameInput = $("<input>").attr("type", "text").attr("id", "event-name");
  $nameLabel.appendTo($nameSection);
  $nameInput.appendTo($nameSection);
  $nameSection.appendTo($newEventForm);

  const $dateSection = $("<section>");
  const $dateLabel = $("<label>").attr("for", "event-date").text("Event date:");
  const $dateInput = $("<input>").attr("type", "date").attr("id", "event-date");
  $dateLabel.appendTo($dateSection);
  $dateInput.appendTo($dateSection);
  $dateSection.appendTo($newEventForm);

  const $locationSection = $("<section>");
  const $locationLabel = $("<label>").attr("for", "event-location").text("Event location:");
  const $locationInput = $("<input>").attr("type", "text").attr("id", "event-location");
  $locationLabel.appendTo($locationSection);
  $locationInput.appendTo($locationSection);
  $locationSection.appendTo($newEventForm);

  const $submitSection = $("<section>");
  const $submitButton = $("<button>").text("Submit").on("click", submitEvent);
  $submitButton.appendTo($submitSection);
  $submitSection.appendTo($newEventForm);

  $newEventForm.prependTo($(".event-article"));
};

module.exports = createNewEvent;