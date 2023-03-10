const GameBoard = (() => {
  const gameBoard = ["", "", "", "", "", "", "", "", ""];

  const getGameBoard = () => gameBoard;

  const updateBoard = (index, currentClass) => {
    gameBoard[index] = currentClass;
  };

  const resetBoard = () => {
    for (let i = 0; i < gameBoard.length; i++) {
      gameBoard[i] = "";
    }
  };

  return { getGameBoard, updateBoard, resetBoard };
})();

const GameController = (() => {
  const board = GameBoard;
  const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
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

  const reset = () => {
    board.resetBoard();
  };

  const switchTurn = () => {
    if (activePlayer === players[0]) {
      activePlayer = players[1];
    } else {
      activePlayer = players[0];
    }
  };

  function checkWin(gameboard, currentClass) {
    return WINNING_COMBINATIONS.some((combination) =>
      combination.every((index) => gameboard[index] === currentClass)
    );
  }

  function isDraw(gameboard) {
    // console.log(gameboard);
    // console.log(typeof gameboard);
    return [...gameboard].every((cell) => cell === "x" || cell === "circle");
  }

  const playRound = (index, currentClass) => {
    const gameboard = board.getGameBoard();
    // update board
    board.updateBoard(index, currentClass);
    // check for win
    if (checkWin(gameboard, currentClass)) {
      return "win";
    }
    // check for draw
    if (isDraw(gameboard)) {
      return "draw";
    }

    // switch turns
    switchTurn();
  };
  return {
    getTurn,
    playRound,
    reset,
  };
})();

const DisplayController = (() => {
  const game = GameController;
  const board = document.getElementById("board");
  const cellElements = document.querySelectorAll("[data-cell]");
  const winningMessageElement = document.getElementById("winningMessage");
  const winningMessageTextElement = document.querySelector(
    ".data-winning-message-text"
  );
  const restartButton = document.getElementById("restartButton");

  const placeMarker = (cell, currentClass) => {
    cell.classList.add(currentClass);
  };

  const setBoardHoverClass = (currentClass) => {
    board.classList.remove("x");
    board.classList.remove("circle");
    board.classList.add(currentClass);
  };

  const endGame = (draw) => {
    if (draw) {
      // do something
      winningMessageElement.classList.add("show");
      winningMessageTextElement.textContent = "Draw!";
    } else {
      winningMessageElement.classList.add("show");
      winningMessageTextElement.textContent = `${game.getTurn().class} wins!`;
    }
  };
  const handleClick = (e) => {
    // placeMark
    const cell = e.target;
    let currentClass = game.getTurn().class;
    const { index } = cell.dataset;
    placeMarker(cell, currentClass);
    // play round
    const results = game.playRound(index, currentClass);
    if (results === "win") {
      endGame(false);
    } else if (results === "draw") {
      endGame(true);
    } else {
      currentClass = game.getTurn().class;
      setBoardHoverClass(currentClass);
    }
  };

  const startGame = () => {
    cellElements.forEach((cell) => {
      game.reset();
      cell.classList.remove("x");
      cell.classList.remove("circle");
      cell.addEventListener("click", handleClick, { once: true });
    });
    setBoardHoverClass("x");
    winningMessageElement.classList.remove("show");
  };

  restartButton.addEventListener("click", startGame);

  startGame();
})();
