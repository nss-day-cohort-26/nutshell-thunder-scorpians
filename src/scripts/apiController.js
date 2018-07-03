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
            return $.ajax({
                url: "http://localhost:3000/tasks",
                type: "POST",
                data: {
                    userId: param.userId,
                    dueDate: param.dueDate,
                    desc: param.taskDescription,
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
                    dueDate: param.dueDate,
                    desc: param.desc,
                    complete: param.complete
                }
            })
        }
    }
})

module.exports = apiController