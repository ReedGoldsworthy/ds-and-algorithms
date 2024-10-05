let nQueens;
let tiles = [];
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

let currentSolution = 0; // Track the current solution being animated
let isAnimating = false; // To prevent starting another animation during an ongoing one

playButton.onclick = function () {
  if (!isAnimating) {
    let solutions = nQueens.solve(Number(listSize.value)); // Get the solutions for the current size
    animateQueens(solutions[currentSolution]); // Animate the current solution
    currentSolution = (currentSolution + 1) % solutions.length; // Move to the next solution
  }
};

listSize.oninput = function () {
  let size = listSize.value;
  indexResult.innerHTML = `${size} x ${size}`; // Update to show "size x size"

  // Solve N-Queens for the updated size
  let solutions = nQueens.solve(Number(size)); // Solve with the current size from the slider
  // Display the solutions in the result section
  solutionsResult.innerHTML = solutions.length;

  createChessboard(size); // Update the chessboard with new size
};

function setup() {
  adjustCanvasSize(); // Adjust canvas size based on initial window size
  let canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent("sketch-container");

  nQueens = new NQueens();
  createChessboard(initialSize); // Create the initial chessboard
  solutionsResult.innerHTML = nQueens.solve(4).length;
}

function draw() {
  background(220);
  drawChessboard(); // Draw the chessboard
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

// Function to create the chessboard as an array of tiles
function createChessboard(size) {
  tiles = []; // Clear the existing tiles
  let tileSize = min(canvasWidth, canvasHeight) / size; // Size of each tile
  let boardSize = tileSize * size;
  let offsetX = (canvasWidth - boardSize) / 2;
  let offsetY = (canvasHeight - boardSize) / 2;

  // Populate the tiles array with tile objects
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      tiles.push({
        row: row,
        col: col,
        x: offsetX + col * tileSize,
        y: offsetY + row * tileSize,
        size: tileSize,
        color: (row + col) % 2 === 0 ? 255 : 0, // Alternating black and white
        clicked: false, // Track if the tile has been clicked
        queen: false, // Track if a queen is placed on the tile
      });
    }
  }
}

function drawChessboard() {
  for (let tile of tiles) {
    fill(tile.color); // Set the normal tile color
    rect(tile.x, tile.y, tile.size, tile.size); // Draw the tile

    // If a queen is placed on the tile
    if (tile.queen) {
      // If all queens are placed, change the color to green; otherwise, keep it orange
      fill(tile.isFinal ? "green" : "orange");
      textSize(tile.size * 0.8); // Set text size based on tile size
      textAlign(CENTER, CENTER); // Center the text
      text("Q", tile.x + tile.size / 2, tile.y + tile.size / 2); // Draw "Q" in the center of the tile
    }
  }
}

// Function to animate placing queens on the board
function animateQueens(solution) {
  isAnimating = true; // Disable other animations while this one runs
  let delay = 700; // 3 seconds delay for each row

  // Reset all tiles (remove previous queens)
  for (let tile of tiles) {
    tile.queen = false;
    tile.isFinal = false; // Ensure all tiles are not marked as final (green)
  }

  for (let row = 0; row < solution.length; row++) {
    setTimeout(function () {
      // Animate placing a queen in the current row
      for (let col = 0; col < solution[row].length; col++) {
        if (solution[row][col] === "Q") {
          let tile = tiles.find((t) => t.row === row && t.col === col);
          if (tile) {
            tile.queen = true;
          }
        }
      }

      // If it's the last row, turn all queens green
      if (row === solution.length - 1) {
        setTimeout(function () {
          for (let tile of tiles) {
            if (tile.queen) {
              tile.isFinal = true; // Mark the queens as final (green)
            }
          }
          isAnimating = false; // Re-enable animations after completion
        }, delay);
      }
    }, row * delay); // Delay each row by 3 seconds
  }
}
