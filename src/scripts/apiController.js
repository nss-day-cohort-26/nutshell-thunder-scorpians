const $ = require("jquery")

const apiController = Object.create({}, {
    addNewUser:{
        value: function(param) {
            return $.ajax({
                url: "https://nutshell-scorpians.herokuapp.com/users",
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
                url: "https://nutshell-scorpians.herokuapp.com/tasks",
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
            return $.ajax(`https://nutshell-scorpians.herokuapp.com/tasks?userId=${userId}`)
        }
    },
    deleteTask:{
        value: function(id) {
            $.ajax({
                url: `https://nutshell-scorpians.herokuapp.com/tasks/${id}`,
                type: "DELETE"
            })
        }
    },
    editTask:{
        value: function(id, param) {
            return $.ajax({
                url:`https://nutshell-scorpians.herokuapp.com/tasks/${id}`,
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
                url: "https://nutshell-scorpians.herokuapp.com/friends",
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
            return $.ajax(`https://nutshell-scorpians.herokuapp.com/friends?_expand=user&yourId=${currentUserId}`)
        }
    },
    addNewFriend: {
        value: function(currentUserId, friendToAddId){
            return $.ajax({
                url: "https://nutshell-scorpians.herokuapp.com/friends",
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
                url: `https://nutshell-scorpians.herokuapp.com/friends/${relId}`,
                type: "DELETE"
            })
        }
    },
    getUserId: {
        value: function(userName){
            return $.ajax(`https://nutshell-scorpians.herokuapp.com/users?name=${userName}`)
        }
    },
    getEmailAddr: {
        value: function(emailAddr){
            return $.ajax(`https://nutshell-scorpians.herokuapp.com/users?email=${emailAddr}`)
        }
    },
    queryUsers: {
        value: function(){
            return $.ajax("https://nutshell-scorpians.herokuapp.com/users")
        }
    },
    events: {
        value: {
            addNewEvent: (eventObject) => {
                return $.ajax({
                    url: "https://nutshell-scorpians.herokuapp.com/events",
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
                return $.ajax(`https://nutshell-scorpians.herokuapp.com/events?userId=${currentUser}&${friendString}_sort=date&_order=desc`);
            },
            editEvent: (editedEvent, editId) => {
                return $.ajax({
                    url: `https://nutshell-scorpians.herokuapp.com/events/${editId}`,
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
                    url: `https://nutshell-scorpians.herokuapp.com/events/${deleteId}`,
                    type: "DELETE"
                });
            }
        }
    },
    addNewArticle: {
        value: function (title, synopsis, url, timeStamp, currentUser) {
            return $.ajax({
                url: "https://nutshell-scorpians.herokuapp.com/articles",
                type: "POST",
                data: {
                    title: title,
                    synopsis: synopsis,
                    url: url,
                    timestamp: timeStamp,
                    userId: currentUser
                }
            })
        }
    },
    getArticleList: {
        value: function(currentUser, friendString) {
            return $.ajax(`https://nutshell-scorpians.herokuapp.com/articles?userId=${currentUser}&${friendString}_sort=timestamp&_order=asc`)
        }
    },
    deleteArticle: {
        value: function(id) {
            return $.ajax({
                url: `https://nutshell-scorpians.herokuapp.com/articles/${id}`,
                type: "DELETE"
            })
        }
    },

    messages: {
        // READ
        value: {
            // READ
            read: function () {
                return $.ajax("https://nutshell-scorpians.herokuapp.com/messages?_expand=user&_sort=timeStamp")
                // ADD
                // USER
                // DATA
                // HERE
            },
            // CREATE
            create: function (userId, message, timestamp) {
                return $.ajax({
                    url: "https://nutshell-scorpians.herokuapp.com/messages",
                    method: "POST",
                    data: {
                        "userId": userId,
                        "message": message,
                        "timeStamp": timestamp
                    }
                })
            },

            // UPDATE
            update: function (msgId, userId, newMessage, messageTimeStamp) {

                return $.ajax({
                    url: `https://nutshell-scorpians.herokuapp.com/Messages/${msgId}`,
                    method: "PUT",
                    data: {
                        "userId": userId,
                        "message": newMessage,
                        "timeStamp": messageTimeStamp
                    }
                })
            },
            // DELETE
            delete: function (msgId) {

                return $.ajax({
                    url: `https://nutshell-scorpians.herokuapp.com/Messages/${msgId}`,
                    method: "DELETE"
                })

            }
        }
    }
})


module.exports = apiController