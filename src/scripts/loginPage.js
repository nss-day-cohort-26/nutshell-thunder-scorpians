const $ = require("jquery")
const apiController = require("./apiController")
const friends = require("./friends")

const loginControl = Object.create({},{
    createForms: {
        value: function(){
            let headline = $("<h1>Welcome to Nutshell</h1><br><h2>Please enter username and email to login</h2>")
            let userNameInput = $("<input type='text' placeholder='User Name'>")
            let emailInput = $("<input type='text' placeholder='E-Mail Address'>")
            let submitLoginBtn = $("<button>")
            let registerBtn = $("<button>")
            submitLoginBtn.text("Submit")
            submitLoginBtn.click(() => {
                if (emailInput.val() === "" || userNameInput.val() === ""){
                    alert("Please enter a valid username and email")
                    return
                }
                else {
                    loginControl.submitLogin(userNameInput.val(), emailInput.val())
                }
            })
            $("#login-stuff").append(headline).append(userNameInput).append(emailInput) .append(submitLoginBtn)
            registerBtn.click(() =>{
            })
        }
    },
    submitLogin: {
        value: function(userName, emailVal){
            apiController.getUserId(userName).then(user => {
                console.log(user)
                if (user.length === 0){
                    alert("I'm sorry, that username or email is incorrect or non-existent. Please try again.")
                    return
                }
                else if (user[0].email === emailVal && user[0].name === userName){
                    sessionStorage.setItem("activeUser", user[0].id)
                    $("#login-stuff").remove()
                    $("#header").append($(`<h1>Welcome to Nutshell ${user[0].name}!</h1>`))
                    $(".grid__wrapper").css("display", "grid")
                    friends.displayFriendList()
                }
                else if (user[0].email !== emailVal || user[0].name !== userName) {
                    alert("Email or username does not match")
                    // sessionStorage.setItem("activeUser", user[0].id)
                    // $("body").children().remove()
                    // $("body").append($(`<h1>Welcome to Nutshell ${user[0].name}!</h1>`))
                    // friends.displayFriendList()
                }
            })
         }
    },
    registerUser: {
        value: function(userName, emailValue){

        }
    }
})

module.exports = loginControl