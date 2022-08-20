let expertCounter = 0;

const expertCounterButton = document.querySelector("#secret-button")

    expertCounterButton.onclick = () => {add1ToExpertCounter()};

const difficultyButtonsDiv = document.querySelector("#difficulty-selection-list")

const expertModeButton = document.createElement("a");

function expertMode(){
        expertModeButton.setAttribute("href", "pages/poketest.html")
        expertModeButton.setAttribute("class", "difficulty-selector")
        expertModeButton.setAttribute("id", "expert-selector")
        expertModeButton.innerHTML = `<img id="pokeball-img" src="resources/Poké_Ball_icon.svg" alt=""> PokeTest <img id="pokeball-img" src="resources/Poké_Ball_icon.svg" alt="">`;
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
    expertCounterButton.innerHTML =`<img id="pokeball-img" src="resources/Poké_Ball_icon.svg" alt="">` + expertCounter;
    console.log(expertCounter);

    activateExpertMode();

    if(expertCounter > 10){
        expertCounterButton.innerHTML =`<img id="pokeball-img" src="resources/Poké_Ball_icon.svg" alt="">`;
    }
    return expertCounter
}



