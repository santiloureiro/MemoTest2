let scoreValue = 99;

let scoreCounter = document.getElementById("score-counter")

let cards = []

const easy = ["🚓", "🍕", "💣", "🚕", "🚓", "🍕", "💣", "🚕",]
const medium = ["🚓", "🍕", "💣", "🚕", "🍌", "🐝", "🚓", "🍕", "💣", "🚕", "🍌", "🐝"];
const hard = ["🚓", "🍕", "💣", "🚕", "🍌", "🐝", "🚀", "🛸", "🌭", "🍿", "🚓", "🍕", "💣", "🚕", "🍌", "🐝", "🚀", "🛸", "🌭", "🍿"];

let cardsSelected = [];

let usuarios = []

let paresResueltos = 0;

let gameWrapper = document.querySelector(".cards-wrapper")

let cardContainer = document.querySelector(".cards-zone")

let tile = "";

let startWall = document.getElementById("game-starter")

let easyStartButton = document.getElementById("easy-start-button")
let mediumStartButton = document.getElementById("medium-start-button")
let hardStartButton = document.getElementById("hard-start-button")

let scoreboard = document.querySelector(".game-scoreboard")

let successAudio = document.querySelector("#success-sound")
let errorAudio = document.querySelector("#error-sound")
let timeAudio = document.querySelector("#time-sound")

let scoreboardValue = "";

let difficulty;

if (easyStartButton) {
    difficulty = "🟢"
    cards = easy
    easyStartButton.onclick = () => { startGame(), timeScore(), shuffleCards(easy), buildCards(easy) }
}

if (mediumStartButton) {
    difficulty = "🟡"
    cards = medium
    mediumStartButton.onclick = () => { startGame(), timeScore(), shuffleCards(medium), buildCards(medium) }
}

if (hardStartButton) {
    difficulty = "🔴"
    cards = hard
    hardStartButton.onclick = () => { startGame(), timeScore(), shuffleCards(hard), buildCards(hard) }
}

let cardsFronts = document.getElementsByClassName("card-front")
let cardsBlocks = document.getElementsByClassName("card-block")

let player1;

let back1
let back2
let front1
let front2


//Comienza el juego

function startGame() {
    startWall.style.display = "none"
    
    setTimeout(() => {
        for (const el of cardsBlocks){
            el.style.pointerEvents = "all";
        }
        for (const el of cardsFronts) {
            el.style.zIndex = "1";
        }
        timeAudio.play()
    }   
    , 2000);

    setInterval(() => {
        timeAudio.play()
    }, 60000)
    return
}

//Constructor de Jugadores

class Player {
    constructor(name, score, difficulty) {
        this.name = name;
        this.score = score;
        this.difficulty = difficulty
    }
}

//Crea Jugadores con el constructor

const createPlayers = () => {
    (async () => {
        const { value: text } = await Swal.fire({
            title: 'Enter your Name',
            input: 'text',
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return 'You need to write something!'
                }
            },
            allowOutsideClick: () => {
                return false
            }
        })

        if (text) {
            player1 = new Player(text, scoreValue, difficulty);
            localStorage.setItem(localStorage.length, JSON.stringify(player1))
            Swal.fire(`Score saved, ${text}`)
        }
    })()
}

//Primero se randomiza el array y se crean las cards para el juego

shuffleCards()


function buildCards() {
    cards.forEach((item, i) => {
        tile += `<div dataid="carta${i}" class="card-block" id="card-${difficulty}" onclick="selectCard(${i})">
        <div class="card-front" id="front${i}">?</div>
        <div class="card-back" id="back${i}">${item}</div>
        </div>`
    })

    cardContainer.innerHTML = tile;
}

//Compara una carta seleccionada con otra carta seleccionada

function compareCards() {
    if (cardsSelected[1] === cardsSelected[0]) {
        console.log("Son pareja");
    } else {
        console.log("No son pareja");
    }
}

