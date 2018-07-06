// This module edits an event in the database and on the DOM
// Author: Elliot Huck

const $ = require("jquery");
const apiController = require("../apiController");

const editEvent = (event) => {
  const buttonId = event.target.id;
  console.log(buttonId);
  const editId = parseInt(buttonId);
  console.log(editId);
  $parentElement = $(`#${buttonId}`).parent();
  console.log($parentElement);
  const $allPSibs = $(`#${buttonId}`).prevAll($("p"));
  $allPSibs.each((index, item) => {
    $item = $(item);
    let type = "text";
    if (index === 2) {
      type = "date";
    }
    $item.wrap(`<section><input type="${type}" value="${$item.html()}"></input></section>`);
  });
}

module.exports = editEvent;