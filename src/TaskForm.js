import Task from "./Task.js";
import ProjectContainer from "./ProjectContainer.js";
import ListStorage from "./ListStorage.js";

export default class TaskForm {

    constructor() {
        this.taskForm = document.createElement("form");
    }

    resetTaskForm() {
        this.taskForm.style.display = "none";
        this.taskForm.reset();
    }

    addTaskToProject() {
        let title = this.taskForm.title.value;
        let description = this.taskForm.description.value;
        let dueDate = this.taskForm.dueDate.value;
        let priority = this.taskForm.priority.value;
        let task = new Task(title, description, dueDate, priority);

        let projectName = document.querySelector(".project-name").textContent;
        ListStorage.addTask(projectName, task);
        let projectContainer = new ProjectContainer();
        projectContainer.createProjectContainer();

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

        const description = document.createElement("input");
        description.setAttribute("type", "text");
        description.setAttribute("name", "description");
        description.setAttribute("id", "description");
        description.setAttribute("placeholder", "description");

        const dueDate = document.createElement("input");
        dueDate.setAttribute("type", "text");
        dueDate.setAttribute("name", "dueDate");
        dueDate.setAttribute("id", "dueDate");
        dueDate.setAttribute("placeholder", "due date");

        const priority = document.createElement("input");
        priority.setAttribute("type", "text");
        priority.setAttribute("name", "priority");
        priority.setAttribute("id", "priority");
        priority.setAttribute("placeholder", "priority");

        const submitTask = document.createElement("button");
        submitTask.setAttribute("type", "submit");
        submitTask.textContent = "Submit";

        this.taskForm.appendChild(title);
        this.taskForm.appendChild(description);
        this.taskForm.appendChild(dueDate);
        this.taskForm.appendChild(priority);
        this.taskForm.appendChild(submitTask);

        this.taskForm.style.display = "none";

        this.taskForm.addEventListener("submit", (e) => {
            e.preventDefault();
            this.addTaskToProject();
        });

        return this.taskForm;

    }
    
}