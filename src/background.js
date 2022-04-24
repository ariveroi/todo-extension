"use strict";

// With background scripts you can communicate with popup
// and contentScript files.

// create dummy local storage for testing
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

//chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {});

chrome.runtime.onInstalled.addListener(async () => {
  console.log("Running it");
  const backGroundColor = "#fff";
  chrome.storage.sync.set({ backGroundColor });
  // add a dummy objjct
  todoStorage.set([{ name: "This is yur first todo!", done: false }], () => {
    console.log("dummy object added");
  });
});
