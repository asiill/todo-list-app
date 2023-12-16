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
            content.removeChild(taskContainer);
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

    const editProjectBtn = document.createElement("button");
    editProjectBtn.textContent = "Edit project";
    editProjectBtn.classList.add("edit-project-btn");
    const saveEditBtn = document.createElement("button");
    saveEditBtn.textContent = "Save edit";
    saveEditBtn.classList.add("save-edit-btn");

    const delProjectBtn = document.createElement("button");
    delProjectBtn.textContent = "Delete Project";
    delProjectBtn.classList.add("del-project-btn");

    const clearCompletedBtn = document.createElement("button");
    clearCompletedBtn.textContent = "Clear completed tasks";
    clearCompletedBtn.classList.add("clear-completed-btn");

    addTaskBtn.addEventListener("click", () => {
        taskForm.style.display = "block";
    });

    editProjectBtn.addEventListener("click", () => {
        editProjectBtn.style.display = "none";
        delProjectBtn.style.display = "none";
        clearCompletedBtn.style.display = "none";
        addTaskBtn.style.display = "none";
        projectName.contentEditable = true;
        projectName.focus();
        projectActions.appendChild(saveEditBtn);
    });

    saveEditBtn.addEventListener("click", () => {
        projectName.contentEditable = false;
        Utils.editActiveProject(project.getName(), projectName.textContent);
    });

    delProjectBtn.addEventListener("click", () => {
        Utils.deleteActiveProject();
    });

    clearCompletedBtn.addEventListener("click", () => {
        Utils.clearCompletedTasks();
    });

    projectHeader.appendChild(projectName);
    projectHeader.appendChild(tasksRemaining);

    projectActions.appendChild(editProjectBtn);
    projectActions.appendChild(delProjectBtn);
    projectActions.appendChild(clearCompletedBtn);

    projectContainer.appendChild(projectHeader);
    projectContainer.appendChild(taskList);
    projectContainer.appendChild(addTaskBtn);
    projectContainer.appendChild(projectActions);
    projectContainer.appendChild(taskForm);

    content.appendChild(projectContainer);
}