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
    makeDomComponents: {
        value: function(){
            const friendNameInput = $("<input type='text' placeholder='Enter Friend Name'></input>")
            const saveButton = $("<button>")
            saveButton.text("Save Friend")
            friendsList.append(saveButton).append(friendNameInput)
            saveButton.click(() => {friendName = friendNameInput.val(); friendActions.addFriend(friendName)})
        }
    },
    addFriend: {
        value: function(){
            // const friendNameInput = $("<input type='text' placeholder='Enter Friend Name'></input>")
            // const saveButton = $("<button>")
            // saveButton.text("Save Friend")
            // friendsList.append(saveButton).append(friendNameInput)
            let friendsToCheck = []
            apiController.getFriendsList(currentUser).then( (response) =>{friendsToCheck = response})
            // saveButton.click(() => {
                // console.log("friends to check", friendsToCheck)
                friendNameArray = friendsToCheck.map((currentValue, index) =>{return friendsToCheck[index].user.name})
                // console.log(friendNameArray)
                if (friendNameInput.val() === ""){
                    alert("Please enter a valid username")
                    saveButton.remove()
                    friendNameInput.remove()
                    addFriendBtn.show()
                    return
                }
                else if (friendNameArray.includes(friendNameInput.val())){
                    alert(`You're already friends with ${friendNameInput.val()}`)
                    saveButton.remove()
                    friendNameInput.remove()
                    addFriendBtn.show()
                    return
                }
                else {apiController.getUserId(friendNameInput.val()).then(response => {
                    console.log("getUserId Response", response[0].id)
                    if (response.length === 0){
                        alert(`I'm sorry, user ${friendNameInput.val()} doesn't exist`)
                        friendNameInput.remove()
                        saveButton.remove()
                        friendActions.displayFriendList()
                        // addFriendBtn.show()
                        }
                    else if (String(response[0].id) === currentUser){
                        alert("You cannot add yourself as a friend, friend.")
                        saveButton.remove()
                        friendNameInput.remove()
                        addFriendBtn.show()
                        return
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
            // })
        }
    }
})

// addFriendBtn.click(() => { addFriendBtn.hide(); friendActions.addFriend() })
addFriendBtn.click(() => { addFriendBtn.hide(); friendActions.makeDomComponents() })

friendActions.displayFriendList()

module.exports = friendActions