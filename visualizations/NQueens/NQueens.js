class NQueens {
  constructor() {
    this.solutions = [];
  }

  printBoard(board) {
    board.forEach((row) => {
      console.log(row.join(" "));
    });
    console.log(""); // Print a new line for separation
  }

  solve(n) {
    this.solutions = [];
    let board = Array.from({ length: n }, () => Array(n).fill(".")); // Initialize the board
    let rows = new Set();
    let cols = new Set();

    function isSafe(board, row, col) {
      // if (rows.has(r) || cols.has(c)) {
      //   return
      // }

      //Check diagonal
      // Check column
      for (let i = 0; i < row; i++) {
        if (board[i][col] === "Q") return false;
      }

      // Check upper-left diagonal
      for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
        if (board[i][j] === "Q") return false;
      }

      // Check upper-right diagonal
      for (let i = row, j = col; i >= 0 && j < n; i--, j++) {
        if (board[i][j] === "Q") return false;
      }

      return true;
    }

    const placeQueens = (board, row) => {
      if (row == n) {
        this.solutions.push(board.map((row) => row.join("")));
        // this.printBoard(board);
        return;
      }

      //if all good, then place queen and recurse
      for (let col = 0; col < n; col++) {
        if (isSafe(board, row, col)) {
          board[row][col] = "Q"; // Place the queen
          //add row and col to sets
          placeQueens(board, row + 1); // Recurse to place the next queen
          //remove row and column from sets
          board[row][col] = "."; // Backtrack and remove the queen
        }
      }
    };

    placeQueens(board, 0);
    return this.solutions;
  }

  display() {
    console.log("Solutions:", this.solutions.length);
    this.solutions.forEach((solution, index) => {
      console.log(`Solution ${index + 1}:`);
      solution.forEach((row) => console.log(row));
      console.log("");
    });
  }
}
