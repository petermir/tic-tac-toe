function resetGameStatus() {
  activePlayer = 0;
  currentRound = 1;
  gameIsOver = false
  gameOverElement.firstElementChild.innerHTML =
    'You Won, <span id="winner-name">Player name</span>!';
  gameOverElement.style.display = "none";

  let gameBoardIndex = 0;
  for (i = 0; i < 3; i++) {
    for (j = 0; j < 3; j++) {
      gameData[i][j] = 0;
      const boardGame = gameBoardElement.children[gameBoardIndex];
      boardGame.textContent = "";
      boardGame.classList.remove("disabled");
      gameBoardIndex++; // The inner loop will execute entirely
      //------------before moving on to the second iteration of first loop
    }
  }
}

function startNewGame() {
  if (players[0].name === "" || players[1].name === "") {
    alert("Please set player names!");
    return; // to prevent further execution of this function
  }

  resetGameStatus();

  activePlayerName.textContent = players[activePlayer].name;
  gameArea.style.display = "block";
}

function switchPlayer() {
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  activePlayerName.textContent = players[activePlayer].name;
}

function selectGameField(event) {
  // or--> see app.js:28
  // if (event.target.tagName !== 'li') {
  //    return
  // }

  if (gameIsOver) {
      return
  }

  const selectedField = event.target;
  const selectedColumn = selectedField.dataset.col - 1;
  const selectedRow = selectedField.dataset.row - 1;

  if (gameData[selectedRow][selectedColumn] > 0) {
    alert("Please select an empty field!");
    return;
  }

  selectedField.textContent = players[activePlayer].symbol;
  selectedField.classList.add("disabled");

  gameData[selectedRow][selectedColumn] = activePlayer + 1;

  const winnerId = checkForGameOver();
  console.log(winnerId)

  if (winnerId !== 0) {
    endGame(winnerId);
  }

  currentRound++;
  switchPlayer();
}

function checkForGameOver() {
  //----------CHECKONG THE ROWS FOR EQUALITY--------------

  for (let i = 0; i < 3; i++) {
    if (
      gameData[i][0] > 0 &&
      gameData[i][0] === gameData[i][1] &&
      gameData[i][1] === gameData[i][2]
    ) {
      return gameData[i][0];
    }
  }

  //-------------CHECKING THE COLUMNS FOR EQUALITY-----------

  for (let i = 0; i < 3; i++) {
    if (
      gameData[0][i] > 0 &&
      gameData[0][i] === gameData[1][i] &&
      gameData[0][i] === gameData[2][i]
    ) {
      return gameData[0][i];
    }
  }

  //-------------CHECKING first DIAGONAL-----------

  if (
    gameData[0][0] > 0 &&
    gameData[0][0] === gameData[1][1] &&
    gameData[1][1] === gameData[2][2]
  ) {
    return gameData[0][0];
  }

  //-------------CHECKING second DIAGONAL-----------

  if (
    gameData[2][0] > 0 &&
    gameData[2][0] === gameData[1][1] &&
    gameData[1][1] === gameData[0][2]
  ) {
    return gameData[2][0];
  }

  if (currentRound === 9) {
    return -1;
  }

  return 0;
}

/* if (
    gameData[0][0] > 0 &&
    gameData[0][0] === gameData[0][1] &&
    gameData[0][1] === gameData[0][2] === 1
  ) {
    // cheching for equality
    return gameData[1][0];
  }
......
  if (
    gameData[2][0] > 0 &&
    gameData[2][0] === gameData[2][1] &&
    gameData[2][1] === gameData[2][2] === 1
  ) {
    // cheching for equality
    return gameData[2][0];
  } */

function endGame(winnerId) {
  // Don't have to use winnerId inside and outside of the function see:43 though can use the same name to describe that value
  gameIsOver = true;
  gameOverElement.style.display = "block";

  if (winnerId > 0) {
    const winnerName = players[winnerId - 1].name;
    gameOverElement.firstElementChild.firstElementChild.textContent =
      winnerName;
  } else {
    gameOverElement.firstElementChild.textContent = "It's a DRAW!";
  }
}
