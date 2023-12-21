(()=>{"use strict";class t{constructor(){this.projects=[]}getProjects(){return this.projects}setProjects(t){this.projects=t}getProject(t){return this.projects.find((e=>e.getName()===t))}isInProjects(t){return this.projects.some((e=>e.getName()===t))}addProject(t){this.isInProjects(t.getName())||this.projects.push(t)}deleteProject(t){this.projects=this.projects.filter((e=>e.getName()!==t))}}class e{constructor(t){this.name=t,this.tasks=[]}getName(){return this.name}setName(t){this.name=t}getTasks(){return this.tasks}setTasks(t){this.tasks=t}getTask(t){return this.tasks.find((e=>e.getTitle()===t))}isInTasks(t){return this.tasks.some((e=>e.getTitle()===t))}addTask(t){this.isInTasks(t.getTitle())||this.tasks.push(t)}deleteTask(t){this.tasks=this.tasks.filter((e=>e.getTitle()!==t))}}class s{constructor(t,e,s,i){this.title=t,this.description=e,this.dueDate=s,this.priority=i,this.isComplete=!1}getTitle(){return this.title}setTitle(t){this.title=t}getDescription(){return this.description}setDescription(t){this.description=t}getDueDate(){return this.dueDate}setDueDate(t){this.dueDate=t}getPriority(){return this.priority}setPriority(t){this.priority=t}getIsComplete(){return this.isComplete}setIsComplete(t){this.isComplete=t}}class i{static saveList(t){localStorage.setItem("list",JSON.stringify(t))}static getList(){let i=Object.assign(new t,JSON.parse(localStorage.getItem("list")));return i.setProjects(i.getProjects().map((t=>Object.assign(new e,t)))),i.getProjects().forEach((t=>t.setTasks(t.getTasks().map((t=>Object.assign(new s,t)))))),i}static addProject(t){let e=this.getList();e.addProject(t),this.saveList(e)}static deleteProject(t){let e=this.getList();e.deleteProject(t),this.saveList(e)}static setProjectName(t,e){let s=this.getList();s.getProject(t).setName(e),this.saveList(s)}static addTask(t,e){let s=this.getList();s.getProject(t).addTask(e),this.saveList(s)}static deleteTask(t,e){let s=this.getList();s.getProject(t).deleteTask(e),this.saveList(s)}static setTaskTitle(t,e,s){let i=this.getList();i.getProject(t).getTask(e).setTitle(s),this.saveList(i)}static setTaskDescription(t,e,s){let i=this.getList();i.getProject(t).getTask(e).setDescription(s),this.saveList(i)}static setTaskDueDate(t,e,s){let i=this.getList();i.getProject(t).getTask(e).setDueDate(s),this.saveList(i)}static setTaskPriority(t,e,s){let i=this.getList();i.getProject(t).getTask(e).setPriority(s),this.saveList(i)}static setTaskIsComplete(t,e,s){let i=this.getList();i.getProject(t).getTask(e).setIsComplete(s),this.saveList(i)}}function a(){let t=o.getActiveTask();const e=document.getElementById("content");let s;document.body.contains(document.querySelector(".task-container"))?(s=document.querySelector(".task-container"),s.textContent=""):(s=document.createElement("div"),s.classList.add("task-container"));const i=document.createElement("h2");i.classList.add("task-title"),i.textContent=t.getTitle();const a=document.createElement("p");a.classList.add("task-description"),a.textContent=t.getDescription();const c=document.createElement("p");c.classList.add("task-due-date"),c.textContent=t.getDueDate();const n=document.createElement("p");n.classList.add("task-priority"),n.textContent=t.getPriority();const r=document.createElement("div");r.classList.add("task-actions");const d=document.createElement("input");d.setAttribute("type","checkbox"),d.classList.add("task-complete-box"),t.getIsComplete()?(i.classList.add("task-complete"),d.checked=!0):(d.checked=!1,i.classList.add("task-incomplete"));const l=document.createElement("button");l.classList.add("edit-task-btn");const m=document.createElement("img");m.src="../dist/icons/edit.svg",m.alt="Edit task",m.title="Edit task",l.appendChild(m);const p=document.createElement("button");p.classList.add("save-edit-btn");const u=document.createElement("img");u.src="../dist/icons/check.svg",u.alt="Save changes",u.title="Save changes",p.appendChild(u);const h=document.createElement("button");h.classList.add("del-task-btn");const k=document.createElement("img");k.src="../dist/icons/delete.svg",k.alt="Delete task",k.title="Delete task",h.appendChild(k),d.addEventListener("change",(()=>{o.isTaskComplete()?d.checked=!0:d.checked=!1})),l.addEventListener("click",(()=>{l.style.display="none",h.style.display="none",g.style.display="none",i.contentEditable=!0,a.contentEditable=!0,c.contentEditable=!0,n.contentEditable=!0,i.focus(),r.appendChild(p)})),p.addEventListener("click",(()=>{console.log(t.getTitle()),o.editActiveTask(t.getTitle(),i.textContent,a.textContent,c.textContent,n.textContent)})),h.addEventListener("click",(()=>{o.deleteActiveTask()}));const g=document.createElement("div");g.classList.add("task-complete-container"),g.appendChild(d),r.appendChild(g),r.appendChild(l),r.appendChild(h),s.appendChild(i),s.appendChild(a),s.appendChild(c),s.appendChild(n),s.appendChild(r),e.appendChild(s)}class c{constructor(){this.taskForm=document.createElement("form")}resetTaskForm(){this.taskForm.style.display="none",this.taskForm.reset(),this.taskForm.children[3].textContent=""}addTaskToProject(){let t=this.taskForm.title.value,e=this.taskForm.description.value,a=this.taskForm.dueDate.value,c=this.taskForm.priority.value;if(o.validateDueDate(a)){{let o=new s(t,e,a,c),r=document.querySelector(".project-name").textContent;i.addTask(r,o),n()}this.resetTaskForm()}else this.taskForm.children[3].textContent="*Please enter a valid due date: yyyy/mm/dd"}createTaskForm(){this.taskForm.setAttribute("id","task-form"),this.taskForm.setAttribute("action","''"),this.taskForm.setAttribute("method","get");const t=document.createElement("input");t.setAttribute("type","text"),t.setAttribute("name","title"),t.setAttribute("id","title"),t.setAttribute("placeholder","title"),t.required=!0;const e=document.createElement("textarea");e.setAttribute("name","description"),e.setAttribute("id","description"),e.setAttribute("placeholder","description"),e.required=!0;const s=document.createElement("input");s.setAttribute("type","text"),s.setAttribute("name","dueDate"),s.setAttribute("id","dueDate"),s.setAttribute("placeholder","yyyy/mm/dd"),s.required=!0;const i=document.createElement("p");i.setAttribute("id","date-error");const a=document.createElement("input");a.setAttribute("type","text"),a.setAttribute("name","priority"),a.setAttribute("id","priority"),a.setAttribute("placeholder","priority"),a.required=!0;const c=document.createElement("button");return c.setAttribute("type","submit"),c.textContent="Submit",this.taskForm.appendChild(t),this.taskForm.appendChild(e),this.taskForm.appendChild(s),this.taskForm.appendChild(i),this.taskForm.appendChild(a),this.taskForm.appendChild(c),this.taskForm.style.display="none",this.taskForm.addEventListener("submit",(t=>{t.preventDefault(),this.addTaskToProject()})),this.taskForm}}function n(){let t=o.getActiveProject();const e=document.getElementById("content");let s;if(document.body.contains(document.querySelector(".project-container"))){if(s=document.querySelector(".project-container"),s.textContent="",document.body.contains(document.querySelector(".task-container"))){let t=document.querySelector(".task-container");e.removeChild(t)}}else s=document.createElement("div"),s.classList.add("project-container");const i=document.createElement("div");i.classList.add("project-header");const a=document.createElement("h1");a.classList.add("project-name"),a.textContent=t.getName();const n=o.getTasksRemaining();n.classList.add("tasks-remaining");const r=o.getTaskList();r.classList.add("task-list");const d=(new c).createTaskForm(),l=document.createElement("button");l.classList.add("add-task-btn");const m=document.createElement("span");m.textContent="Add task";const p=document.createElement("img");p.src="../dist/icons/add.svg",p.alt="plus sign",l.appendChild(p),l.appendChild(m);const u=document.createElement("div");u.classList.add("project-actions");const h=document.createElement("button");h.classList.add("edit-project-btn");const k=document.createElement("img");k.src="../dist/icons/edit.svg",k.alt="Edit project",k.title="Edit project",h.appendChild(k);const g=document.createElement("button");g.classList.add("save-edit-btn");const v=document.createElement("img");v.src="../dist/icons/check.svg",v.alt="Save changes",v.title="Save changes",g.appendChild(v);const C=document.createElement("button");C.classList.add("del-project-btn");const j=document.createElement("img");j.src="../dist/icons/delete.svg",j.alt="Delete project",j.title="Delete project",C.appendChild(j);const y=document.createElement("button");y.textContent="Clear completed tasks",y.classList.add("clear-completed-btn"),l.addEventListener("click",(()=>{d.style.display="block"})),h.addEventListener("click",(()=>{h.style.display="none",C.style.display="none",y.style.display="none",l.style.display="none",a.contentEditable=!0,a.focus(),u.appendChild(g)})),g.addEventListener("click",(()=>{a.contentEditable=!1,o.editActiveProject(t.getName(),a.textContent)})),C.addEventListener("click",(()=>{o.deleteActiveProject()})),y.addEventListener("click",(()=>{o.clearCompletedTasks()})),i.appendChild(a),i.appendChild(n),u.appendChild(h),u.appendChild(C),u.appendChild(y),s.appendChild(i),s.appendChild(r),s.appendChild(l),s.appendChild(u),s.appendChild(d),e.appendChild(s)}class o{static getActiveTitle(){return document.querySelector(".active-task").textContent}static getActiveName(){return document.querySelector(".active-project").textContent}static getActiveTask(){return i.getList().getProject(this.getActiveName()).getTask(this.getActiveTitle())}static getActiveProject(){return i.getList().getProject(this.getActiveName())}static editActiveTask(t,e,s,a,c){let o=this.getActiveName();i.setTaskDescription(o,t,s),i.setTaskDueDate(o,t,a),i.setTaskPriority(o,t,c),i.setTaskTitle(o,t,e),n()}static deleteActiveTask(){i.deleteTask(this.getActiveName(),this.getActiveTitle()),n()}static editActiveProject(t,e){i.setProjectName(t,e),d()}static deleteActiveProject(){i.deleteProject(this.getActiveName()),d()}static getProjectList(){let t=i.getList().getProjects();const e=document.createElement("div");for(let s=0;s<t.length;s++){let i=t[s];const a=document.createElement("button");a.textContent=i.getName(),a.addEventListener("click",(()=>{document.body.contains(document.querySelector(".active-project"))&&document.querySelector(".active-project").classList.remove("active-project"),a.classList.add("active-project"),n()})),e.appendChild(a)}return e}static getTaskList(){let t=this.getActiveProject().getTasks();const e=document.createElement("div");for(let s=0;s<t.length;s++){let i=t[s];const c=document.createElement("button");c.textContent=i.getTitle(),!0===i.getIsComplete()&&c.classList.add("task-complete"),c.addEventListener("click",(()=>{document.body.contains(document.querySelector(".active-task"))&&document.querySelector(".active-task").classList.remove("active-task"),c.classList.add("active-task"),a()})),e.appendChild(c)}return e}static getTasksRemaining(){let t=this.getActiveProject().getTasks(),e=t.length,s=t.filter((t=>!t.getIsComplete())).length;const i=document.createElement("p");return i.textContent=0===e?"No tasks assigned":0===s?"All tasks are complete!":1===s?s+" task remaining":s+" tasks remaining",i}static updateTasksRemaining(){let t=document.querySelector(".tasks-remaining"),e=this.getTasksRemaining();t.textContent=e.textContent}static isTaskComplete(){let t=document.querySelector(".active-task"),e=document.querySelector(".task-title");return t.classList.contains("task-incomplete")?(t.classList.remove("task-incomplete"),e.classList.remove("task-incomplete"),t.classList.add("task-complete"),e.classList.add("task-complete"),i.setTaskIsComplete(this.getActiveName(),this.getActiveTitle(),!0),this.updateTasksRemaining(),!0):(t.classList.remove("task-complete"),e.classList.remove("task-complete"),t.classList.add("task-incomplete"),e.classList.add("task-incomplete"),i.setTaskIsComplete(this.getActiveName(),this.getActiveTitle(),!1),this.updateTasksRemaining(),!1)}static clearCompletedTasks(){let t=this.getActiveProject().getTasks().filter((t=>t.getIsComplete()));for(let e=0;e<t.length;e++){let s=t[e];i.deleteTask(this.getActiveName(),s.getTitle()),n()}}static validateDueDate(t){let e=new Date,s=new Date(t);return!(isNaN(s)||s<e)}}class r{constructor(){this.projectForm=document.createElement("form")}resetProjectForm(){this.projectForm.style.display="none",this.projectForm.reset()}addProjectToList(){let t=this.projectForm.name.value,s=new e(t);i.addProject(s),d(),this.resetProjectForm()}createProjectForm(){this.projectForm.setAttribute("id","project-form"),this.projectForm.setAttribute("action","''"),this.projectForm.setAttribute("method","get");const t=document.createElement("input");t.setAttribute("type","text"),t.setAttribute("name","name"),t.setAttribute("id","name"),t.setAttribute("placeholder","project name"),t.required=!0;const e=document.createElement("button");return e.setAttribute("type","submit"),e.textContent="Submit",this.projectForm.appendChild(t),this.projectForm.appendChild(e),this.projectForm.style.display="none",this.projectForm.addEventListener("submit",(t=>{t.preventDefault(),this.addProjectToList()})),this.projectForm}}function d(){const t=document.getElementById("content");let e;if(document.body.contains(document.querySelector(".list-container"))){if(e=document.querySelector(".list-container"),e.textContent="",document.body.contains(document.querySelector(".project-container"))){let e=document.querySelector(".project-container");t.removeChild(e)}if(document.body.contains(document.querySelector(".task-container"))){let e=document.querySelector(".task-container");t.removeChild(e)}}else e=document.createElement("div"),e.classList.add("list-container");const s=document.createElement("h1");s.classList.add("list-header"),s.textContent="Projects";const i=o.getProjectList();i.classList.add("project-list");const a=(new r).createProjectForm(),c=document.createElement("button");c.classList.add("add-project-btn");const n=document.createElement("span");n.textContent="Add project";const d=document.createElement("img");d.src="./dist/icons/add.svg",d.alt="plus sign",c.appendChild(d),c.appendChild(n),c.addEventListener("click",(()=>{a.style.display="block"})),e.appendChild(s),e.appendChild(i),e.appendChild(c),e.appendChild(a),t.appendChild(e)}d()})();