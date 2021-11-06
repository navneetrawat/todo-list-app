// DOM Elements.
const formElement = document.querySelector('.form_element');
const toDoInputField = document.getElementById("todo");
const progressBar = document.querySelector('.todo_progress_bar');
const parentDiv = document.querySelector('.todo_parent');
const modal = document.getElementById('myModal');
const modalForm = document.querySelector('.modal_form');
const closeModal = document.querySelector('.closeBtn');
const updateInputField = document.querySelector('.updateName');
const updateId = document.getElementById('updateId');

// Events :- Click Outside Modal.
window.addEventListener('click',(e) => {
    if(e.target == modal) {
        modal.style.display = 'none';
        updateInputField.value = '';
    }
});

// Event on functions.
document.addEventListener('DOMContentLoaded', () => {
    createTodo();
    showTodo();
    deleteTodos();
    updateTodo();
});

// Create todos.
function createTodo() {
  formElement.addEventListener("submit", (e) => {
    e.preventDefault();
    let todoInput = toDoInputField.value;
    let url = '/api/todo';
    let request = new Request(url ,{
        method : 'POST',
        headers : new Headers({'content-type' : 'application/json'}),
        body : JSON.stringify({todo : todoInput})
    });
    fetch(request).
    then(response => {
        if(response.ok){
           return response.json();
        }else{
            throw response;
        }
    }).
    then(data=>{
        toDoInputField.value = '';
        progressBar.textContent = `${data.msg}...`;
        progressBar.style.color = 'rgb(57, 224, 57)';
        parentDiv.style.display = 'block';
    }).
    catch(error=>{
        toDoInputField.value = '';
        progressBar.textContent = 'Something Went Wrong, Try Again...';
        progressBar.style.color = 'rgb(255, 82, 82)';
    });
    setTimeout(showTodo, 500);
  });
}

// Show Todos.
function showTodo() {
    let url = '/api/todo';
    fetch(url).
    then(response => {
        switch(response.status){
            case 200 : 
               return response.json();
            case 404 :
               return response.json();
            case 500 :
               return response.json().then(err=> {throw err});
        }
    }).
    then(data=>{
        if(data.status == 200) {
            setTimeout(()=>{
                progressBar.textContent = 'Todos Loaded...';
                progressBar.style.color = 'rgb(65, 64, 66)';    
                    let output = ``;
                    data.data.forEach(todos => {
                    output += `<div class="todos">
                                <div class="todo_list">
                                    <i class="fas fa-list-ul"></i>
                                    <p class="todo">${todos.todo}</p>
                                </div>
                                <div class="action">
                                    <button type="submit" class="update" id="${todos.id}"><i class="fas fa-edit"></i></a></button> 
                                    <button type="submit" class="delete" id="${todos.id}"><i class="fas fa-times"></i></button>
                                </div>
                              </div>`;
                    });
                    parentDiv.innerHTML = output;
                },200);
        }
        if(data.status == 404) {
            progressBar.textContent = `${data.err}`;
            progressBar.style.color = 'rgb(255, 82, 82)';
        }
    }).
    catch(error => {
        progressBar.textContent = `${error.err}, Try Again...`;       
        progressBar.style.color = 'rgb(255, 82, 82)';
    });
}

// Delete todos.
function deleteTodos() {
    parentDiv.addEventListener('click',(e) => {
        if(e.target.parentElement.classList.contains('delete')) {
            const deleteID = e.target.parentElement.id;
            let url = `/api/todo/${deleteID}`;
            let request = new Request(url ,{
            method : 'DELETE'
         });
         fetch(request).
         then(response=>{
            switch(response.status) {
                case 200 :
                   return response.json();
                case 404 :
                    return response.json();
                case 500 :
                    return response.json();
            }
         }).
         then(data=>{
             if(data.status == 200) {
                progressBar.textContent = `${data.msg}...`;  
                progressBar.style.color = 'rgb(57, 224, 57)';
                e.target.parentElement.parentElement.parentElement.remove();
            }else{
                progressBar.textContent = `${data.err}...`;  
                progressBar.style.color = 'rgb(255, 82, 82)';
            }
         }).
         catch(error=>{
            progressBar.textContent = `${error.err}, Try Again...`;
            progressBar.style.color = 'rgb(255, 82, 82)';
         });
         setTimeout(showTodo, 400);
        }
    });
}

// Update Todo.
function updateTodo() {
    parentDiv.addEventListener('click',(e) => {
        if(e.target.parentElement.classList.contains('update')) {
            updateId.value = e.target.parentElement.id;
            modal.style.display = 'block';
            modalForm.addEventListener('submit',(e) => {
                e.preventDefault();
                let todoInput = updateInputField.value;
                let url = `/api/todo/${updateId.value}`;
                let request = new Request(url , {
                method : 'PUT',
                headers : new Headers({'content-type' : 'application/json'}),
                body : JSON.stringify({todo : todoInput})
               });
               fetch(request).
               then(response => {
                switch(response.status){
                    case 200 : 
                        return response.json();
                    case 404 :
                        return response.json();
                     case 500 :
                        return response.json().then(err=> {throw err});
                }
               }).
               then(data=>{
                    if(data.status == 200) {
                        updateInputField.value = '';
                        progressBar.textContent = `${data.msg}...`;  
                        progressBar.style.color = 'rgb(57, 224, 57)';
                        modal.style.display = 'none';
                    }else{
                        updateInputField.value = '';
                        progressBar.textContent = `${data.err}...`;  
                        progressBar.style.color = 'rgb(255, 82, 82)';
                    }                  
               }).
               catch(error=>{
                    updateInputField.value = '';
                    progressBar.textContent = `${error.err}, Try Again...`;
                    progressBar.style.color = 'rgb(255, 82, 82)';
               });
               setTimeout(showTodo, 400);
            });
        }
    });
    closeModal.addEventListener('click',() => {
        modal.style.display = 'none';
    });
}