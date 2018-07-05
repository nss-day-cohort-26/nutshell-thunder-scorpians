const $ = require("jquery");
const apiController = require("./apiController");
const messagesApi = apiController["messages"];
const friends = require("./friends");
// console.log(apiController);
// console.log(messagesApi);
// console.log(messagesApi["read"]);
// console.log(messagesApi.read)
// const currentUser = sessionStorage.getItem("activeUser")

let currentUser = null;
if (sessionStorage.getItem("activeUser")) {
    currentUser = sessionStorage.getItem("activeUser")
} else {
    currentUser = 1
}


// API
const Messages = {
    // READ
    read: function () {
        messagesApi.read().then(msgArr => {
            buildMessagesDOM(msgArr);
        })
    },

    // CREATE
    create: function (userId, message) {
        messagesApi.create(userId, message).then(this.read)
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
var buildMessagesDOM = function (messages) {

    // SELECT DIV AND WIPE
    const messageDiv = $("#messagesDiv");
    messageDiv.empty();

    // ADD MESSENGER HEADER
    messageDiv.append($("<h2>").text("Messenger"));

    // ITERATE MESSAGES
    messages.forEach(message => {

        //CREATE MESSAGE ITEM


        const messageText = message["message"];
        const messageUserId = message["userId"];
        const messageUserName = message["user"]["name"];
        const messageId = message["id"];

        const msgItem = $("<div>").attr("id", "msg" + messageId);
        const userSpan = $("<span>").text(`${messageUserName}`);
        const msgSpan = $("<span>").text(`: ${messageText}`).addClass("msgSpan");

        msgItem.append(userSpan);
        msgItem.append(msgSpan);

        //IF MESSAGE BELONGS TO CURRENT USER, ALLOW TO CONFIGURE
        if (messageUserId === currentUser) {

            // EDIT BUTTON
            const editButton = $("<button>").text("edit").addClass("editMsgButton");

            // EDIT INPUT
            const editInput = $("<input>").attr("value", messageText)

            // SAVE BUTTON
            const saveButton = $("<button>").text("Save").on("click", (e) => {
                Messages.update(messageId, messageUserId, editInput.val())
            });

            // CANCEL BUTTON
            const cancelButton = $("<button>").text("Cancel").on("click", (e) => {
                // Messages.read();
                editInput.hide();
                saveButton.hide();
                cancelButton.hide();
                deleteButton.hide();
                editButton.show();
                msgItem.children(".msgSpan").show();
            });

            // DELETE BUTTON
            const deleteButton = $("<button>").text("Delete").on("click", (e) => {
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
                console.log(msgItem.children(".msgSpan").textContent);
                msgItem.children(".msgSpan").hide();
                e.target.style.display = "none";
                editInput.attr("value", msgItem.children(".msgSpan").textContent);
                editInput.show();
                saveButton.show();
                cancelButton.show();
                deleteButton.show();
            });

            msgItem.append(editButton).append(editInput).append(saveButton).append(cancelButton).append(deleteButton);
        } else {
            userSpan.on("click", (e) => {
                // alert(e.target.textContent);
                friends.addFriend(e.target.textContent);
            });
        }

        //APPEND MESSAGE ITEM
        messageDiv.append(msgItem);
    });

    // CREATE NEW MESSAGE AREA AT BOTTOM OF BOX
    const newMessageDiv = $("<div>");
    const newMessageInput = $("<input>").attr("id", "newMessageInput");
    const newMessageButton = $("<button>").text("submit").attr("id", "newMessageSubmitButton");
    const msgOptionButton = $("<button>").text("Options").attr("id", "msgOptionButton");
    newMessageButton.on("click", (e) => {
        const message = $("#newMessageInput").val()
        Messages.create(currentUser, message)
    })
    msgOptionButton.on("click", (e) => {
        if ($(".editMsgButton").is(":visible")) {
            $(".editMsgButton").hide();
        } else {
            $(".editMsgButton").show();
        }

    })

    // APPEND NEW MESSAGE AREA TO MESSENER DIV
    newMessageDiv.append(newMessageInput);
    newMessageDiv.append(newMessageButton);
    newMessageDiv.append(msgOptionButton);
    messageDiv.append(newMessageDiv);
}

// INITIALIZE

Messages.read()