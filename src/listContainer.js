import Utils from "./Utils.js";
import ProjectForm from "./ProjectForm.js";

export default function createListContainer() {
    const content = document.getElementById("content");

    let listContainer;
    if (document.body.contains(document.querySelector(".list-container"))) {
        listContainer = document.querySelector(".list-container");
        listContainer.textContent = "";
        if (document.body.contains(document.querySelector(".project-container"))) {
            let projectContainer = document.querySelector(".project-container");
            projectContainer.textContent = "";
        }
        if (document.body.contains(document.querySelector(".task-container"))) {
            let taskContainer = document.querySelector(".task-container");
            taskContainer.textContent = "";
        }
    } else {
        listContainer = document.createElement("div");
        listContainer.classList.add("list-container");
    }

    const listHeader = document.createElement("h1");
    listHeader.classList.add("list-header");
    listHeader.textContent = "Projects";

    const projectList = Utils.getProjectList();
    projectList.classList.add("project-list");

    const projectForm = (new ProjectForm()).createProjectForm();

    const addProjectBtn = document.createElement("button");
    addProjectBtn.classList.add("add-project-btn");
    addProjectBtn.textContent = "+ new project";
    addProjectBtn.addEventListener("click", () => {
        projectForm.style.display = "block";
    });

    listContainer.appendChild(listHeader);
    listContainer.appendChild(projectList);
    listContainer.appendChild(addProjectBtn);
    listContainer.appendChild(projectForm);

    content.appendChild(listContainer);
}