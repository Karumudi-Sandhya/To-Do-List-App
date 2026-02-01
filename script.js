function addTask() {
    const input = document.getElementById("taskInput");
    const taskText = input.value.trim();

    if (taskText === "") {
        alert("Please enter a task");
        return;
    }

    const li = document.createElement("li");
    li.innerHTML = `
        <span onclick="toggleTask(this)">${taskText}</span>
        <button onclick="removeTask(this)">X</button>
    `;

    document.getElementById("taskList").appendChild(li);
    input.value = "";
}

function toggleTask(task) {
    task.classList.toggle("completed");
}

function removeTask(btn) {
    btn.parentElement.remove();
}

}
