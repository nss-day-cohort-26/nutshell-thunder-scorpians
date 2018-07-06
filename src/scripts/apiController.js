const $ = require("jquery")

const apiController = Object.create({}, {
    addNewUser:{
        value: function(param) {
            return $.ajax({
                url: "http://localhost:3000/users",
                type: "POST",
                // contentType: "application/json",
                data: {
                    name: param.name,
                    email: param.email
                }
            })
        }
    },
    addNewTask: {
        value: function(param){
            return $.ajax({
                url: "http://localhost:3000/tasks",
                type: "POST",
                data: {
                    userId: param.userId,
                    desc: param.taskDescription,
                    dueDate: param.dueDate,
                    complete: param.complete
                }
            })
        }
    },
    getTasks:{
        value: function(userId) {
            return $.ajax(`http://localhost:3000/tasks?userId=${userId}`)
        }
    },
    deleteTask:{
        value: function(id) {
            $.ajax({
                url: `http://localhost:3000/tasks/${id}`,
                type: "DELETE"
            })
        }
    },
    editTask:{
        value: function(id, param) {
            return $.ajax({
                url:`http://localhost:3000/tasks/${id}`,
                type: "PUT",
                data:{
                    userId: param.userId,
                    desc: param.desc,
                    dueDate: param.dueDate,
                    complete: param.complete
                }
            })
        }
    },
    addNewFriend: {
        value: function(userId1, userId2){
            return $.ajax({
                url: "http://localhost:3000/friends",
                type: "POST",
                data: {
                    userId: userId1,
                    yourId: userId2
                }
            })
        }
    },
    getFriendsList: {
        value: function(currentUserId){
            return $.ajax(`http://localhost:3000/friends?_expand=user&yourId=${currentUserId}`)
        }
    },
    addNewFriend: {
        value: function(currentUserId, friendToAddId){
            return $.ajax({
                url: "http://localhost:3000/friends",
                type: "POST",
                data: {
                    userId: friendToAddId,
                    yourId: currentUserId
                }
            })
        }
    },
    deleteFriend: {
        value: function(relId){
            console.log("type of",typeof(relId))
            return $.ajax({
                url: `http://localhost:3000/friends/${relId}`,
                type: "DELETE"
            })
        }
    },
    getUserId: {
        value: function(userName){
            return $.ajax(`http://localhost:3000/users?name=${userName}`)
        }
    },
    getEmailAddr: {
        value: function(emailAddr){
            return $.ajax(`http://localhost:3000/users?email=${emailAddr}`)
        }
    },
    queryUsers: {
        value: function(){
            return $.ajax("http://localhost:3000/users")
        }
    },
    events: {
        value: {
            addNewEvent: (eventObject) => {
                return $.ajax({
                    url: "http://localhost:3000/events",
                    type: "POST",
                    data: {
                        userId: eventObject.userId,
                        name: eventObject.name,
                        date: eventObject.date,
                        location: eventObject.location
                    }
                });
            },
            getAllEvents: (currentUser, friendString) => {
                return $.ajax(`http://localhost:3000/events?userId=${currentUser}&${friendString}_sort=date&_order=asc`);
            },
            editEvent: (editedEvent, editId) => {
                return $.ajax({
                    url: `http://localhost:3000/events/${editId}`,
                    type: "PUT",
                    data: {
                        userId: editedEvent.userId,
                        name: editedEvent.name,
                        date: editedEvent.date,
                        location: editedEvent.location
                    }
                });
            },
            deleteEvent: (deleteId) => {
                return $.ajax({
                    url: `http://localhost:3000/events/${deleteId}`,
                    type: "DELETE"
                });
            }
        }
    },
    addNewArticle: {
        value: function (title, synopsis, url, timeStamp) {
            return $.ajax({
                url: "http://localhost:3000/articles",
                type: "POST",
                data: {
                    title: title,
                    synopsis: synopsis,
                    url: url,
                    timestamp: timeStamp
                }
            })
        }
    },
    getArticleList: {
        value: function() {
            return $.ajax("http://localhost:3000/articles")
        }
    },
    deleteArticle: {
        value: function(id) {
            return $.ajax({
                url: `http://localhost:3000/articles/${id}`,
                type: "DELETE"
            })
        }
    },

    messages: {
        // READ
        value: {
            // READ
            read: function () {
                return $.ajax("http://localhost:3000/messages?_expand=user")
                // ADD
                // USER
                // DATA
                // HERE
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
    }
})


module.exports = apiController