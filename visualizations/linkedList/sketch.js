let myList;
let current;
const synth = new Tone.Synth().toMaster();

let frontButton = document.getElementById("addFront");
let removeButton = document.getElementById("removeNode");
let listSize = document.getElementById("index");
let indexResult = document.getElementById("result");
indexResult.innerHTML = 0;
let insertButton = document.getElementById("insertNode");
let noteInputs = document.getElementsByName("notes");
let playButton = document.getElementById("play");

function hashStringToSingleNote(inputString) {
  const notes = ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5"]; // List of musical notes

  // Simple hash function: sum the character codes of the string
  let hashValue = 0;
  for (let i = 0; i < inputString.length; i++) {
    hashValue += inputString.charCodeAt(i);
  }

  // Map the resulting hash to a note using modulus
  let noteIndex = hashValue % notes.length;

  // Return the corresponding musical note
  return notes[noteIndex];
}

playButton.onclick = function () {
  current = myList.front;
  Tone.Transport.toggle();
};

removeButton.onclick = function () {
  myList.remove();
  if (myList.size > 0) {
    listSize.max = myList.size;
  }
};

frontButton.onclick = function () {
  // Get value from text input (if present)
  let textInputValue = document.getElementById("notes").value;
  let n = hashStringToSingleNote(textInputValue);

  // Add node to the front of the list if a value is provided
  if (n !== "") {
    myList.addFront(n.toString()); // Adds the node value to the linked list
  } else {
    console.log("You forgot to add some data to your node");
  }
};

listSize.oninput = function () {
  indexResult.innerHTML = listSize.value;
};

insertButton.onclick = function () {
  let n = "";
  for (let i = 0; i < noteInputs.length; i++) {
    if (noteInputs[i].checked) {
      n = noteInputs[i].value;
    }
  }
  let index = listSize.value;
  if (index == 0) {
    myList.addFront(n.toString());
  } else {
    myList.insert(n.toString(), index);
  }
  if (myList.size > 0) {
    listSize.max = myList.size;
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
