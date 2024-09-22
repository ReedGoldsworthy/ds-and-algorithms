let myTree;
let current;
const synth = new Tone.Synth().toMaster();

let frontButton = document.getElementById("addFront");
let removeButton = document.getElementById("removeNode");
let listSize = document.getElementById("index");
let indexResult = document.getElementById("result");

let noteInputs = document.getElementsByName("notes");
let playButton = document.getElementById("play");

playButton.onclick = function () {
  myTree.colorDisplay();
};

frontButton.onclick = function () {
  // Get value from text input (if present)
  let textInputValue = document.getElementById("notes").value;
  let numericValue = Number(textInputValue); // Converts to a number (integer or float depending on input)

  myTree.addVal(numericValue);
};

function setup() {
  adjustCanvasSize(); // Adjust canvas size based on initial window size
  let canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent("sketch-container");

  myTree = new BinaryTree();

  // myTree.addVal(50);
  // myTree.addVal(30);
  // myTree.addVal(20);
  // myTree.addVal(40);
  // myTree.addVal(70);
  // myTree.addVal(60);
  // myTree.addVal(80);

  background(220);
}

function draw() {
  myTree.display();
}

function windowResized() {
  adjustCanvasSize(); // Adjust canvas size when the window is resized
  myTree.display();
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
