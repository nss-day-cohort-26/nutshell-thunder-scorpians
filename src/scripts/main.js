const createNewForm = require("./createInputForm")
const friends = require("./friends")
const makeData = require("./populateFakeData")

sessionStorage.setItem("activeUser", 1)
friends.displayFriendList()
// makeData(5)