const taskCounter = document.querySelector("#task-counter");
let tasksLeft = 0;
const tasks = [];

function updateTaskCounter() {
    taskCounter.textContent = "Tasks Left: " + tasksLeft;
}

const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const errorMessage = document.querySelector("#errorMessage");
const todoList = document.querySelector("#todo-list");

function saveTasks(taskList) {
    localStorage.setItem("todoTasks", JSON.stringify(taskList));
}

function getSavedTasks() {
    const data = localStorage.getItem("todoTasks");
    return data ? JSON.parse(data) : [];
}

function createTask(taskText, isCompleted) {
    const task = {
        text: taskText,
        completed: isCompleted
    };
    const listItem = document.createElement("li");

    if (task.completed === true) {
        listItem.classList.add("completed");
    }

    const completeButton = document.createElement("button");
    completeButton.classList.add("complete-button");

    completeButton.addEventListener("click", function() {
        task.completed = !task.completed;
        listItem.classList.toggle("completed");

        if (task.completed === true) {
            tasksLeft = tasksLeft - 1;
        } else {
            tasksLeft = tasksLeft + 1;
        }

        updateTaskCounter();
        saveTasks(tasks);
    });

    const taskTextElement = document.createElement("span");
    taskTextElement.textContent = task.text;

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.textContent = "X";

    deleteButton.addEventListener("click", function() {
        if (task.completed === false) {
            tasksLeft = tasksLeft - 1;
        }

        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i] === task) {
                tasks.splice(i, 1);
                break;
            }
        }

        todoList.removeChild(listItem);
        updateTaskCounter();
        saveTasks(tasks);
    });

    listItem.appendChild(completeButton);
    listItem.appendChild(taskTextElement);
    listItem.appendChild(deleteButton);
    todoList.appendChild(listItem);
    tasks.push(task);

    if (task.completed === false) {
        tasksLeft = tasksLeft + 1;
    }
}

function loadTasks() {
    const savedTasks = getSavedTasks();

    for (let i = 0; i < savedTasks.length; i++) {
        createTask(savedTasks[i].text, savedTasks[i].completed);
    }

    updateTaskCounter();
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const todoText = todoInput.value.trim();

    todoInput.classList.remove("invalid");
    errorMessage.textContent = "";

    if (todoText.length < 3) {
        errorMessage.textContent = "Please enter a task with at least 3 characters.";
        todoInput.classList.add("invalid");
        return;
    }

    createTask(todoText, false);
    updateTaskCounter();

    saveTasks(tasks);

    form.reset();
});

const allButton = document.querySelector("#all-button");
const activeButton = document.querySelector("#active-button");
const doneButton = document.querySelector("#done-button");

function setSelectedFilter(selectedButton) {
    const filterButtons = [allButton, activeButton, doneButton];

    for (let i = 0; i < filterButtons.length; i++) {
        filterButtons[i].classList.remove("selected");
    }

    selectedButton.classList.add("selected");
}

setSelectedFilter(allButton);

allButton.addEventListener("click", function() {
    setSelectedFilter(allButton);
    const taskItems = document.querySelectorAll("#todo-list li");

    for (let i = 0; i < tasks.length; i++) {
        taskItems[i].classList.remove("hidden");
    }
});

activeButton.addEventListener("click", function() {
    setSelectedFilter(activeButton);
    const taskItems = document.querySelectorAll("#todo-list li");

    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].completed === true) {
            taskItems[i].classList.add("hidden");
        } else {
            taskItems[i].classList.remove("hidden");
        }
    }
});

doneButton.addEventListener("click", function() {
    setSelectedFilter(doneButton);
    const taskItems = document.querySelectorAll("#todo-list li");

    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].completed === true) {
            taskItems[i].classList.remove("hidden");
        } else {
            taskItems[i].classList.add("hidden");
        }
    }
});

loadTasks();