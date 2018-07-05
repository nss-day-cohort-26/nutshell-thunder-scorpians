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
            saveButton.click(() => {friendName = friendNameInput.val(); friendActions.addFriend(friendName, saveButton, friendNameInput)})
        }
    },
    addFriend: {
        value: function(friendName, saveButton, friendNameInput){
            console.log(friendName)
            // const friendNameInput = $("<input type='text' placeholder='Enter Friend Name'></input>")
            // const saveButton = $("<button>")
            // saveButton.text("Save Friend")
            // friendsList.append(saveButton).append(friendNameInput)
            let friendsToCheck = []
            apiController.getFriendsList(currentUser).then( (response) =>{friendsToCheck = response
            // saveButton.click(() => {
                // console.log("friends to check", friendsToCheck)
                friendNameArray = friendsToCheck.map((currentValue, index) =>{return friendsToCheck[index].user.name})
                // console.log(friendNameArray)
                if (friendName === ""){
                    alert("Please enter a valid username")
                    if (saveButton){saveButton.remove()}
                    if (friendNameInput){friendNameInput.remove()}
                    if (addFriendBtn){addFriendBtn.show()}
                    return
                }
                else if (friendNameArray.includes(friendName)){
                    alert(`You're already friends with ${friendName}`)
                    if (saveButton) { saveButton.remove() }
                    if (friendNameInput) { friendNameInput.remove() }
                    if (addFriendBtn) { addFriendBtn.show() }
                    return
                }
                else {
                    apiController.getUserId(friendName).then(response => {
                    console.log("getUserId Response", response[0].id)
                    if (response.length === 0){
                        alert(`I'm sorry, user ${friendName} doesn't exist`)
                        if (saveButton) { saveButton.remove() }
                        if (friendNameInput) { friendNameInput.remove() }
                        // addFriendBtn.show()
                        }
                    else if (String(response[0].id) === currentUser){
                        alert("You cannot add yourself as a friend, friend.")
                        if (saveButton) { saveButton.remove() }
                        if (friendNameInput) { friendNameInput.remove() }
                        if (addFriendBtn) { addFriendBtn.show() }
                        return
                    }
                    else {
                        apiController.addNewFriend(currentUser, response[0].id)
                        if (friendNameInput){friendNameInput.remove()}
                        if (saveButton){saveButton.remove()}
                        friendActions.displayFriendList()
                        // addFriendBtn.show()
                        }
                    })
                // )
            // })
            }
            })
    }
}
})

// addFriendBtn.click(() => { addFriendBtn.hide(); friendActions.addFriend() })
addFriendBtn.click(() => { addFriendBtn.hide(); friendActions.makeDomComponents() })

friendActions.displayFriendList()

module.exports = friendActions