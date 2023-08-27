import ListStorage from "./ListStorage";
import ProjectContainer from "./ProjectContainer";

export default class TaskContainer {
    
    constructor() {
        this.taskTitle = document.querySelector(".active-task").textContent;
        this.projectName = document.querySelector(".active-project").textContent;
        this.task = ListStorage.getList().getProject(this.projectName).getTask(this.taskTitle);
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

        const taskActions = document.createElement("div");
        taskActions.classList.add("task-actions");

        const taskCompleteBtn = document.createElement("button");
        taskCompleteBtn.classList.add("task-complete-btn");
        
        if (this.task.getComplete() === true) {
            taskCompleteBtn.textContent = "Mark as incomplete";
        } else {
            taskCompleteBtn.textContent = "Mark as complete";
        }

        taskCompleteBtn.addEventListener("click", () => {
            let activeTask = document.querySelector(".active-task");
            if (activeTask.classList.contains("task-incomplete")) {
                activeTask.classList.remove("task-incomplete");
                activeTask.classList.add("task-complete");
                taskCompleteBtn.textContent = "Mark as incomplete";
                ListStorage.setTaskComplete(this.projectName, this.taskTitle, true);
            } else {
                activeTask.classList.remove("task-complete");
                activeTask.classList.add("task-incomplete");
                taskCompleteBtn.textContent = "Mark as complete";
                ListStorage.setTaskComplete(this.projectName, this.taskTitle, false);
            }
        });
    
        const delTaskBtn = document.createElement("button");
        delTaskBtn.textContent = "Delete Task";
        delTaskBtn.classList.add("del-task-btn");

        delTaskBtn.addEventListener("click", () => {
            ListStorage.deleteTask(this.projectName, this.taskTitle);
            let projectContainer = new ProjectContainer();
            projectContainer.createProjectContainer();
        })

        taskActions.appendChild(taskCompleteBtn);
        taskActions.appendChild(delTaskBtn);
    
        taskContainer.appendChild(taskTitle);
        taskContainer.appendChild(taskDescription);
        taskContainer.appendChild(taskDueDate);
        taskContainer.appendChild(taskPriority);
        taskContainer.appendChild(taskActions);
    
        content.appendChild(taskContainer);
        
    }

}