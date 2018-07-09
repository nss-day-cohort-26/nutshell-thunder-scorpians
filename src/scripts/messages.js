// AUTHOR: Phil Patton
// PURPOSE: Retrieve user messages from the database then build a chat box for messaging between users

const $ = require("jquery");
const apiController = require("./apiController");
const messagesApi = apiController["messages"];
const friends = require("./friends");



sessionStorage.setItem("messageChange", 1);

const myFunction = function(){
    alert("works");
}

window.addEventListener("storage", myFunction, false);

// windows.addEventListener("storage", (storageEvent) => {
//     // the event seems not to fire on own state changes, only other windows
//     console.log(storageEvent);
//     alert("changed");
// }, false);



// API
const Messages = {
    // READ
    read: function (buildSource) {

        let currentUser = null;
        if (sessionStorage.getItem("activeUser")) {
            currentUser = sessionStorage.getItem("activeUser")
        } else {
            return;
        }

        messagesApi.read().then(msgArr => {
            buildMessagesDOM(msgArr, currentUser);
            if (buildSource === "createNew") {
                $("#newMessageInput").focus();
            }

        })
    },

    // CREATE
    create: function (userId, message) {
        const curTimeStamp = new Date();
        messagesApi.create(userId, message, curTimeStamp).then(() => {
            this.read("createNew");
            let sS = sessionStorage.getItem("messageChange");
            sessionStorage.setItem("messageChange", ++sS);
        })
    },

    // UPDATE
    update: function (msgId, userId, newMessage, messageTimeStamp) {

        messagesApi.update(msgId, userId, newMessage, messageTimeStamp).then(() => {
            this.read();
            let sS = localStorage.getItem("messageChange");
            localStorage.setItem("messageChange", ++sS);
        })

    },

    // DELETE
    delete: function (msgId) {

        messagesApi.delete(msgId).then(this.read)
    }
}

