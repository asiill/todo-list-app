import Utils from "../Utils.js";

export default function createTaskContainer() {
    let task = Utils.getActiveTask();
    const content = document.getElementById("content");

    let taskContainer;
    if (document.body.contains(document.querySelector(".task-container"))) {
        taskContainer = document.querySelector(".task-container");
        taskContainer.textContent = "";
    } else {
        taskContainer = document.createElement("div");
        taskContainer.classList.add("task-container");
    }

    const taskTitle = document.createElement("h2");
    taskTitle.classList.add("task-title");
    taskTitle.textContent = task.getTitle();
    
    const taskDescription = document.createElement("p");
    taskDescription.classList.add("task-description");
    taskDescription.textContent = task.getDescription();
    
    const taskDueDate = document.createElement("p");
    taskDueDate.classList.add("task-due-date");
    taskDueDate.textContent = task.getDueDate();

    const taskActions = document.createElement("div");
    taskActions.classList.add("task-actions");

    const taskCompleteBox = document.createElement("input");
    taskCompleteBox.setAttribute("type", "checkbox");
    taskCompleteBox.classList.add("task-complete-box");
    if (task.getIsComplete()) {
        taskTitle.classList.add("task-complete");
        taskCompleteBox.checked = true;
    } else {
        taskCompleteBox.checked = false;
        taskTitle.classList.add("task-incomplete");
    }

    const editTaskBtn = document.createElement("button");
    editTaskBtn.classList.add("edit-task-btn");
    const editImg = document.createElement("img");
    editImg.src = "./icons/edit.svg";
    editImg.alt = "Edit task";
    editImg.title="Edit task";
    editTaskBtn.appendChild(editImg);

    const saveEditBtn = document.createElement("button");
    saveEditBtn.classList.add("save-edit-btn");
    const saveImg = document.createElement("img");
    saveImg.src = "./icons/check.svg";
    saveImg.alt = "Save changes";
    saveImg.title = "Save changes";
    saveEditBtn.appendChild(saveImg);

    const delTaskBtn = document.createElement("button");
    delTaskBtn.classList.add("del-task-btn");
    const delImg = document.createElement("img");
    delImg.src = "./icons/delete.svg";
    delImg.alt = "Delete task";
    delImg.title="Delete task";
    delTaskBtn.appendChild(delImg);

    taskCompleteBox.addEventListener("change", () => {
        if (Utils.isTaskComplete()) {
            taskCompleteBox.checked = true;
        } else {
            taskCompleteBox.checked = false;
        }
    });

    editTaskBtn.addEventListener("click", () => {
        editTaskBtn.style.display = "none";
        delTaskBtn.style.display = "none";
        taskCompleteContainer.style.display = "none";
        taskTitle.contentEditable = true;
        taskDescription.contentEditable = true;
        taskDueDate.contentEditable = true;
        taskTitle.focus();
        taskActions.appendChild(saveEditBtn);
    });

    saveEditBtn.addEventListener("click", () => {
        console.log(task.getTitle());
        Utils.editActiveTask(task.getTitle(), taskTitle.textContent, taskDescription.textContent, taskDueDate.textContent)
    });

    delTaskBtn.addEventListener("click", () => {
        Utils.deleteActiveTask();
    });

    const taskCompleteContainer = document.createElement("div");
    taskCompleteContainer.classList.add("task-complete-container");
    taskCompleteContainer.appendChild(taskCompleteBox);

    taskActions.appendChild(taskCompleteContainer);
    taskActions.appendChild(editTaskBtn);
    taskActions.appendChild(delTaskBtn);

    taskContainer.appendChild(taskTitle);
    taskContainer.appendChild(taskDescription);
    taskContainer.appendChild(taskDueDate);
    taskContainer.appendChild(taskActions);

    content.appendChild(taskContainer);
}