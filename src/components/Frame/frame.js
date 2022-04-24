import { frameStyle } from "./css";
import { createContent } from "../Content/content";

export const createFrame = async (document, list, sumary) => {
  let frame = document.createElement("div");
  frame.setAttribute("class", "frame");
  document.body.appendChild(frame);
  let style = document.createElement("style");
  style.type = "text/css";
  style.innerHTML = frameStyle;

  document.head.appendChild(style);
  let completedSpan = document.createElement("span");
  completedSpan.setAttribute("class", "completed-span");
  completedSpan.innerText = "C: " + sumary.completed;
  let inProgressSpan = document.createElement("span");
  inProgressSpan.setAttribute("class", "in-progress-span");
  inProgressSpan.innerText = "IP: " + sumary.inProgress;
  frame.appendChild(completedSpan);
  frame.appendChild(inProgressSpan);
  addEventListeners(frame);
};

// export const createFrame = async (document) => {
//   let frame = document.createElement("div");
//   frame.setAttribute("class", "frame");
//   document.body.appendChild(frame);
//   let style = document.createElement("style");
//   style.type = "text/css";
//   style.innerHTML = frameStyle;
//   await chrome.storage.sync.get("backGroundColor", ({ backGroundColor }) => {
//     frame.style.backgroundColor = backGroundColor;
//   });
//   document.head.appendChild(style);
//   addChilds(frame);
//   addEventListeners(frame);
// };

// const addChilds = (frame) => {
//   let content = document.createElement("div");
//   content.setAttribute("class", "content");
//   setPinButton(content);
//   createContent(content);
//   frame.appendChild(content);
// };

const addEventListeners = (frame) => {
  // Expand the frame when hovering
  // frame.addEventListener("mouseover", showFrameContent);
  // frame.addEventListener("mouseout", hideFrameContent);
  frame.addEventListener("mousedown", (e) => replaceFrameContent(frame, e));
};

const replaceFrameContent = (frame, e) => {
  const frameX = frame.offsetLeft;
  const mouseX = e.clientX;
  const moveAt = (e) => {
    frame.style.left = e.clientX - mouseX + frameX + "px";
  };
  document.addEventListener("mousemove", moveAt);
  frame.addEventListener("mouseup", () => {
    document.removeEventListener("mousemove", moveAt);
  });
};

// const showFrameContent = () => {
//   document.querySelector(".content").classList.add("active");
// };

// const hideFrameContent = () => {
//   document.querySelector(".content").classList.remove("active");
// };

// const pinFrame = () => {
//   let frame = document.querySelector(".frame");
//   let content = document.querySelector(".content");
//   frame.classList.add("active");
//   content.classList.add("active");

//   frame.removeEventListener("mouseout", hideFrameContent);
//   frame.removeEventListener("mouseover", showFrameContent);
//   content.removeChild(pinButton);

//   let closeButton = document.createElement("button");
//   closeButton.innerHTML = "Close";
//   closeButton.setAttribute("id", "closeButton");
//   closeButton.setAttribute("class", "frame-button");
//   content.appendChild(closeButton);
//   closeButton.addEventListener("click", unpinFrame);
// };

// const unpinFrame = () => {
//   let frame = document.querySelector(".frame");
//   let content = document.querySelector(".content");
//   let closeButton = document.querySelector("#closeButton");
//   frame.classList.remove("active");
//   content.classList.remove("active");
//   frame.addEventListener("mouseout", hideFrameContent);
//   frame.addEventListener("mouseover", showFrameContent);
//   content.removeChild(closeButton);
//   setPinButton(content);
// };

// const setPinButton = (content) => {
//   let pinButton = document.createElement("button");
//   pinButton.setAttribute("id", "pinButton");
//   pinButton.setAttribute("class", "frame-button");
//   pinButton.innerHTML = "Pin";
//   content.appendChild(pinButton);
//   pinButton.addEventListener("click", pinFrame);
// };
