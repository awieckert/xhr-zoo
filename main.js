
const printToDom = (stringToPrint, divID) => {
    document.getElementById(divID).innerHTML += stringToPrint;
}

const domString = (animalArray) => {
    let stringToPrint = "";
    animalArray.forEach((item) => {
        stringToPrint += `<h1>${item.name}</h1>`;
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