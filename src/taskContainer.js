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
        taskCompleteBtn.textContent = "Mark as incomplete";
    } else {
        taskCompleteBtn.textContent = "Mark as complete";
    }

    taskCompleteBtn.addEventListener("click", () => {
        if (Utils.isTaskComplete()) {
            taskCompleteBtn.textContent = "Mark as incomplete";
        } else {
            taskCompleteBtn.textContent = "Mark as complete";
        }
    });

    const delTaskBtn = document.createElement("button");
    delTaskBtn.textContent = "Delete Task";
    delTaskBtn.classList.add("del-task-btn");
    delTaskBtn.addEventListener("click", () => {
        Utils.deleteActiveTask();
    });

    taskActions.appendChild(taskCompleteBtn);
    taskActions.appendChild(delTaskBtn);

    taskContainer.appendChild(taskTitle);
    taskContainer.appendChild(taskDescription);
    taskContainer.appendChild(taskDueDate);
    taskContainer.appendChild(taskPriority);
    taskContainer.appendChild(taskActions);

    content.appendChild(taskContainer);
}