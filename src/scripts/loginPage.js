//This module controls login and registration functions
//Seth Dana seth.dana@gmail.com

const $ = require("jquery")
const apiController = require("./apiController")
const friends = require("./friends")
const task = require("./task")
const messages = require("./messages")

const loginControl = Object.create({},{
    createForms: {
        value: function(){
            let headline = $("<h1>Welcome to Nutshell!</h1><br><h2>Please enter username and email to login</h2>")
            let userNameInput = $("<input type='text' placeholder='User Name'>")
            let emailInput = $("<input type='text' placeholder='E-Mail Address'>")
            let submitLoginBtn = $("<button>")
            let registerBtn = $("<button>")
            registerBtn.text("Register New Account")
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
            $("#login-stuff").append(headline).append(userNameInput).append(emailInput).append(submitLoginBtn).append(registerBtn)
            registerBtn.click(() =>{
                if (emailInput.val() === "" || userNameInput.val() === "") {
                    alert("Please enter a valid username and email")
                    return
                }
                else {
                    console.log(userNameInput.val())
                    console.log(emailInput.val())
                    loginControl.registerUser(userNameInput.val(), emailInput.val())
                }
            })
        }
    },
    submitLogin: {
        value: function(userName, emailVal){
            apiController.getUserId(userName).then(user => {
                console.log(user)
                if (user.length === 0 || (user[0].email !== emailVal || user[0].name !== userName)){
                    alert("I'm sorry, that username or email is incorrect or non-existent. Please try again.")
                    return
                }
                else if (user[0].email === emailVal && user[0].name === userName){
                    sessionStorage.setItem("activeUser", user[0].id)
                    $("#login-stuff").remove()
                    $("#header").append($(`<h1>Welcome to Nutshell, ${user[0].name}!</h1>`))
                    $(".grid__wrapper").css("display", "grid")
                    friends.displayFriendList()
                    task.printTasks()
                    messages.buildMessenger()
                }
            })
         }
    },
    registerUser: {
        value: function(userName, emailValue){
            apiController.getUserId(userName).then(nameResponse =>{
                apiController.getEmailAddr(emailValue).then(emailResponse =>{
                    if (nameResponse.length === 0 && emailResponse.length === 0){
                        userName = userName.toLowerCase()
                        emailValue = emailValue.toLowerCase()
                        let userObject = {
                            name: userName,
                            email: emailValue
                        }
                        apiController.addNewUser(userObject).then(response => {
                            console.log(response)
                            loginControl.submitLogin(userName, emailValue)
                        })
                    }
                 else {
                        alert("Sorry, that username or email is already registered")
                        return
                    }
                 })
            })
         }
    }
})

module.exports = loginControl