//Mezcla el array de cartas

function shuffleCards() {
    let j, x, index;
    for (index = cards.length - 1; index > 0; index--) {
        j = Math.floor(Math.random() * (index + 1));
        x = cards[index];
        cards[index] = cards[j];
        cards[j] = x;
    }
    return cards;
}

//Selecciona Cartas

function selectCard(i) {
    let cartaBack = document.getElementById("back" + i)
    let cartaFront = document.getElementById("front" + i)
    cartaFront.classList.add("card-hide")
    cartaBack.classList.add("card-show")
    cardsSelected.push(i)

    console.log(cardsSelected)

    if (cardsSelected.length == 2) {
        deselectCard(cardsSelected)
        cardsSelected = [];
    }

}

function scoreUp() {
    scoreValue++;

    scoreCounter.innerHTML = scoreValue
}

function scoreDown() {
    if (scoreValue > 0) {
        scoreValue--;
        scoreCounter.innerHTML = scoreValue
    }
}

//Deselecciona la carta cuando esta es correcta o incorrecta

function deselectCard(cardsSelected) {

    back1 = document.getElementById("back" + cardsSelected[0])
    back2 = document.getElementById("back" + cardsSelected[1])
    front1 = document.getElementById("front" + cardsSelected[0])
    front2 = document.getElementById("front" + cardsSelected[1])

    checkSelectedSameCard()

    if ((back1.innerHTML != back2.innerHTML) || (back1.id === back2.id)) {
        setTimeout(() => {
            front1.classList.add("card-show");
            front1.classList.remove("card-hide");
            front2.classList.add("card-show");
            front2.classList.remove("card-hide");
            back1.classList.remove("card-show")
            back2.classList.remove("card-show")
        }, 500);

        errorAudio.play()
        scoreDown()

    } else {
        setTimeout(() => {
            back1.classList.add("card-show")
            back2.classList.add("card-show")
            successAudio.play()
        }, 500);

        back1.setAttribute("id", "correct")
        back2.setAttribute("id", "correct")

        scoreUp()
        paresResueltos++


        scoreSave()
        restartGame()
    }
}

//Checkea si la card seleccionada es igual a la clickeada

function checkSelectedSameCard() {
    if (back1.id === "correct" || back2.id === "correct") {
        return
    }
}

//Guarda el puntaje del jugador

function scoreSave() {
    if (paresResueltos == cards.length / 2) {
        setTimeout(() => {
            createPlayers()
        }, 1000);
    }
}

//Muestra el boton de volver a jugar

function restartGame() {
    if (paresResueltos == cards.length / 2) {
        setTimeout(() => {
            let restartButton = "<button id=restartButton onclick=refreshPage()>Play Again</button>"
            gameWrapper.innerHTML += restartButton
            timeAudio.pause()
        }, 1000)
    }
}

//Organiza el ScoreBoard de mayor a menor

function scoreboardSort() {
    for (let i = 0; i < localStorage.length; i++) {
        let usuario = JSON.parse(localStorage.getItem(i))
        if(usuario != null){
            usuarios.push(usuario)
        }

    }
    console.log(usuarios)
    usuarios.sort((a, b) => b.score - a.score)
}


//Escribe el LocalStorage de Jugadores en el Scoreboard

function scoreboardWrite() {
    scoreboardSort()
    usuarios.forEach(el => {
        scoreboard.innerHTML += `<div class="scoreboard-item">${el.difficulty} ${el.name || "Usuario Anonimo"}, ${el.score}</div>`;
    });

}

//Limpia el localStorage

function scoreboardDelete() {
    localStorage.clear()
    scoreboard.replaceChildren("ScoreBoard:");
}

//Recarga la pagina

function refreshPage() {
    window.location.reload()
}

function timeScore() {
    setInterval(() => {
        scoreValue -= 1;
        scoreCounter.innerHTML = scoreValue
    }, 1000);
}

scoreboardWrite()
