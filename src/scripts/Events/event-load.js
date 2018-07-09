// This module loads all the events for the user and his friends and prints them to the DOM sorted by date
// Author: Elliot Huck

const $ = require("jquery");
const apiController = require("../apiController");
// Required by: events, event-submit

const loadEvents = () => {
  console.log($("#add-event").is(":hidden"))
  $("#add-event").show();
  console.log("Loading all events...")

  const currentUser = parseInt(sessionStorage.getItem("activeUser"));
  console.log("Events for userId ", currentUser);

  // New function here to get all the users friends
  apiController.getFriendsList(currentUser).then(allFriends => {
    let allFriendsArray = [];
    allFriends.forEach(friend => {
      const friendId = friend.user.id;
      allFriendsArray.push(friendId);
    });
    allFriendsArray = allFriendsArray.map(friendIdNumber => { return `userId=${friendIdNumber}&` });
    const allFriendsString = allFriendsArray.join("");
    console.log(allFriendsString);

    apiController.events.getAllEvents(currentUser, allFriendsString).then(sortedEvents => {

      const $eventArticle = $("#event-article");
      $eventArticle.empty();
      sortedEvents.forEach(event => {
        // console.log("Writing each event...");
        const $eventSection = $("<section>");

        $("<p>").text(event.date).appendTo($eventSection);
        $("<p>").text(event.name).appendTo($eventSection);
        $("<p>").text(event.location).appendTo($eventSection);

        if (parseInt(event.userId) === currentUser) {
          $eventSection.addClass("event event--yours");
          $("<p>").text("Posted by: You").appendTo($eventSection);
        } else {
          $eventSection.addClass("event event--others");
          $("<p>").text("Posted by: A friend").appendTo($eventSection);
        }
        // Only adds edit/delete buttons if it's your event
        if ($eventSection.hasClass("event--yours")) {
          $("<button>").text("Edit").attr("id", `${event.id}edit`).appendTo($eventSection);
          $("<button>").text("Delete").attr("id", `${event.id}delete`).appendTo($eventSection);
        }

        $eventSection.attr("id", `${event.id}event`).appendTo($eventArticle);
      });
      $eventArticle.appendTo($(".events"));
    });
  });
  console.log("All events loaded");

};

module.exports = loadEvents;