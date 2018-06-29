const objectPrototypes = {
User: {
    create: function (name, email) {
        this.name = name;
        this.email = email;
        return this
    }
},

Task: {
    create: function(userId, desc, dueDate) {
        this.userId = userId
        this.description = desc
        this.due = dueDate
        return this
    }
},

Event: {
    create: function(userId, name, date, location) {
        this.userId = userId
        this.name = name
        this.date = date
        this.location = location
        return this
    }
},

Message: {
    create: function(userId, messageContent){
        this.userId = userId
        this.content = messageContent
        return this
    }
},

News: {
    create: function(userId, url, title, synopsis) {
        this.userId = userId
        this.url = url
        this.title = title
        this.synopsis = synopsis
        //this.timeStamp = Moment()
        return this
    }
}
}
module.exports = objectPrototypes