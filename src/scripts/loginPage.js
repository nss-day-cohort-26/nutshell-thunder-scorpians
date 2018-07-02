const $ = require("jquery")
const apiController = require("./apiController")
const friends = require("./friends")

const loginControl = Object.create({},{
    createForms: {
        value: function(){
            let userNameInput = $("<input type='text' placeholder='User Name'>")
            let emailInput = $("<input type='text' placeholder='E-Mail Address'>")
            let submitLoginBtn = $("<button>")
            submitLoginBtn.text("Submit")
            submitLoginBtn.click(() => {loginControl.submitLogin(userNameInput.val())})
            $("body").append(userNameInput).append(submitLoginBtn)
        }
    },
    submitLogin: {
        value: function(userName, userEmail){
            apiController.queryUsers().then(response => {
                // console.log(response)
                //USE .MAP TO LOOP THROUGH RETURNED USERS ARRAY AND CREATE NEW ARRAY OF ONLY USERNAMES, THEN USE .CONTAINS TO CHECK USERNAME
                response.contains(userName =>{
                    // console.log(user.name)
                    if (user.name === userName){
                        $("body").children().remove()
                        $("body").append(`<h1>Welcome ${userName}</h1>`)
                        sessionStorage.setItem("activeUser", user.id)
                        console.log(`Welcome, ${userName}`)
                        friends.displayFriendList()
                        return
                    }
                    else {
                        alert("Please enter a valid username")
                        return
                    }
                })
            })
        }
    }
})

module.exports = loginControl