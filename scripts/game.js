function resetGameStatus() {
  activePlayer = 0;
  currentRound = 1;
  gameIsOver = false;
  gameOverElement.firstElementChild.innerHTML =
    'You won! <span id="winner-player-name">PLAYER NAME</span>';
  gameOverElement.style.display = "none";

  let gameBoardIndex = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      gameData[i][j] = 0;
      const gameBoardTile = gameBoardElement.children[gameBoardIndex];
      gameBoardTile.textContent = "";
      gameBoardTile.classList.remove("disabled");
      gameBoardElement.chi;
      gameBoardIndex++;
    }
  }
}

function startNewGame() {
  if (players[0].name === "" || players[1].name === "") {
    alert("Please set player names for both players");
    return;
  } else {
    resetGameStatus();
    activePlayerNameElement.textContent = players[activePlayer].name;
    console.log(activePlayerNameElement.textContent);
    gameAreaElement.style.display = "block";
  }
}

function switchPlayer() {
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  activePlayerNameElement.textContent = players[activePlayer].name;
  console.log(players);
  console.log(activePlayerNameElement.textContent);
}

function selectGameField(event) {
  if (event.target.tagName !== "LI" || gameIsOver) {
    return;
  }

  const selectedField = event.target;
  const symbol = players[activePlayer].symbol;

  selectedField.textContent = symbol;
  selectedField.classList.add("disabled");

  const selectedColumn = selectedField.dataset.col - 1;
  const selectedRow = selectedField.dataset.row - 1;

  if (gameData[selectedRow][selectedColumn] > 0) {
    alert("Please select an empty field!");
    return;
  }

  selectedField.textContent = players[activePlayer].symbol;
  selectedField.classList.add("disabled");

  gameData[selectedRow][selectedColumn] = activePlayer + 1;

  const winner = checkForGameOver();

  //If theres a winner - do not continue the game
  if (winner !== 0) {
    console.log(winner);
    endGame(winner);
  } else {
    //Iterating rounds to check for a draw
    currentRound++;
    switchPlayer();
  }
}

function checkForGameOver() {
  //Checking for the Rows of Equality
  for (let i = 0; i <= 2; i++) {
    if (
      gameData[i][0] > 0 &&
      gameData[i][0] === gameData[i][1] &&
      gameData[i][1] === gameData[i][2]
    ) {
      return gameData[i][0];
    }
  }

  //Checking for the Columns of Equality
  for (let i = 0; i <= 2; i++) {
    if (
      gameData[0][i] > 0 &&
      gameData[0][i] === gameData[1][i] &&
      gameData[1][i] === gameData[2][i]
    ) {
      return gameData[0][i];
    }
  }

  //Diagonal Check top left to bottom right
  if (
    gameData[0][0] > 0 &&
    gameData[0][0] === gameData[1][1] &&
    gameData[1][1] === gameData[2][2]
  ) {
    return gameData[0][0];
  }

  //Diagonal Check bottom left to top right
  else if (
    gameData[2][0] > 0 &&
    gameData[2][0] === gameData[1][1] &&
    gameData[1][1] === gameData[0][2]
  ) {
    return gameData[2][0];
  }

  //If there is a draw - no winner
  if (currentRound === 9) {
    return -1;
  }
  return 0;
}

//Determine if the game is over
function endGame(winnerID) {
  gameIsOver = true;
  gameOverElement.style.display = "block";
  winnerID--;

  if (winnerID >= 0) {
    const winnerName = players[winnerID].name;
    gameOverElement.firstElementChild.firstElementChild.textContent =
      winnerName;
  } else {
    gameOverElement.firstElementChild.textContent = "It's a draw!";
  }
}
