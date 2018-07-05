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
            friendsList.append(saveButton).append(friendNameInput)
            let friendsToCheck = []
            apiController.getFriendsList(currentUser).then( (response) =>{friendsToCheck = response})
            saveButton.click(() => {
                if (friendNameInput.val() === ""){
                    alert("Please enter a valid username")
                    saveButton.remove()
                    friendNameInput.remove()
                    addFriendBtn.show()
                    return
                }
                else {apiController.getUserId(friendNameInput.val()).then(response => {
                    if (response.length === 0){
                        alert(`I'm sorry, user ${friendNameInput.val()} doesn't exist`)
                        friendNameInput.remove()
                        saveButton.remove()
                        friendActions.displayFriendList()
                        // addFriendBtn.show()
                        }
                    else {
                        apiController.addNewFriend(currentUser, response[0].id)
                        friendNameInput.remove()
                        saveButton.remove()
                        friendActions.displayFriendList()
                        // addFriendBtn.show()
                        }
                    })
                }
            })
        }
    }
})

addFriendBtn.click(() => { addFriendBtn.hide(); friendActions.addFriend() })

friendActions.displayFriendList()

module.exports = friendActions