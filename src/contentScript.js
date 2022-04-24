"use strict";

// Content script file will run in the context of web page.
// With content script you can manipulate the web pages using
// Document Object Model (DOM).
// You can also pass information to the parent extension.

import { createFrame } from "./components/Frame/frame";

// createFrame(document);

let summary = {
  completed: 0,
  inProgress: 0,
};

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

todoStorage.get((list) => {
  console.log(list);
  //   document.querySelector("#todo-list").innerHTML = "";
  list.forEach((todo, idx) => {
    if (!todo.done) {
      summary.inProgress++;
      //   setupListElement(todo, idx);
    } else {
      summary.completed++;
    }
  });
  console.log(summary);
  createFrame(document, list, summary);
});

// receive message from background script
