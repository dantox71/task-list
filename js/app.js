/*DOM Variables */
const taskForm = document.querySelector(".task-form");
const taskInput = document.querySelector("#task");
const addBtn = document.querySelector(".add");
const taskList = document.querySelector(".task-list");
const clearButton = document.querySelector(".clear-tasks");
const filterInput = document.querySelector("#filter");
//Add event listeners to DOM elements.
function addEventListeners() {
  taskForm.addEventListener("submit", addTask);
  taskList.addEventListener("click", deleteTask);
  clearButton.addEventListener("click", clearTasks);
  filterInput.addEventListener("keyup", filterTasks);
}

addEventListeners();

//Add task
function addTask(e) {
  let taskValue = taskInput.value;

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

    //Clear input
    taskInput.value = "";

    //Prevent form from submitting
    e.preventDefault();
  }
}

//Delete Task
function deleteTask(e) {
  if (e.target.classList.contains("fa")) {
    if (confirm("Are  you sure?")) {
      e.target.parentElement.parentElement.remove();
    }
  }
}

function clearTasks() {
  if (confirm("Are you sure?")) {
    while (taskList.firstChild) {
      taskList.firstChild.remove();
    }
    // taskList.innerHTML = "";
  }
}

function filterTasks() {
  let text = filterInput.value;
  const tasks = document.querySelectorAll("li");
  console.log(text);

  tasks.forEach(function(task) {
    if (task.textContent.indexOf(text) > -1) {
      task.style.display = "flex";
    } else {
      task.style.display = "none";
    }
  });
}
