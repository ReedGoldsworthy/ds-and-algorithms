let nQueens;
const synth = new Tone.Synth().toMaster();

let frontButton = document.getElementById("addFront");
let removeButton = document.getElementById("removeNode");
let listSize = document.getElementById("index");
let indexResult = document.getElementById("result");
let solutionsResult = document.getElementById("solutions");
let initialSize = listSize.value; // Get the initial size from the slider
indexResult.innerHTML = `${initialSize} x ${initialSize}`; // Set the initial display

let insertButton = document.getElementById("insertNode");
let noteInputs = document.getElementsByName("notes");
let playButton = document.getElementById("play");

playButton.onclick = function () {};

listSize.oninput = function () {
  let size = listSize.value;
  indexResult.innerHTML = `${size} x ${size}`; // Update to show "size x size"

  // Solve N-Queens for the updated size
  let solutions = nQueens.solve(Number(size)); // Solve with the current size from the slider
  // Display the solutions in the result section
  solutionsResult.innerHTML = solutions;
  nQueens.display();
};

function setup() {
  adjustCanvasSize(); // Adjust canvas size based on initial window size
  let canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent("sketch-container");

  nQueens = new NQueens();
  solutionsResult.innerHTML = nQueens.solve(4);
  // nQueens.display();
}

function draw() {
  background(220);
  drawChessboard(listSize.value); // Draw the chessboard based on the slider value
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

// Function to draw the chessboard
function drawChessboard(size) {
  let tileSize = min(canvasWidth, canvasHeight) / size; // Size of each tile based on canvas size and listSize
  let boardSize = tileSize * size; // Total size of the chessboard
  let offsetX = (canvasWidth - boardSize) / 2; // Calculate offset for centering
  let offsetY = (canvasHeight - boardSize) / 2; // Calculate offset for centering

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if ((i + j) % 2 === 0) {
        fill(255); // White tiles
      } else {
        fill(0); // Black tiles
      }
      rect(offsetX + i * tileSize, offsetY + j * tileSize, tileSize, tileSize); // Draw each tile
    }
  }
}
