let gameSeq = [];
let userSeq = [];
let highestScore=0;


let btns = ["red", "yellow", "purple", "green"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", () => {
  if (started == false) {
    console.log("game Start");
    started = true;
    levelUp();
  }
});

function btnFlash(btn) {
  btn.classList.add("flash");
  setTimeout(() => {
    btn.classList.remove("flash");
  }, 250);
}

function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(() => {
      btn.classList.remove("userFlash");
    }, 250);
  }

function levelUp() {
    userSeq=[]
  level++;
  h2.innerText = `Level ${level}`;

  let randIdx = Math.floor(Math.random() * 3);
  let randColor = btns[randIdx];

  let randBtn = document.querySelector(`.${randColor}`);
//   console.log(randIdx);  
//   console.log(randColor);  
//   console.log(randBtn);  
gameSeq.push(randColor);
// console.log(gameSeq);
  btnFlash(randBtn);
}

function checkAns(idx) {
    // let idx=level-1;

    if (userSeq[idx]===gameSeq[idx]) {
      if (userSeq.length==gameSeq.length) {
          setTimeout(levelUp,1000)
      }
    } else {
        if (level>highestScore) {
            highestScore=level;
            document.querySelector("h4").innerText=`Highest Score: ${highestScore} `
        }
        document.querySelector("body").style.backgroundColor="red";
        h2.innerHTML=`Game Over! Your Score is <b>${level}</b></br> Press any key to start`
        setTimeout(()=>{
            document.querySelector("body").style.backgroundColor="white";
        },1500)
        reset();
    }
}

function btnPress() {
    // console.log(this);
    let btn=this;
    userFlash(btn);
    let userColor=btn.getAttribute("id");
    // console.log(userColor);
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns= document.querySelectorAll(".btn");

for(btn of allBtns){
    btn.addEventListener("click", btnPress)
}

function reset(){
    started=false;
    level=0;
    userSeq=[];
    gameSeq=[];
}