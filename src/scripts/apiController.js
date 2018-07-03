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
    addNewArticle: {
        value: function(title, synopsis, url, timeStamp) {
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
    }
})

module.exports = apiController