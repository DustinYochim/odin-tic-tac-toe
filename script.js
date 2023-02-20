const GameBoard = (function () {
  const gameBoard = ["", "", "", "", "", "", "", "", ""];

  const getGameBoard = () => gameBoard;

  const updateBoard = (index, currentClass) => {
    gameBoard[index] = currentClass;
  };

  return { getGameBoard, updateBoard };
})();

const GameController = (function () {
  const board = GameBoard;
  const players = [
    {
      name: "Player X",
      class: "x",
    },
    {
      name: "Player O",
      class: "circle",
    },
  ];

  let activePlayer = players[0];

  const getTurn = () => activePlayer;

  const switchTurn = () => {
    if (activePlayer === players[0]) {
      activePlayer = players[1];
    } else {
      activePlayer = players[0];
    }
  };

  const playRound = (index, currentClass) => {
    // update board
    board.updateBoard(index, currentClass);
    // check for win
    // check for draw
    // switch turns
    switchTurn();
  };
  return {
    getTurn,
    playRound,
  };
})();

const DisplayController = (function () {
  const game = GameController;
  const cellElements = document.querySelectorAll("[data-cell]");

  const placeMarker = (cell, currentClass) => {
    cell.classList.add(currentClass);
  };

  const handleClick = (e) => {
    // placeMark
    const cell = e.target;
    const currentClass = game.getTurn().class;
    const { index } = cell.dataset;
    placeMarker(cell, currentClass);
    // play round
    game.playRound(index, currentClass);
  };

  cellElements.forEach((cell) => {
    cell.addEventListener("click", handleClick, { once: true });
  });
})();
