

const $ = require("jquery");
const deleteEvent = require("./event-delete");
const editEvent = require("./event-edit");

const addHandlers = () => {
  const $allEventSections = $(".event");
  $allEventSections.each((index, element) => {
    $(element).click(handleEvent)
  });
}