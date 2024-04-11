let gameSeq = [];
let userSeq = [];

let started  = false;
let level = 0;

let btns = ["yellow" , "red" , "blue" , "green"];

h2 = document.querySelector("h2");
button = document.querySelector("button");
button.addEventListener("click", function () {
    if(started == false) {
        console.log("Game Started");
        started = true;
        
        levelUp();
    }
});

function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 300);
}

function levelUp () {
    userSeq = [];

    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);

    gameSeq.push(randColor);

    btnFlash(randBtn);
}

var x = document.querySelector("audio");
function playAudio() {
  x.play();
}

function checkAns (idx) {
    if(userSeq[idx] === gameSeq[idx]) {
        if(userSeq.length === gameSeq.length) {
            setTimeout(levelUp , 1000);
        }
    } else {
        // h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any kye to start Again`;
        document.querySelector("body").style.background = "red";
        playAudio();
        setTimeout(function (){
            document.querySelector("body").style.background = "linear-gradient(#C4ADC5, #B0B5E0 )";
        },150);
        maxHighScore();
        reset();

    }
}

function btnPress() {
    console.log("button pressed");
    btnFlash(this);
    userColor = this.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset () {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

let highScore = [];
let highestScore = 0;
function maxHighScore() {
    highScore.push(level);
    highestScore = highScore[0];
    for(let i = 1 ; i<highScore.length ; i++) {
        if(highScore[i] > highestScore ) {
            highestScore = highScore[i];
        }
    }
    h2.innerHTML = `Game Over! Your score was <b>${level}</b> Press start to play again <br> Highest Score is <b>${highestScore}</b> `;
    button.innerText = "Restart";
}

