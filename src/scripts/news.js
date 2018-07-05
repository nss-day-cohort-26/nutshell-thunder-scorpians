//Author - Robert Leedy

// Given a user wants to record a news article on their dashboard
// When the user performs a gesture on a New Article affordance
// Then a form should be presented to the user in which the following information can be entered

// News title
// Synopsis
// URL

const $ = require("jquery")
const moment = require("moment")
const apiController = require("./apiController")

//create New Article button
const addNewsButton = $("<button>").attr("id", "add-news-button").text("New Article").appendTo($("#news-test"))
//create Save Article button
const saveNewsButton = $("<button>").addClass("save-news-button").text("Save Article")
//create elements for news inputs and append to DOM
const newsContainer = $("<section>").attr("id", "newsContainer")
$("#news-test").append(newsContainer)
const addNews = $("<div>").attr("id", "news")
newsContainer.append(addNews)
const titleInput = $("<input>").attr("id", "title").text("Title").appendTo(addNews)
titleInput.attr("placeholder", "Enter article title")
const synopsisInput = $("<input>").attr("id", "synopsis").text("Synopsis").appendTo(addNews)
synopsisInput.attr("placeholder", "Enter article summary")
const urlInput = $("<input>").attr("id", "url").text("URL").appendTo(addNews)
const articleOutput = $("<section>").attr("id", "article-output")
addNews.hide()
urlInput.attr("placeholder", "Enter article URL")

//event handler on New Article button.  hides button when pressed and shows input fields
addNewsButton.click(() => {
    addNews.show()
    saveNewsButton.appendTo(addNews)
    addNewsButton.hide()
})

//append articles database to dom
const printArticles = () => {
    apiController.getArticleList()
    .then((articleList) => {
        articleList.forEach(articleText => {
            console.log("articleText", articleText)
            console.log("list.text", articleText.title);
            const titleText = $("<h3>").text(articleText.title)
            const synopsisText = $("<h5>").text(articleText.synopsis)
            const urlText = $("<a>").text(articleText.url)
            const timeText = $("<p>").text(articleText.timestamp)
            const newsText = $("<div>").append(titleText).append(synopsisText).append(urlText).append(timeText)
            newsContainer.append(articleOutput).append(newsText)
            });
        })
    }

// Given a user has entered in all field values for storing a new article
// When the user performs a gesture on the Save Article affordance
// Then the article should be saved in the database, and assigned to the user
// And should have a property of the current timestamp

//event handler on Save article button
$(saveNewsButton).click(() => {
    //checks to make sure all fields are filled in and alerts to fill in if not
    if (titleInput.val() === "" || synopsisInput.val() === "" || urlInput.val() === "") {
        alert("Please fill in all fields.")
    } else {
    //adds values of input fields to database
    apiController.addNewArticle(titleInput.val(), synopsisInput.val(), urlInput.val(), moment().format("YYYY-MM-DD hh:mm:ss a"))
    //hides input fields and button
    $("#news").hide()
    //shows New Article button
    addNewsButton.show()
    //clears input values
    titleInput.val("")
    synopsisInput.val("")
    urlInput.val("")
    }
    if (newsContainer) {
        newsContainer.empty()
    apiController.getArticleList()
    .then((articleList) => {
        articleList.forEach(articleText => {
            const titleText = $("<h3>").text(articleText.title)
            const synopsisText = $("<h5>").text(articleText.synopsis)
            const urlText = $("<a>").text(articleText.url)
            const timeText = $("<p>").text(articleText.timestamp)
            const newsText = $("<div>").append(titleText).append(synopsisText).append(urlText).append(timeText)
            newsContainer.append(newsText)
            });
        })
    }
})

printArticles()
//calling function to print to dom.  needs to be moved to save article button, clear dom and reprint

console.log("working")
