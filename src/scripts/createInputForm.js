const objectConstructors = require("./objectConstructors")
const $ = require("jquery")

const createNewForm = Object.create({},{
    userForm: {
        value: function(param){
            const placeHolderObject = objectConstructors[param].create()
            for (let property in placeHolderObject){
                if (property !== "create" && property !== "userId"){
                    $("body").prepend($(`<section><input id=${property} value=${property} onfocus='this.value=""'></input><section>`))
                }
            }
        }
    }
})


module.exports = createNewForm