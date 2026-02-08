let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const counter = document.getElementById("counter");
const dateTime = document.getElementById("dateTime");

function updateDateTime() {
  const now = new Date();
  const day = now.toLocaleDateString("en-IN", { weekday: "long" });
  const time = now.toLocaleTimeString();
  dateTime.innerText = `${day}, ${time}`;

  const hour = now.getHours();
  if (hour >= 18 || hour < 6) {
    document.body.classList.add("night");
  } else {
    document.body.classList.remove("night");
  }
}

setInterval(updateDateTime, 1000);
updateDateTime();

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  if (taskInput.value.trim() === "") {
    alert("Please enter a task");
    return;
  }

  tasks.push({
    text: taskInput.value,
    completed: false
  });

  taskInput.value = "";
  saveTasks();
  displayTasks();
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  displayTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  displayTasks();
}

function editTask(index) {
  const updatedText = prompt("Edit task:", tasks[index].text);
  if (updatedText !== null && updatedText.trim() !== "") {
    tasks[index].text = updatedText;
    saveTasks();
    displayTasks();
  }
}

function filterTasks(type) {
  currentFilter = type;
  displayTasks();
}

function displayTasks() {
  taskList.innerHTML = "";

  const filteredTasks = tasks.filter(task => {
    if (currentFilter === "completed") return task.completed;
    if (currentFilter === "pending") return !task.completed;
    return true;
  });

  filteredTasks.forEach((task, index) => {
    const li = document.createElement("li");
    if (task.completed) li.classList.add("completed");

    const textSpan = document.createElement("span");
    textSpan.innerText = task.text;
    textSpan.onclick = () => toggleTask(index);

    const actionBox = document.createElement("div");

    const editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.onclick = () => editTask(index);

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "X";
    deleteBtn.onclick = () => deleteTask(index);

    actionBox.appendChild(editBtn);
    actionBox.appendChild(deleteBtn);

    li.appendChild(textSpan);
    li.appendChild(actionBox);
    taskList.appendChild(li);
  });

  updateCounter();
}

function updateCounter() {
  const completedCount = tasks.filter(t => t.completed).length;
  counter.innerText = `Total: ${tasks.length} | Completed: ${completedCount}`;
}

displayTasks();
