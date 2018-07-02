const $ = require("jquery");
const apiController = require("./apiController");
const $wrapper = $("#wrapper");
// const taskObject = require("./test");

const taskObject = Object.create({},{

    printTasks:{
        value: ()=>{ apiController.getTasks(1).then((response)=>{
            console.log(response);
            response.forEach(element => {
                console.log(element);
            for (const key in element) {
                console.log(element);
                if (key === "desc") {$("<p>").text(`${[key]}:${element[key]}`).appendTo($wrapper);}
                else if (key === "dueDate") {$("<p>").text(`${[key]}:${element[key]}`).appendTo($wrapper);}
                console.log(element[key]);
            }
        })
    })}
},

    // postTasks: postTasks()
    buildFormTask:{ value: () => {
        const descInput = $("<input>").attr("placeholder","description").appendTo($wrapper)
        const dueDateInput = $("<input>").attr("placeholder","due").appendTo($wrapper)
        const subBtn = $("<button>").text("Submit").appendTo($wrapper).click(()=>{
            const miniTaskObject = {
                userId: 1,
                dueDate: dueDateInput.val(),
                taskDescription: descInput.val()
            }
            apiController.addNewTask(miniTaskObject)
            taskObject.printTasks()
        })
    }}
})

console.log(taskObject);

const buildFormBtn = $("<button>").text("Add New Task").appendTo($wrapper).click(taskObject.buildFormTask)
module.exports = taskObject;