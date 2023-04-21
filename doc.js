const inputValue = document.querySelector("#add-task")
const addButton = document.querySelector("#add-btn")
const taskList = document.querySelector("ul")
const deleteDoneButton = document.querySelector("#del-done-btn");
const deleteAllButton = document.querySelector("#del-all-btn");
const USER_ID = 296
// Create an empty array to store tasks
let arrTask = []
// Function that draws tasks
function renderTasks() {
  taskList.innerHTML = ""

  // Loop through all the objects in the arrTask array
  arrTask.forEach(task => {
    // Create a task element (task)
    const newTask = document.createElement('li');
    newTask.setAttribute('id', task.id);

    // find the element to display the text of the task
    const taskText = document.createElement("label")
    taskText.innerText = task.name
     
// find the element to display the task checkbox
    const taskCheckbox = document.createElement("input")
    taskCheckbox.setAttribute("type", "checkbox")
    taskCheckbox.setAttribute("name", "todo")
    taskCheckbox.setAttribute("id", "done")
    taskCheckbox.checked = task.checked
 // add an event listener to the checkbox to toggle the text decoration
taskCheckbox.addEventListener('change', function() {
  if (taskCheckbox.checked) {
    taskText.style.textDecoration = "line-through"
    } else {
    taskText.style.textDecoration = "";
   }
});
    

    // find the button to delete the task
    const taskDeleteButton = document.createElement("button")
    taskDeleteButton.innerText = "❌"
    taskDeleteButton.style.backgroundColor = "#FFFFFF"
    taskDeleteButton.style.marginLeft = "65px"
    // Add an event handler to the task delete button
    taskDeleteButton.addEventListener('click', function() {
      deleteTask(task.id);
    });

    newTask.appendChild(taskCheckbox)
    newTask.appendChild(taskText)
    newTask.appendChild(taskDeleteButton)
    taskList.appendChild(newTask)
  })
  
}

addButton.addEventListener('click', addTask);

function addTask(event) {
  event.preventDefault();
  const newTaskText = inputValue.value.trim();
  if (!newTaskText) return;

  const newTask = {
    "id": null,
    checked: false,
    "name": newTaskText,
    "isDone": 0,
    "user_id": USER_ID
  };

   // Send a POST request to add the new task to the server
  fetch("http://24api.ru/rest-todo", {
    method: "POST",
    headers: {
      "Content-Type" : "application/json"
    },
    body : JSON.stringify(newTask)
  })
  .then(response => response.json())
    .then(data => {
      console.log(data)
      console.log(data.id)
  arrTask.push(data);
  inputValue.value = '';
renderTasks();
  })
  .catch(error => console.error(error));
}


// Function to delete a task from the arrTask array
function deleteTask(id) {
  fetch(`http://24api.ru/rest-todo/${id}`, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json'
    }
  })
.then(response => {
    if (response.ok) {
      // If the deletion is successful, remove the task from the local array and render all tasks
      arrTask = arrTask.filter(task => task.id !== id);
      console.log(arrTask)
      renderTasks();
    } 
  })
  .catch(error => console.error(error));
}
// Function to delete all completed tasks
function deleteCompletedTasks() {
  arrTask = arrTask.filter(task => !task.checked);
  renderTasks();
}
// Function to delete all tasks
function deleteAllTasks() {
arrTask = [];
renderTasks();
}
