let score = 0;

const cards = ["🚓", "🍕", "💣", "🚕", "🍌", "🐝", "🚓", "🍕", "💣", "🚕", "🍌", "🐝"];

let cardsSelected = [];

let cardContainer = document.querySelector(".cards-zone")

let tile = "";

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

shuffleCards()

//Crea las cards para el juego

cards.forEach((item) => {
    tile += `<div class="card">${item}</div>`
})

cardContainer.innerHTML = tile;

