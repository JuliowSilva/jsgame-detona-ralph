const state = {
    view: { 
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeleft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
    },

    Values: {
        gamevelocity: 1000,
        hitposition: 0,
        result: 0,
        curretTime: 60,
    },

    actions: {
        timerId: setInterval(randomsquare, 1000),
        countDownTimerId: setInterval(countdown, 1000),
    },
};

function countdown(){
    state.Values.curretTime--;
    state.view.timeleft.textContent = state.Values.curretTime;

    if(state.Values.curretTime <= 0){
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        alert("Game Over! O seu resultado foi: " + state.Values.result);
    }
}

function playSound(audioname){
    let audio = new Audio(`./src/audios/${audioname}.m4a`);
    audio.volume = 0.2;
    audio.play();
}

function randomsquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove ("enemy");
});

let randomnumber = Math.floor(Math.random() * 9);
let randomsquare = state.view.squares[randomnumber];
randomsquare.classList.add("enemy");
state.Values.hitposition = randomsquare.id;
}

function addlistenerhitbox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if(square.id === state.Values.hitposition){
                state.Values.result++;
                state.view.score.textContent = state.Values.result;
                state.Values.hitposition = null;
                playSound("hit");
            }
        });
    });
}

function init() {
   addlistenerhitbox();
}

init();