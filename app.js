
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
            //Play Audio
            let audio = document.querySelector('#complete');
            audio.play();
        }
    } else if(e.target.tagName === 'I') {
        let li = e.target.parentElement.parentElement; // Parent li Element

        //Show Wrapper
        let wrapper = document.querySelector('.delete-wrapper');
        wrapper.style.display = 'block';

        // Delete List
        li.remove(); 

        //Play Audio
        let audio = document.querySelector('#delete');
        audio.play();

        //Remove Wrapper
        setTimeout(()=> {
            wrapper.style.display = 'none';
        }, 2500);
    }
});

/**
 * 3: Get Unchecked Completed List
 *  -> Listen a click event on InActive list
 * */
ulInActive.addEventListener('click', e => {
    //Listen to check Box && Delete
    if (e.target.tagName === 'INPUT') {
        if(!e.target.checked){
            let li = e.target.parentElement; // Parent li Element
            //Delete i
            let span = `<span><i class="fas fa-trash"></i></span>`;
            //Add the Delete Button
            li.innerHTML += span;
            //Move to active List
            ulActive.append(li);
        }
    } 
});


//Validate Empty String
function isEmptyOrSpaces(str){
    let reg = /^ *$/;
    return str === null || reg.test(str);
}

/**
 * ADD-ONS
 * 1: Back Button
 * 2: Edit 
 * 3: Done Editing
 * */

// Back Button
let btn =  document.querySelector('button');
btn.addEventListener('click', () => alert('To be added soon:'));

// Edit Main Title
const toDo = document.querySelector('.todo-title');
toDo.addEventListener('click', e => {
    //Div
    let div = toDo.querySelector('div:nth-child(2)');
    //Check If Edit
    if (e.target.tagName === 'I') {
        //Focus
        let input = div.querySelector('input');
        if(input !== null){
            //Add input element
            div.innerHTML = `<h2>${input.value}</h2>`;

            //Span
            let span = div.parentElement.querySelector('span');
            span.style.display = 'none';
        }
    }else{
        //Focus
        let input = div.querySelector('input');
        if(input !== null){
            //Add input element
            div.innerHTML = `<h2>${input.value}</h2>`;
        }
    }
}); 

//Edit Title
toDo.addEventListener('dblclick', e => {
    let h2 = toDo.querySelector('h2');
    let div = h2.parentElement; // Get Parent Div

    //Add input element
    div.innerHTML = `
    <input id="dotoname" type="text" value="${h2.innerText}"/>
    `;
    //Focus
    let input = div.querySelector('input');
    input.focus();
    input.selectionStart = input.selectionEnd = input.value.length;//Set cursor to the end of input

    //Span
    let span = div.parentElement.querySelector('span');
    span.style.display = 'block';
});