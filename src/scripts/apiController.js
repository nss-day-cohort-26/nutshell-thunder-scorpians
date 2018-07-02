const $ = require("jquery")

const apiController = Object.create({}, {
    addNewUser:{
        value: function(user) {
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
        value: function(userId, dueDate, taskDescription){
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
                        name: eventObject.name,
                        date: eventObject.date,
                        location: eventObject.location
                    }
                });
            },
            getAllEvents: () => {
                return $.ajax("http://localhost:3000/events?name=asdf&_sort=date&_order=asc");
            }
        }
    }
})

// _sort=date&_order=asc

module.exports = apiController