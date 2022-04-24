"use strict";

// With background scripts you can communicate with popup
// and contentScript files.

//chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {});

chrome.runtime.onInstalled.addListener(async () => {
  console.log("Running it");
  const backGroundColor = "#fff";
  chrome.storage.sync.set({ backGroundColor });
});
