import ListContainer from "./ListContainer.js";
import ListStorage from "./ListStorage.js";

let list = ListStorage.getList();

let listContainer = new ListContainer(list);
listContainer.createListContainer();