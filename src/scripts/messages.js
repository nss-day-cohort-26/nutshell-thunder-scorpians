// AUTHOR: Phil Patton
// PURPOSE: Retrieve user messages from the database then build a chat box for messaging between users

const $ = require("jquery");
const apiController = require("./apiController");
const messagesApi = apiController["messages"];
const friends = require("./friends");

// API
const Messages = {
    // READ
    read: function () {

        let currentUser = null;
        if (sessionStorage.getItem("activeUser")) {
            currentUser = sessionStorage.getItem("activeUser")
        } else {
            return;
        }

        messagesApi.read().then(msgArr => {
            console.log(msgArr);
            buildMessagesDOM(msgArr, currentUser);
        })
    },

    // CREATE
    create: function (userId, message) {
        const curTimeStamp = new Date();
        messagesApi.create(userId, message, curTimeStamp).then(this.read)
    },

    // UPDATE
    update: function (msgId, userId, newMessage) {

        messagesApi.update(msgId, userId, newMessage).then(this.read)
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
    messengerHeaderDiv.append($("<h2>").text("Messenger").addClass("messengerHeader"));
    // const msgOptionsInstuctions = $("<h4>").text("Use add/edit buttons to add friends and edit messages. Clicking Options will toggle buttons on and off.").addClass("messengerOptionsInstructions")
    // msgOptionsInstuctions.hide();
    // messengerHeaderDiv.append(msgOptionsInstuctions);
    messengerDiv.append(messengerHeaderDiv);

    const messengerBodyDiv = $("<div>").attr("id", "messengerBodyDiv");


    // ITERATE MESSAGES
    if (messages.length > 0) {
        messages.forEach(message => {

            //CREATE MESSAGE ITEM

            //DEFINE MESSAGE VARIABLES ON EACH PASS THROUGH MESSAGES
            const messageText = message["message"];
            const messageUserId = message["userId"];
            const messageUserName = message["user"]["name"];
            const messageId = message["id"];

            const msgItem = $("<div>").attr("id", "msg" + messageId).addClass("msgItem");
            const userSpan = $("<span>").text(`${messageUserName}`).addClass("msgUser").addClass("msgText");
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
                const editInput = $("<input>").attr("value", messageText)

                // SAVE BUTTON
                const saveButton = $("<button>").append($("<i>").addClass("fa fa-floppy-o")).on("click", (e) => {
                    Messages.update(messageId, messageUserId, editInput.val())
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
                msgItem.children(".msgUser").before(deleteButton);
                msgItem.append(editInput).append(saveButton).append(cancelButton);
            } else { // IF MESSAGE BELONGS TO DIFFERENT USER, ALLOW ADD FRIEND

                const addFriendButton = $("<button>").append($("<i>").addClass("fa fa-plus")).addClass("addFriendButton").on("click", (e) => {

                    const pd = $(e.currentTarget).parent();
                    const us = pd.children(".msgUser");
                    // console.log(us.text());
                    const ruSure = confirm(`Would you like to add user ${us.text()}?`);
                    if (ruSure) {
                        const addFriendBtn = $("#add-friend-btn")
                        friends.addFriend(us.text(), addFriendBtn)
                    }
                });
                addFriendButton.hide()
                // APPEND ADD FRIENDS BUTON
                msgItem.children(".msgUser").before(addFriendButton);
            }

            //APPEND MESSAGE ITEM
            messengerBodyDiv.append(msgItem);
        });

    }

    messengerDiv.append(messengerBodyDiv);

    // CREATE NEW MESSAGE AREA AT BOTTOM OF BOX
    const newMessageDiv = $("<div>").attr("id", "messageNewDiv");
    const newMessageInput = $("<input>").attr("id", "newMessageInput");

    // NEW MESSAGE INPUT WITH 'PRESS ENTER' EVENT
    newMessageInput.keyup((event) => {
        if (event.which === 13) {
            const message = $("#newMessageInput").val();
            Messages.create(currentUser, message);
        }
    })

    // CLICKING SEND NEW MESSAGE HAS SAME EFFECT AS ENTER
    const newMessageButton = $("<button>").append($("<i>").addClass("fa fa-paper-plane-o")).attr("id", "newMessageSubmitButton");
    newMessageButton.on("click", (e) => {
        const message = $("#newMessageInput").val();
        Messages.create(currentUser, message);
    })

    // TOGGLE EDIT AND ADD FRIENDS OPTIONS ON AND OFF
    const msgOptionButton = $("<button>").append($("<i>").addClass("fa fa-cogs")).attr("id", "msgOptionButton");
    msgOptionButton.on("click", (e) => {

        // if ($("#msgOptionsInstructions").is(":visible")) {
        //     $("#msgOptionsInstructions").hide();
        // } else {
        //     $("#msgOptionsInstructions").show();
        // }

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

    console.log(messengerDiv.prop("scrollHeight"))
    messengerDiv.scrollTop(messengerDiv.prop("scrollHeight"));
}

const messengerExp = {
    "buildMessenger": function() {
        Messages.read()
    }
}

// EXPORT READ FUNCTION
module.exports = messengerExp;