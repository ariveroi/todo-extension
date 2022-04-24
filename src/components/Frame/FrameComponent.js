export class Frame {
  constructor(document) {
    this.document = document;
    this.frame = this.createFrame(document);
    this.addChilds(this.frame);
    this.addEventListeners(this.frame);
  }

  createFrame(document) {
    //   addFunctionalities(frame);
    //   addStyle(frame);
    let frame = document.createElement("div");
    frame.setAttribute("class", "frame");
    document.body.appendChild(frame);
    //append css to head
    let style = document.createElement("style");
    style.type = "text/css";
    style.innerHTML = `
      .frame {
          width: 30px;
          height: 30px;
          background-color: red;
          position: absolute;
          top: 0px;
          right: 0px;
          z-index: 9999;
      }
      .frame:hover{
          background-color: blue;
          width: 300px;
          height: 300px;
      }
      .frame.active{
          background-color: blue;
          width: 300px;
          height: 300px;
      }
      .content{
          display: none;
      }
      .content.active{
          display: block;
      }
      `;
    document.head.appendChild(style);
    return frame;
  }

  addChilds(frame) {
    let content = document.createElement("div");
    content.setAttribute("class", "content");
    this.setPinButton(content);
    frame.appendChild(content);
  }

  addEventListeners(frame) {
    // Expand the frame when hovering
    frame.addEventListener("mouseover", this.showFrameContent);
    frame.addEventListener("mouseout", this.hideFrameContent);

    frame.addEventListener("mousedown", (e) => {
      const frameX = frame.offsetLeft;
      const mouseX = e.clientX;
      const moveAt = (e) => {
        frame.style.left = e.clientX - mouseX + frameX + "px";
      };
      document.addEventListener("mousemove", moveAt);
      frame.addEventListener("mouseup", () => {
        document.removeEventListener("mousemove", moveAt);
      });
    });

    document.body.appendChild(frame);
  }

  showFrameContent() {
    document.querySelector(".content").classList.add("active");
  }

  hideFrameContent() {
    document.querySelector(".content").classList.remove("active");
  }

  pinFrame() {
    let frame = document.querySelector(".frame");
    let content = document.querySelector(".content");
    frame.classList.add("active");
    content.classList.add("active");

    frame.removeEventListener("mouseout", this.hideFrameContent);
    frame.removeEventListener("mouseover", this.showFrameContent);
    content.removeChild(pinButton);

    let closeButton = document.createElement("button");
    closeButton.innerHTML = "Close";
    closeButton.setAttribute("id", "closeButton");
    content.appendChild(closeButton);
    closeButton.addEventListener("click", this.unpinFrame);
  }

  unpinFrame() {
    let frame = document.querySelector(".frame");
    let content = document.querySelector(".content");
    let closeButton = document.querySelector("#closeButton");
    frame.classList.remove("active");
    content.classList.remove("active");
    frame.addEventListener("mouseout", this.hideFrameContent);
    frame.addEventListener("mouseover", this.showFrameContent);
    content.removeChild(closeButton);
    this.setPinButton(content);
  }

  setPinButton(content) {
    let pinButton = document.createElement("button");
    pinButton.setAttribute("id", "pinButton");
    pinButton.innerHTML = "Pin";
    content.appendChild(pinButton);
    pinButton.addEventListener("click", this.pinFrame);
  }
}
