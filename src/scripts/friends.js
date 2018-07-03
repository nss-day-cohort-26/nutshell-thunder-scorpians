const $ = require("jquery")
const apiController = require("./apiController")
const createObject = require("./objectConstructors")

const currentUser = sessionStorage.getItem("activeUser")

const friendsList = $(".friends")
const addFriendBtn = $("<button id='add-friend-btn'>Add Friend By Name</button>")

const friendActions = Object.create({},{
    displayFriendList: {
        value: function(){
            $("#friendListContainer").remove()
            addFriendBtn.click(() => { addFriendBtn.hide(); friendActions.addFriend() })
            friendsList.append(addFriendBtn)
            addFriendBtn.show()
            friendsList.append($("<div id='friendListContainer'><ul id='friendUL'></ul></div>"))
            console.log("currentuserID", currentUser)
            let currentFriendsList = apiController.getFriendsList(currentUser).then((response) =>{
                response.forEach(friend =>{
                    let liElement = $("<li>")
                    liElement.text(`${friend.user.name}`)
                    $("#friendUL").append(liElement)
                })
            })
        }
    },
    addFriend: {
        value: function(){
            const friendNameInput = $("<input type='text' placeholder='Enter Friend Name'></input>")
            const saveButton = $("<button>")
            saveButton.text("Save Friend")
            friendsList.append(saveButton)
            let friendsToCheck = []
            apiController.getFriendsList(currentUser).then( (response) =>{friendsToCheck = response})
            saveButton.click(() => {
                const friendNameToAdd = friendNameInput.val()
                console.log(friendsToCheck)
                for (let i=0; i<friendsToCheck.length; i++){
                    if (friendNameToAdd === friendsToCheck[i].user.name){
                        alert(`You've already added ${friendNameToAdd} as a friend`)
                        friendNameInput.remove()
                        saveButton.remove()
                        friendActions.displayFriendList()
                        return
                    }
                }
                apiController.getUserId(friendNameToAdd).then(response => {
                    if (response.length === 0){
                        alert(`I'm sorry, user ${friendNametoAdd} doesn't exist`)
                        friendNameInput.remove()
                        saveButton.remove()
                        friendActions.displayFriendList()
                    }
                    else {
                        apiController.addNewFriend(currentUser, response[0].id)
                        friendNameInput.remove()
                        saveButton.remove()
                        friendActions.displayFriendList()
                    }
                })
            })
            friendsList.append(friendNameInput)
        }
    }
})

friendActions.displayFriendList()

module.exports = friendActions