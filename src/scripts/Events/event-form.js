// This module creates the form for submitting a new event
// Author: Elliot Huck

const $ = require("jquery");
// Required by: event-handlers

const createNewEvent = () => {
  $("#add-event").hide();
  const $newEventForm = $("<article>").attr("id", "0event");

  const $dateSection = $("<section>");
  const $dateLabel = $("<label>").attr("for", "event-date").text("Event date:");
  const $dateInput = $("<input>").attr("type", "date").attr("id", "event-date");
  $dateLabel.appendTo($dateSection);
  $dateInput.appendTo($dateSection);
  $dateSection.appendTo($newEventForm);

  const $nameSection = $("<section>");
  const $nameLabel = $("<label>").attr("for", "event-name").text("Event name:");
  const $nameInput = $("<input>").attr("type", "text").attr("id", "event-name");
  $nameLabel.appendTo($nameSection);
  $nameInput.appendTo($nameSection);
  $nameSection.appendTo($newEventForm);


  const $locationSection = $("<section>");
  const $locationLabel = $("<label>").attr("for", "event-location").text("Event location:");
  const $locationInput = $("<input>").attr("type", "text").attr("id", "event-location");
  $locationLabel.appendTo($locationSection);
  $locationInput.appendTo($locationSection);
  $locationSection.appendTo($newEventForm);

  const $submitSection = $("<section>");
  const $submitButton = $("<button>").attr("id", "0submit");
  $submitButton.text("Submit");
  $submitButton.appendTo($submitSection);
  $submitSection.appendTo($newEventForm);

  $newEventForm.prependTo($("#event-article"));
};

module.exports = createNewEvent;