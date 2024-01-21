const cells = document.querySelectorAll(".cell"); //
const statusTxt = document.querySelector("#status");
const restartBtn = document.querySelector("#restartBtn");
const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
];

let options = ["", "", "", "", "", "", "", "", ""];

let currentPlayer = "X";
let running = false;

const startGame = () => {
  running = true;
  cells.forEach((cell) => cell.addEventListener("click", cellClicked));
  restartBtn.addEventListener("click", restartGame);
  statusTxt.textContent = `${currentPlayer}'s turn`;
};
function cellClicked() {
  const cellIndex = this.getAttribute("cellIndex");
  if (options[cellIndex] != "" || !running) {
    return;
  }
  updateCell(this, cellIndex);
  // changePlayer();
  checkWinner();
}
const updateCell = (cell, index) => {
  options[index] = currentPlayer;
  cell.textContent = currentPlayer;
};
const changePlayer = () => {
  currentPlayer = currentPlayer == "X" ? "O" : "X";
  statusTxt.textContent = `${currentPlayer}'s turn`;
};
const checkWinner = () => {
  let roundWon = false;

  for (let index = 0; index < winConditions.length; index++) {
    const condition = winConditions[index];

    const cellA = options[condition[0]];
    const cellB = options[condition[1]];
    const cellC = options[condition[2]];

    if (cellA == "" || cellB == "" || cellC == "") {
      continue;
    } else if (cellA == cellB && cellB == cellC) {
      roundWon = true;
      break;
    }
  }
  if (roundWon) {
    statusTxt.textContent = `${currentPlayer} wins`;
    running = false;
  } else if (!options.includes("")) {
    statusTxt.textContent = "Draw!";
  } else {
    changePlayer();
  }
};
const restartGame = () => {
  currentPlayer = "X";
  options = ["", "", "", "", "", "", "", "", ""];
  statusTxt.textContent = `${currentPlayer}'s turn`;
  cells.forEach((cell) => (cell.textContent = ""));
  running = true;
};
startGame();
