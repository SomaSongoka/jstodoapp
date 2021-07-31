
/**
 * TODO LIST WEB APP
 * Version: 1
 * Developed By: Alpha
 * */

// Steps

/**
 * 1: Get the input
 *  -> Listen a key event, when user pless enter while typing on task area
 * */

let taskTitle = document.querySelector('input[name="tasktitle"]');

// Select the Task UL
const ulActive = document.querySelector('#active-task');
const ulInActive = document.querySelector('#inactive-task');
                
//Event Lister
taskTitle.addEventListener('keyup', e => {
    //When user press Enter
    if(e.key === 'Enter' && !isEmptyOrSpaces(taskTitle.value)){
       let task = taskTitle.value; 
       //Empty the value
       taskTitle.value = '';
       let liNo = ulActive.children.length;
        
       //Create Element
        const li = document.createElement('li');
        li.innerHTML = `
            <input class="form-check-input me-1" type="checkbox" value="active" id="task-${liNo + 1}"/>
            <label>${task.trim()}</label>
            <span><i class="fas fa-trash"></i></span>
        `;
        li.classList.add('list-group-item');
        ulActive.append(li);
    }
});

/**
 * 2: Get Completed List
 *  -> Listen a click event on Active list
 * */
ulActive.addEventListener('click', e => {
    //Listen to check Box && Delete
    if (e.target.tagName === 'INPUT') {
        if(e.target.checked){
            let li = e.target.parentElement; // Parent li Element
            //Get This Li element
            let span = li.querySelector('span'); // Find the span element (Delete BTN)
            //Remove the Delete Button
            span.remove();
            //Move to Inactive List
            ulInActive.append(li);
        }
    } else if(e.target.tagName === 'I') {
        let li = e.target.parentElement.parentElement; // Parent li Element

        //Show Wrapper
        let wrapper = document.querySelector('.delete-wrapper');
        wrapper.style.display = 'block';

        // Delete List
        li.remove(); 

        //Remove Wrapper
        setTimeout(()=> {
            wrapper.style.display = 'none';
        }, 2500);
    }
});

//Validate Empty String
function isEmptyOrSpaces(str){
    let reg = /^ *$/;
    return str === null || reg.test(str);
}

