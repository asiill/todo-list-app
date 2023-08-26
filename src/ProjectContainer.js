import TaskForm from "./TaskForm.js";
import TaskContainer from "./TaskContainer.js";

export default class ProjectContainer {

    constructor(project) {
        this.project = project;
    }

    createProjectContainer() {

        const content = document.getElementById("content");

        let projectContainer;

        if (document.body.contains(document.querySelector(".project-container"))) {
            projectContainer = document.querySelector(".project-container");
            projectContainer.textContent = "";
            if (document.body.contains(document.querySelector(".task-container"))) {
                let taskContainer = document.querySelector(".task-container");
                taskContainer.textContent = "";
            }
        } else {
            projectContainer = document.createElement("div");
            projectContainer.classList.add("project-container");
        }
    
        const projectHeader = document.createElement("div");
        projectHeader.classList.add("project-header");
    
        const projectName = document.createElement("h1");
        projectName.classList.add("project-name");
        projectName.textContent = this.project.getName();
    
        const tasksRemaining = document.createElement("p");
        tasksRemaining.classList.add("tasks-remaining");

        const taskList = this.showTasks();
        taskList.classList.add("task-list");

        const taskForm = (new TaskForm(this.project)).createTaskForm();

        const addTaskBtn = document.createElement("button");
        addTaskBtn.textContent = "Add task";
        addTaskBtn.classList.add("add-task-btn");

        const projectActions = document.createElement("div");
        projectActions.classList.add("project-actions");

        const clearCompletedBtn = document.createElement("button");
        clearCompletedBtn.textContent = "Clear completed tasks";
        clearCompletedBtn.classList.add("clear-completed-btn");

        const delProjectBtn = document.createElement("button");
        delProjectBtn.textContent = "Delete Project";
        delProjectBtn.classList.add("del-project-btn");

        addTaskBtn.addEventListener("click", () => {
            taskForm.style.display = "block";
        });

        projectHeader.appendChild(projectName);
        projectHeader.appendChild(tasksRemaining);

        projectActions.appendChild(clearCompletedBtn);
        projectActions.appendChild(delProjectBtn);

        projectContainer.appendChild(projectHeader);
        projectContainer.appendChild(taskList);
        projectContainer.appendChild(taskForm);
        projectContainer.appendChild(addTaskBtn);
        projectContainer.appendChild(projectActions);

        content.appendChild(projectContainer);
    }

    showTasks() {
        let tasks = this.project.getTasks();

        const taskList = document.createElement("div");
        for (let i = 0; i < tasks.length; i++) {
            let task = tasks[i];

            const el = document.createElement("button");
            el.textContent = task.getTitle();
            el.addEventListener ("click", () => {
                let taskContainer = (new TaskContainer(task)).createTaskContainer();
            })
            taskList.appendChild(el);
        }
        return taskList;
    }
    
}