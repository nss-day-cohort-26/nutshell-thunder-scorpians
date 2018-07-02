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
        value: function(param){
            $.ajax({
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
    getTasks:{
        value: function(userId) {
            return $.ajax(`http://localhost:3000/tasks?userId=${userId}`)
        }
    }
})

module.exports = apiController