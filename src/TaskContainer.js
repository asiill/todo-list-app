export default class TaskContainer {
    
    constructor(task) {
        this.task = task;
    }

    createTaskContainer() {

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
        taskTitle.textContent = this.task.getTitle();
    
        const taskDescription = document.createElement("p");
        taskDescription.classList.add("task-description");
        taskDescription.textContent = this.task.getDescription();
    
        const taskDueDate = document.createElement("p");
        taskDueDate.classList.add("task-due-date");
        taskDueDate.textContent = this.task.getDueDate();
    
        const taskPriority = document.createElement("p");
        taskPriority.classList.add("task-priority");
        taskPriority.textContent = this.task.getPriority();
    
        const delTaskBtn = document.createElement("button");
        delTaskBtn.textContent = "Delete Task";
        delTaskBtn.classList.add("del-task-btn");
    
        taskContainer.appendChild(taskTitle);
        taskContainer.appendChild(taskDescription);
        taskContainer.appendChild(taskDueDate);
        taskContainer.appendChild(taskPriority);
        taskContainer.appendChild(delTaskBtn);
    
        content.appendChild(taskContainer);
        
    }

}