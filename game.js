let scoreValue = 0;

let scoreCounter = document.getElementById("score-counter")

const cards = ["🚓", "🍕", "💣", "🚕", "🍌", "🐝", "🚓", "🍕", "💣", "🚕", "🍌", "🐝"];

let cardsSelected = [];

let usuarios = []

let paresResueltos = 0;

let cardContainer = document.querySelector(".cards-zone")

let tile = "";

let startWall = document.getElementById("game-starter")

let startButton = document.getElementById("start-button")

let scoreboard = document.getElementById("game-scoreboard")

let scoreboardValue = "";

startButton.onclick = () => {startGame()}

let cardsFronts = document.getElementsByClassName("card-front")

let back1
let back2
let front1
let front2


//Comienza el juego

function startGame(){
    startWall.style.display = "none"

setTimeout(() => {
    
    for (const el of cardsFronts) {
        el.style.zIndex = "10";
    }
    }
, 1000);
    return
}

//Constructor de Jugadores

class Player {
    constructor(name, score){
        this.name = name;
        this.score = score;
    }
}

//Crea Jugadores con el constructor

const createPlayers = () => {
    player1 = new Player(prompt("Enter Player One's Name"), 0);

    alert("Score saved, " + player1.name);

}

//Primero se randomiza el array y se crean las cards para el juego

shuffleCards()

function buildCards(){
    cards.forEach((item, i) => {
        tile += `<div id="carta${i}" class="card-block" onclick="selectCard(${i})">
        <div class="card-front" id="front${i}">?</div>
        <div class="card-back" id="back${i}">${item}</div>
        </div>`
    })
    
    cardContainer.innerHTML = tile;
}

buildCards()

//Compara una carta seleccionada con otra carta seleccionada

function compareCards(){
    if(cardsSelected[1] === cardsSelected[0]){
        console.log("Son pareja");
    } else{
        console.log("No son pareja");
    }
}


//Mezcla el array de cartas

function shuffleCards () {
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
    let cartaBack = document.getElementById("back"+i)
    let cartaFront = document.getElementById("front"+i)
    cartaFront.style.zIndex = -1
    cartaBack.style.zIndex = 1
    cardsSelected.push(i)

    console.log(cardsSelected)

    if(cardsSelected.length == 2){
        deselectCard(cardsSelected)
        cardsSelected = [];
    }
    
}




function scoreUp(){
    scoreValue += 1;

    scoreCounter.innerHTML = scoreValue
}

function scoreDown(){
    if(scoreValue > 0){
        scoreValue -= 1;
        scoreCounter.innerHTML = scoreValue
        }
}

//Deselecciona la carta cuando esta es correcta o incorrecta

function deselectCard(cardsSelected){

        back1 = document.getElementById("back"+cardsSelected[0])
        back2 = document.getElementById("back"+cardsSelected[1])
        front1 = document.getElementById("front"+cardsSelected[0])
        front2 = document.getElementById("front"+cardsSelected[1])

        checkSelectedSameCard()

        if((back1.innerHTML != back2.innerHTML) || (back1.id === back2.id)){
            setTimeout(() => {
                front1.style.zIndex = 999;
                front2.style.zIndex = 999;
            }, 500);

            scoreDown()

        } else {
            setTimeout(() => {
                back1.style.zIndex = 999;
                back2.style.zIndex = 999;
                back1.style.backgroundColor = "#D9FF9B"
                back2.style.backgroundColor = "#D9FF9B"
            }, 500);

            back1.setAttribute("id","correct")
            back2.setAttribute("id","correct")

            scoreUp();
            paresResueltos += 1;

            if(paresResueltos == cards.length / 2){
                setTimeout(() => {
                    createPlayers()
                    player1.score = scoreValue
                    localStorage.setItem(localStorage.length, JSON.stringify(player1))
                }, 1000);
            }
            
        }
}

//Checkea si la card seleccionada es igual a la clickeada

function checkSelectedSameCard(){
    if(back1.id === "correct" || back2.id === "correct"){
        return
    }
}

function scoreboardSort(){
    for(let i = 0; i < localStorage.length; i++){
        let usuario = JSON.parse(localStorage.getItem(i))
        usuarios.push(usuario)
    }
    usuarios.sort((a, b) => b.score - a.score)
}

function scoreboardWrite(){
    scoreboardSort()
    usuarios.forEach(el => {
        scoreboard.innerHTML += `<div>🟢 ${el.name}, ${el.score}</div>`;
    });
    
}

scoreboardWrite()

