let myList;
let current;
const synth = new Tone.Synth().toMaster();

let frontButton = document.getElementById("addFront");
let removeButton = document.getElementById("removeNode");
let listSize = document.getElementById("index");

let insertButton = document.getElementById("insertNode");
let noteInputs = document.getElementsByName("notes");
let playButton = document.getElementById("play");

removeButton.onclick = function () {
  myList.remove();
  if (myList.size > 0) {
    // listSize.max = myList.size;
  }
};

frontButton.onclick = function () {
  // Get value from text input (if present)
  let textInputValue = document.getElementById("notes").value;

  // Add node to the front of the list if a value is provided
  if (textInputValue !== "") {
    myList.addFront(textInputValue); // Adds the node value to the linked list
  } else {
    console.log("You forgot to add some data to your node");
  }
};

function setup() {
  adjustCanvasSize(); // Adjust canvas size based on initial window size
  let canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent("sketch-container");
  myList = new Llist();
}

function draw() {
  background(220);
  myList.display();
}

let previous = null;
const loop1 = new Tone.Loop((time) => {
  synth.triggerAttackRelease(current.getData(), "8n", time);
  current.stroke = "#00ff00";
  previous = current;
  current = current.getNext();
  if (current == null) {
    current = myList.front;
  }
}, "8n").start(0);

const loop2 = new Tone.Loop((time) => {
  if (previous.selected) {
    previous.stroke = "#ff0000";
  } else {
    previous.stroke = "#000000";
  }
}, "8n").start(0.5);
function windowResized() {
  adjustCanvasSize(); // Adjust canvas size when the window is resized
  resizeCanvas(canvasWidth, canvasHeight);
}

let canvasWidth, canvasHeight;

function adjustCanvasSize() {
  if (windowWidth <= 768) {
    canvasWidth = windowWidth;
    canvasHeight = windowHeight * 0.4; // Make the canvas smaller for smaller screens
  } else {
    canvasWidth = windowWidth * 0.75;
    canvasHeight = windowHeight;
  }
}
