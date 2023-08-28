import Utils from "./Utils.js";
import TaskForm from "./TaskForm.js";

export default function createProjectContainer() {
    let project = Utils.getActiveProject();
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
    projectName.textContent = project.getName();
    
    const tasksRemaining = Utils.getTasksRemaining();
    tasksRemaining.classList.add("tasks-remaining");

    const taskList = Utils.getTaskList();
    taskList.classList.add("task-list");

    const taskForm = (new TaskForm()).createTaskForm();

    const addTaskBtn = document.createElement("button");
    addTaskBtn.textContent = "+ new task";
    addTaskBtn.classList.add("add-task-btn");

    const projectActions = document.createElement("div");
    projectActions.classList.add("project-actions");

    const clearCompletedBtn = document.createElement("button");
    clearCompletedBtn.textContent = "Clear completed tasks";
    clearCompletedBtn.classList.add("clear-completed-btn");

    const delProjectBtn = document.createElement("button");
    delProjectBtn.textContent = "Delete Project";
    delProjectBtn.classList.add("del-project-btn");

    delProjectBtn.addEventListener("click", () => {
        Utils.deleteActiveProject();
    });

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