/*
    Project class
    Manage tasks for a given project
*/

export default class Project {

    constructor(name) {
        this.name = name;
        this.tasks = [];
    }

    getName() {
        return this.name;
    }
    setName(name) {
        this.name = name;
    }

    getTasks() {
        return this.tasks;
    }
    setTasks(tasks) {
        this.tasks = tasks;
    }

    getTask(taskTitle) {
        return this.tasks.find(task => task.getTitle() === taskTitle);
    }
    isInTasks(taskTitle) {
        return this.tasks.some(task => task.getTitle() === taskTitle);
    }
    addTask(task) {
        if (this.isInTasks(task.getTitle())){
            return;
        }
        this.tasks.push(task);
    }
    deleteTask(taskTitle) {
        this.tasks = this.tasks.filter(task => task.getTitle() !== taskTitle);
    }

}