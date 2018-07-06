// This module deletes an event from the database and then hides it from the DOM
// Author: Elliot Huck

const $ = require("jquery");
const apiController = require("../apiController");
// Required by: event-load

const deleteEvent = (event) => {
  const buttonId = event.target.id;
  console.log(buttonId);
  const deleteId = parseInt(buttonId);
  console.log(deleteId);
  apiController.events.deleteEvent(deleteId).then(response => {
    const $parentElement = $(`#${buttonId}`).parent();
    $parentElement.remove();
  });
}

module.exports = deleteEvent;