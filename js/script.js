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
    if (arrBomb.includes(sqr._sqrID)) {

      sqr.classList.add ("bomb");

      const end = document.createElement("div");
      end.innerHTML = "Hai perso!";
      end.className = "gameover";
      gridContainer.append(end);
      score--;

    
    }
    sqr.classList.add("clicked");
    score++;
    
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
