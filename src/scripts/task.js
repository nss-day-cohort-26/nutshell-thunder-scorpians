const $ = require("jquery");
const apiController = require("./apiController");
const $wrapper = $("#wrapper");

const taskObject = Object.create({},{

    printTasks:{
        value: ()=>{ apiController.getTasks(1).then((response)=>{
            // console.log(response);
            response.forEach(element => {
                // console.log(element);
                const $div = $("<div>").appendTo($wrapper);
                if (element.complete === "false") {
                    const $checkbox = $("<input>").attr("type","checkbox").appendTo($div).click(()=>{
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
                }
                for (const key in element) {
                    // console.log(element);
                    if (key === "desc" && element.complete === "false") {$("<p>").text(`${[key]}:${element[key]}`).appendTo($div);}
                    else if (key === "dueDate" && element.complete === "false") {$("<p>").text(`${[key]}:${element[key]}`).appendTo($div);}
                    // console.log(element[key]);
                }
                if (element.complete === "false") {
                    $deleteBtn = $("<button>").text("Delete").appendTo($div).click((e)=>{
                        apiController.deleteTask(element.id);
                        $(e.target.parentNode).remove();
                        // console.log(e.target.parentNode);
                        // console.log(element.id);
                    })
                }
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
taskObject.printTasks()

module.exports = taskObject;