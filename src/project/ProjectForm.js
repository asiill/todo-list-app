import Utils from "../Utils.js";
import Project from "./Project.js";
import ListStorage from "../ListStorage.js";
import createListContainer from "../list/listContainer.js";

export default class ProjectForm {
    constructor() {
        this.projectForm = document.createElement("form");
    }

    openForm(existingProject) {
        if(existingProject) {
            this.projectForm.name.value = existingProject.getName();
        }

        this.projectForm.style.display = "block";
    }

    closeForm() {
        this.projectForm.style.display = "none";
        this.projectForm.reset();
    }

    addProjectToList() {
        let name = this.projectForm.name.value;
        
        let list = ListStorage.getList();
        let activeProject = Utils.getActiveProject();
        let projectExists = list.isInProjects(activeProject.getName());

        if (projectExists) {
            ListStorage.setProjectName(activeProject.getName(), name);
        } else {
            let project = new Project(name);
            ListStorage.addProject(project);
        }

        this.closeForm();
        createListContainer();
    }

    createProjectForm() {
        this.projectForm.setAttribute("id", "project-form");
        this.projectForm.setAttribute("action", "''");
        this.projectForm.setAttribute("method", "get");
        
        const name = document.createElement("input");
        name.setAttribute("type", "text");
        name.setAttribute("name", "name");
        name.setAttribute("id", "name");
        name.setAttribute("placeholder", "project name");
        name.required = true;

        const submitProjectBtn = document.createElement("button");
        submitProjectBtn.setAttribute("type", "submit");
        submitProjectBtn.textContent = "Submit";

        const cancelBtn = document.createElement("button");
        cancelBtn.textContent = "Cancel";
        cancelBtn.addEventListener("click", (e) => {
            e.preventDefault();
            this.closeForm();
        });

        const btnContainer = document.createElement("div");
        btnContainer.classList.add("form-btn-container");

        btnContainer.appendChild(submitProjectBtn);
        btnContainer.appendChild(cancelBtn);

        this.projectForm.appendChild(name);
        this.projectForm.appendChild(btnContainer);
        this.projectForm.style.display = "none";
        this.projectForm.addEventListener("submit", (e) => {
            e.preventDefault();
            this.addProjectToList();
        });
        return this.projectForm;
    }
}