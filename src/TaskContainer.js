import ProjectContainer from "./ProjectContainer";
import ListStorage from "./ListStorage";

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
            if (this.checkTaskComplete()) {
                taskCompleteBtn.textContent = "Mark as incomplete";
            } else {
                taskCompleteBtn.textContent = "Mark as complete";
            }
        });
    
        const delTaskBtn = document.createElement("button");
        delTaskBtn.textContent = "Delete Task";
        delTaskBtn.classList.add("del-task-btn");

        delTaskBtn.addEventListener("click", () => {
            this.deleteActiveTask();
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

    updateTasksRemaining() {
        let project = ListStorage.getList().getProject(this.projectName);
        let tasks = project.getTasks();
        let taskCount = tasks.length;
        let incompleteTaskCount = tasks.filter(task => !task.getComplete()).length;

        let tasksRemaining = document.querySelector(".tasks-remaining");
        if (taskCount === 0) {
            tasksRemaining.textContent = "No tasks assigned";
        } else {
            if (incompleteTaskCount === 0) {
                tasksRemaining.textContent = "All tasks are complete!";
            } else if (incompleteTaskCount === 1) {
                tasksRemaining.textContent = incompleteTaskCount + " task remaining";
            } else {
                tasksRemaining.textContent = incompleteTaskCount + " tasks remaining";
            }
        }
    }

    checkTaskComplete() {
        let complete;
        let activeTask = document.querySelector(".active-task");
        if (activeTask.classList.contains("task-incomplete")) {
            activeTask.classList.remove("task-incomplete");
            activeTask.classList.add("task-complete");
            ListStorage.setTaskComplete(this.projectName, this.taskTitle, true);
            this.updateTasksRemaining();
            complete = true;
        } else {
            activeTask.classList.remove("task-complete");
            activeTask.classList.add("task-incomplete");
            ListStorage.setTaskComplete(this.projectName, this.taskTitle, false);
            this.updateTasksRemaining();
            complete = false;
        }
        return complete;
    }

    deleteActiveTask() {
        ListStorage.deleteTask(this.projectName, this.taskTitle);
        let projectContainer = new ProjectContainer();
        projectContainer.createProjectContainer();
    }

}