/*DOM Variables */
const taskForm = document.querySelector(".task-form");
const taskInput = document.querySelector("#task");
const addBtn = document.querySelector(".add");
const taskList = document.querySelector(".task-list");
const clearButton = document.querySelector(".clear-tasks");
const filterInput = document.querySelector("#filter");
//Add event listeners to DOM elements.
function addEventListeners() {
  window.addEventListener("DOMContentLoaded", loadFromLocalStorage);
  taskForm.addEventListener("submit", addTask);
  taskList.addEventListener("click", deleteTask);
  clearButton.addEventListener("click", clearTasks);
  filterInput.addEventListener("keyup", filterTasks);
}
addEventListeners();

function loadFromLocalStorage() {
  tasks = localStorage.getItem("tasks");
  tasks = JSON.parse(tasks);
  if (tasks !== null) {
    tasks.forEach(function(task) {
      li = document.createElement("li");
      li.classList.add("task-item");
      //Append value given by user to li
      li.appendChild(document.createTextNode(task));
      //Create link
      const link = document.createElement("a");
      link.classList.add("delete-item");
      link.innerHTML = '<i class="fa fa-remove fa-2x"></i>';
      li.appendChild(link);
      taskList.appendChild(li);
    });
  }
}

//Add task
function addTask(e) {
  let taskValue = taskInput.value;
  //Make input lowercase
  taskValue = taskValue.toLowerCase();

  //Check if entered value isn't empty
  if (taskValue == "") {
    alert("Enter task!");
  } else {
    //Create li
    const li = document.createElement("li");
    li.classList.add("task-item");
    //Append value given by user to li
    li.appendChild(document.createTextNode(taskValue));

    //Create link
    const link = document.createElement("a");
    link.classList.add("delete-item");
    link.innerHTML = '<i class="fa fa-remove fa-2x"></i>';
    li.appendChild(link);
    taskList.appendChild(li);

    saveToLocalStorage(taskValue);

    //Clear input
    taskInput.value = "";

    //Prevent form from submitting
    e.preventDefault();
  }
}

//Save tasks to localStorage
function saveToLocalStorage(task) {
  tasks = localStorage.getItem("tasks");

  if (tasks === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(tasks);
  }
  tasks.push(task);
  tasks = JSON.stringify(tasks);

  localStorage.setItem("tasks", tasks);
}

//Delete Task
function deleteTask(e) {
  if (e.target.classList.contains("fa")) {
    if (confirm("Are  you sure?")) {
      e.target.parentElement.parentElement.remove();
    }

    deleteFromLocalStorage(e.target.parentElement.parentElement.textContent);
  }
}

//Delete task from local storage
function deleteFromLocalStorage(taskValue) {
  tasks = localStorage.getItem("tasks");

  tasks = JSON.parse(tasks);

  tasks.forEach(function(task) {
    if (task == taskValue) {
      let index = tasks.indexOf(task);
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function clearTasks() {
  if (confirm("Are you sure?")) {
    while (taskList.firstChild) {
      taskList.firstChild.remove();
      localStorage.clear();
    }
  }
}

function filterTasks() {
  let text = filterInput.value.toLowerCase();
  const tasks = document.querySelectorAll("li");

  tasks.forEach(function(task) {
    if (task.textContent.indexOf(text) > -1) {
      task.style.display = "flex";
    } else {
      task.style.display = "none";
    }
  });
}
