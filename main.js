
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
        stringToPrint +=     `<button type="submit">Escaped</button>`;
        stringToPrint +=   `</div>`;
        stringToPrint +=  `</div>`;
    });
    printToDom(stringToPrint, "zoo");
}

function onLoad () {
    const data = JSON.parse(this.responseText);
    domString(data.animals);
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