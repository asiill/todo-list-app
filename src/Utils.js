import ListStorage from "./ListStorage.js";
import createTaskContainer from "./task/taskContainer.js";
import createProjectContainer from "./project/projectContainer.js";
import createListContainer from "./list/listContainer.js";

export default class Utils {
    static getActiveTitle() {
        let taskTitle = document.querySelector(".active-task").textContent;
        return taskTitle;
    }

    static getActiveName() {
        let projectName = document.querySelector(".active-project").textContent;
        return projectName;
    }

    static getActiveTask() {
        let task = ListStorage.getList().getProject(this.getActiveName()).getTask(this.getActiveTitle());
        return task;
    }

    static getActiveProject() {
        let project = ListStorage.getList().getProject(this.getActiveName());
        return project;
    }

    static editActiveTask(taskTitle, title, description, dueDate) {
        let projectName = this.getActiveName();
        ListStorage.setTaskDescription(projectName, taskTitle, description);
        ListStorage.setTaskDueDate(projectName, taskTitle, dueDate);
        ListStorage.setTaskTitle(projectName, taskTitle, title);
        createProjectContainer();
    };

    static deleteActiveTask() {
        ListStorage.deleteTask(this.getActiveName(), this.getActiveTitle());
        createProjectContainer();
    }

    static editActiveProject(projectName, name) {
        ListStorage.setProjectName(projectName, name);
        createListContainer();
    }

    static deleteActiveProject() {
        ListStorage.deleteProject(this.getActiveName());
        createListContainer();
    }

    static getProjectList() {
        let list = ListStorage.getList();
        let projects = list.getProjects();
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
                createProjectContainer();
            });
            projectList.appendChild(el);
        }
        return projectList;
    }

    static getTaskList() {
        let tasks = this.getActiveProject().getTasks();
        const taskList = document.createElement("div");
        for (let i = 0; i < tasks.length; i++) {
            let task = tasks[i];
            const el = document.createElement("button");
            el.textContent = task.getTitle();
            if (task.getIsComplete() === true) {
                el.classList.add("task-complete");
            }
            el.addEventListener ("click", () => {
                if (document.body.contains(document.querySelector(".active-task"))) {
                    let activeTask = document.querySelector(".active-task");
                    activeTask.classList.remove("active-task");
                }
                el.classList.add("active-task");
                createTaskContainer();
            })
            taskList.appendChild(el);
        }
        return taskList;
    }

    static getTasksRemaining() {
        let tasks = this.getActiveProject().getTasks();
        let taskCount = tasks.length;
        let incompleteTaskCount = tasks.filter(task => !task.getIsComplete()).length;
        const tasksRemaining = document.createElement("p");
        if (taskCount === 0) {
            tasksRemaining.textContent = "No tasks assigned";
        } else {
            if (incompleteTaskCount === 0) {
                tasksRemaining.textContent = "All tasks are complete!";
            } else if (incompleteTaskCount === 1) {
                tasksRemaining.textContent = incompleteTaskCount + " task remaining";
            } else {
                tasksRemaining.textContent = incompleteTaskCount + " tasks remaining";
            }
        }
        return tasksRemaining;
    }

    static updateTasksRemaining() {
        let tasksRemaining = document.querySelector(".tasks-remaining");
        let updatedTasksRemaining = this.getTasksRemaining();
        tasksRemaining.textContent = updatedTasksRemaining.textContent;
    }

    static isTaskComplete() {
        let activeTask = document.querySelector(".active-task");
        let taskTitle = document.querySelector(".task-title");
        if (activeTask.classList.contains("task-incomplete")) {
            activeTask.classList.remove("task-incomplete");
            taskTitle.classList.remove("task-incomplete");
            activeTask.classList.add("task-complete");
            taskTitle.classList.add("task-complete");
            ListStorage.setTaskIsComplete(this.getActiveName(), this.getActiveTitle(), true);
            this.updateTasksRemaining();
            return true;
        } else {
            activeTask.classList.remove("task-complete");
            taskTitle.classList.remove("task-complete");
            activeTask.classList.add("task-incomplete");
            taskTitle.classList.add("task-incomplete");
            ListStorage.setTaskIsComplete(this.getActiveName(), this.getActiveTitle(), false);
            this.updateTasksRemaining();
            return false;
        }
    }

    static clearCompletedTasks() {
        let tasks = this.getActiveProject().getTasks();
        let completeTasks = tasks.filter(task => task.getIsComplete());
        for (let i = 0; i < completeTasks.length; i++) {
            let task = completeTasks[i];
            ListStorage.deleteTask(this.getActiveName(), task.getTitle());
            createProjectContainer();
        }
    }

    static validateDueDate(date) {
        let currentDate = new Date();
        let dueDate = new Date(date);

        if (!isNaN(dueDate)) {
            if (!(dueDate < currentDate)) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
}