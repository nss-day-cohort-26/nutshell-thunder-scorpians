//This module controls login and registration functions
//Seth Dana seth.dana@gmail.com

const $ = require("jquery")
const apiController = require("./apiController")
const friends = require("./friends")
const task = require("./task")
const messages = require("./messages")
const events = require("./Events/events")

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
                //Check to see if input fields are blank
                if (emailInput.val() === "" || userNameInput.val() === ""){
                    alert("Please enter a valid username and email")
                    return
                }
                else {
                    //call login function and submit the values converted to lowercase
                    loginControl.submitLogin(userNameInput.val().toLowerCase(), emailInput.val().toLowerCase())
                }
            })
            //put all the inputs and buttons on the DOM
            $("#login-stuff").append(headline).append(userNameInput).append(emailInput).append(submitLoginBtn).append(registerBtn)
            registerBtn.click(() =>{
                //Check if input fields are blank
                if (emailInput.val() === "" || userNameInput.val() === "") {
                    alert("Please enter a valid username and email")
                    return
                }
                else {
                    //call register user function
                    loginControl.registerUser(userNameInput.val(), emailInput.val())
                }
            })
        }
    },
    submitLogin: {
        value: function(userName, emailVal){
            apiController.getUserId(userName).then(user => {
                //Check whether or not user exists by checking the return from ajax call. If return is empty array, or if the username or email dont match throw error
                if (user.length === 0 || (user[0].email !== emailVal || user[0].name !== userName)){
                    alert("I'm sorry, that username or email is incorrect or non-existent. Please try again.")
                    return
                }
                else if (user[0].email === emailVal && user[0].name === userName){
                    //if user input passes checks, log them in!
                    sessionStorage.setItem("activeUser", user[0].id)
                    $("#login-stuff").remove()
                    let mainUser = user[0].name
                    let firstName = mainUser.split(" ")[0]
                    let capitalLetter = firstName.charAt(0).toUpperCase() + firstName.slice(1)
                    $("#header").append($(`<h1>Welcome to Nutshell, ${capitalLetter}!</h1>`))
                    $(".grid__wrapper").css("display", "grid")
                    friends.displayFriendList()
                    task.printTasks()
<<<<<<< HEAD
=======
                    events()
>>>>>>> master
                    messages.buildMessenger()
                }
            })
         }
    },
    registerUser: {
        value: function(userName, emailValue){
            apiController.getUserId(userName).then(nameResponse =>{
                apiController.getEmailAddr(emailValue).then(emailResponse =>{
                    //Check to see if username or email are already registered
                    if (nameResponse.length === 0 && emailResponse.length === 0){
                        //if not, then register the user
                        userName = userName.toLowerCase()
                        emailValue = emailValue.toLowerCase()
                        let userObject = {
                            name: userName,
                            email: emailValue
                        }
                        apiController.addNewUser(userObject).then(response => {
                            loginControl.submitLogin(userName, emailValue)
                        })
                    }
                 else {
                     //if username or email are already registered, throw an error
                        alert("Sorry, that username or email is already registered")
                        return
                    }
                 })
            })
         }
    }
})

module.exports = loginControl