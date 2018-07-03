const $ = require("jquery")
const apiController = require("./apiController")
const friends = require("./friends")

const loginControl = Object.create({},{
    createForms: {
        value: function(){
            let headline = $("<h1>Welcome to Nutshell</h1><br><h2>Please enter username to login</h2>")
            let userNameInput = $("<input type='text' placeholder='User Name'>")
            let emailInput = $("<input type='text' placeholder='E-Mail Address'>")
            let submitLoginBtn = $("<button>")
            submitLoginBtn.text("Submit")
            submitLoginBtn.click(() => {loginControl.submitLogin(userNameInput.val())})
            $("body").append(headline).append(userNameInput).append(submitLoginBtn)
        }
    },
    submitLogin: {
        value: function(userName){
            apiController.getUserId(userName).then(user => {
                console.log(user)
                if (user.length === 0){
                    alert("I'm sorry, that username is incorrect or non-existent. Please try again.")
                    return
                }
                else {
                    sessionStorage.setItem("activeUser", user[0].id)
                    $("body").children().remove()
                    $("body").append($(`<h1>Welcome to Nutshell ${user[0].name}!</h1>`))
                    friends.displayFriendList()
                }
            })
         }
    }
})

module.exports = loginControl