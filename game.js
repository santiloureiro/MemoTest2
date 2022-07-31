let scoreValue = 0;

let scoreCounter = document.getElementById("score-counter")

const cards = ["🚓", "🍕", "💣", "🚕", "🍌", "🐝", "🚓", "🍕", "💣", "🚕", "🍌", "🐝"];

let cardsSelected = [];

let cardContainer = document.querySelector(".cards-zone")

let tile = "";



//Crea las cards para el juego
shuffleCards()

cards.forEach((item, i) => {
    tile += `<div id="carta${i}" class="card-block" onclick="selectCard(${i})">
    <div class="card-front" id="front${i}">?</div>
    <div class="card-back" id="back${i}">${item}</div>
    </div>`
})

cardContainer.innerHTML = tile;


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
    let carta = document.getElementById("carta"+i)
    let cartaBack = document.getElementById("back"+i)
    let cartaFront = document.getElementById("front"+i)
    cartaFront.style.zIndex = -1
    cartaBack.style.zIndex = 1
    cardsSelected.push(i)

    console.log(cardsSelected)

    if(cardsSelected.length === 2){
        deselectCard(cardsSelected)
        cardsSelected = [];
    }

    
}


function checkSelectedSameCard(){
    if(back1.id === "correct" || back2.id === "correct"){
        return
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

function deselectCard(cardsSelected){

        let back1 = document.getElementById("back"+cardsSelected[0])
        let back2 = document.getElementById("back"+cardsSelected[1])

        checkSelectedSameCard();

setTimeout( () => {
        if((back1.innerHTML != back2.innerHTML) || (back1.id === back2.id)){
            let front1 = document.getElementById("front"+cardsSelected[0])
            let front2 = document.getElementById("front"+cardsSelected[1])
            front1.style.zIndex = 999;
            front2.style.zIndex = 999;
            
            scoreDown()

        } else {
            back1.style.zIndex = 999;
            back2.style.zIndex = 999;
            back1.style.backgroundColor = "#D9FF9B"
            back2.style.backgroundColor = "#D9FF9B"
            back1.setAttribute("id","correct")

            scoreUp();
        }
    }, 700);
}

