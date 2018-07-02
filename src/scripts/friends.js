const $ = require("jquery")
const apiController = require("./apiController")
const createObject = require("./objectConstructors")

const currentUser = sessionStorage.getItem("activeUser")

const friendsList = $(".friends")

const friendActions = Object.create({},{
    displayFriendList: {
        value: function(){
            $("#friendListContainer").remove()
            if (addFriendBtn.prop(hide)){addFriendBtn.show()}
            else{
            friendsList.append($("<div id='friendListContainer'><ul id='friendUL'></ul></div>"))
            apiController.getFriendsList(currentUser)
            console.log("currentuserID", currentUser)
            let currentFriendsList = apiController.getFriendsList(currentUser).then((response) =>{
                response.forEach(friend =>{
                    let liElement = $("<li>")
                    liElement.text(`${friend.user.name}`)
                    $("#friendUL").append(liElement)
                })
            })
        }
        }
    },
    addFriend: {
        value: function(){
            const friendNameInput = $("<input type='text' placeholder='Enter Friend Name'></input>")
            const saveButton = $("<button>")
            saveButton.text("Save Friend")
            friendsList.append(saveButton)
            saveButton.click(() => {
                const friendNameToAdd = friendNameInput.val()
                apiController.getUserId(friendNameToAdd).then(response => {
                    if (response.length === 0){
                        alert("I'm sorry, that user doesn't exist")
                        return null
                    }
                    else {apiController.addNewFriend(currentUser, response[0].id)
                    friendNameInput.remove()
                    saveButton.remove()
                    friendActions.displayFriendList()
                    }
                })})
            friendsList.append(friendNameInput)
        }
    }
})
const addFriendBtn = $("<button id='add-friend-btn'>Add Friend By Name</button>")
addFriendBtn.click(() => { addFriendBtn.hide(); friendActions.addFriend()})
friendsList.append(addFriendBtn)

module.exports = friendActions