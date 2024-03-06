//Select DOM = Document Object Model 
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");
const todoEdit = document.querySelector(".todo")

//Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteTodo);
filterOption.addEventListener("click", filterTodo);
todoEdit.addEventListener("click", todoEdit)
//Functions
function addTodo(e) 
{
  //Prevent natural behaviour
  e.preventDefault();
  // Check if work cell is empty
  if (todoInput.value.trim() === "") {
    return; // Not add new todo
  }
  //Create todo div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  //Create list
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  //Save to local
  saveLocalTodos(todoInput.value);
  //Setup add todo
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  todoInput.value = "";
  //Create Edit Button
  const editButton = document.createElement("button");
  editButton.innerHTML = `<i class="fas fa-edit"></i>`;
  editButton.classList.add("edit-btn");
  todoDiv.appendChild(editButton);
  //Create Completed Button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = `<i class="fas fa-check"></i>`;
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);
  //Create trash button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);
  //attach final Todo
  todoList.appendChild(todoDiv);
}

function deleteTodo(e) 
{
  const item = e.target;

  if (item.classList[0] === "trash-btn") 
  {
    // e.target.parentElement.remove();
    const todo = item.parentElement;
    todo.classList.add("fall");
    //at the end
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", e => 
    {
      todo.remove();
    });
  }
  if (item.classList[0] === "complete-btn") 
  {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
    console.log(todo);
  }
  
  if (item.classList.contains("edit-btn")) {
    const todo = item.parentElement;
    const todoText = todo.querySelector(".todo-item").innerText;
    const newTodoText = prompt("Edit the todo:", todoText);
    if (newTodoText !== null && newTodoText.trim() !== "") {
      todo.querySelector(".todo-item").innerText = newTodoText.trim();
      updateLocalTodos(todoText, newTodoText.trim());
    }
  }
}

function filterTodo(e) 
{
  const todos = todoList.childNodes;
  todos.forEach(function(todo) 
  {
    switch (e.target.value) 
    {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) 
        {
          todo.style.display = "flex";
        } else 
        {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) 
        {
          todo.style.display = "flex";
        } else 
        {
          todo.style.display = "none";
        }
    }
  });
}

function saveLocalTodos(todo) 
{
  let todos;
  if (localStorage.getItem("todos") === null) 
  {
    todos = [];
  } 
  else 
  {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}
function removeLocalTodos(todo) 
{
  let todos;
  if (localStorage.getItem("todos") === null) 
  {
    todos = [];
  } 
  else 
  {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
function updateLocalTodos(oldTodo, newTodo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todos.indexOf(oldTodo);
  if (todoIndex !== -1) {
    todos[todoIndex] = newTodo;
    localStorage.setItem("todos", JSON.stringify(todos));
  }
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function(todo) {
    //Create todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //Create list
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    todoInput.value = "";
    //Create Edit Button
    const editButton = document.createElement("button");
    editButton.innerHTML = `<i class="fas fa-edit"></i>`;
    editButton.classList.add("edit-btn");
    todoDiv.appendChild(editButton);
    //Create Completed Button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //Create trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //attach final Todo
    todoList.appendChild(todoDiv);
  });
}