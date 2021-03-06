
/**
 * TODO LIST WEB APP
 * Version: 1
 * Developed By: Alpha
 * */

// Steps

                
//Event Lister
taskTitle.addEventListener('keyup', e => {
    //When user press Enter
    if(e.key === 'Enter' && !isEmptyOrSpaces(taskTitle.value)){
       let task = taskTitle.value; 
       //Empty the value
       taskTitle.value = '';
       let liNo = ulActive.children.length + 1;

       //Active Task
       doToActive(task);
        
       //Create Element
        const li = document.createElement('li');
        li.innerHTML = `
            <input class="form-check-input me-1" type="checkbox" value="active" id="task-${liNo}"/>
            <label>${task.trim()}</label>
            <span><i class="fas fa-trash delete"></i></span>
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
    } else if(e.target.tagName === 'I' && e.target.classList.contains('delete')) {
        let li = e.target.parentElement.parentElement; // Parent li Element

        //Show Wrapper
        let wrapper = document.querySelector('.delete-wrapper');
        wrapper.style.display = 'block';

        // Delete List
        li.remove(); 
        // Delete from storage
        let deletedInput = e.target.parentElement.previousElementSibling.previousElementSibling.id;
        deleteTask(deletedInput);

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
            let span = `<span><i class="fas fa-trash delete"></i></span>`;
            //Add the Delete Button
            li.innerHTML += span;
            //Move to active List
            ulActive.append(li);
        }
    } 
});


/**
 * 4: Get Searched List
 *  -> Add event lister to search input
 * */
const search = document.querySelector('#searchtask');
search.addEventListener('keyup', e => {
    //When user press Enter
    if(!isEmptyOrSpaces(search.value)){
        let searched = search.value; //Searched String

        //Array
        let found = false;
        ulActive.style.display = 'none';
        ulInActive.style.display = 'none';

        //Active Task
        let activeli = ulActive.querySelectorAll('li');
        activeli.forEach(element => {
            let label = element.querySelector('label').innerText.toLowerCase();
            
            //Check If String Found
            if(label.search(searched.toLowerCase()) > -1){
                element.style.display = 'block';
            }else{
                //Hide this element
                element.style.display = 'none';
            }
        });
        ulActive.style.display = 'block';

        //InActive Task
        let inactiveli = ulInActive.querySelectorAll('li');
        inactiveli.forEach(element => {
            let label = element.querySelector('label').innerText.toLowerCase();
            
            //Check If String Found
            if(label.search(searched.toLowerCase()) > -1){
                element.style.display = 'block';
            }else{
                //Hide this element
                element.style.display = 'none';
            }
        });
        ulInActive.style.display = 'block';
        
    }else{
        ulActive.style.display = 'block';
        ulInActive.style.display = 'block';

        //Active Task
        let activeli = ulActive.querySelectorAll('li');
        activeli.forEach(element => {
            //Show this element
            element.style.display = 'block';
        });

        //InActive Task
        let inactiveli = ulInActive.querySelectorAll('li');
        inactiveli.forEach(element => {
            //Show this element
            element.style.display = 'block';
        });
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
btn.addEventListener('click', () => {
    localStorage.clear();
    alert('List Cleared:');
    location.reload(); //Refresh Page
});

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