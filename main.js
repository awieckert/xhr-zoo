
const printToDom = (stringToPrint, divID) => {
    document.getElementById(divID).innerHTML += stringToPrint;
}

const domString = (animalArray) => {
    let stringToPrint = "";
    animalArray.forEach((item) => {
        if(item.isCarnivore){
        stringToPrint += `<div class="cardz carnivore">`;
        } else {
        stringToPrint += `<div class="cardz vegetable">`;
        }
        stringToPrint +=   `<h1>${item.name}</h1>`;
        stringToPrint +=   `<h3>${item.number}</h3>`;
        stringToPrint +=   `<img src="${item.imageUrl}" alt="RAWR!">`;
        stringToPrint +=   `<div class="button-container">`;
        stringToPrint +=     `<button class="escaped" type="submit">Escaped</button>`;
        stringToPrint +=   `</div>`;
        stringToPrint +=  `</div>`;
    });
    printToDom(stringToPrint, "zoo");
}


const addEscapedEvenListeners = () => {
    const escapedButtons = document.getElementsByClassName("escaped");
    
    for(let i = 0; i < escapedButtons.length; i++){
        escapedButtons[i].addEventListener("click", animalEscaped);
    }
}

const animalEscaped = (e) => {
    const badAnimalButton = e.target.parentNode;
    showCarnivores();
    showVegetables();
    showFoundButton(badAnimalButton);
}

const showFoundButton = (buttonContainer) => {
    buttonContainer.innerHTML = `<button id="found">Found</button>`;
    initilizeFoundButton();
}

const initilizeFoundButton = () => {
    const foundButton = document.getElementById('found');
    foundButton.addEventListener('click', () => {
        const animals = document.getElementsByClassName('cardz');
        for(let i = 0; i < animals.length; i++){
            animals[i].children[3].innerHTML = `<button class="escaped" type="submit">Escaped</button>`;
            animals[i].classList.remove('green');
            animals[i].classList.remove('red');
        }
        addEscapedEvenListeners();
    });
}

const showCarnivores = () => {
    const carnivores = document.getElementsByClassName('carnivore');
    for(let i = 0; i < carnivores.length; i++){
        carnivores[i].children[3].innerHTML = "";
        carnivores[i].classList.add('red');
    }
}

const initilizeEatMeButton = () => {
    const eatMeButtons = document.getElementsByClassName('eat-me');
    for(let i = 0; i < eatMeButtons.length; i++){
        eatMeButtons[i].addEventListener("click", itsAlreadyBeenEaten);
    }
}

const itsAlreadyBeenEaten = (e) => {
    let animalNumber = e.target.parentNode.parentNode.children[1].innerHTML;
    let newNumber = (animalNumber * 1) - 1;
    e.target.parentNode.parentNode.children[1].innerHTML = newNumber;
}

const showVegetables = () => {
    const veggies = document.getElementsByClassName('vegetable');
    for(let i = 0; i < veggies.length; i++){
        console.log("Veggies Variable: ", veggies)
        console.log("For Loop i value: ", i);
        console.log("Veggies Index: ", veggies[i]);
        veggies[i].children[3].innerHTML = `<button class="eat-me" type="submit">EAT ME!!!!</button>`;
        veggies[i].classList.add('green');
    }
    initilizeEatMeButton();
}




function onLoad () {
    const data = JSON.parse(this.responseText);
    domString(data.animals);
    addEscapedEvenListeners();
}

function onFail () {
    console.log("SHIT! It Broke");
}

const startApplication = () => {
    let myRequest = new XMLHttpRequest;
    myRequest.addEventListener("load", onLoad);
    myRequest.addEventListener("error", onFail);
    myRequest.open("GET", "animals.json");
    myRequest.send();
}

startApplication();