//Friends functionality. This module is used to add friends and make dom components having to do with displaying and adding friends.
//Seth Dana seth.dana@gmail.com

const $ = require("jquery")
const apiController = require("./apiController")
const createObject = require("./objectConstructors")

//Get current active user ID from session storage
// const currentUser = sessionStorage.getItem("activeUser")

//capture DIV from DOM to append stuff to

const friendActions = Object.create({},{
    displayFriendList: {
        value: function(){
            const addFriendBtn = $("<button id='add-friend-btn'>Add Friend By Name</button>")
            addFriendBtn.click(() => { addFriendBtn.hide(); friendActions.makeDomComponents() })
            const friendsList = $("#friends")
            console.log("im ran so far away")
            const currentUser = sessionStorage.getItem("activeUser")
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
            const addFriendBtn = $("#add-friend-btn")
            const currentUser = sessionStorage.getItem("activeUser")
            const friendNameInput = $("<input type='text' placeholder='Enter Friend Name' autofocus></input>")
            const saveButton = $("<button>")
            saveButton.text("Save Friend")
            // $("<form type='submit'></form>").append(saveButton).append(friendNameInput)
            // friendsList.append(saveButton).append(friendNameInput)
            $("#friendUL").prepend((saveButton)).append(friendNameInput)
            saveButton.click(() => {friendName = friendNameInput.val(); friendActions.addFriend(friendName, saveButton, friendNameInput, addFriendBtn)})
            friendNameInput.keyup((event)=>{
                if (event.which === 13) {friendName = friendNameInput.val(); friendActions.addFriend(friendName, saveButton, friendNameInput, addFriendBtn)}
            })
        }
    },
    addFriend: {
        value: function(friendName, saveButton, friendNameInput, addFriendBtn){
            const currentUser = sessionStorage.getItem("activeUser")
            let friendsToCheck = []
            apiController.getFriendsList(currentUser).then( (response) =>{
                //populate array with response from API
                friendsToCheck = response
                //map array to pull out only user names to check against
                friendNameArray = friendsToCheck.map((currentValue, index) =>{return friendsToCheck[index].user.name})
                //if input field is empty
                if (friendName === ""){
                    alert("Please enter a valid username")
                    if (saveButton){saveButton.remove()}
                    if (friendNameInput){friendNameInput.remove()}
                    if (addFriendBtn){addFriendBtn.show()}
                    return
                }
                //Check whether or not friendship already exists
                else if (friendNameArray.includes(friendName)){
                    alert(`You're already friends with ${friendName}`)
                    if (saveButton) { saveButton.remove() }
                    if (friendNameInput) { friendNameInput.remove() }
                    if (addFriendBtn) { addFriendBtn.show() }
                    return
                }
                else {
                    apiController.getUserId(friendName).then(response => {
                    //
                        if (response.length === 0){
                        alert(`I'm sorry, user ${friendName} doesn't exist`)
                        if (saveButton) { saveButton.remove() }
                        if (friendNameInput) { friendNameInput.remove() }
                        addFriendBtn.show()
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

// addFriendBtn.click(() => { addFriendBtn.hide(); friendActions.makeDomComponents() })
// addFriendBtn.click(() => { addFriendBtn.hide(); friendActions.addFriend() })

friendActions.displayFriendList()

module.exports = friendActions