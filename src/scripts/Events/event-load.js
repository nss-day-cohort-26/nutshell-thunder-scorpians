// This module loads all the events and prints them to the DOM
// Author: Elliot Huck

/* Page Load:
1. Accept the current user's id number
2. Make the API call to get all events for the user and his friends, sorted by date and return the call
  .then(
    1. Build a DOM section element for each event in the response
    2. Put all DOM sections into an article and return the article
*/

const $ = require("jquery");
const apiController = require("../apiController");
const Event = require("./event-class");
const editEvent = require("./event-edit");
const deleteEvent = require("./event-delete");
// Required by: events, event-submit

// Needs to accept the parameter for the currentUserId and his friends
const loadEvents = () => {
  const currentUser = parseInt(sessionStorage.getItem("activeUser"));
  console.log("Load events running")
  console.log("Current user in load:", currentUser);

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

      console.log(sortedEvents);
      const $eventArticle = $("#event-article");
      $eventArticle.empty();
      sortedEvents.forEach(event => {
        console.log("Writing each event...");
        const $eventSection = $("<section>");
        $("<h3>").text(event.name).appendTo($eventSection);

        if (parseInt(event.userId) === currentUser) {
          $eventSection.addClass("event event--yours");
          $("<p>").text("Posted by: You").appendTo($eventSection);
        } else {
          $eventSection.addClass("event event--others");
          $("<p>").text("Posted by: A friend").appendTo($eventSection);
        }

        $("<p>").text(event.date).appendTo($eventSection);
        $("<p>").text(event.location).appendTo($eventSection);

        $("<button>").text("Edit").attr("id", `${event.id}edit`).appendTo($eventSection).click(editEvent);
        $("<button>").text("Delete").attr("id", `${event.id}delete`).appendTo($eventSection).click((event) => {deleteEvent(event)});

        $eventSection.appendTo($eventArticle);
      });
      $eventArticle.appendTo($(".events"));
    });
  });
};

module.exports = loadEvents;