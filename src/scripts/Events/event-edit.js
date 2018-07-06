// This module edits an event in the database and on the DOM
// Author: Elliot Huck

const $ = require("jquery");
const Event = require("./event-class");
const apiController = require("../apiController");

const editEvent = (event) => {
  const buttonId = event.target.id;
  console.log(buttonId);
  const editId = parseInt(buttonId);
  console.log(editId);
  $editButton = $(`#${buttonId}`);
  $parentElement = $editButton.parent();
  console.log($parentElement);
  const $allPSibs = $editButton.prevAll($("p"));
  $allPSibs.each((index, item) => {
    $item = $(item);
    let type = "text";
    if (index === 2) {
      type = "date";
    }
    $item.wrap(`<section><input type="${type}" value="${$item.html()}"></input></section>`);
  });
  $editButton.unbind("click", editEvent);
  $editButton.text("Save");



  $editButton.click(() => {
    const buttonId = event.target.id;
    console.log(buttonId);
    const editId = parseInt(buttonId);
    console.log(editId);
    console.log("Edit id: ", editId);
    const $allInputs = $(`#${editId}event input`);
    console.log("All inputs: ", $allInputs);
    let allValues = [];

    $allInputs.each((i, element) => {
      allValues.push(element.value);
    });
    console.log(allValues);
    if (allValues.includes("")) {
      alert("You must fill all input fields to save an event");
    } else {
      console.log("Editing event...");
      const date = allValues[0];
      const name = allValues[1];
      const location = allValues[2];
      const currentUser = parseInt(sessionStorage.getItem("activeUser"));
      const newEvent = new Event(currentUser, name, date, location);
      console.log(newEvent);

      apiController.events.editEvent(newEvent, editId);
    }
  });

}

module.exports = editEvent;