const $ = require("jquery");
const apiController = require("./apiController");
const clear = require("./clear");
const $wrapper = $("#wrapper");

const taskObject = Object.create({},{

    printTasks:{
        value: ()=>{ apiController.getTasks(1).then((response)=>{
            // console.log(response);
            response.forEach(element => {
                // console.log(element);
                $div = $("<div>").appendTo($wrapper);
                for (const key in element) {
                    // console.log(element);
                    if (key === "desc") {$("<p>").text(`${[key]}:${element[key]}`).appendTo($div);}
                    else if (key === "dueDate") {$("<p>").text(`${[key]}:${element[key]}`).appendTo($div);}
                // console.log(element[key]);
            }
                $deleteBtn = $("<button>").text("Delete").appendTo($div).click((e)=>{
                    apiController.deleteTask(element.id);
                    $(e.target.parentNode).remove();
                    // console.log(e.target.parentNode);
                    // console.log(element.id);
                })
        })
        const buildFormBtn = $("<button>").text("Add New Task").appendTo($wrapper).click(()=>{
            const $buildFormDiv = $("<div>").appendTo($wrapper)
            const descInput = $("<input>").attr("placeholder","description").appendTo($buildFormDiv)
            const dueDateInput = $("<input>").attr("placeholder","due").appendTo($buildFormDiv)
            buildFormBtn.hide();
            const $subBtn = $("<button>").text("Submit").appendTo($buildFormDiv).click(()=>{
                $wrapper.empty()
                const miniTaskObject = {
                    userId: 1,
                    dueDate: dueDateInput.val(),
                    taskDescription: descInput.val()
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
taskObject.printTasks()

module.exports = taskObject;