/*
    Task class
*/

export default class Task {

    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.isComplete = false;
    }

    getTitle() {
        return this.title;
    }
    setTitle(title) {
        this.title = title;
    }

    getDescription() {
        return this.description;
    }
    setDescription(description) {
        this.description = description;
    }

    getDueDate() {
        return this.dueDate;
    }
    setDueDate(dueDate) {
        this.dueDate = dueDate;
    }

    getPriority() {
        return this.priority;
    }
    setPriority(priority) {
        this.priority = priority;
    }

    getIsComplete() {
        return this.isComplete;
    }
    setIsComplete(value) {
        this.isComplete = value;
    }
}