const createNewForm = require("./createInputForm")
const friends = require("./friends")
const makeData = require("./populateFakeData")
const loginPage = require("./loginPage")

sessionStorage.setItem("activeUser", 1)
// friends.displayFriendList()
loginPage.createForms()
// makeData(5)
