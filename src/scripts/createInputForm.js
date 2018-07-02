const objectConstructors = require("./objectConstructors")
const apiController = require("./apiController")
const $ = require("jquery")

const createNewForm = Object.create({},{
    userForm: {
        value: function(param){
            const placeHolderObject = objectConstructors[param].create()
            let whichApiCall
            switch (param){
                case "User":
                whichApiCall = "addNewUser"
                break;
            }
            for (let property in placeHolderObject){
                if (property !== "create" && property !== "userId"){
                    $("body").prepend($(`<section><input id=${property} value=${property} onfocus='this.value=""'></input><section>`))
                }
            }
            $("body").append($("<div><button id='submit-button'>Submit</button></div>"))
            $("#submit-button").click(function(){
                let userName = $("#name").val()
                let email = $("#email").val()
                console.log(apiController[whichApiCall](placeHolderObject))
            })
        }
    }
})


module.exports = createNewForm