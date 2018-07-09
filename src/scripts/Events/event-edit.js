// This module edits an event in the database and on the DOM
// Author: Elliot Huck

const $ = require("jquery");
// Required by: event-handlers

const editEvent = (event) => {
  console.log("Beginning event edit...");
  const $editButton = $(event.target);
  const $allPSibs = $editButton.prevAll($("p"));
  $allPSibs.each((index, item) => {
    $item = $(item);
    let type = "text";
    if (index === 2) {
      type = "date";
    }
    $item.wrap(`<section><input type="${type}" value="${$item.html()}"></input></section>`);
  });
  $editButton.text("Save changes");

}

module.exports = editEvent;