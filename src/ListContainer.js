import ProjectForm from "./ProjectForm.js";
import ProjectContainer from "./ProjectContainer.js";
import ListStorage from "./ListStorage.js";

export default class ListContainer {

    constructor() {
        this.list = ListStorage.getList();
    }

    createListContainer() {

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

        const projectList = this.showProjects();
        projectList.classList.add("project-list");

        const projectForm = (new ProjectForm()).createProjectForm();

        const addProjectBtn = document.createElement("button");
        addProjectBtn.textContent = "Add project";
        addProjectBtn.classList.add("add-project-btn");

        addProjectBtn.addEventListener("click", () => {
            projectForm.style.display = "block";
        });

        listContainer.appendChild(listHeader);
        listContainer.appendChild(projectList);
        listContainer.appendChild(projectForm);
        listContainer.appendChild(addProjectBtn);

        content.appendChild(listContainer);

    }

    showProjects() {
        let projects = this.list.getProjects();

        const projectList = document.createElement("div");
        for (let i = 0; i < projects.length; i++) {
            let project = projects[i];

            const el = document.createElement("button");
            el.textContent = project.getName();
            el.addEventListener("click", () => {

                if (document.body.contains(document.querySelector(".active-project"))) {
                    let activeProject = document.querySelector(".active-project");
                    activeProject.classList.remove("active-project");
                }

                el.classList.add("active-project");
                let projectContainer = new ProjectContainer();
                projectContainer.createProjectContainer();
            });
            projectList.appendChild(el);
        }
        return projectList;
    }

}