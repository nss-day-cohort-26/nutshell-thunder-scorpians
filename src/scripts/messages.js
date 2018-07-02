
const $ = require("jquery");
const apiController = require("./apiController")
const messagesApi = apiController["messages"]

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

    const messageDiv = $("#messagesDiv");
    messageDiv.empty();

    messages.forEach(message => {
        const msgItem = $("<div>").text(`User ${message["userId"]} said: ${message["message"]}`);

        const deleteButton = $("<button>").text("delete").attr("messageId",message["id"]);
        deleteButton.on("click", (e) => {
            const button = e["target"];
            const msgId = button.getAttribute("messageid");
            //console.log(msgId);
            Messages.delete(msgId)
        });

        const editButton = $("<button>").text("edit").attr("messageId",message["id"]);
        editButton.attr("userId",message["userId"]);
        editButton.on("click", (e) => {
            const button = e["target"];
            const msgId = button.getAttribute("messageid");
            const userId = button.getAttribute("userId");
            const message = $(`#editInput${msgId}`).val()
            //console.log(msgId, message)
            Messages.update(msgId, userId, message)
        });

        const editInput = $("<input>").attr("id",`editInput${message["id"]}`);

        msgItem.append(deleteButton);
        msgItem.append(editButton);
        msgItem.append(editInput);

        messageDiv.append(msgItem);
    });

}

// INITIALIZE

Messages.read()
Messages.create(2,"Duck");
Messages.create(1,"Moose");


