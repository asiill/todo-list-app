import TaskForm from "./TaskForm.js";
import TaskContainer from "./TaskContainer.js";
import ListContainer from "./ListContainer.js";
import ListStorage from "./ListStorage.js";

export default class ProjectContainer {

    constructor() {
        this.projectName = document.querySelector(".active-project").textContent;
        this.project = ListStorage.getList().getProject(this.projectName);
    }

    createProjectContainer() {

        const content = document.getElementById("content");

        let projectContainer;
        if (document.body.contains(document.querySelector(".project-container"))) {
            projectContainer = document.querySelector(".project-container");
            projectContainer.textContent = "";
            if (document.body.contains(document.querySelector(".task-container"))) {
                let taskContainer = document.querySelector(".task-container");
                taskContainer.textContent = "";
            }
        } else {
            projectContainer = document.createElement("div");
            projectContainer.classList.add("project-container");
        }
    
        const projectHeader = document.createElement("div");
        projectHeader.classList.add("project-header");
    
        const projectName = document.createElement("h1");
        projectName.classList.add("project-name");
        projectName.textContent = this.projectName;
    
        const tasksRemaining = this.showRemainingTasks();
        tasksRemaining.classList.add("tasks-remaining");

        const taskList = this.showTasks();
        taskList.classList.add("task-list");

        const taskForm = (new TaskForm()).createTaskForm();

        const addTaskBtn = document.createElement("button");
        addTaskBtn.textContent = "+ new task";
        addTaskBtn.classList.add("add-task-btn");

        const projectActions = document.createElement("div");
        projectActions.classList.add("project-actions");

        const clearCompletedBtn = document.createElement("button");
        clearCompletedBtn.textContent = "Clear completed tasks";
        clearCompletedBtn.classList.add("clear-completed-btn");

        const delProjectBtn = document.createElement("button");
        delProjectBtn.textContent = "Delete Project";
        delProjectBtn.classList.add("del-project-btn");

        delProjectBtn.addEventListener("click", () => {
            ListStorage.deleteProject(this.projectName);
            let listContainer = new ListContainer();
            listContainer.createListContainer();
        });

        addTaskBtn.addEventListener("click", () => {
            taskForm.style.display = "block";
        });

        projectHeader.appendChild(projectName);
        projectHeader.appendChild(tasksRemaining);

        projectActions.appendChild(clearCompletedBtn);
        projectActions.appendChild(delProjectBtn);

        projectContainer.appendChild(projectHeader);
        projectContainer.appendChild(taskList);
        projectContainer.appendChild(taskForm);
        projectContainer.appendChild(addTaskBtn);
        projectContainer.appendChild(projectActions);

        content.appendChild(projectContainer);
    }

    showTasks() {
        let tasks = this.project.getTasks();

        const taskList = document.createElement("div");

        for (let i = 0; i < tasks.length; i++) {
            let task = tasks[i];

            const el = document.createElement("button");
            el.textContent = task.getTitle();

            if (task.getComplete() === true) {
                el.classList.add("task-complete");
            }

            el.addEventListener ("click", () => {

                if (document.body.contains(document.querySelector(".active-task"))) {
                    let activeTask = document.querySelector(".active-task");
                    activeTask.classList.remove("active-task");
                }

                el.classList.add("active-task");
                let taskContainer = new TaskContainer();
                taskContainer.createTaskContainer();
            })
            taskList.appendChild(el);
        }

        return taskList;
    }
    
    showRemainingTasks() {
        let tasks = this.project.getTasks();
        let taskCount = tasks.length;
        let incompleteTaskCount = tasks.filter(task => !task.getComplete()).length;

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

    clearCompletedTasks() {
        let tasks = this.project.getTasks();
        let completeTasks = tasks.filter(task => task.getComplete());
        for (i = 0; i < completeTasks.length; i++) {
            let task = completeTasks[i];
            ListStorage.deleteTask(this.projectName, task.getTitle());
        }
    }
}