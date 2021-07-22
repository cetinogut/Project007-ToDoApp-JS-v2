// select the elements
const clearMem = document.querySelector('.clearMem');
const todaysDateTR = document.querySelector('.date.turkish');
const todaysDateEN = document.querySelector('.date.english');
const taskList = document.getElementById('taskList');
const userInput = document.querySelector('.userInput');

// Variables
const CHECKED = 'fa-check-circle';
const UNCHECKED = 'fa-circle';
const LINE_THROUGH = 'lineThrough'; // css element for lineThroughing the task name text

//let TASKLIST = [] , id = 0; // after using local storage we chnaged this values
let TASKLIST , id;

//get tasks from local storage
let taskListData = localStorage.getItem('TASKS')

// check if data exists
if(taskListData){
    TASKLIST = JSON.parse(taskListData);
    id = TASKLIST.length;
    loadTaskListToUI(TASKLIST);
}else{ // TASKLİST empty initialize the values from
    TASKLIST = [];
    id = 0;
}


// show todays date at the header
const options = { weekday: "short", month: "short", day: "numeric"};
const today = new Date();

todaysDateTR.innerHTML = today.toLocaleString("tr-TR", options);
todaysDateEN.innerHTML = today.toLocaleString("en-US", options);


//EVENT LISTENERS
//enter key
document.addEventListener("keydown", function (e) {
    if(e.key == "Enter"){
        const newTaskName = userInput.value;
        console.log(newTaskName)

        // if userInput is not empty
        if(newTaskName){
            addTaskToUI(newTaskName, id, false, false); // show new task in the UI for userInput

            TASKLIST.push({
                taskName : newTaskName,
                id : id,
                completed : false,
                deleted : false
            })

            localStorage.setItem("TASKS", JSON.stringify(TASKLIST)); // update the tasklist in localstorage

            id++;
        }
        userInput.value = ""; // after hitting the enter key the new task goes up in the UI and the input field get cleared
    }
})

// target tasks created dynamically by
taskList.addEventListener("click", function(event){
    const element = event.target; // return the clicked element inside the task list
    console.log({element});
    if(element.localName === "p" || element.localName === "li" ){ // if user clicks on task name or empty are on the task line do nothing
        return console.log("invalid area, do nothing on click")
    } else{
        const elementJob = element.attributes.job.value; // complete or deleted task
        console.log({elementJob});
        if(elementJob === "complete"){
            userCompleteTask(element);
        } else if(elementJob === "delete"){
            removeDeletedTaskfromUI(element);
        }
        console.log("before")
        console.log({TASKLIST})
        localStorage.setItem("TASKS", JSON.stringify(TASKLIST)); // update the tasklist in localstorage
        console.log("after")
    }
})

// clear the local storage
clearMem.addEventListener("click", function(){
    
    let result = confirm("Are you sure to clear all tasks?");
    if(result){
       localStorage.clear();
    }
    location.reload(); // reload the page
})


// add task function 
function addTaskToUI(taskName, id, completed, deleted){

    if(deleted){return} // if the task deleted do nothing

    const COMPLETED = completed ? CHECKED : UNCHECKED;
    const DRAWLINE = completed ? LINE_THROUGH : "";
    const task = 
    `<li class="task">
        <i class="far ${COMPLETED} taskComplete" job="complete" id="${id}"></i>
        <p class="text ${DRAWLINE}">${taskName}</p>
        <i class="far fa-trash-alt taskDelete"  job="delete" id="${id}"></i>
    </li>
    `;
    const position = "beforeend";

    taskList.insertAdjacentHTML(position, task);
}

// user completes a task 
function userCompleteTask(element){
    element.classList.toggle(CHECKED);
    element.classList.toggle(UNCHECKED);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    TASKLIST[element.id].completed = TASKLIST[element.id].completed ? false : true;
}

// remove deleted elemet from the userInput
function removeDeletedTaskfromUI(element){
    element.parentNode.parentNode.removeChild(element.parentNode);

    TASKLIST[element.id].deleted = true;
}

//get task from local storage

//add item to local storage (we have to add this code where we update the TASKLIST in functions)
//localstorage.setItem("TASK", JSON.stringify(TASKLIST));

// load tasklist to userInput
function loadTaskListToUI(array){
    array.forEach(function(item){
        addTaskToUI(item.taskName, item.id, item.completed, item.deleted)
    })
}

var checkbox = document.querySelector("#languageSelection");

checkbox.addEventListener( 'change', function() {
    if(this.checked) {
        console.log("TR placeholder")
        userInput.setAttribute("placeholder","görev ekleyebilirsiniz...")
    } else {
        console.log("En placeholder")
        userInput.setAttribute("placeholder","task to be done...")
    }
});

//addTask("drink coffee")
//addTask("read book", 1, true, false);
//addTask("do shopping book", 1, false, false);
//addTask("do shopping book", 1, false, true);