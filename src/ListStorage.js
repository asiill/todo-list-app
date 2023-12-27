import List from "./list/List.js";
import Project from "./project/Project.js";
import Task from "./task/Task.js";

export default class ListStorage {
    static saveList(list) {
        localStorage.setItem("list", JSON.stringify(list));
    }

    static getList() {
        let list = Object.assign(new List(), JSON.parse(localStorage.getItem("list")));
        list.setProjects(list.getProjects().map(project => Object.assign(new Project(), project)));
        list.getProjects().forEach(project => project.setTasks(project.getTasks().map(task => Object.assign(new Task(), task))));
        return list;
    }

    static addProject(project) {
        let list = this.getList();
        list.addProject(project);
        this.saveList(list);
    }

    static deleteProject(projectName) {
        let list = this.getList();
        list.deleteProject(projectName);
        this.saveList(list);
    }

    static setProjectName(projectName, name) {
        let list = this.getList();
        list.getProject(projectName).setName(name);
        this.saveList(list);
    }

    static addTask(projectName, task) {
        let list = this.getList();
        list.getProject(projectName).addTask(task);
        this.saveList(list);
    }

    static deleteTask(projectName, taskTitle) {
        let list = this.getList();
        list.getProject(projectName).deleteTask(taskTitle);
        this.saveList(list);
    }

    static setTaskTitle(projectName, taskTitle, title) {
        let list = this.getList();
        list.getProject(projectName).getTask(taskTitle).setTitle(title);
        this.saveList(list);
    }

    static setTaskDescription(projectName, taskTitle, description) {
        let list = this.getList();
        list.getProject(projectName).getTask(taskTitle).setDescription(description);
        this.saveList(list);
    }

    static setTaskDueDate(projectName, taskTitle, dueDate) {
        let list = this.getList();
        list.getProject(projectName).getTask(taskTitle).setDueDate(dueDate);
        this.saveList(list);
    }

    static setTaskPriority(projectName, taskTitle, priority) {
        let list = this.getList();
        list.getProject(projectName).getTask(taskTitle).setPriority(priority);
        this.saveList(list);
    }

    static setTaskIsComplete(projectName, taskTitle, value) {
        let list = this.getList();
        list.getProject(projectName).getTask(taskTitle).setIsComplete(value);
        this.saveList(list);
    }
}