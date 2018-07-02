const $ = require("jquery")

const apiController = Object.create({}, {
    addNewUser: {
        value: function (user) {
            return $.ajax({
                url: "http://localhost:3000/users",
                type: "POST",
                data: {
                    name: user.name,
                    email: user.email
                }
            })
        }
    },
    addNewTask: {
        value: function (userId, dueDate, taskDescription) {
            return $.ajax({
                url: "http://localhost:3000/tasks",
                type: "POST",
                data: {
                    userId: userId,
                    dueDate: dueDate,
                    desc: taskDescription,
                }
            })
        }
    },
    messages: {
        // READ
        read: function () {
            return $.ajax("http://localhost:3000/messages")
        },
        // CREATE
        create: function (userId, message) {
            return $.ajax({
                url: "http://localhost:3000/messages",
                method: "POST",
                data: {
                    "userId": userId,
                    "message": message
                }
            })
        },

        // UPDATE
        update: function (msgId, userId, newMessage) {

            return $.ajax({
                url: `http://localhost:3000/Messages/${msgId}`,
                method: "PUT",
                data: {
                    "userId": userId,
                    "message": newMessage
                }
            })
        },

        // DELETE
        delete: function (msgId) {

            return $.ajax({
                url: `http://localhost:3000/Messages/${msgId}`,
                method: "DELETE"
            })
        }
    }
})

module.exports = apiController