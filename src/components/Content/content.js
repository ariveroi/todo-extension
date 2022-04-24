export const createContent = (parentNode) => {
  // let form = document.createElement("div");
  // form.setAttribute("id", "todo-form");
  // form.setAttribute("class", "todo-form");
  // form.innerHTML = formChilds;
  let todoList = document.createElement("ul");
  todoList.setAttribute("id", "todo-list");
  // parentNode.appendChild(form);
  parentNode.appendChild(todoList);
  addEventListeners(form);
  // return form;
};

let myTodos = [];

chrome.storage.sync.get("toDoList", ({ toDoList }) => {
  myTodos = toDoList;
  toDoList.forEach((item, idx) => {
    addToDo(item, idx);
  });
});

const addEventListeners = (form) => {
  document.querySelector("#add-button").addEventListener("submit", async () => {
    let item = {
      name: document.querySelector("#new-todo-input").value,
      done: false,
    };
    addToDo(item);
    myTodos.push(item);
    chrome.storage.sync.set({ toDoList: myTodos });
  });
};

const addToDo = (item, idx) => {
  let toDoList = document.querySelector("#todo-list");
  let listItem = document.createElement("li");
  listItem.setAttribute("id", "li-element-" + idx);
  listItem.setAttribute("class", "list-item");
  let text = document.createElement("span");
  let button = document.createElement("button");
  button.setAttribute("id", "done-button-" + idx);
  button.classList.add("frame-button");
  button.innerText = "Done";
  button.addEventListener("click", () => {
    removeElement(idx);
  });
  text.innerText = item.name;
  listItem.appendChild(text);
  listItem.appendChild(button);
  toDoList.appendChild(listItem);
};

const removeElement = (idx) => {
  myTodos.splice(idx, 1);
  chrome.storage.sync.set({ toDoList: myTodos });
  let element = document.querySelector("#li-element-" + idx);
  element.remove();
};

const formChilds = `
    <label for="new-todo-input">New todo:</label>
    <input type="text" name="new-todo-input" id="new-todo-input" />
    <input type="button" value="Add" id="add-button"/>
`;
