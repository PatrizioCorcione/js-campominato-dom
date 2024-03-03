const gridContainer = document.querySelector(".grid-container");
const btnStart = document.getElementById("btn-start");
const SqrArr = [100, 81, 49];
const difficult = document.getElementById("difficult");
let sqrTot;
const totBomb = 16;
const arrBomb = [];
let score = 0;
let opened = 0;
const result = document.getElementById("result");

// Event listener for the start button
btnStart.addEventListener("click", start);

// Start function to initialize the game
function start() {
  reset();
  sqrTot = SqrArr[difficult.value];
  generateGrid();
  generateBombs();
  
}

// Reset function to reset the game state
function reset() {
  gridContainer.innerHTML = "";
  score = 0;
  opened = 0;
  arrBomb.length = 0;
  updateResult();
}

// Generate the game grid
function generateGrid() {
  const grid = document.createElement("div");
  grid.className = "grid";

  for (let i = 1; i <= sqrTot; i++) {
    const sqr = createSquare(i);
    grid.append(sqr);
  }
  gridContainer.append(grid);
}

// Create a square element

function createSquare(index) {
  const sqr = document.createElement("div");
  sqr.className = "sqr";
  sqr.classList.add("sqr" + sqrTot);
  sqr._sqrID = index;
  sqr.setAttribute("sqr-id", index);

  
  sqr.addEventListener("contextmenu", function() {
    sqr.classList.toggle("redFlag");
    event.preventDefault();

  });

  sqr.addEventListener("click", function() {

    if (!arrBomb.includes(sqr._sqrID) && !sqr.classList.contains("clicked")&&(!sqr.classList.contains("redFlag"))) {
      score++;
      sqr.classList.add("clicked");
      checkWin();
      const bombsAround = checkAround(sqr);
      sqr.innerHTML = bombsAround;

      if (bombsAround === 0) {

        openAdjacentSquares(sqr);

      }
    }

    checkLose(sqr);
    updateResult();
    
  });

  return sqr;
}

// Open all adjacent squares with no bombs around
function openAdjacentSquares(sqr) {
  const gridWidth = Math.sqrt(sqrTot);
  const allDirections = [- gridWidth - 1, - gridWidth, - gridWidth + 1, - 1, + 1, + gridWidth - 1, + gridWidth, + gridWidth + 1];
  const isLeftEdge = (sqr._sqrID % gridWidth === 1);
  const isRightEdge = (sqr._sqrID % gridWidth === 0);
  const isFirstRow = sqr._sqrID <= gridWidth;
  const isLastRow = sqr._sqrID > sqrTot - gridWidth;

  for (let i = 0; i < allDirections.length; i++) {
    const direction = allDirections[i];
    const nearCellID = sqr._sqrID + direction;
    

    if (
      !(isLeftEdge && (direction === - gridWidth - 1 ||  direction === - 1 || direction === + gridWidth - 1)) &&
      !(isRightEdge && (direction === - gridWidth + 1 ||  direction === + 1 || direction === + gridWidth + 1)) &&
      !(isFirstRow && (direction === - gridWidth + 1 || direction === - gridWidth || direction === - gridWidth - 1)) &&
      !(isLastRow && (direction === + gridWidth + 1 || direction === + gridWidth || direction === + gridWidth - 1))
    ) {
      const nearCell = document.querySelector(`.sqr[sqr-id="${nearCellID}"]`);

      if (nearCell && !nearCell.classList.contains("clicked") && !arrBomb.includes(nearCellID)) {
        nearCell.classList.add("clicked");
        const bombsAround = checkAround(nearCell);
        nearCell.innerHTML = bombsAround;
        score++;
        checkWin();
        console.log(opened);
        if (bombsAround === 0) {
          openAdjacentSquares(nearCell);
          
        }
      }
    }
  }
}

// Generate random bomb positions
function generateBombs() {
  do {
    const randomIndex = Math.floor(Math.random() * sqrTot);
    if (!arrBomb.includes(randomIndex)) {
      arrBomb.push(randomIndex);
    }
  } while (arrBomb.length < totBomb);
}

// Check if the player loses
function checkLose(sqr) {
  if (arrBomb.includes(sqr._sqrID) && !sqr.classList.contains("redFlag")) {
    revealBombs();
    endGame("Hai perso!");
  }
}

// Check if the player wins
function checkWin() {
  if (score === (sqrTot - totBomb)) {
    endGame("Hai vinto!");
  }
}

// End the game with a message
function endGame(message) {
  const end = document.createElement("div");
  end.innerHTML = message;
  end.className = "gameover";
  gridContainer.append(end);
}
// Reveal all bomb positions
function revealBombs() {
  const allSqr = document.querySelectorAll(".sqr");
  for (let i = 0; i < allSqr.length; i++) {
    if (arrBomb.includes(allSqr[i]._sqrID)) {
      allSqr[i].classList.add("bomb");
    }else{
      allSqr[i].classList.add("clicked")
    }
  }
  
}


// Update the result display
function updateResult() {
  result.innerHTML = `Il tuo punteggio attuale: ${score + opened} su ${sqrTot - totBomb}`;
}

function checkAround(sqr) {
  const gridWidth = Math.sqrt(sqrTot);
  const isLeftEdge = (sqr._sqrID % gridWidth === 1);
  const isRightEdge = (sqr._sqrID % gridWidth === 0);
  const isFirstRow = sqr._sqrID <= gridWidth;
  const isLastRow = sqr._sqrID > sqrTot - gridWidth;
  const allDirections = [- gridWidth - 1, - gridWidth, - gridWidth + 1, - 1, + 1, + gridWidth - 1, + gridWidth, + gridWidth + 1];
  let bombsAround = 0;
  const nearCellArray = [];

  for (let i = 0; i < allDirections.length; i++) {
    const direction = allDirections[i];
    const nearCell = sqr._sqrID + direction;

    if (
        !(isLeftEdge && (direction === - gridWidth - 1 ||  direction === - 1 || direction === + gridWidth - 1)) &&
        !(isRightEdge && (direction === - gridWidth + 1 ||  direction === + 1 || direction === + gridWidth + 1)) &&
        !(isFirstRow && (direction === - gridWidth + 1 || direction === - gridWidth || direction === - gridWidth - 1)) &&
        !(isLastRow && (direction === + gridWidth + 1 || direction === + gridWidth || direction === + gridWidth - 1))
      ) {
      if (arrBomb.includes(nearCell)){
        bombsAround++;
      }
    }
  }


  return bombsAround;
}