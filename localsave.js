/**
 * 1: Get the input
 *  -> Listen a key event, when user pless enter while typing on task area
 * */

let taskTitle = document.querySelector('input[name="tasktitle"]');

// Select the Task UL
const ulActive = document.querySelector('#active-task');
const ulInActive = document.querySelector('#inactive-task');

//Task
let activeTask = localStorage.getItem('activeTask');
let completeTask = localStorage.getItem('completeTask');

//Append Elements
const appendLi = (task) => { 

    //Create Element
    const keys = Object.keys(task);
    
    keys.forEach((key, index) => {

        const li = document.createElement('li');
        li.innerHTML = `
                <input class="form-check-input me-1" type="checkbox" value="active" id="${key}"/>
                <label>${task[key]}</label>
                <span><i class="fas fa-trash delete"></i></span>
        `;
        li.classList.add('list-group-item');
        ulActive.append(li);
    });

    //Return Task
    return task;
}
//Get Task
let taskArray = (activeTask !== null) ? appendLi(JSON.parse(activeTask)) : {};

//Delete Li
const deleteTask = id => {
    // Delete
    if (activeTask !== null) {
        let task = JSON.parse(activeTask);
        delete task[id];

        localStorage.setItem('activeTask', JSON.stringify(task));
    }
};


const doToActive = (task) => {
    //Add Task to storage
    let liNo = ulActive.children.length + 1;

    console.log(task);
    console.log(taskArray);
    
    taskArray['task-'+liNo] = task;


    //Save Values
    localStorage.setItem('activeTask', JSON.stringify(taskArray));
};


