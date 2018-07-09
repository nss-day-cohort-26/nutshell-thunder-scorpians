//Author - Robert Leedy
//creates the news articles section

//require jquery, moment for timestamp and apicontroller for api functions
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
//create input fields for articles
const titleInput = $("<input>").attr("id", "title").text("Title").appendTo(addNews)
titleInput.attr("placeholder", "Enter article title")
const synopsisInput = $("<input>").attr("id", "synopsis").text("Synopsis").appendTo(addNews)
synopsisInput.attr("placeholder", "Enter article summary")
const urlInput = $("<input>").attr("id", "url").text("URL").appendTo(addNews)
const articleOutput = $("<section>").attr("id", "article-output").appendTo(newsContainer)
urlInput.attr("placeholder", "Enter article URL")
//hide input fields on load
addNews.hide()
//get current user from session storage
const currentUser = parseInt(sessionStorage.getItem("activeUser"));

//event handler on New Article button.  hides button when pressed and shows input fields and save button
addNewsButton.click(() => {
    addNews.show()
    saveNewsButton.appendTo(addNews)
    addNewsButton.hide()
})

//function to append articles database to dom
const printArticles = () => {

    apiController.getFriendsList(currentUser).then(allFriends => {
        let allFriendsArray = [];
        allFriends.forEach(friend => {
            const friendId = friend.user.id;
            allFriendsArray.push(friendId);
        });
        allFriendsArray = allFriendsArray.map(friendIdNumber => { return `userId=${friendIdNumber}&` });
        const allFriendsString = allFriendsArray.join("");

        //empty dom if there is anything on it
        if (articleOutput) {
            articleOutput.empty()
        }
        //api call to get items in articles array
        apiController.getArticleList(currentUser, allFriendsString)
            .then((articleList) => {
                //loop through those arrays
                articleList.forEach(articleText => {
                    //create elements for each thing to be printed to dom
                    const titleText = $("<h3>").text(articleText.title)
                    const synopsisText = $("<h5>").text(articleText.synopsis)
                    const urlText = $("<a>").attr("href", articleText.url).text("Read the full article here")
                    const timeText = $("<p>").text(articleText.timestamp)
                    //assign to new div
                    const newsText = $(`<div id=${articleText.id}>`).addClass("news-text-div").append(titleText).append(synopsisText).append(urlText).append(timeText)
                    //append to parent elements
                    newsText.prependTo(articleOutput).prependTo(newsContainer)
                    articleOutput.prepend(newsText)
                    //check to see if articles were posted by current user or a friend and assign a class depending
                    if (parseInt(articleText.userId) === currentUser) {
                        newsText.addClass("article article--yours");
                        $("<p>").text("Posted by: You").appendTo(newsText);
                    } else {
                        newsText.addClass("article article--others");
                        $("<p>").text("Posted by: A friend").appendTo(newsText);
                    }
                    //create and append delete button to each article
                    const deleteNewsButton = $("<button>").addClass("delete-news-button").text("Delete Article")
                    deleteNewsButton.appendTo(newsText)
                    //api call to delete article on click
                    deleteNewsButton.click(() => {
                        apiController.deleteArticle(event.target.parentNode.id).then((response) => {
                            //reprint dom with updated list
                            printArticles()
                        })
                    })
                });
            })
    });
}


//event handler on Save article button
$(saveNewsButton).click(() => {
    //checks to make sure all fields are filled in and alerts to fill in if not
    if (titleInput.val() === "" || synopsisInput.val() === "" || urlInput.val() === "") {
        alert("Please fill in all fields.")
    } else {
        //adds values of input fields to database
        apiController.addNewArticle(titleInput.val(), synopsisInput.val(), urlInput.val(), moment().format("YYYY-MM-DD hh:mm:ss a"), currentUser)
        //hides input fields and button
        $("#news").hide()
        //shows New Article button
        addNewsButton.show()
        //clears input values
        titleInput.val("")
        synopsisInput.val("")
        urlInput.val("")
    }
    //run print articles to update article list
    printArticles()
})

//export printArticles so it can be called on main
module.exports = printArticles
// printArticles()



