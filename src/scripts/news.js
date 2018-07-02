// Given a user wants to record a news article on their dashboard
// When the user performs a gesture on a New Article affordance
// Then a form should be presented to the user in which the following information can be entered

// News title
// Synopsis
// URL

const $ = require("jquery")
const moment = require("moment")
const apiController = require("./apiController")

$("<article>").addClass("test").appendTo("#news-test")
$("<button>").addClass("add-news").text("New Article").appendTo($(".test"))
const saveNews = $("<button>").addClass("save-news").text("Save Article")

$(".add-news").click(() => {
    const $newsContainer = $("<section>")
    const $addNews = $("<div>").addClass("news")
    $("body").append($newsContainer)
    $newsContainer.append($addNews)
    $("<input>").addClass("title").text("Title").appendTo($addNews)
    $("<input>").addClass("synopsis").text("Synopsis").appendTo($addNews)
    $("<input>").addClass("url").text("URL").appendTo($addNews)
    saveNews.appendTo($addNews)
})


// Given a user has entered in all field values for storing a new article
// When the user performs a gesture on the Save Article affordance
// Then the article should be saved in the database, and assigned to the user
// And should have a property of the current timestamp

$(saveNews).click(() => {
    console.log($(".title").val());
    apiController.addNewArticle($(".title").val(), $(".synopsis").val(), $(".url").val(), moment().format("YYYY-MM-DD hh:mm:ss a"))
})

console.log("working")
