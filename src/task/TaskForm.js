import Task from "./Task.js";
import ListStorage from "../ListStorage.js";
import createProjectContainer from "../project/projectContainer.js";
import Utils from "../Utils.js";

export default class TaskForm {
    constructor() {
        this.taskForm = document.createElement("form");
    }

    openForm(existingTask) {
        if(existingTask) {
            this.taskForm.title.value = existingTask.getTitle();
            this.taskForm.description.value = existingTask.getDescription();
            this.taskForm.dueDate.value = existingTask.getDueDate();
        }

        this.taskForm.style.display = "block";
    }

    closeForm() {
        this.taskForm.style.display = "none";
        this.taskForm.reset();
    }

    addTaskToProject() {
        let title = this.taskForm.title.value;
        let description = this.taskForm.description.value;
        let dueDate = this.taskForm.dueDate.value;

        if (document.body.contains(document.querySelector(".active-task"))) {
            let activeTask = Utils.getActiveTask();
            let activeTitle = activeTask.getTitle();
            
            let activeProject = Utils.getActiveProject();
            let activeName = activeProject.getName();
            
            ListStorage.setTaskDescription(activeName, activeTitle, description);
            ListStorage.setTaskDueDate(activeName, activeTitle, dueDate);
            ListStorage.setTaskTitle(activeName, activeTitle, title);
        } else {
            let task = new Task(title, description, dueDate);
            let projectName = document.querySelector(".project-name").textContent;
    
            ListStorage.addTask(projectName, task);
        }

        this.closeForm();
        createProjectContainer();
    }

    createTaskForm() {
        this.taskForm.classList.add("task-form");
        this.taskForm.setAttribute("action", "''");
        this.taskForm.setAttribute("method", "get");

        const formTitle = document.createElement("h3");
        formTitle.textContent = "Task details";

        const title = document.createElement("input");
        title.setAttribute("type", "text");
        title.setAttribute("name", "title");
        title.setAttribute("id", "title");
        title.setAttribute("placeholder", "title");
        title.required = true;

        const description = document.createElement("textarea");
        description.setAttribute("name", "description");
        description.setAttribute("id", "description");
        description.setAttribute("placeholder", "description");
        description.required = true;

        const dueDate = document.createElement("input");
        dueDate.setAttribute("type", "date");
        dueDate.setAttribute("name", "dueDate");
        dueDate.setAttribute("id", "dueDate");
        dueDate.setAttribute("placeholder", "yyyy/mm/dd");
        dueDate.required = true;

        const submitTask = document.createElement("button");
        submitTask.setAttribute("type", "submit");
        submitTask.textContent = "Submit";

        const cancelBtn = document.createElement("button");
        cancelBtn.textContent = "Cancel";
        cancelBtn.addEventListener("click", (e) => {
            e.preventDefault();
            this.closeForm();
        });

        const btnContainer = document.createElement("div");
        btnContainer.classList.add("form-btn-container");

        btnContainer.appendChild(submitTask);
        btnContainer.appendChild(cancelBtn);

        this.taskForm.appendChild(formTitle);
        this.taskForm.appendChild(title);
        this.taskForm.appendChild(description);
        this.taskForm.appendChild(dueDate);
        this.taskForm.appendChild(btnContainer);
        this.taskForm.style.display = "none";
        this.taskForm.addEventListener("submit", (e) => {
            e.preventDefault();
            this.addTaskToProject();
        });
        return this.taskForm;
    }
}