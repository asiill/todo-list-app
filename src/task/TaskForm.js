import Task from "./Task.js";
import ListStorage from "../ListStorage.js";
import createProjectContainer from "../project/projectContainer.js";
import Utils from "../Utils.js";

export default class TaskForm {
    constructor() {
        this.taskForm = document.createElement("form");
    }

    resetTaskForm() {
        this.taskForm.style.display = "none";
        this.taskForm.reset();
        this.taskForm.children[3].textContent = "";
    }

    addTaskToProject() {
        let title = this.taskForm.title.value;
        let description = this.taskForm.description.value;
        let dueDate = this.taskForm.dueDate.value;

        if (!Utils.validateDueDate(dueDate)) {
            this.taskForm.children[3].textContent = "* This date has already passed";
            return;
        } else {
            let task = new Task(title, description, dueDate);
            let projectName = document.querySelector(".project-name").textContent;
    
            ListStorage.addTask(projectName, task);
            createProjectContainer();
        }
        this.resetTaskForm();
    }

    createTaskForm() {
        this.taskForm.setAttribute("id", "task-form");
        this.taskForm.setAttribute("action", "''");
        this.taskForm.setAttribute("method", "get");

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

        const dateError = document.createElement("p");
        dateError.setAttribute("id", "date-error");

        const submitTask = document.createElement("button");
        submitTask.setAttribute("type", "submit");
        submitTask.textContent = "Submit";

        this.taskForm.appendChild(title);
        this.taskForm.appendChild(description);
        this.taskForm.appendChild(dueDate);
        this.taskForm.appendChild(dateError);
        this.taskForm.appendChild(submitTask);
        this.taskForm.style.display = "none";
        this.taskForm.addEventListener("submit", (e) => {
            e.preventDefault();
            this.addTaskToProject();
        });
        return this.taskForm;
    }
}