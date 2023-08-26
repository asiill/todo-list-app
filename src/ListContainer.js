import ProjectForm from "./ProjectForm.js";
import ProjectContainer from "./ProjectContainer.js";

export default class ListContainer {

    constructor(list) {
        this.list = list;
    }

    createListContainer() {

        const content = document.getElementById("content");

        const listContainer = document.createElement("div");
        listContainer.classList.add("list-container");

        const listHeader = document.createElement("h1");
        listHeader.classList.add("list-header");
        listHeader.textContent = "Projects";

        const projectList = this.showProjects();
        projectList.classList.add("project-list");

        const projectForm = (new ProjectForm(this.list)).createProjectForm();

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
                let projectContainer = (new ProjectContainer(project)).createProjectContainer();
                el.classList.add("active");
            });
            projectList.appendChild(el);
        }
        return projectList;
    }

}