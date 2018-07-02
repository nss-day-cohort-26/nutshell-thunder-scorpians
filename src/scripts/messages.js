
const $ = require("jquery");

// API
const Messages = {
    // READ
    read: function () {
        return $.ajax("http://localhost:3000/messages").then(msgArr => {
            buildMessagesDOM(msgArr);
        })
    },

    // CREATE
    create: function (userId, message) {
        $.ajax({
            url: "http://localhost:3000/messages",
            method: "POST",
            data: {
                "userId": userId,
                "message": message
            }
        })
        .then(this.read)
    },

    // UPDATE
    update: function (msgId, userId, newMessage) {

        $.ajax({
                url: `http://localhost:3000/Messages/${msgId}`,
                method: "PUT",
                data: {
                    "userId": userId,
                    "message": newMessage
                }
            })
            .then(this.read)
    },

    // DELETE
    delete: function (msgId) {

        $.ajax({
                url: `http://localhost:3000/Messages/${msgId}`,
                method: "DELETE"
            })
            .then(this.read)
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
// Messages.create(2,"Duck");
// Messages.create(1,"Moose");


