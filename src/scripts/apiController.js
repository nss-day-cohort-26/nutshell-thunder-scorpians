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
                return $.ajax("http://localhost:3000/events?userId=1&userId=2&_sort=date&_order=asc");
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
});

// _sort=date&_order=asc

module.exports = apiController