import Project from "./Project.js";
import ListContainer from "./ListContainer.js";
import ListStorage from "./ListStorage.js";

export default class ProjectForm {

    constructor() {
        this.projectForm = document.createElement("form");
    }

    resetProjectForm() {
        this.projectForm.style.display = "none";
        this.projectForm.reset();
    }

    addProjectToList() {
        let name = this.projectForm.name.value;
        let project = new Project(name);

        ListStorage.addProject(project);
        let listContainer = new ListContainer();
        listContainer.createListContainer();

        this.resetProjectForm();
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

        const submitProject = document.createElement("button");
        submitProject.setAttribute("type", "submit");
        submitProject.textContent = "Submit";

        this.projectForm.appendChild(name);
        this.projectForm.appendChild(submitProject);

        this.projectForm.style.display = "none";

        this.projectForm.addEventListener("submit", (e) => {
            e.preventDefault();
            this.addProjectToList();
        });

        return this.projectForm;

    }
    
}