let player1;
let player2;

let expertCounter = 0;

const expertCounterButton = document.querySelector("#secret-button")

    expertCounterButton.onclick = () => {add1ToExpertCounter()};

const easyButton = document.querySelector("#easy-selector")
const mediumButton = document.querySelector("#medium-selector")
const hardButton = document.querySelector("#hard-selector")

    easyButton.onclick = () => {createPlayers()}
    mediumButton.onclick = () => {createPlayers()}
    hardButton.onclick = () => {createPlayers()}

const difficultyButtonsDiv = document.querySelector("#difficulty-selection-list")

const expertModeButton = document.createElement("a");

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

    player2 = new Player(prompt("Enter Player Two's Name"), 0);

    alert("Jugador 1: " + player1.name + "\nJugador 2: " + player2.name);
}

function expertMode(){
        expertModeButton.setAttribute("href", "pages/expert.html")
        expertModeButton.setAttribute("class", "difficulty-selector")
        expertModeButton.setAttribute("id", "expert-selector")
        expertModeButton.innerText = "☠️ Modo Experto ☠️";
        difficultyButtonsDiv.appendChild(expertModeButton);
}

function activateExpertMode(){
    if(expertCounter === 10){
        expertMode()
    }
}

//Suma 1 al contador del boton del modo experto

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



