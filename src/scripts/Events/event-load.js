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
// Required by: events, event-submit

// Needs to accept the parameter for the currentUserId and his friends
const loadEvents = () => {

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

        // console.log(sortedEvents);
        const $eventArticle = $("#event-article");
        $eventArticle.empty();
        sortedEvents.forEach(event => {
          // console.log("Writing each event...");
          const $eventSection = $("<section>");

          if (parseInt(event.userId) === currentUser) {
            $eventSection.addClass("event event--yours");
            // $("<p>").text("Posted by: You").appendTo($eventSection);
          } else {
            $eventSection.addClass("event event--others");
            // $("<p>").text("Posted by: Friend").appendTo($eventSection);
          }

          $("<p>").text(event.date).appendTo($eventSection);
          $("<p>").text(event.name).appendTo($eventSection);
          $("<p>").text(event.location).appendTo($eventSection);

          $("<button>").text("Edit").attr("id", `${event.id}edit`).addClass("event__button--edit").appendTo($eventSection);
          $("<button>").text("Delete").attr("id", `${event.id}delete`).addClass("event__button--delete").appendTo($eventSection);
          $eventSection.attr("id", `${event.id}event`).appendTo($eventArticle);
        });
        $eventArticle.appendTo($(".events"));
      });
    });
    console.log("All events loaded");

};

module.exports = loadEvents;