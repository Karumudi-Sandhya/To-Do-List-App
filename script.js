const addBtn = document.getElementById("addBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

addBtn.addEventListener("click", addTask);

function addTask() {
    if (taskInput.value === "") {
        alert("Please enter a task");
        return;
    }

    let li = document.createElement("li");
    let span = document.createElement("span");
    let delBtn = document.createElement("button");

    span.textContent = taskInput.value;
    delBtn.textContent = "Delete";

    span.addEventListener("click", () => {
        span.classList.toggle("completed");
    });

    delBtn.addEventListener("click", () => {
        li.remove();
    });

    li.appendChild(span);
    li.appendChild(delBtn);
    taskList.appendChild(li);

    taskInput.value = "";
}