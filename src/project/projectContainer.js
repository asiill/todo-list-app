import Utils from "../Utils.js";
import ProjectForm from "./ProjectForm.js";
import TaskForm from "../task/TaskForm.js";

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

    const projectForm = new ProjectForm();
    const taskForm = (new TaskForm()).createTaskForm();

    const addTaskBtn = document.createElement("button");
    addTaskBtn.classList.add("add-task-btn");
    const addText = document.createElement("span");
    addText.textContent = "Add task";
    const addImg = document.createElement("img");
    addImg.src = "./icons/add.svg";
    addImg.alt="plus sign";
    addTaskBtn.appendChild(addImg);
    addTaskBtn.appendChild(addText);

    const projectActions = document.createElement("div");
    projectActions.classList.add("project-actions");

    const editProjectBtn = document.createElement("button");
    editProjectBtn.classList.add("edit-project-btn");
    const editImg = document.createElement("img");
    editImg.src = "./icons/edit.svg";
    editImg.alt = "Edit project";
    editImg.title="Edit project";
    editProjectBtn.appendChild(editImg);

    const saveEditBtn = document.createElement("button");
    saveEditBtn.classList.add("save-edit-btn");
    const saveImg = document.createElement("img");
    saveImg.src = "./icons/check.svg";
    saveImg.alt = "Save changes";
    saveImg.title = "Save changes";
    saveEditBtn.appendChild(saveImg);

    const delProjectBtn = document.createElement("button");
    delProjectBtn.classList.add("del-project-btn");
    const delImg = document.createElement("img");
    delImg.src = "./icons/delete.svg";
    delImg.alt = "Delete project";
    delImg.title="Delete project";
    delProjectBtn.appendChild(delImg);

    const clearCompletedBtn = document.createElement("button");
    clearCompletedBtn.textContent = "Clear completed tasks";
    clearCompletedBtn.classList.add("clear-completed-btn");

    addTaskBtn.addEventListener("click", () => {
        if (document.body.contains(document.querySelector(".task-container"))) {
            let taskContainer = document.querySelector(".task-container");
            content.removeChild(taskContainer);
        }
        taskForm.style.display = "block";
    });

    editProjectBtn.addEventListener("click", () => {
        projectForm.openForm(project);
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
    projectContainer.appendChild(projectForm.createProjectForm());

    content.appendChild(projectContainer);
}