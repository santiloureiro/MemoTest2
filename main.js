let expertCounter = 0;

const expertCounterButton = document.querySelector("#secret-button")

    expertCounterButton.onclick = () => {add1ToExpertCounter()};

const difficultyButtonsDiv = document.querySelector("#difficulty-selection-list")

const expertModeButton = document.createElement("a");

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