// DOM BUILD
var buildMessagesDOM = function (messages, currentUser) {

    // SELECT DIV AND WIPE
    const messengerDiv = $("#messagesDiv");
    messengerDiv.empty();

    // ADD MESSENGER HEADER
    const messengerHeaderDiv = $("<div>").attr("id", "messengerHeaderDiv");
    messengerHeaderDiv.append($("<h2>").text("Messages").addClass("messengerHeader"));
    messengerDiv.append(messengerHeaderDiv);

    const messengerBodyDiv = $("<div>").attr("id", "messengerBodyDiv");
    const messengerBodyContent = $("<div>").attr("id", "messengerBodyContent");


    // ITERATE MESSAGES
    if (messages.length > 0) {
        messages.forEach(message => {

            //CREATE MESSAGE ITEM

            //DEFINE MESSAGE VARIABLES ON EACH PASS THROUGH MESSAGES
            const messageText = message["message"];
            const messageUserId = message["userId"];
            const messageUserName = message["user"]["name"];
            const messageId = message["id"];
            const messageTimeStamp = message["timeStamp"]

            const msgItem = $("<p>").attr("id", "msg" + messageId).addClass("msgItem");
            const userSpan = $("<span>").text(`${messageUserName}`).addClass("msgUser").addClass("msgText");
            if (messageUserId === currentUser) {
                userSpan.addClass("me");
            } else {
                userSpan.addClass("other");
            }
            const seperatorSpan = $("<span>").text(": ").addClass("msgSeperator").addClass("msgText");
            const msgSpan = $("<span>").text(`${messageText}`).addClass("msgContent").addClass("msgText");

            msgItem.append(userSpan);
            msgItem.append(seperatorSpan);
            msgItem.append(msgSpan);

            //IF MESSAGE BELONGS TO CURRENT USER, ALLOW TO CONFIGURE
            if (messageUserId === currentUser) {

                // EDIT BUTTON
                const editButton = $("<button>").addClass("editMsgButton").append($("<i>").addClass("fa fa-pencil"));

                // EDIT INPUT
                const editInput = $("<input>").attr("value", messageText).addClass("editMsgInput");

                // SAVE BUTTON
                const saveButton = $("<button>").append($("<i>").addClass("fa fa-floppy-o")).addClass("saveMsgEditsButton").on("click", (e) => {
                    Messages.update(messageId, messageUserId, editInput.val(), messageTimeStamp)
                });

                // CANCEL BUTTON
                const cancelButton = $("<button>").append($("<i>").addClass("fa fa-times")).addClass("cancelMsgEditButton").on("click", (e) => {
                    // Messages.read();
                    editInput.hide();
                    saveButton.hide();
                    cancelButton.hide();
                    deleteButton.hide();
                    editButton.show();
                    msgItem.children(".msgContent").show();
                });

                // DELETE BUTTON
                const deleteButton = $("<button>").append($("<i>").addClass("fa fa-trash-o")).addClass("deleteMsgButton").on("click", (e) => {
                    Messages.delete(messageId);
                });

                // EDITING OPTIONS MINIMIZED BY DEFAULT
                editButton.hide();
                editInput.hide();
                saveButton.hide();
                cancelButton.hide();
                deleteButton.hide();

                // TOGGLE EDIT OPTIONS
                editButton.on("click", (e) => {
                    // console.log(msgItem.children(".msgSpan").text());
                    const curMessage = msgItem.children(".msgContent").text();
                    msgItem.children(".editMsgButton").hide();
                    msgItem.children(".msgContent").hide();
                    // e.target.style.display = "none";
                    editInput.show();
                    editInput.val(curMessage);
                    saveButton.show();
                    cancelButton.show();
                    deleteButton.show();
                });

                // APPEND CONFIGURE BUTTONS
                msgItem.children(".msgUser").before(editButton);
                msgItem.children(".msgUser").before(saveButton);
                msgItem.children(".msgUser").before(deleteButton);
                msgItem.children(".msgUser").before(cancelButton);

                msgItem.append(editInput);
            } else { // IF MESSAGE BELONGS TO DIFFERENT USER, ALLOW ADD FRIEND

                const addFriendButton = $("<button>").append($("<i>").addClass("fa fa-plus")).addClass("addFriendButton").on("click", (e) => {

                    const pd = $(e.currentTarget).parent();
                    const us = pd.children(".msgUser");
                    // console.log(us.text());
                    const ruSure = confirm(`Would you like to add user ${us.text()}?`);
                    if (ruSure) {
                        const addFriendBtn = $("#add-friend-btn")
                        friends.addFriend(us.text(), addFriendBtn);
                    }
                });
                addFriendButton.hide()
                // APPEND ADD FRIENDS BUTON
                msgItem.children(".msgUser").before(addFriendButton);
            }

            //APPEND MESSAGE ITEM
            messengerBodyContent.append(msgItem);
        });

    }
    messengerBodyDiv.append(messengerBodyContent);
    messengerDiv.append(messengerBodyDiv);

    // CREATE NEW MESSAGE AREA AT BOTTOM OF BOX
    const newMessageDiv = $("<div>").attr("id", "messageNewDiv");
    const newMessageInput = $("<input>").attr("id", "newMessageInput");

    // NEW MESSAGE INPUT WITH 'PRESS ENTER' EVENT
    newMessageInput.keyup((event) => {
        if (event.which === 13) {
            const message = $("#newMessageInput").val();
            Messages.create(currentUser, message);
            // $("#newMessageInput").focus();

        }
    })

    // CLICKING SEND NEW MESSAGE HAS SAME EFFECT AS ENTER
    const newMessageButton = $("<button>").append($("<i>").addClass("fa fa-paper-plane-o")).attr("id", "newMessageSubmitButton");
    newMessageButton.on("click", (e) => {
        const message = $("#newMessageInput").val();
        Messages.create(currentUser, message);
        // $("#newMessageInput").focus();
    })

    // TOGGLE EDIT AND ADD FRIENDS OPTIONS ON AND OFF
    const msgOptionButton = $("<button>").append($("<i>").addClass("fa fa-cogs")).attr("id", "msgOptionButton");
    msgOptionButton.on("click", (e) => {

        if ($(".editMsgButton")) {
            if ($(".editMsgButton").is(":visible")) {
                $(".editMsgButton").hide();
            } else {
                $(".editMsgButton").show();
            }
        }

        if ($(".addFriendButton")) {
            if ($(".addFriendButton").is(":visible")) {
                $(".addFriendButton").hide();
            } else {
                $(".addFriendButton").show();
            }
        }

    })

    // APPEND NEW MESSAGE AREA TO MESSENER DIV
    messengerHeaderDiv.append(msgOptionButton);
    newMessageDiv.append(newMessageInput);
    newMessageDiv.append(newMessageButton);
    messengerDiv.append(newMessageDiv);

    messengerBodyDiv.scrollTop(messengerBodyDiv.prop("scrollHeight"));
}

// $(window).on("storage", function (e) {
//     alert("eventFired");
//     if (e.originalEvent.storageArea === this.localStorage) {
//         alert("change1");
//     }
//     // else, event is caused by an update to localStorage, ignore it
// });



// void initStorageEvent(
// )

// $(window).bind("storage", function (e) {
//     alert("change2");
// });

// localStorage.setItem("someItem", "someValue");

// $(window).bind("storage", function (e) {
//     alert("change3");
// });

// sessionStorage.setItem("someItem", "someValue");


const messengerExp = {
    "buildMessenger": function () {
        Messages.read()
    }
}


// EXPORT READ FUNCTION
module.exports = messengerExp;