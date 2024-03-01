const gridContainer = document.querySelector(".grid-container");
const btnStart = document.getElementById("btn-start");
const SqrArr = [100,81,49];
const difficult = document.getElementById("difficult");
let sqrTot;
const totBomb = 16;
const arrBomb = [];
let score = 0;
const result = document.getElementById("result")




btnStart.addEventListener("click",start);

/*FUNZIONI*/

function start() {
  

  reset();
  sqrTot = SqrArr[difficult.value];
  geneGrid();
  randBomb();
  console.log(arrBomb);
  const arrsqr = document.querySelectorAll(".sqr");
  console.log(arrsqr);

}

function reset() {

  gridContainer.innerHTML = "";
  score=0;
  arrBomb.splice(0);
  result.innerHTML=`
    Il tuo punteggio attuale: ${score}
    `
  
}

function geneGrid() {

  const grid = document.createElement("div");
  grid.className = "grid";

  for (let i = 0; i < sqrTot; i++) {
    
    const sqr = sqrGene(i);
    grid.append(sqr);

  }
  gridContainer.append(grid);
  
}

function sqrGene(index) {

  const sqr = document.createElement("div");
  sqr.className = "sqr";
  sqr.classList.add("sqr" + sqrTot);

  sqr.addEventListener("click",function(){

    sqr._sqrID = index;
    
    
    

    if ((!arrBomb.includes(sqr._sqrID))&&(!(sqr.classList.contains("clicked")))) {
      score++;
      checkWin();
    }
    sqr.classList.add("clicked");
    see(arrsqr);
    checkLose(sqr);

    result.innerHTML=`
    Il tuo punteggio attuale: ${score} su ${sqrTot - totBomb}
    `
  })
  
  return sqr;
  
}

function randBomb() {

  do {

    arrExt = Math.ceil(Math.random() * sqrTot);
    if (!(arrBomb.includes(arrExt))) {

      arrBomb.push(arrExt);
      
    }
    

  } while (arrBomb.length < totBomb);

  console.log(arrBomb.length);
  console.log(totBomb);

}

function checkLose(sqr) {

  if (arrBomb.includes(sqr._sqrID)) {

    
    

    sqr.classList.add ("bomb");
    

    const end = document.createElement("div");
    end.innerHTML = "Hai perso!";
    end.className = "gameover";
    gridContainer.append(end);
    
  }
}

function checkWin() {
  if (score === (sqrTot - totBomb)) {

    const win = document.createElement("div");
    win.innerHTML = "Hai vinto!";
    win.className = "win";
    gridContainer.append(win);
    
  }
}

function see(arrsqr) {
  
  let x = 0;
  for (let i = 0; i < arrBomb.length; i++) {
    if (arrBomb.includes(arrsqr[i]._sqrID)) {
      arrsqr[i].classList.add("bomb");
      
    }
  }
}
