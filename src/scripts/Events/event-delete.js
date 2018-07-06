// This module deletes an event from the database and then hides it from the DOM
// Author: Elliot Huck

const apiController = require("../apiController");

const deleteEvent = (event) => {
  const deleteId = event.target.attr("id");
  console.log(deleteId);
}

module.exports = deleteEvent;