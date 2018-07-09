// AUTHOR: Jordan Williams
// PURPOSE: CRUD tasks specific to the user logged in at the time

const $ = require("jquery");
const apiController = require("./apiController");
const $wrapper = $("#wrapper");

const taskObject = Object.create({},{
    printTasks:{
        value: ()=>{ apiController.getTasks(sessionStorage.getItem("activeUser")).then((response)=>{
            console.log(sessionStorage.getItem("activeUser"))
            // console.log(response);
            response.forEach(element => {
                // console.log(element);
                // const $columns = $("<div>").addClass("columns").appendTo($wrapper);
                const $div = $("<div>").addClass("card column").appendTo($wrapper);
                const $p = $("<p>").text("Complete: ").attr("id","explain-checkbox").appendTo($div)
                if (element.complete === "false") {
                    for (const key in element) {
                        // console.log(element);
                        if (key === "desc" && element.complete === "false") {$("<p>").text(`${element[key]}`).appendTo($div);
                        const editBtn = $("<button>").addClass("button is-small is-info edit").text("Edit").appendTo($div).click(()=>{
                            // console.log($(event.target).siblings().eq(2))
                            // targets element.desc and "replaces" it with an input field filled with the value of it
                            const $replacement = $("<input>").attr("value",element.desc)
                            $(event.target).siblings().eq(1).replaceWith($replacement)
                            // console.log($(event.target).siblings().eq(2))
                            if ($(event.target).siblings().eq(1).is("input")) {
                                $(event.target).siblings().eq(1).keypress((e)=>{
                                    if (e.which === 13) {
                                        const editBtnUpdateObj = {
                                            userId: element.userId,
                                            dueDate: element.dueDate,
                                            desc: $replacement.val(),
                                            complete: "false"
                                        }
                                        console.log("yee");
                                        apiController.editTask(element.id,editBtnUpdateObj).then((response)=>{
                                            $wrapper.empty()
                                            taskObject.printTasks()
                                        })
                                    }
                                })
                            }
                        })
                        }
                        else if (key === "dueDate" && element.complete === "false") {$("<p>").text(`${element[key]}`).addClass("due-date").appendTo($div);}
                        // console.log(element[key]);
                    }
                    const $checkbox = $("<input>").addClass("checkbox").attr("type","checkbox").appendTo($p).click(()=>{
                        const checkboxDbUpdate = {
                            userId: element.userId,
                            dueDate: element.dueDate,
                            desc: element.desc,
                            complete: "true"
                        }
                        console.log(element.desc);
                        apiController.editTask(element.id,checkboxDbUpdate).then((response)=>{
                        $wrapper.empty()
                        taskObject.printTasks()
                    })
                    })
                    $deleteBtn = $("<button>").addClass("button is-medium is-danger delete").text("").appendTo($div).click((e)=>{
                        apiController.deleteTask(element.id);
                        $(e.target.parentNode).remove();
                        // console.log(e.target.parentNode);
                        // console.log(element.id);
                    })
                }
            })
            const buildFormBtn = $("<button>").addClass("button is-small add-task").text("+").appendTo($wrapper).click(()=>{
                const $buildFormDiv = $("<div>").appendTo($wrapper)
                const descInput = $("<input>").attr("placeholder","description").appendTo($buildFormDiv)
                const dueDateInput = $("<input>").attr("type","date").attr("placeholder","due").appendTo($buildFormDiv)
                buildFormBtn.hide();
                const $subBtn = $("<button>").addClass("button is-small is-primary").text("Submit").appendTo($buildFormDiv).click(()=>{
                    $wrapper.empty()
                    const miniTaskObject = {
                        userId: sessionStorage.getItem("activeUser"),
                        dueDate: dueDateInput.val(),
                        taskDescription: descInput.val(),
                        complete: "false"
                    }
                    apiController.addNewTask(miniTaskObject)
                    taskObject.printTasks()
                    $buildFormDiv.hide()
                    buildFormBtn.show()
                    $subBtn.show();
                })
            })
        })}
    }
})

// console.log(taskObject);

module.exports = taskObject;