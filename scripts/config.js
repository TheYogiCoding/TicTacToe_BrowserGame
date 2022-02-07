function editPlayerName(event) {
  editedPlayer = +event.target.dataset.playerid;
  playerNameOverlayElement.style.display = "block";
  backdropElement.style.display = "block";
}

function closePlayerName() {
  playerNameOverlayElement.style.display = "none";
  backdropElement.style.display = "none";
  formElement.firstElementChild.classList.remove("error");
  document.getElementById("player-name").value = "";
  errorsOutputElement.textContent = "";
}

function savePlayerName(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const enteredPlayername = formData.get("player-name").trim();

  if (!enteredPlayername) {
    event.target.firstElementChild.classList.add("error");
    errorsOutputElement.textContent = "Please enter a valid name";
    return;
  } else {
  }

  const updatedPlayerDataElement = document.getElementById(
    "player-" + editedPlayer + "-data"
  );

  updatedPlayerDataElement.children[1].textContent = enteredPlayername;

  players[editedPlayer - 1].name = enteredPlayername;

  closePlayerName();
}
