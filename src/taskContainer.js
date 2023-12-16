import Utils from "./Utils.js";

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
    
    const taskPriority = document.createElement("p");
    taskPriority.classList.add("task-priority");
    taskPriority.textContent = task.getPriority();

    const taskActions = document.createElement("div");
    taskActions.classList.add("task-actions");

    const taskCompleteBtn = document.createElement("button");
    taskCompleteBtn.classList.add("task-complete-btn");
    if (task.getIsComplete()) {
        taskTitle.classList.add("task-complete");
        taskCompleteBtn.textContent = "Mark as incomplete";
    } else {
        taskCompleteBtn.textContent = "Mark as complete";
        taskTitle.classList.add("task-incomplete");
    }

    const editTaskBtn = document.createElement("button");
    editTaskBtn.textContent = "Edit task";
    editTaskBtn.classList.add("edit-task-btn");
    const saveEditBtn = document.createElement("button");
    saveEditBtn.textContent = "Save edit";
    saveEditBtn.classList.add("save-edit-btn");

    const delTaskBtn = document.createElement("button");
    delTaskBtn.textContent = "Delete task";
    delTaskBtn.classList.add("del-task-btn");

    taskCompleteBtn.addEventListener("click", () => {
        if (Utils.isTaskComplete()) {
            taskCompleteBtn.textContent = "Mark as incomplete";
        } else {
            taskCompleteBtn.textContent = "Mark as complete";
        }
    });

    editTaskBtn.addEventListener("click", () => {
        editTaskBtn.style.display = "none";
        delTaskBtn.style.display = "none";
        taskCompleteBtn.style.display = "none";
        taskTitle.contentEditable = true;
        taskDescription.contentEditable = true;
        taskDueDate.contentEditable = true;
        taskPriority.contentEditable = true;
        taskTitle.focus();
        taskActions.appendChild(saveEditBtn);
    });

    saveEditBtn.addEventListener("click", () => {
        console.log(task.getTitle());
        Utils.editActiveTask(task.getTitle(), taskTitle.textContent, taskDescription.textContent, taskDueDate.textContent, taskPriority.textContent)
    });

    delTaskBtn.addEventListener("click", () => {
        Utils.deleteActiveTask();
    });

    taskActions.appendChild(taskCompleteBtn);
    taskActions.appendChild(editTaskBtn);
    taskActions.appendChild(delTaskBtn);

    taskContainer.appendChild(taskTitle);
    taskContainer.appendChild(taskDescription);
    taskContainer.appendChild(taskDueDate);
    taskContainer.appendChild(taskPriority);
    taskContainer.appendChild(taskActions);

    content.appendChild(taskContainer);
}