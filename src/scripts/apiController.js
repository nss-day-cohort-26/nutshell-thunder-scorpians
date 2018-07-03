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
                    dueDate: param.dueDate,
                    desc: param.taskDescription,
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
                    friendId: userId2
                }
            })
        }
    },
    getFriendsList: {
        value: function(currentUserId){
            return $.ajax(`http://localhost:3000/friends?_expand=user&friendId=${currentUserId}`)
        }
    },
    addNewFriend: {
        value: function(currentUserId, friendToAddId){
            return $.ajax({
                url: "http://localhost:3000/friends",
                type: "POST",
                data: {
                    userId: friendToAddId,
                    friendId: currentUserId
                }
            })
        }
    },
    getUserId: {
        value: function(userName){
            return $.ajax(`http://localhost:3000/users?name=${userName}`)
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
            getAllEvents: () => {
                return $.ajax("http://localhost:3000/events?userId=1&_sort=date&_order=asc");
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
    }
})

module.exports = apiController