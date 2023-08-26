/*
    List class
    Manage all projects within the todo list
*/

export default class List {

    constructor() {
        this.projects = [];
    }

    getProjects() {
        return this.projects;
    }
    setProjects(projects) {
        this.projects = projects;
    }

    getProject(projectName) {
        return this.projects.find(project => project.getName() === projectName);
    }
    isInProjects(projectName) {
        return this.projects.some(project => project.getName() === projectName);
    }
    addProject(project) {
        if (this.isInProjects(project.getName())) {
            return;
        }
        this.projects.push(project);
    }
    deleteProject(projectName) {
        return this.projects.filter(project => project.getName() !== projectName);
    }

}