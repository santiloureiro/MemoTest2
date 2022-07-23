let score = 0;

const cards = ["🚓", "🍕", "💣", "🚕", "🍌", "🚓", "🍕", "💣", "🚕", "🍌" ];

let cardsSelected = [];

let player1;
let player2;

let expertCounter = 0;

const expertCounterButton = document.querySelector("#secret-button")

const easyButton = document.querySelector("#easy-selector")
const mediumButton = document.querySelector("#medium-selector")
const hardButton = document.querySelector("#hard-selector")

const difficultyButtonsDiv = document.querySelector("#difficulty-selection-list")

const expertModeButton = document.createElement("a");

//Constructor de Jugadores

class Player {
    constructor(name, score){
        this.name = name;
        this.score = score;
    }
}

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

//Crea Jugadores con el constructor

const createPlayers = () => {
    player1 = new Player(prompt("Enter Player One's Name"), 0);

    player2 = new Player(prompt("Enter Player Two's Name"), 0);

    alert("Jugador 1: " + player1.name + "\nJugador 2: " + player2.name);
}

function expertMode(){
        expertModeButton.setAttribute("href", "pages/expert.html")
        expertModeButton.setAttribute("class", "difficulty-selector")
        expertModeButton.setAttribute("id", "expert-selector")
        expertModeButton.innerText = "☠️ Modo experto ☠️";
        difficultyButtonsDiv.appendChild(expertModeButton);
}

function activateExpertMode(){
    if(expertCounter === 10){
        expertMode()
    }
}


function add1ToExpertCounter(){
    expertCounter += 1;
    expertCounterButton.innerText ="☠️" + expertCounter;
    console.log(expertCounter);

    activateExpertMode();

    if(expertCounter > 10){
        expertCounterButton.innerText ="☠️";
    }
    return expertCounter
}




//Pasa por consola todos los strings del array "cards"

cards.forEach(el => {
    console.log(el)
});



const hayAutito = cards.find(el => el === "🚕");

const cardsString = cards.join()

console.log(hayAutito)

console.log(cardsString)

shuffleCards()

cardsSelected.push(cards[2]);
cardsSelected.push(cards[1]);

console.log(cardsSelected)

compareCards();


