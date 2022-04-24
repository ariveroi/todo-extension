import "./popup.css";

const todoStorage = {
  get: (callback) => {
    chrome.storage.sync.get("toDoList", (result) => {
      callback(result.toDoList);
    });
  },
  set: (value, callback) => {
    chrome.storage.sync.set({ toDoList: value }, () => {
      callback();
    });
  },
};

const setupToDoList = () => {
  document.querySelector("#new-todo-form").addEventListener("submit", () => {
    const todo = document.querySelector("#todo").value;
    if (todo) {
      todoStorage.get((list) => {
        list.push({ name: todo, done: false });
        todoStorage.set(list, () => {
          document.querySelector("#todo").value = "";
          setupToDoList();
        });
      });
    }
  });
  todoStorage.get((list) => {
    console.log(list);
    document.querySelector("#todo-list").innerHTML = "";
    list.forEach((todo, idx) => {
      if (!todo.done) {
        // summary.inProgress++;
        setupListElement(todo, idx);
      } else {
        // summary.completed++;
      }
    });
  });
};

const completeElement = (todo, idx) => {
  todo.done = true;
  todoStorage.get((list) => {
    list[idx] = todo;
    todoStorage.set(list, () => {
      setupToDoList();
    });
  });
};

const setupListElement = (todo, idx) => {
  const todoItem = document.createElement("li");
  todoItem.setAttribute("id", "li-element-" + idx);
  todoItem.setAttribute("class", "list-item");
  todoItem.innerHTML = `<span>${todo.name}</span>`;
  let doneButton = document.createElement("button");
  doneButton.setAttribute("class", "frame-button");
  doneButton.innerText = "Done";
  doneButton.addEventListener("click", () => {
    completeElement(todo, idx);
  });
  todoItem.appendChild(doneButton);
  document.querySelector("#todo-list").appendChild(todoItem);
};

document.addEventListener("DOMContentLoaded", setupToDoList);
