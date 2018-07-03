const faker = require("faker")
const apiController = require("./apiController")

const makeFakeData = (howMany) => {
    for (let i=0; i<howMany; i++){
    let name = faker.name.findName()
    let email = faker.internet.email()
    let newPerson = {
        name: name,
        email: email
    }
    console.log(newPerson)
    apiController.addNewUser(newPerson)
}
}

module.exports = makeFakeData